define([], function () {
    var F = function () { };
    var inherit = function (C, P) {
        F.prototype = P.prototype;
        C.prototype = new F();
        C.prototype.constructor = C;
    };
    return inherit;
});