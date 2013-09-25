define(['durandal/app','plugins/router'],
function(app,router){
    var Form = function(id) {
        this.obj = {};
        this.id = id;
        this.resource = router.activeInstruction().fragment.split("/")[0];
        this.submit = function(element) {
            var that = this;
            if($(element).jqBootstrapValidation("hasErrors")) {
                return false;
            } else {
                var submit = $(element).find("button[type=submit]");
                submit.button("loading");
                $.post(that.resource+"/"+(!!that.id ? "update/"+that.id : "create"),ko.toJS(that.obj))
                    .done(function(r) {
                        if(r.status) {
                            router.navigate(that.resource);
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
        var url = !!that.id ? that.resource+"/show/"+that.id : that.resource+"/new";
        return $.get(url).then(function(r){
            for(var i in r) {
                that.obj[i] = ko.observable(r[i]);
            }
        });
    };

    Form.prototype.compositionComplete = function() {
        $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    };

    return Form;
});