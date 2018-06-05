let ut = require('../__tests__/usersReducerTests');

console.log(ut)
describe('Tests for the users Reducer', () => {
    test('get_user should create the correct action object', () => {
        let flag = true;
        let paul = {
            userid: 1,
            authid: 'spotify',
            profile_pic: 'nice pic bro',
            username: 'Paul',
            access_token: 'aCcEsS',
            refresh_token: 'ReFrEsH',
            is_premium: false
        };
        let expectedAction = ut.get_user(paul);

        if(typeof expectedAction !== Object) {
            flag = false;
        }

        if(!expectedAction.hasOwnProperty('type')) {
            flag = false;
        }

        if(!expectedAction.hasOwnProperty('payload')) {
            flag = false;
        }

        expect(flag).toBeTruthy()
    })

})