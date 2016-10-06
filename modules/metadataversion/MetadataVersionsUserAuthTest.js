var chakram = require('chakram'),
    env = require('../../utils/env'),
    data = require('../../data/metadataversion/MetadataVersionsUserAuthData'),
    userData = require('../../data/models/users/UserData'),
    expect = chakram.expect,
    usersApiUrl = env.url + env.api + env.version + "users/",
    userRolesApiUrl = env.url + env.api + env.version + "userRoles/",
    mdSyncApiUrl = env.url + env.api + env.version + "metadata/sync?versionName=Version_1",
    createVersionapiUrl = env.url + env.api + env.version + "metadata/version/create?type=ATOMIC",
    downloadDataApiUrl = env.url + env.api + env.version + "metadata/version/Version_1/data",
    downloadDataGzApiUrl = env.url + env.api + env.version + "metadata/version/Version_1/data.gz";

//TODO : Reword the test case description.
describe("accesing versioning API with different user authorities", function () {
before("creating user roles with all authority, MD sync authority, No MD sync authority and users for respective authorities ", function () {
            console.log(" Creating users and user roles");
            expect(chakram.post(userRolesApiUrl, userData.superUserRole, env.properRequestParams)).to.have.status(200);
            expect(chakram.post(userRolesApiUrl, userData.noMdSyncUserRole, env.properRequestParams)).to.have.status(200);
            expect(chakram.post(userRolesApiUrl, userData.mdSyncUserRole, env.properRequestParams)).to.have.status(200);
            expect(chakram.post(usersApiUrl, userData.godUser, env.properRequestParams)).to.have.status(200);
            expect(chakram.post(usersApiUrl, userData.mdUser, env.properRequestParams)).to.have.status(200);
            expect(chakram.post(usersApiUrl, userData.noMdUser, env.properRequestParams)).to.have.status(200);
            return chakram.wait();
        });
 after("deleting user roles and users created", function () {
            expect(chakram.delete(usersApiUrl + userData.godUser.id, {}, env.properRequestParams)).to.have.status(204)
            .then(function () {
            expect(chakram.delete(userRolesApiUrl + userData.superUserRole.id, {}, env.properRequestParams)).to.have.status(204);
            });
            expect(chakram.delete(usersApiUrl + userData.mdUser.id, {}, env.properRequestParams)).to.have.status(204)
            .then(function () {
            expect(chakram.delete(userRolesApiUrl + userData.mdSyncUserRole.id, {}, env.properRequestParams)).to.have.status(204);
            });
            expect(chakram.delete(usersApiUrl + userData.noMdUser.id, {}, env.properRequestParams)).to.have.status(204)
            .then(function () {
            expect(chakram.delete(userRolesApiUrl + userData.noMdSyncUserRole.id, {}, env.properRequestParams)).to.have.status(204);
           });
return chakram.wait();

});

    describe("create version api with different types of users being used for authorization", function () {
        it("should return 403 httpstatus code  when the authorizing user does not have 'metadata handle' or 'all' authority  while trying to create a version", function () {
            var response = chakram.post(createVersionapiUrl, {}, data.noMdUserAuth);
            expect(response).to.have.status(403);
            return chakram.wait();
        });
        it("should return 200 status code when the authorizing user have 'metadata handle' authority while trying to create a version", function () {
            var response = chakram.post(createVersionapiUrl, {}, data.mdUserAuth);
            expect(response).to.have.status(200);
            return chakram.wait();
        });
        it("should return 200 status code when the authorizing user have 'All' authority while trying to create a version", function () {
            var response = chakram.post(createVersionapiUrl, {}, data.godUserAuth);
            expect(response).to.have.status(200);
            return chakram.wait();
        });
    });
    describe("download data api with different types of users being used for authorization", function () {
        it("should return 403 httpstatus code  when the authorizing user does not have 'metadata handle' or 'all' authority  while trying to download data of a version", function () {
            var response = chakram.get(downloadDataApiUrl, data.noMdUserAuth);
            expect(response).to.have.status(403);
            return chakram.wait();
        });
        it("should return 200 status code when the authorizing user have 'metadata handle' authority while trying to download data of a version", function () {
            var response = chakram.get(downloadDataApiUrl, data.mdUserAuth);
            expect(response).to.have.status(200);
            return chakram.wait();
        });
        it("should return 200 status code when the authorizing user have 'All' authority while trying to download data of a version", function () {
            var response = chakram.get(downloadDataApiUrl, data.godUserAuth);
            expect(response).to.have.status(200);
            return chakram.wait();
        });
    });
    describe("download data gz api with different types of users being used for authorization", function () {
        it("should return 403 httpstatus code  when the authorizing user does not have 'metadata handle' or 'all' authority  while trying to download data of a version in gz format", function () {
            var response = chakram.get(downloadDataGzApiUrl, data.noMdUserAuth);
            expect(response).to.have.status(403);
            return chakram.wait();
        });
        it("should return 200 status code when the authorizing user have 'metadata handle' authority while trying to download data of a version in data gz format", function () {
            var response = chakram.get(downloadDataGzApiUrl, data.mdUserAuth);
            expect(response).to.have.status(200);
            return chakram.wait();
        });
        it("should return 200 status code when the authorizing user have 'All' authority while trying to download data of a version in gz format", function () {
            var response = chakram.get(downloadDataGzApiUrl, data.godUserAuth);
            expect(response).to.have.status(200);
            return chakram.wait();
        });
    });

    describe("should return 403 httpstatus code  when the authorizing user does not have 'metadata handle' or 'all' authority  while trying to sync metadata", function () {
        it("should give 403 error when no md user tries to sync", function () {
            var response = chakram.get(mdSyncApiUrl, data.noMdUserAuth);
            expect(response).to.have.status(403);
            return chakram.wait();
        });
    });
});
