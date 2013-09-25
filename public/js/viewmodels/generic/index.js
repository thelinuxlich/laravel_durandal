define(['viewmodels/generic/table','plugins/router'],
function (Table,router) {
    var Page = function() {
        this.table = "";
        this.new_button_name = "";
        this.resource = "";
    };

    Page.prototype.attached = function() {
        Table.initializeTable(this.resource);
    };

    Page.prototype.activate = function() {
        var that = this;
        that.resource = router.activeInstruction().fragment.split("/")[0];
        return $.get(this.resource).then(function(r){
            var table = new Table(r.data,r.fields,r.actions);
            that.table = table.html;
            that.new_button_name = r.new_button_name;
        });
    };

    return Page;
});