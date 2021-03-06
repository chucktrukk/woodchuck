console.log("Woodchuck >> viewport");

Woodchuck.prototype.rootElement = '.Bu.y3';
Woodchuck.prototype.headStyleClass = 'pn-style';
Woodchuck.prototype.logoPath = chrome.extension.getURL("assets/images/logo48.png");
Woodchuck.prototype.userData = { email: 'n/a', name: 'n/a' };

Woodchuck.prototype.updateCustomer = function(opts) {
  var self = this;

  if(!this.isLoggedIn()) {
    if(opts) this.userData = opts;
    this.showLoginForm();
    return false;
  }

  if(opts && opts.email && opts.email === this.userData.email) {
    this.updateCustomerView(this.userData.html);
    setTimeout( function() {
      eval(self.userData.js);
    }, 1);
  }
  else {
    if(opts) this.userData = opts;

    // If we've manually specified a URL using localStorage, warn that it's nonstandard
    if (this.defaultHostUrl != this.hostUrl) {
      url = this.hostUrl.replace('https://','').replace('.precisionnutrition.com','');
      warningString = '<p class="nonstandard-host-warning">Warning: using ' + url + "</p>";
    } else {
      warningString = ''
    }

    // Update the view to show we're loading user info
    $(this.rootElement).html(
      '<div class="precision-nutrition">' +
        warningString +
        '<img class="logo" src="' + this.logoPath + '"></img>' +
        '<p>Pulling data for ' + this.userData.name + '</p>' +
      '</div>'
    );

    // Do the request and update the view with the data that comes in
    console.log("Woodchuck >> pulling user data for " + this.userData.email);
    $.ajax({
      url: this.userInfoUrl(),
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + self.bearerToken());
      },
      error: function() {
        console.log("Woodchuck >> error pulling user info");
      },
      success: function(data) {
        console.log("Woodchuck >> Successful pull of user data");
        self.userData.html = data.html;
        self.userData.js = data.js;
        self.setStyle(data.css);
        self.updateCustomerView(data.html);
        setTimeout( function() {
          eval(data.js);
        }, 1);
      }
    });
  }
};

Woodchuck.prototype.setStyle = function(css) {
  if(!$('.' + this.headStyleClass).length) {
    $('head').append(
      '<style class="' + this.headStyleClass + '">' + css + '</style>'
    );
  }
};

Woodchuck.prototype.userInfoUrl = function() {
  var url =
    this.hostUrl + '/api/v1/gmail.js?email=' +
    this.userData.email;
  return url;
};

Woodchuck.prototype.updateCustomerView = function(html) {
  console.log("Woodchuck >> updating customer view");
  $(this.rootElement).html(html);
};

Woodchuck.prototype.isOnLoginForm = function() {
  return !!$(this.rootElement).find('.login').length
};

Woodchuck.prototype.showLoginForm = function() {
  console.log("Woodchuck >> rendering login form");
  var self = this;

  // Don't re-render the login form if we're already on it
  if(this.isOnLoginForm()) return;

  $(this.rootElement).html(
    '<div class="precision-nutrition">' +
      '<img alt="PN Hexagon" class="logo" src="' + this.logoPath + '" />' +
      '<div class="errors"></div>' +
      '<form class="login">' +
        '<label for="pn-email" class="clearfix">Email</label><br />' +
        '<input id="pn-email"" type="text"></input>' +
        '<br />' +
        '<label for="pn-password">Password</label><br />' +
        '<input id="pn-password" type="password"></input><br />' +
        '<input type="submit" value="Login"></input>' +
      '</form>' +
    '</div>'
  );
  $(self.rootElement).find('form.login').submit(function(event) {
    self.loginFormSubmitted(event);
  });
};

Woodchuck.prototype.resetLoginForm = function() {
  $(this.rootElement).find('#pn-password, #pn-email').removeClass('error');
  $(this.rootElement).find('.errors').empty();
};

Woodchuck.prototype.loginFormSubmitted = function(event) {
  var email = $('#pn-email').val(),
    password = $('#pn-password').val(),
    self = this;

  event.preventDefault();
  event.stopPropagation();

  this.resetLoginForm();

  if(!email) $('#pn-email').addClass('error');
  if(!password) $('#pn-password').addClass('error');
  if(!email || !password) return false;

  this.login(email, password).then(
    function(data, status, xhr) {
      console.log("Woodchuck >> login submit came back successful");
      self.bearerToken(data.token);
      self.updateCustomer();
    },
    function(xhr, status, error) {
      $(self.rootElement).find('.errors').text('Login failed :(');
    }
  );

};
