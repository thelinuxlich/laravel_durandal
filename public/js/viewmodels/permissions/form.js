define(['durandal/app','plugins/router'],
function(app,router){
    var Form = function(id) {
        this.obj = {};
        this.id = id;
        this.roles = [];
        this.resource = router.activeInstruction().fragment.split("/")[0];
        this.resources = [
            {id: "users",name: "Usuários"},
            {id: "roles",name: "Níveis"},
            {id: "permissions",name: "Permissões"}
        ];
        this.submit = function(element) {
            var that = this;
            if($(element).jqBootstrapValidation("hasErrors")) {
                return false;
            } else {
                var submit = $(element).find("button[type=submit]");
                submit.button("loading");
                $.post("permissions/"+(!!that.id ? "update/"+that.id : "create"),ko.toJS(that.obj))
                    .done(function(r) {
                        if(r.status) {
                            router.navigate('permissions');
                            app.trigger("flash",{type: "success", msg: r.msg});
                            submit.button("reset");
                        } else {
                            app.showMessage(r.msg);
                            submit.button("reset");
                        }
                });
            }
        };
    };

    Form.prototype.activate = function() {
        var that = this;
        return $.get("roles").then(function(r){
            that.roles = r;
            var url = !!that.id ? "permissions/show/"+that.id : "permissions/new";
            return $.get("url").then(function(p){
                for(var i in p) {
                    that.obj[i] = ko.observable(r[i]);
                }
            });
        });
    };

    Form.prototype.compositionComplete = function() {
        $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    };

    return Form;
});