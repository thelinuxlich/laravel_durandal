define(['durandal/app','plugins/router'],
function(app,router){
    var Form = function(id) {
        this.obj = {};
        this.id = id;
        this.roles = [];
        this.resource = router.activeInstruction().fragment.split("/")[0];
        this.submit = function(element) {
            var that = this;
            if(!$(element).valid()) {
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
            that.roles = r["data"];
            var url = !!that.id ? that.resource+"/show/"+that.id : that.resource+"/new";
            return $.get(url).then(function(u){
                that.caption = u.caption;
                for(var i in u["data"]) {
                    that.obj[i] = ko.observable(u["data"][i]);
                }
            });
        });
    };

    Form.prototype.compositionComplete = function() {
        $('form').validate({
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function(error, element) {
                if(element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });
    };

    return Form;
});