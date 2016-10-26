import assert from 'assert'
import sinon from 'sinon'
import { Barman } from '../src/barmen'
import { Client} from '../src/client'
import { Cupboard} from '../src/cupboard'
import { Phone} from '../src/phone'


suite('Mock: when client ask 200 grams of whisky', function () {
    let client = new Client();
    setup(function () {
        client.sober();
    });

    suite('barman has enough', function () {
        let barman;
        let cupboard;
        let cupboardMock;
        setup(() => {
            cupboard = new Cupboard();
            cupboardMock = sinon.mock(cupboard);
            barman = new Barman(cupboard);
        });
        test('client get 200 grams', function () {
            const askValue = 200;
            const alcohol = 'whisky';

            cupboardMock.expects('hasDrink').once().returns(true);
            cupboardMock.expects('getDrink').once().returns(200);

            let result = barman.pour(alcohol, askValue, client);

            assert.equal(askValue, result);

            cupboardMock.restore();
            cupboardMock.verify();
        });
    });

    suite('no whisky in bar', function () {
        let barman;
        let phone;
        let phoneMock;
        let cupboard = {
            hasDrink: () => {
                return false;
            }
        };
        setup(() => {
            phone = new Phone();
            phoneMock = sinon.mock(phone);
            barman = new Barman(cupboard, phone);
        });
        test('barman send SMS to the boss', function () {
            const alcohol = 'whisky';
            const askValue = 200;

            phoneMock.expects('sendSms').withArgs(`Need more ${alcohol}`).once();

            let action = function(){barman.pour(alcohol, askValue, client);};

            assert.throws(function(){action()}, 'Not enough whisky');
        });
    });
});
