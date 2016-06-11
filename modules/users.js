var chakram = require('chakram'),
    data = require('./../data/users'),
    env = require('./../utils/env');
expect = chakram.expect;

describe("DHIS2 API - User Module", function () {
    describe("Create User", function () {
        // TODO: the second time the test is executed it fails. Delete user if user exists before create?
        it("should create a new User", function () {
            var response = chakram.post(env.url + "/api/users", data.testUser, env.auth);

            expect(response).to.have.status(200);
            expect(response).not.to.have.header('non-existing-header');
            expect(response).to.have.json('importCount.imported', 1);
            return chakram.wait();
        });
    });

    describe("Delete User", function () {
        var response;

        before(function () {
            response = chakram.get(env.url + "/api/users?query=paulo", env.auth);
            return response;
        });

        it("should delete an existent User", function () {
            expect(response).to.have.status(200);
            expect(response).to.have.json('pager.total', 1);
            expect(response).to.have.json('users[0].displayName', data.testUser.firstName + " " + data.testUser.surname);

            expect(response).to.have.json(function (json) {
                expect(chakram.delete(env.url + "/api/users/" + json.users[0].id, null, env.auth)).to.have.status(200);
                return chakram.wait();
            });
            return chakram.wait();
        });

        it("should return 404 - Not Found, when deleting a User that doesn't exist", function () {
            expect(chakram.delete(env.url + "/api/users/invalidID", null, env.auth)).to.have.status(404);
            return chakram.wait();
        });
    })
});