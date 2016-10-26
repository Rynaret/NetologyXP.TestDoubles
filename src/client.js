'use strict';


export function Client() {
    var totalyDrunked = 0;
    this.drink = function(volume) {
        totalyDrunked += volume;
        return volume;
    };

    this.sober = function() {
        totalyDrunked = 0;
    };

    this.drunken = function() {
        totalyDrunked = 150;
    };

    this.isDrunken = function() {
        return totalyDrunked > 150;
    };

    this.getTotallyDrunken = function() {
        return totalyDrunked;
    };
}
