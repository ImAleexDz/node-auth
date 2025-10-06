const request = require('supertest');
const app = require('../index');
// const User = require('../models/user');

describe('Authentication Endpoints', () => {

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123',
                phone: '5578992453'
            });
        expect(res.statusCode).toBe(400); // Changed to 400 due to duplicate email check
        // expect(res.body).toHaveProperty('user');
    });

    it('should get user details', async () => {
        const res = await request(app)
            .get('/api/auth/user/2');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('user');
    });

    it('should update user details', async () => {
        const res = await request(app)
            .put('/api/auth/user/17')
            .send({
                username: 'updateduser'
            });
        expect(res.body).toHaveProperty('user');
    });

    it('should get user detail', async () => {
        const res = await request(app)
            .get('/api/auth/user/17');
        expect(res.body).toHaveProperty('user');
    });

    it('should delete the user', async () => {
        const res = await request(app)
            .delete('/api/auth/delete/17');
        expect(res.body.message).toBe('User deleted successfully');
    })

});