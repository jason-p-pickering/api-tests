var chakram = require('chakram'),
    data = require('./../../data/users'),
    env = require('./../../utils/env'),
    utils = require('./../../utils/utils');

expect = chakram.expect;

describe("DHIS2 API - Users Module", function () {
    describe("Create User", function () {
        // TODO: the second time the test is executed it fails. Delete user if user exists before create?
        it("should create a new User", function () {
            this.timeout(10000); // Error: timeout of 2000ms exceeded
            var response = chakram.post(env.url + "/api/users", data.testUser, env.auth);

            expect(response).to.have.status(200);
            expect(response).not.to.have.header('non-existing-header');
            expect(response).to.have.json('importCount.imported', 1);
            return chakram.wait();
        });
    });

    describe("Authenticate User", function () {
        it("should authenticate previously created User, correct credentials", function () {
            var response = chakram.get(env.url + "/api/me", utils.buildParams(data.testUser));
            expect(response).to.have.status(200);
            return chakram.wait();
        });
    });

    describe("Update User", function () {
        var response;

        before(function () {
            response = chakram.get(env.url + "/api/users?query=paulo", env.auth);
            return response;
        });

        it("should be possible to update the password with a new valid password", function () {
            expect(response).to.have.status(200);
            expect(response).to.have.json('pager.total', 1);
            expect(response).to.have.json('users[0].displayName', 'Paulo Grácio');

            expect(response).to.have.json(function (json) {

                var updateResponse = chakram.put(env.url + "/api/users/" + json.users[0].id, data.testUserUpdated, env.auth);

                expect(updateResponse).to.have.status(200);
                expect(updateResponse).not.to.have.header('non-existing-header');
                expect(updateResponse).to.have.json('importCount.updated', 1);

                return chakram.wait();
            });
            return chakram.wait();
        });
    });

    describe("Authenticate User", function () {
        it("should authenticate updated User using new credentials", function () {
            var response = chakram.get(env.url + "/api/me", utils.buildParams(data.testUserUpdated));
            expect(response).to.have.status(200);
            return chakram.wait();
        });

        it("should fail authentication for updated User using old credentials", function () {
            var response = chakram.get(env.url + "/api/me", utils.buildParams(data.testUser));
            expect(response).to.have.status(401);
            expect(response).to.have.header("content-type", "text/html;charset=utf-8");
            return chakram.wait();
        });
    });

    describe("Update User", function () {
        var response;

        before(function () {
            response = chakram.get(env.url + "/api/users?query=pgracio", env.auth);
            return response;
        });

        it("should not be possible to update the password with an invalid password (less than 8 characters).", function () {
            this.timeout(10000); // Error: timeout of 2000ms exceeded
            expect(response).to.have.status(200);
            expect(response).to.have.json('pager.total', 1);

            expect(response).to.have.json(function (json) {
                var updateResponse = chakram.put(env.url + "/api/users/" + json.users[0].id, data.testUserInvalidPassword, env.auth);

                expect(updateResponse).to.have.status(200);
                expect(updateResponse).not.to.have.header('non-existing-header');
                expect(updateResponse).to.have.json('importCount.updated', 1);

                return chakram.wait();
            });
            return chakram.wait();
        });
    });

    describe("Delete User", function () {
        var response;

        before(function () {
            response = chakram.get(env.url + "/api/users?query=paulo", env.auth);
        });

        it("should delete an existent User", function () {
            expect(response).to.have.status(200);
            expect(response).to.have.json('pager.total', 1);
            expect(response).to.have.json('users[0].displayName', data.testUserUpdated.firstName + " " + data.testUserUpdated.surname);

            expect(response).to.have.json(function (json) {
                expect(chakram.delete(env.url + "/api/users/" + json.users[0].id, null, env.auth)).to.have.status(204);
                return chakram.wait();
            });
            return chakram.wait();
        });

        it("should return 404 - Not Found, when deleting a User that doesn't exist", function () {
            expect(chakram.delete(env.url + "/api/users/invalidID", null, env.auth)).to.have.status(404);
            return chakram.wait();
        });
    });

    describe("Delete Admin User", function () {
        var response;

        before(function () {
            response = chakram.get(env.url + "/api/users?query=system", env.auth);
        });

        it("should delete the user", function () {
            expect(response).to.have.status(200);
            expect(response).to.have.json('pager.total', 1);

            expect(response).to.have.json(function (json) {
                expect(chakram.delete(env.url + "/api/users/" + json.users[0].id, null, env.auth)).to.have.status(500);
                return chakram.wait();
            });
            return chakram.wait();
        });
    })
});
