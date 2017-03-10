
const request = require('supertest');
const App = require('../server/index');

const mockUser = function() {

}
mockUser.prototype.createUser = function(body) {
    console.log(body);
}

const context  = {
    logger: {
        log(msg) {
            console.log('log from app' + msg);
        }
    },
    User: mockUser,
}

const app = App(context);

describe('Authentication test', () => {
    it('should POST /auth/register can create user', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                password: 'Test1',
                email: 'Test@test.com'
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect((response) => {
                console.log(response.body);
            })
    })
})
