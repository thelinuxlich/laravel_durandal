define(['viewmodels/generic/form','plugins/router'],
function(Form,router){
    var ctor = function() {
        this.resources = [{id: "users",name: "Usuários"},
            {id: "roles",name: "Níveis"},
            {id: "permissions",name: "Permissões"}];
        this.activate = function() {
            var that = this;
            return $.get("roles").then(function(r){
                that.roles = r["data"];
                var url = that.resource+(!!that.id ? "/show/"+that.id : "/new");
                return $.get(url).then(function(p){
                    that.caption = p.caption;
                    for(var i in p["data"]) {
                        that.obj[i] = ko.observable(p["data"][i]);
                    }
                });
            });
        };
    };

    Form.create(ctor);
    return ctor;
});