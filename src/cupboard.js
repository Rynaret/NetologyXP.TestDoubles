'use strict';

module.exports= {
    Cupboard: function(){
        this.isOpen = function(){
            /**/
            return true;
        };

        this.hasDrink = function(drinkName, volume) {
            /* Предположим что здесь мы ходим в базу данных*/
            return true;
        };

        this.getDrink = function(drinkName, volume) {
            /* Предположим что здесь мы ходим в базу данных*/
            return volume;
        };

    }};