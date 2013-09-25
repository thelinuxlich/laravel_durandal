define(['plugins/router','durandal/system'],
    function(router,system){
        var link = router.activeInstruction();
        var resource = link.fragment.split("/")[0];
        return {
            form: null,
            activate: function(id) {
                var that = this;
                return system.defer(function(dfd){
                    require(['viewmodels/'+resource+'/form'], function(Form){
                        that.form = new Form(id);
                        dfd.resolve();
                    });
                }).promise();
            }
        };
    }
);