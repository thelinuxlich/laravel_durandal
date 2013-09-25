define(['plugins/router','durandal/app'],
function (router,app){
    return {
        router: router,
        title: app.title,
        username: ko.observable(),
        flash: ko.observable({msg: null,type: null}),
        logged: ko.observable(false),
        permissions: ko.observableArray([]),
        can: function(action_type,resource) {
            var p = ko.utils.arrayFirst(this.permissions(),function(item){
                return item.resource == resource;
            });
            if(!!p) {
                return(p["action_"+action_type] == 1);
            } else {
                return false;
            }
        },
        closeFlash: function() {
            $("#flash").hide();
        },
        logoff: function() {
            var that = this;
            $.post("account/logoff").then(function(r) {
                that.logged(false);
                app.trigger('flash',{type: "success",msg: "Você desconectou do sistema."});
                that.router.navigate("#access");
            });
        },
        isActive: function(resource) {
            var link = this.router.activeInstruction();
            return link.fragment.match(resource+"/") !== null;
        },
        activate: function () {
            var that = this;
            app.on('flash').then(function(obj){
                that.flash().msg = obj.msg;
                that.flash().type = obj.type;
            });
            app.on('flashNow').then(function(obj){
                that.flash({msg: obj.msg,type: obj.type});
            });
            app.on("username").then(function(name){
                that.username(name);
            });
            app.on("loadPermissions").then(function(obj){
                that.permissions(obj);
            });
            router.on("router:navigation:complete",function() {
                that.flash.valueHasMutated();
                that.flash().msg = null;
                that.flash().type = null;
            });
            router.guardRoute = function(routeInfo, params, instance) {
                if(routeInfo["__moduleId__"] !== "viewmodels/access/index") {
                    var routeArray = params.fragment.split("/");
                    var action = routeArray.length == 1 ? "index" : routeArray[1];
                    return $.get("account/session",{resource: routeArray[0],action: action}).then(function(r){
                        if(r.status) {
                            that.logged(true);
                            that.username(r.username);
                            that.permissions(r.permissions);
                            return r.authorized;
                        } else {
                            return "#access";
                        }
                    });
                } else {
                    return true;
                }
            };
            router.map([
                { route: '', moduleId: 'viewmodels/main/index', title: 'Início', nav: true },
                { route: 'users', moduleId: 'viewmodels/generic/index', title: 'Usuários', nav: true },
                { route: 'users/new', moduleId: 'viewmodels/generic/action', title: 'Novo Usuário', nav: true},
                { route: 'users/edit/:id', moduleId: 'viewmodels/generic/action', title: 'Editar Usuário', nav: true},
                { route: 'roles', moduleId: 'viewmodels/generic/index', title: 'Níveis', nav: true },
                { route: 'roles/new', moduleId: 'viewmodels/generic/action', title: 'Novo Nível', nav: true},
                { route: 'roles/edit/:id', moduleId: 'viewmodels/generic/action', title: 'Editar Nível', nav: true},
                { route: 'permissions', moduleId: 'viewmodels/generic/index', title: 'Permissões', nav: true },
                { route: 'permissions/new', moduleId: 'viewmodels/generic/action', title: 'Nova Permissão', nav: true},
                { route: 'permissions/edit/:id', moduleId: 'viewmodels/generic/action', title: 'Editar Permissão', nav: true},
                { route: 'access', moduleId: 'viewmodels/access/index', title: 'Acesso ao Sistema', nav: true},
                { route: '404', moduleId: 'viewmodels/404/index', title: 'Página não encontrada', nav: true}
            ]).buildNavigationModel().mapUnknownRoutes("viewmodels/404/index").activate();
        }
    };
});
