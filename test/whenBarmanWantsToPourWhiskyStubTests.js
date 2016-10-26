import assert from 'assert'
import { Barman } from '../src/barmen'
import { Client} from '../src/client'


suite('Stub: when client ask 200 grams of whisky', function () {
    let client = new Client();
    const alcohol = 'whisky';
    setup(function () {
        client.sober();
    });

    suite('barman has enough', function () {
        const cupBoardStub = {
            hasDrink: function () {
                return true;
            },
            getDrink: function () {
                return 200;
            }
        };
        let barman = new Barman(cupBoardStub);
        test('client get 200 grams', function () {
            const askValue = 200;

            let result = barman.pour(alcohol, askValue, client);

            assert.equal(askValue, result);
        })
    });

    suite('no whisky in bar', function () {
        const cupBoardStub = {
            hasDrink: function () {
                return false;
            },
            getDrink: function () {
                return 200;
            }
        };
        let barman = new Barman(cupBoardStub);
        test('client hears: Not enough whisky', function () {
            const askValue = 200;

            let action = function(){
                barman.pour(alcohol, askValue, client);
            };

            assert.throws(function(){action()}, 'Not enough whisky');
        })
    });


});

suite('Stub: when client is 100 visitor today', function () {
    let client = new Client();
    setup(function () {
        client.sober();
        client.number = 100;
    });
    suite('ask 100 grams whisky', function () {
        const alcohol = 'whisky';
        const cupBoardStub = {
            hasDrink: function () {
                return true;
            },
            getDrink: function () {
                return 100;
            }
        };
        let barman = new Barman(cupBoardStub);
        test('client get 100 grams for free', function () {
            const forFree = true;
            const askValue = 100;

            let volumeInGlass = barman.pour(alcohol, askValue, client, forFree);

            assert.equal(askValue, volumeInGlass);
        })
    });
});