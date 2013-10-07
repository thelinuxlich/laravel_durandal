define(['plugins/router','durandal/system'],
    function(router,system){
        var ctor = function() {
            this.form = null;
            var link = router.activeInstruction();
            var resource = link.fragment.split("/")[0];
            this.activate = function(id) {
                var that = this;
                return system.defer(function(dfd){
                    require(['viewmodels/'+resource+'/form'], function(Form){
                        that.form = new Form();
                        that.form.resource = resource;
                        that.form.id = id;
                        dfd.resolve();
                    });
                }).promise();
            };
        };
        return ctor;
    }
);