import assert from 'assert'
import { Barman } from '../src/barmen'
import { Client} from '../src/client'
import { Cupboard} from '../src/cupboard'


suite('when client ask 200 grams of whisky', function () {
    var client = new Client();
    let drinkName = 'whisky';
    setup(function () {
        client.sober();
    });

    /*Bad tests with dependency*/
    suite('barman has enough', function () {
        var barman = new Barman(new Cupboard());
        test('barman pour 200 grams of whisky', function () {

            var clientAskVolume = 200;

            var volumeInGlass = barman.pour(drinkName, clientAskVolume, client);

            assert.equal(clientAskVolume, volumeInGlass);
        });


        test('barman refuse client because he is drunken ', function() {
            var first = barman.pour(drinkName, 200, client);
            client.drink(first);

            var second = barman.pour(drinkName, 50, client);

            assert.equal(0, second);
        });
    });

});