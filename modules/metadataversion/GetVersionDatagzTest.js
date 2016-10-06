var chakram = require('chakram'),
    env = require('../../utils/env'),
    expect = chakram.expect,
    data = require('../../data/metadataversion/GetVersionDatagzData'),
    catComboData = require('../../data/models/categorycombinations/CategoryCombo'),
    dataElementData = require('../../data/models/dataelements/DataElement'),
    createVersionURL = env.url + env.api + env.version + "metadata/version/create?type=",
    getVersionDataURL = env.url + env.api + env.version + "metadata/version/",
    dataElementURL = env.url + env.api + env.version + "dataElements/",
    catComboURL = env.url + env.api + env.version + "categoryCombos/",
    pathData = "/data.gz";

describe("metadata get version data gz API", function () {
    describe("when no version is present", function () {
        // Pending needs dependency to be fixed
        xit("should give proper error message", function () {
            var response = chakram.get(getVersionDataURL + data.nameVersion1 + pathData, env.properRequestParams);
            expect(response).to.have.json('status', data.errorStatus);
            expect(response).to.have.json('message', data.errorMessage + data.nameVersion1);
            expect(response).to.have.status(500);
            return chakram.wait();
        });
    });

    xit("when authentication is not proper should give error status code as 401", function () {
        var response = chakram.get(getVersionDataURL + data.nameVersion1 + pathData, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });

    describe("when proper metadata versions exists", function () {
        var setup,
            version1,
            version2;

        before("Setting metadata required for the getVersion data gz tests", function () {
            return setup = chakram.post(catComboURL, catComboData.emptyCatCombo_2, env.properRequestParams)
                .then(function () {
                    return chakram.post(dataElementURL, dataElementData.dataElements.de_Number_2, env.properRequestParams);
                })
                .then(function () {
                    return chakram.post(createVersionURL + data.typeAtomic, {}, env.properRequestParams);
                })
                .then(function (chakramResponse) {
                    return version1 = chakramResponse.body;
                })
                .then(function () {
                    return chakram.post(dataElementURL, dataElementData.dataElements.de_Number_3, env.properRequestParams);
                })
                .then(function () {
                    return chakram.post(createVersionURL + data.typeBestEffort, {}, env.properRequestParams);
                })
                .then(function (chakramResponse) {
                    return version2 = chakramResponse.body;
                });
        });

        //TODO : Fix the teardown
        after("Tearing down metadata created for the getVersion data tests", function () {
            //Test to delete a data element
            return chakram.delete(dataElementURL + dataElementData.dataElements.de_Number_2.id, {}, env.properRequestParams)
                .then(function () {
                    return chakram.delete(dataElementURL + dataElementData.dataElements.de_Number_3.id, {}, env.properRequestParams)
                })
                .then(function () {
                    return chakram.delete(catComboURL + catComboData.emptyCatCombo_2.id, {}, env.properRequestParams)
                })
                .then(function (chakramResponse) {
                    var response = chakramResponse.body;
                    console.log(response);
                    return response;
                });
        });

        it("should get data in gz format of the atomic version created", function () {
            setup.then(function () {
                var response = chakram.get(getVersionDataURL + version1.name + pathData, env.properRequestParams);
                expect(response).to.have.status(200);
                expect(response).to.have.header('Content-Disposition', 'attachment; filename="metadata.json.gz"');
            });
            return chakram.wait();
        });

        it("should get data in gz format of the best_effort version created", function () {
            setup.then(function () {
                var response = chakram.get(getVersionDataURL + version2.name + pathData, env.properRequestParams);
                expect(response).to.have.status(200);
                expect(response).to.have.header('Content-Disposition', 'attachment; filename="metadata.json.gz"');
            });
            return chakram.wait();
        });
    });
});