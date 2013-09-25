define(['plugins/dialog'], function (dialog) {

    var CustomModal = function() {
        this.input = ko.observable('');
    };

    CustomModal.prototype.ok = function() {
        dialog.close(this, this.input());
    };

    CustomModal.show = function(){
        return dialog.show(new CustomModal());
    };

    return CustomModal;
});