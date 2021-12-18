import {Server} from "../models"
import request from "supertest"

describe('GET /getUsuarios', () => {
    test('Should respond with a 200 status code', async()=>{
	const response = await request(Server).get('/getUsuarios')
	console.log(response)
    })
});
