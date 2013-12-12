var Gmail=function(){var api={get:{},observe:{},check:{},tools:{},tracker:{},dom:{}};api.version="0.2.2";api.tracker.globals=GLOBALS;api.tracker.view_data=VIEW_DATA;api.tracker.ik=api.tracker.globals[9];api.get.last_active=function(){var e=api.tracker.globals[17][15];return{time:e[1],ip:e[3],mac_address:e[9],time_relative:e[10]}};api.get.loggedin_accounts=function(){var e=api.tracker.globals[17][23];var t=[];for(i in e[1]){t.push({name:e[1][i][4],email:e[1][i][0]})}return t};api.get.user_email=function(){return api.tracker.globals[10]};api.check.is_thread=function(){var e=$(".nH .if").children(":eq(1)").children().children(":eq(1)").children();var t=api.get.email_ids();return e.length>1||t.length>1};api.dom.inbox_content=function(){return $("div[role=main]:first")};api.check.is_preview_pane=function(){var e=api.dom.inbox_content();var t=e.find("[gh=tl]");var n=false;t.each(function(){if($(this).hasClass("aia")){n=true}});return n};api.dom.inboxes=function(){var e=api.dom.inbox_content();return e.find("[gh=tl]")};api.check.is_multiple_inbox=function(){var e=api.dom.inboxes();return e.length>1};api.check.is_horizontal_split=function(){var e=api.dom.inbox_content();var t=e.find("[gh=tl]").find(".nn");return t.length==0};api.check.is_vertical_split=function(){return api.check.is_horizontal_split()==false};api.check.is_tabbed_inbox=function(){return $(".aKh").length==1};api.check.is_right_side_chat=function(){return $(".ApVoH")[0].getAttribute("aria-labelledby")==":wf"};api.check.is_google_apps_user=function(){var e=api.get.user_email();return e.indexOf("gmail.com",e.length-"gmail.com".length)==-1};api.get.storage_info=function(){var e=$(".md.mj").find("div")[0];var t=$(e).find("span")[0].innerText;var n=$(e).find("span")[1].innerText;var r=parseFloat(t.replace(/[^0-9\.]/g,""))*100/parseFloat(n.replace(/[^0-9\.]/g,""));return{used:t,total:n,percent:Math.floor(r)}};api.dom.email_subject=function(){return $("h1.ha")};api.get.email_subject=function(){var e=api.dom.email_subject();return e.find(".hP")[0].innerText};api.dom.email_body=function(){return $(".nH.hx")};api.check.is_inside_email=function(){return api.dom.email_contents().length>0};api.dom.email_contents=function(){var e=$(".ii.gt");var t=[];for(var n=0;n<e.length;n++){var r=e[n].getAttribute("class").split(" ")[2];var i=e[n].getAttribute("contenteditable");if(r!="undefined"&&r!=undefined){if(i!="true"){t.push(e[n])}}}return t};api.get.email_ids=function(){var e=api.dom.email_contents();var t=[];for(var n=0;n<e.length;n++){var r=e[n].getAttribute("class").split(" ")[2];var i=e[n].getAttribute("contenteditable");if(r!="undefined"&&r!=undefined){if(i!="true"){t.push(r)}}}return t};api.get.email_id=function(){var e=null;if(api.check.is_inside_email()){if(api.check.is_preview_pane()){var t=api.get.email_ids();e=t[0].substring(1,t[0].length)}else{e=window.location.hash.split("/").pop().replace(/#/,"").split("?")[0]}}return e};api.check.is_priority_inbox=function(){return $(".qh").length>0};api.check.is_rapportive_installed=function(){return $("#rapportive-sidebar").length==1};api.check.is_streak_installed=function(){return $("[id^='bentoBox'],[id*=' bentoBox'],[class*=' bentoBox'],[class*='bentoBox']").length>0};api.check.is_anydo_installed=function(){return $("[id^='anydo'],[id*=' anydo'],[class*=' anydo'],[class*='anydo']").length>0};api.check.is_boomerang_installed=function(){return $("[id^='b4g_'],[id*=' b4g_'],[class*=' b4g_'],[class*='b4g_']").length>0};api.check.is_xobini_installed=function(){return $("#xobni_frame").length>0};api.check.is_signal_installed=function(){return $("[id^='Signal'],[id*=' Signal'],[class*=' signal'],[class*='signal']").length>0};api.dom.get_left_sidebar_links=function(){return $("div[role=navigation] [title]")};api.dom.search_bar=function(){return $("[gh=sb]")};api.get.search_query=function(){var e=api.dom.search_bar();return e.find("input")[0].value};api.get.unread_inbox_emails=function(){var e=$("div[role=navigation]").find("[title*='Inbox']");if(e.length>0){if(e[0].innerText.indexOf("(")!=-1){return parseInt(e[0].innerText.replace(/[^0-9]/g,""))}}return 0};api.get.unread_draft_emails=function(){var e=$("div[role=navigation]").find("[title*='Drafts']");if(e.length>0){if(e[0].innerText.indexOf("(")!=-1){return parseInt(e[0].innerText.replace(/[^0-9]/g,""))}}return 0};api.get.unread_spam_emails=function(){var e=$("div[role=navigation]").find("[title*='Spam']");if(e.length>0){if(e[0].innerText.indexOf("(")!=-1){return parseInt(e[0].innerText.replace(/[^0-9]/g,""))}}return 0};api.get.unread_forum_emails=function(){var e=$("div[role=navigation]").find("[title*='Forums']");if(e.length>0){if(e[0].innerText.indexOf("(")!=-1){return parseInt(e[0].innerText.replace(/[^0-9]/g,""))}}return 0};api.get.unread_notification_emails=function(){var e=$("div[role=navigation]").find("[title*='Notifications']");if(e.length>0){if(e[0].innerText.indexOf("(")!=-1){return parseInt(e[0].innerText.replace(/[^0-9]/g,""))}}return 0};api.get.unread_promotion_emails=function(){var e=$("div[role=navigation]").find("[title*='Promotions']");if(e.length>0){if(e[0].innerText.indexOf("(")!=-1){return parseInt(e[0].innerText.replace(/[^0-9]/g,""))}}return 0};api.get.unread_social_emails=function(){var e=$("div[role=navigation]").find("[title*='Social Updates']");if(e.length>0){if(e[0].innerText.indexOf("(")!=-1){return parseInt(e[0].innerText.replace(/[^0-9]/g,""))}}return 0};api.get.beta=function(){var e={new_nav_bar:$("#gbz").length==0};return e};api.get.unread_emails=function(){return{inbox:api.get.unread_inbox_emails(),drafts:api.get.unread_draft_emails(),spam:api.get.unread_spam_emails(),forum:api.get.unread_forum_emails(),notifications:api.get.unread_notification_emails(),promotions:api.get.unread_promotion_emails(),social:api.get.unread_social_emails()}};api.tools.parse_url=function(e){var t=/[?&]([^=#]+)=([^&#]*)/g;var n={};var r;while(r=t.exec(e)){n[r[1]]=r[2]}return n};api.tools.deparam=function(e,t){var n=function(e,t){var n=[];for(i=0;i<e.length;i++){n.push(t(e[i]))}return n};var r=Array.isArray||function(e){return Object.prototype.toString.call(e)=="[object Array]"};var s={},o={"true":!0,"false":!1,"null":null};n(e.replace(/\+/g," ").split("&"),function(e,n){var i=e.split("="),u=decodeURIComponent(i[0]),a,f=s,l=0,c=u.split("]["),h=c.length-1;if(/\[/.test(c[0])&&/\]$/.test(c[h])){c[h]=c[h].replace(/\]$/,"");c=c.shift().split("[").concat(c);h=c.length-1}else{h=0}if(i.length===2){a=decodeURIComponent(i[1]);if(t){a=a&&!isNaN(a)?+a:a==="undefined"?undefined:o[a]!==undefined?o[a]:a}if(h){for(;l<=h;l++){u=c[l]===""?f.length:c[l];f=f[u]=l<h?f[u]||(c[l+1]&&isNaN(c[l+1])?{}:[]):a}}else{if(r(s[u])){s[u].push(a)}else if(s[u]!==undefined){s[u]=[s[u],a]}else{s[u]=a}}}else if(u){s[u]=t?undefined:""}});return s};api.tools.parse_actions=function(e){if(e.method=="POST"&&typeof e.url.act=="string"){}if(e.url.search!=undefined){}var t={add_to_tasks:"tae",archive:"rc_^i","delete":"tr",delete_forever:"dl",delete_label:"dc_",discard_draft:"dd",expand_categories:"el",filter_messages_like_these:"cffm",label:"arl",mark_as_important:"mai",mark_as_not_important:"mani",mark_as_not_spam:"us",mark_as_spam:"sp",move_label:"mt",move_to_inbox:"ib",mute:"ig",read:"rd",save_draft:"sd",send_message:"sm",show_newly_arrived_message:"mo",star:"st",unmute:"ug",unread:"ur",unstar:"xst",new_email:"new_mail",poll:"poll",refresh:"refresh",open_email:"open_email"};if(typeof e.url.ik=="string"){api.tracker.ik=e.url.ik}if(typeof e.url.rid=="string"){if(e.url.rid.indexOf("mail")!=-1){api.tracker.rid=e.url.rid}}var n=t[decodeURIComponent(e.url.act)];var r=api.tools.deparam(e.body);var i=typeof r.t=="string"?[r.t]:r.t;var s=null;switch(n){case"ur":var s=[i,e.url,e.body];break;case"rd":var s=[i,e.url,e.body];break;case"tr":var s=[i,e.url,e.body];break;case"sp":var s=[i,e.url,e.body];break;case"us":var s=[i,e.url,e.body];break;case"arl":var s=[i,e.url,e.body,e.url.acn];break;case"ib":var s=[i,e.url,e.body];break;case"dl":var s=[i,e.url,e.body];break;case"st":var s=[i,e.url,e.body];break;case"xst":var s=[i,e.url,e.body];break;case"mai":var s=[i,e.url,e.body];break;case"mani":var s=[i,e.url,e.body];break;case"ig":var s=[i,e.url,e.body];break;case"ug":var s=[i,e.url,e.body];break;case"sd":var s=[i,e.url,r];break;case"dd":var s=[i,e.url,e.body];break;case"mt":var s=[i,e.url,e.body];break;case"tae":var s=[e.url,e.body,r];break;case"cffm":var s=[i,e.url,e.body];break;case"rc_^i":var s=[i,e.url,e.body];break;case"sm":var s=[e.url,e.body,r];break;case"el":var s=[e.url,e.body,r.ex=="1"];break}if(typeof e.url._reqid=="string"&&typeof e.url.th=="string"){var s=[e.url.th,e.url,e.body];if("new_email"in api.tracker.watchdog){api.tracker.watchdog["new_email"].apply(undefined,s)}}if((e.url.view=="cv"||e.url.view=="ad")&&typeof e.url.th=="string"&&typeof e.url.search=="string"){var s=[e.url.th,e.url,e.body];if("open_email"in api.tracker.watchdog){api.tracker.watchdog["open_email"].apply(undefined,s)}}if(typeof e.url.SID=="string"&&typeof e.url.zx=="string"&&e.body.indexOf("req0_")!=-1){api.tracker.SID=e.url.SID;var s=[e.url,e.body,r];if("poll"in api.tracker.watchdog){api.tracker.watchdog["poll"].apply(undefined,s)}}if(typeof e.url.ik=="string"&&typeof e.url.search=="string"&&e.body.length==0&&typeof e.url._reqid=="string"){var s=[e.url,e.body,r];if("refresh"in api.tracker.watchdog){api.tracker.watchdog["refresh"].apply(undefined,s)}}if(s!=null){if(n in api.tracker.watchdog){api.tracker.watchdog[n].apply(undefined,s)}}};api.tools.parse_requests=function(e){e.url_raw=e.url;e.url=api.tools.parse_url(e.url);if(typeof api.tracker.events!="object"&&typeof api.tracker.actions!="object"){api.tracker.events=[];api.tracker.actions=[]}api.tracker.events.unshift(e);api.tools.parse_actions(e);if(e.method=="POST"&&typeof e.url.act=="string"){api.tracker.actions.unshift(e)}if(api.tracker.events.length>50){api.tracker.events.pop()}if(api.tracker.actions.length>10){api.tracker.actions.pop()}};api.tools.xhr_watcher=function(){var e=this;if(!api.tracker.xhr_init){var t=top.document.getElementById("js_frame").contentDocument.defaultView;api.tracker.xhr_init=true;api.tracker.xhr_open=t.XMLHttpRequest.prototype.open;api.tracker.xhr_send=t.XMLHttpRequest.prototype.send;t.XMLHttpRequest.prototype._gjs_open=t.XMLHttpRequest.prototype.open;t.XMLHttpRequest.prototype.open=function(e,t,n,r,i){var s=this._gjs_open.apply(this,arguments);this.xhrParams={method:e.toString(),url:t.toString()};return s};t.XMLHttpRequest.prototype._gjs_send=t.XMLHttpRequest.prototype.send;t.XMLHttpRequest.prototype.send=function(e){var t=this._gjs_send.apply(this,arguments);if(this.xhrParams){this.xhrParams.body=e;api.tools.parse_requests(this.xhrParams)}return t}}};api.observe.http_requests=function(){return api.tracker.events};api.observe.actions=function(){return api.tracker.actions};api.observe.on=function(e,t){if(typeof api.tracker.watchdog!="object"){api.tracker.watchdog={}}if(!api.tracker.xhr_init){api.tools.xhr_watcher()}api.tracker.watchdog[e]=t};api.observe.off=function(e){if(e){if(e in self.tracker.watchdog){delete self.tracker.watchdog[e]}}else{var t=top.document.getElementById("js_frame").contentDocument.defaultView;t.XMLHttpRequest.prototype.open=api.tracker.xhr_open;t.XMLHttpRequest.prototype.send=api.tracker.xhr_send;api.tracker.xhr_init=false}};api.tools.make_request=function(e,t){var t=typeof t==undefined||typeof t==null?"GET":t;var n=$.ajax({type:t,url:encodeURI(e),async:false});return n.responseText};api.tools.parse_view_data=function(e){var t=[];var n=[];for(var r=0;r<e.length;r++){if(e[r][0]=="tb"){for(var i=0;i<e[r][2].length;i++){n.push(e[r][2][i])}}}for(var s=0;s<n.length;s++){var o=n[s];var u={};t.push({id:o[0],title:o[9],excerpt:o[10],time:o[15],sender:o[28],attachment:o[13],labels:o[5]})}return t};api.get.visible_emails=function(){var page=api.get.current_page();var url=window.location.origin+window.location.pathname+"?ui=2&ik="+api.tracker.ik+"&rid="+api.tracker.rid+"&view=tl&start=0&num=120&rt=1";if(page.indexOf("label/")==0){url+="&cat="+page.split("/")[1]+"&search=cat"}else if(page.indexOf("category/")==0){if(page.indexOf("forums")!=-1){cat_label="group"}else if(page.indexOf("updates")!=-1){cat_label="notification"}else if(page.indexOf("promotion")!=-1){cat_label="promo"}else if(page.indexOf("social")!=-1){cat_label="social"}url+="&cat=^smartlabel_"+cat_label+"&search=category"}else if(page.indexOf("search/")==0){url+="&qs=true&q="+page.split("/")[1]+"&search=query"}else{url+="&search="+page}var get_data=api.tools.make_request(url);get_data=get_data.substring(get_data.indexOf("["),get_data.length);get_data="api.tracker.view_data = "+get_data;eval(get_data);var emails=[];for(i in api.tracker.view_data){var cdata=api.tools.parse_view_data(api.tracker.view_data[i]);if(cdata.length>0){$.merge(emails,cdata)}}return emails};api.get.current_page=function(){var e=window.location.hash.split("#").pop();var t=["sent","inbox","starred","drafts","imp","chats","all","spam","trash"];var n=null;if($.inArray(e,t)>-1){n=e}if(e.indexOf("label/")==0||e.indexOf("category/")==0||e.indexOf("search/")==0){n=e}return n};api.tools.parse_email_data=function(e){var t={};var n={};for(i in e){var r=e[i];if(r[0]=="cs"){t.first_email=r[1];t.last_email=r[2];t.total_emails=r[3];t.total_threads=r[8];t.people_involved=r[15];t.subject=r[23]}if(r[0]=="ms"){if(t.threads==undefined){t.threads={}}t.threads[r[1]]={};t.threads[r[1]].reply_to_id=r[2];t.threads[r[1]].from=r[5];t.threads[r[1]].from_email=r[6];t.threads[r[1]].timestamp=r[7];t.threads[r[1]].datetime=r[24];t.threads[r[1]].content_plain=r[8];t.threads[r[1]].subject=r[12];t.threads[r[1]].content_html=r[13]!=undefined?r[13][6]:r[8]}}return t};api.get.email_data=function(){if(api.check.is_inside_email()){var url=window.location.origin+window.location.pathname+"?ui=2&ik="+api.tracker.ik+"&rid="+api.tracker.rid+"&view=cv&th="+api.get.email_id()+"&msgs=&mb=0&rt=1&search=inbox";var get_data=api.tools.make_request(url);get_data=get_data.substring(get_data.indexOf("["),get_data.length);get_data="var cdata = "+get_data;eval(get_data);api.tracker.email_data=cdata[0];return api.tools.parse_email_data(api.tracker.email_data)}return{}};return api}
