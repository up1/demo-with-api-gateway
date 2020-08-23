const nock = require("nock");
const API_PORT = 80;
const getAllUser = require("../user.gateway");
const API_HOST = `http://somkiat.cc:${API_PORT}`;

describe("Call service", () => {
  it("Check response from /users", async () => {
    // Mock server
    nock(API_HOST)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/users")
      .reply(200, [{}, {}]);

    // Verify
    const response = await getAllUser();
    expect(response.data.length).toEqual(2);
  });

  it("Fail 404 /users", async () => {
    // Mock server
    nock(API_HOST)
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/users")
      .reply(404);

    // Verify
    const response = await getAllUser();
    expect(response.code).toEqual(500);
  });
});
