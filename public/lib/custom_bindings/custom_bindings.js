ko.bindingHandlers["mask"] = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var mask = ko.utils.unwrapObservable(valueAccessor());
        $.mask.rules["b"] = /[a-zA-z\sçÇáÁàÀãÃéÉèÈíÍìÌóÓòÒõÕúÚùÙüÜ]/;
        $.mask.rules["c"] = /[0-9a-zA-Z\-\/\.]/;
        if(mask == 'alpha') {
            $(element).setMask({mask: 'b',type: 'repeat'});
        }
    }
};