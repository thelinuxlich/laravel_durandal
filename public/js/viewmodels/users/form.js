define(['durandal/app','plugins/router'],
function(app,router){
    var Form = function(id) {
        this.obj = {};
        this.id = id;
        this.roles = [];
        this.resource = router.activeInstruction().fragment.split("/")[0];
        this.submit = function(element) {
            var that = this;
            if($(element).jqBootstrapValidation("hasErrors")) {
                return false;
            } else {
                var submit = $(element).find("button[type=submit]");
                submit.button("loading");
                if(!!that.id && !!that.obj.avatar()) {
                    that.obj.avatar($("#avatar").val());
                }
                $(element).ajaxSubmit({url: that.resource+"/"+(!!that.id ? "update/"+that.id : "create"),dataType: 'json',iframe: true,
                    success: function(r) {
                        if(r.status) {
                            router.navigate(that.resource);
                            app.trigger("flash",{type: "success", msg: r.msg});
                            submit.button("reset");
                        } else {
                            app.showMessage(r.msg);
                            submit.button("reset");
                        }
                    }
                });
            }
        };
    };

    Form.prototype.activate = function() {
        var that = this;
        return $.get("roles").then(function(r){
            that.roles = r;
            var url = !!that.id ? that.resource+"/show/"+that.id : that.resource+"/new";
            return $.get(url).then(function(u){
                for(var i in u) {
                    that.obj[i] = ko.observable(u[i]);
                }
            });
        });
    };

    Form.prototype.compositionComplete = function() {
        $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    };

    return Form;
});