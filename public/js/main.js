requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'durandal':'../lib/durandal/js',
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});

define('jquery', [], function () { return jQuery; });
define('knockout', [], function () { return ko; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],
function(system, app, viewLocator){
    ko.punches.interpolationMarkup.enable();
    system.debug(false);
    app.title = 'Repensadores';
    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });
    app.start().then(function() {
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell');
    });
});
