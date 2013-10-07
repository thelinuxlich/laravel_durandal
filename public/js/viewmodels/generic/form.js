define(['durandal/app','plugins/router','viewmodels/generic/inherit'],
function(app,router,inherit){
    function Form() { }

    Form.prototype.obj = {};
    Form.prototype.id = null;
    Form.prototype.caption = "";
    Form.prototype.submit = function(element) {
        var that = this;
        if(!$(element).valid()) {
            return false;
        } else {
            var submit = $(element).find("button[type=submit]");
            submit.button("loading");
            $.post(that.resource+(!!that.id ? "/update/"+that.id : "/create"),ko.toJS(that.obj))
                .done(function(r) {
                    if(r.status) {
                        router.navigate(that.resource);
                        app.trigger("flash",{type: "success", msg: r.msg});
                    } else {
                        app.showMessage(r.msg);
                    }
                    submit.button("reset");
            });
        }
    };

    Form.prototype.activate = function() {
        var that = this;
        that.obj = {};
        var url = that.resource + (!!that.id ? "/show/"+that.id : "/new");
        return $.get(url).then(function(r){
            that.caption = r.caption;
            for(var i in r["data"]) {
                that.obj[i] = ko.observable(r["data"][i]);
            }
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

        $(".editor").summernote({height: 500});
    };

    function create(ctor) {
        return inherit(ctor, Form);
    }

    return {create: create};
});