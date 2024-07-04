import request from 'supertest'
import { server, app } from '../../../src/index'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /api/history/:ocurrence', () => {

    
    afterAll(() => {
        server.close()
    })

    test('Debe devolver status 200 y eventos ordenados con date <= 0 para "ac"', async () => {
        const response = await request(app.callback()).get('/api/history/ac');
        expect(response.status).toBe(200); 
        expect(Array.isArray(response.body)).toBeTruthy();
        response.body.forEach(event => {
            expect(parseInt(event.date)).toBeLessThanOrEqual(0);
        });
        for (let i = 0; i < response.body.length - 1; i++) {
            expect(parseInt(response.body[i].date)).toBeLessThanOrEqual(parseInt(response.body[i + 1].date));
        }
    });
    

    test('Debe devolver status 200 y eventos ordenados con date > 0 para "dc"', async () => {
        const response = await request(app.callback()).get('/api/history/dc');
        expect(response.status).toBe(200); 
        expect(Array.isArray(response.body)).toBeTruthy();
        response.body.forEach(event => {
            expect(parseInt(event.date)).toBeGreaterThan(0);
        });
        for (let i = 0; i < response.body.length - 1; i++) {
            expect(parseInt(response.body[i].date)).toBeLessThanOrEqual(parseInt(response.body[i+1].date));
        }
    });


    test('Debe devolver status 400 y message "Solo se aceptan caracteres no numericos" ', async () => {
        const response = await request(app.callback()).get('/api/history/12')
        expect(response.status).toBe(400)
        expect(response.body.message).toEqual("Solo se aceptan caracteres no numericos")
    })


    test('Debe devolver status 400 y message "El input debe ser ac o dc"', async () => {
        const response = await request(app.callback()).get('/api/history/a')
        expect(response.status).toBe(400)
        expect(response.body.message).toEqual("El input debe ser ac o dc")
    })

    test('Debe devolver status 400 y message "Input no valido"', async () => {
        const response = await request(app.callback()).get('/api/history/ab')
        expect(response.status).toBe(400)
        expect(response.body.message).toEqual("Input no valido")
    })

})
