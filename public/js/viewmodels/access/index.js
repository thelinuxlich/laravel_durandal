define(['durandal/app','plugins/router','./customModal'],function (app,router,CustomModal) {
    return {
        email: ko.observable(""),
        password: ko.observable(""),
        title: app.title,
        forgotPassword: function() {
            CustomModal.show().then(function(response) {
                $.post("account/password",{email: response}).then(function(r){
                    app.showMessage(r.msg);
                });
            });
        },
        submit: function() {
            var that = this;
            $.post("account/login",{email: that.email(),password: that.password()}).then(function(r){
                if(r.status) {
                    app.trigger("flash",{type: "success", msg: r.msg});
                    app.trigger("loadPermissions",r.permissions);
                    app.trigger("username",r.username);
                    router.navigate("");
                } else {
                    app.trigger("flashNow",{type: "error", msg: r.msg});
                }
            });
        }
    };
});