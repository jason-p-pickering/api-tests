var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../utils/env'),
    data = require('../../data/metadataversion/GetVersionData'),
    versionURL = env.url + env.api + env.version + "metadata/version",
    createVersionURL = env.url + env.api + env.version + "metadata/version/create?type=";

describe("metadata get version API", function () {
    describe("when no version is present", function () {
        //Extracted to errorMessageTest to remove dependency
        xit("should give proper error message", function () {
            var response = chakram.get(versionURL, env.properRequestParams);
            expect(response).to.have.json(data.errorData);
            expect(response).to.have.status(500);
            return chakram.wait();
        });
    });

    xit("when authentication is not proper should give error status code as 401", function () {
        var response = chakram.get(versionURL, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });

    describe("when proper version exists", function () {
        var setup,
            version1,
            version2;

        before("creating a new version of type Atomic", function () {
            return setup = chakram.post(createVersionURL + data.typeAtomic, {}, env.properRequestParams)
                .then(function (chakramResponse) {
                    return version1 = chakramResponse.body;
                });
        });

        it("should get details of the atomic version created", function () {
            setup.then(function () {
                var response = chakram.get(versionURL, env.properRequestParams);
                expect(response).to.have.json('name', version1.name);
                expect(response).to.have.json('displayName', version1.name);
                expect(response).to.have.json('type', data.typeAtomic);
            });
            return chakram.wait();
        });
    });
});