var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../utils/env'),
    data = require('../../data/metadataversion/GetVersiondataData'),
    catComboData = require('../../data/models/categorycombinations/CategoryCombo'),
    dataElementData = require('../../data/models/dataelements/DataElement'),
    createVersionURL = env.url + env.api + env.version + "metadata/version/create?type=",
    getVersionDataURL = env.url + env.api + env.version + "metadata/version/",
    dataElementURL = env.url + env.api + env.version + "dataElements/",
    catComboURL = env.url + env.api + env.version + "categoryCombos/",
    pathData = "/data";

describe("metadata get version data API", function () {
    // Pending needs dependency to be fixed
    xit("should give proper error message when no version is present", function () {
        var response = chakram.get(getVersionDataURL + data.nameVersion1 + pathData, env.properRequestParams);
        expect(response).to.have.json('status', data.errorStatus);
        expect(response).to.have.json('message', data.errorMessage + data.nameVersion1);
        expect(response).to.have.status(500);
        return chakram.wait();
    });

    it("should give error status code as 401 when authentication is not proper", function () {
        var response = chakram.get(getVersionDataURL + data.nameVersion1 + pathData, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });
    describe("when proper atomic version data exists", function () {
        var setup,
            version1,
            version2;

        before("Setting metadata required for the getVersion data tests", function () {
            return setup = chakram.post(catComboURL, catComboData.emptyCatCombo_1, env.properRequestParams)
                .then(function () {
                    return chakram.post(dataElementURL, dataElementData.dataElements.de_Number_1, env.properRequestParams);
                })
                .then(function () {
                    return chakram.post(createVersionURL + data.typeAtomic, {}, env.properRequestParams);
                })
                .then(function (chakramResponse) {
                    return version1 = chakramResponse.body;
                })
                .then(function () {
                    return chakram.post(dataElementURL, dataElementData.dataElements.de_Text_1, env.properRequestParams);
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
            return chakram.delete(dataElementURL + dataElementData.dataElements.de_Number_1.id, {}, env.properRequestParams)
                .then(function () {
                    return chakram.delete(dataElementURL + dataElementData.dataElements.de_Text_1.id, {}, env.properRequestParams)
                })
                .then(function () {
                    return chakram.delete(catComboURL + catComboData.emptyCatCombo_1.id, {}, env.properRequestParams)
                })
                .then(function (chakramResponse) {
                    var response = chakramResponse.body;
                    console.log(response);
                    return response;
                });
        });


        it("should get details of the atomic version created", function () {
            setup.then(function () {
                var response = chakram.get(getVersionDataURL + version1.name + pathData, env.properRequestParams);
                expect(response).to.have.status(200);
                expect(response).to.have.json('dataElements[0].code', dataElementData.dataElements.de_Number_1.code);
                expect(response).to.have.json('dataElements[0].id', dataElementData.dataElements.de_Number_1.id);
                expect(response).to.have.json('categoryCombos[0].id', catComboData.emptyCatCombo_1.id);
                expect(response).to.have.json('categoryCombos[0].code', catComboData.emptyCatCombo_1.code);
            });
            return chakram.wait();
        });
        // Test to verify the dataElements & categoryCombos in the best_effort version
        it("should get details of the best_effort version created", function () {
            setup.then(function () {
                var response = chakram.get(getVersionDataURL + version.name + pathData, env.properRequestParams);
                expect(response).to.have.status(200);
                expect(response).to.have.json('dataElements[0].code', dataElementData.dataElements.de_Number_1.code);
                expect(response).to.have.json('dataElements[0].id', dataElementData.dataElements.de_Number_1.id);
            });
            return chakram.wait();

        });
    });
});
