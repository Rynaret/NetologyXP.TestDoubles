'use strict';

module.exports= {
    Barman: function(cupboard, phone){
        this.pour = function(drinkName, volume, client, forFree) {
            if (volume < 0) {
                throw new Error('Invalid volume of whisky');
            }

            if(client.isDrunken()){
                return 0;
            }

            if(!cupboard.hasDrink(drinkName, volume)){
                phone.sendSms(`Need more ${drinkName}`)
                throw new Error('Not enough ' + drinkName);
            }

            if(forFree){
                return cupboard.getDrink(drinkName, volume);
            }

            return cupboard.getDrink(drinkName, volume);
        };


    }};