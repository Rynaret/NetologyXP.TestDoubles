/**
 * Created by 1 on 18.10.2016.
 */
import assert from 'assert'
import { Barman } from '../src/barmen'
import { Client} from '../src/client'


suite('Fake: when client ask 200 grams of whisky', function () {
    let client = new Client();
    setup(function () {
        client.sober();
    });

    let cupboardFake = {
        hasDrink: (drinkName) => {
            return drinkName === 'whisky';
        },
        getDrink: (drinkName, value) => {
            return drinkName === 'whisky' ? value : 0;
        },
    }

    suite('barman has enough', function () {
        let barman = new Barman(cupboardFake);
        test('client get 200 grams', ()=>{
            const alcohol = 'whisky';
            const askValue = 200;

            let result = barman.pour(alcohol, askValue, client);

            assert.equal(askValue, result);
        });
    });

    suite('no tequila in bar', function () {
        let phoneStub = {
          send: (msg)=>{}
        };
        let barman = new Barman(cupboardFake, phoneStub);
        test('client hears: Not enough whisky', () => {
            const alcohol = 'tequila';
            const askValue = 200;

            let action = () => {barman.pour(alcohol, askValue, client)};

            assert.throws(() => {action()}, 'Not enough whisky');
        });
    });

});