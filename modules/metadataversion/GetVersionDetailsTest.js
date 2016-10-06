var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../utils/env'),
    data = require('../../data/metadataversion/GetVersionDetailsData'),
    getVersionURL = env.url + env.api + env.version + "metadata/version?versionName=",
    createVersionURL = env.url + env.api + env.version + "metadata/version/create?type=";


describe("get details of the metadata version", function () {
    //Pending needs dependency to be fixed
    xit("should give proper error message when metadata version is not found", function () {
        var response = chakram.get(getVersionURL + data.nameVersion1, env.properRequestParams);
        expect(response).to.have.json(data.errorData);
        expect(response).to.have.status(500);
        return chakram.wait();
    });

    it("should give error status code as 401 when the authorization is invalid", function () {
        var response = chakram.get(getVersionURL + data.nameVersion1, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });

    describe("when a metadata version exists ", function () {
        var setup,
            version1,
            version2;
        before("Setting up metadata versions", function () {
            return setup = chakram.post(createVersionURL + data.typeAtomic, {}, env.properRequestParams)
                .then(function (chakramResponse) {
                    return version1 = chakramResponse.body;
                })
                .then(function () {
                    return chakram.post(createVersionURL + data.typeBestEffort, {}, env.properRequestParams);
                })
                .then(function (chakramResponse) {
                    return version2 = chakramResponse.body;
                })
        });

        it("should get details of the version requested", function () {
            var response = chakram.get(getVersionURL + version1.name, env.properRequestParams);
            expect(response).to.have.json('name', version1.name);
            expect(response).to.have.json('displayName', version1.name);
            expect(response).to.have.json('type', data.typeAtomic);
            return chakram.wait();
        });

        it("should get details of the version requested", function () {
            var response = chakram.get(getVersionURL + version2.name, env.properRequestParams);
            expect(response).to.have.json('name', version2.name);
            expect(response).to.have.json('displayName', version2.name);
            expect(response).to.have.json('type', data.typeBestEffort);
            return chakram.wait();
        });

    });
});