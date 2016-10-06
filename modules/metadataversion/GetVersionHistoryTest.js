var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../utils/env'),
    data = require('../../data/metadataversion/GetVersionHistoryData'),
    versionHistoryURL = env.url + env.api + env.version + "metadata/version/history",
    versionBaselineURL = env.url + env.api + env.version + "metadata/version/history" + "?baseline=",
    createVersionURL = env.url + env.api + env.version + "metadata/version/create?type=";

describe("get metadata version history API", function () {
    xit("when no versions are/is present should give empty versions", function () {
        var response = chakram.get(versionHistoryURL, env.properRequestParams);
        expect(response).to.have.json(data.emptyVersionsList);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("should give error status code as 401", function () {
        var response = chakram.get(versionBaselineURL + data.nameVersion5, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });

    it("should give error status code as 401", function () {
        var response = chakram.get(versionHistoryURL, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });

    describe("Creating versions for test", function () {
        var setup,
            version1,
            version2,
            version3,
            version4;
        before("creating versions of type Atomic and Best_Effort", function () {
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
                .then(function () {
                    return chakram.post(createVersionURL + data.typeAtomic, {}, env.properRequestParams);
                })
                .then(function (chakramResponse) {
                    return version3 = chakramResponse.body;
                })
                .then(function () {
                    return chakram.post(createVersionURL + data.typeBestEffort, {}, env.properRequestParams);
                })
                .then(function (chakramResponse) {
                    return version4 = chakramResponse.body;
                });
        });


        it("should get history of all the versions created", function () {
            setup.then(function () {
                var response = chakram.get(versionHistoryURL, env.properRequestParams);
                expect(response).to.have.status(200);
                expect(response).to.have.json('metadataversions[0].name', version1.name);
                expect(response).to.have.json('metadataversions[0].type', data.typeAtomic);
                expect(response).to.have.json('metadataversions[1].name', version2.name);
                expect(response).to.have.json('metadataversions[1].type', data.typeBestEffort);
                expect(response).to.have.json('metadataversions[2].name', version3.name);
                expect(response).to.have.json('metadataversions[2].type', data.typeAtomic);
                expect(response).to.have.json('metadataversions[3].name', version4.name);
                expect(response).to.have.json('metadataversions[3].type', data.typeBestEffort);
            });
            return chakram.wait();
        });
        xit("should give proper error", function () {
            var response = chakram.get(versionBaselineURL + data.nameVersion5, env.properRequestParams);
            expect(response).to.have.json(data.errorData);
            expect(response).to.have.status(500);
            return chakram.wait();
        });
        it("should get details of all the versions above baseline", function () {
            setup.then(function () {
                var response = chakram.get(versionBaselineURL + version2.name, env.properRequestParams);
                expect(response).to.have.json('metadataversions[0].name', version3.name);
                expect(response).to.have.json('metadataversions[0].type', data.typeAtomic);
                expect(response).to.have.json('metadataversions[1].name', version4.name);
                expect(response).to.have.json('metadataversions[1].type', data.typeBestEffort);
                expect(response).to.have.status(200);
            });
            return chakram.wait();
        });
    });
});