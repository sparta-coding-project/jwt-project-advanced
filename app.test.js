import app from "./app.js";
import request from "supertest";

describe("GET /api/login", () => {
  test("token", async(done) => {
    const res = await request(app).get("/api/login").send({
      id: "ryu",
      password: "123456",
    })
    const accessToken = await res._body.accessToken;
    console.log(accessToken)
    const userInfoRes = await request(app).get('/api/user').set('Cookie',[`accessToken=${accessToken}`]);
    const userInfo = JSON.parse(userInfoRes.text)
    
  }, 1000);
});
