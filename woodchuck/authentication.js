console.log("Woodchuck >> authentication");

Woodchuck.prototype.loginEndpoint =
  this.hostUrl + '/users/sign_in.json';

Woodchuck.prototype.isLoggedIn = function() {
  return !!this.bearerToken();
};

Woodchuck.prototype.bearerToken = function(token) {
  if(token) localStorage.pn_bearer_token = token;
  return localStorage.pn_bearer_token;
};

Woodchuck.prototype.login = function(email, password) {
  var xhr = $.ajax({
    url: this.loginEndpoint,
    type: 'POST',
    dataType: 'json',
    data: {
      user: { email: email, password: password }
    }
  });

  return xhr;
};
