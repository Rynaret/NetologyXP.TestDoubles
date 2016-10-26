'use strict';

module.exports= {
    Barman: function(cupboard, phone){
        this.maxFreeVolume = function(drinkName){
          return drinkName === 'tequila' ? 50 : 100;
        };

        this.pour = function(drinkName, volume, client) {
            if (volume < 0) {
                throw new Error('Invalid volume of whisky');
            }

            if(client.isDrunken()){
                return 0;
            }

            if(!cupboard.hasDrink(drinkName, volume)){
                phone.sendSms(`Need more ${drinkName}`);
                throw new Error('Not enough ' + drinkName);
            }

            return cupboard.getDrink(drinkName, volume);
        };

        this.pourForFree = function(drinkName, volume, client) {

            if(client.number !== 100){
                throw new Error('Client is not 100 visitor today');
            }

            if (volume < 0) {
                throw new Error('Invalid volume of whisky');
            }

            if(client.isDrunken()){
                return 0;
            }

            if(!cupboard.hasDrink(drinkName, volume)){
                phone.sendSms(`Need more ${drinkName}`);
                throw new Error('Not enough ' + drinkName);
            }

            if(volume > this.maxFreeVolume(drinkName)){
                let volumeInGlass = this.pour(drinkName, volume - this.maxFreeVolume(drinkName), client);
                let volumeInGlassForFree = cupboard.getDrink(drinkName, this.maxFreeVolume(drinkName));
                return {volumeInGlass:volumeInGlass,volumeInGlassForFree:volumeInGlassForFree};
            }

            if(drinkName === 'tequila'){
                return cupboard.getDrink(drinkName, this.maxFreeVolume(drinkName));
            }

            return cupboard.getDrink(drinkName, volume);
        };
    }};