var chakram = require('chakram'),
    env = require('./../../../utils/env');

expect = chakram.expect;

describe("DHIS2 API - Maintenance Module - Data Element", function () {
    describe("Get Data Element", function () {
        it("should get a list od Data Elements with with the word anaemia in the name", function () {
            var response = chakram.get(env.url + "/api/23/dataElements", env.auth);
            expect(response).to.have.status(200);
            expect(response).to.have.json('importCount.imported', 1);
            return chakram.wait();
        });
    });
});