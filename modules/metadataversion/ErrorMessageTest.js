// Temporary test file to avoid conflict
//TO DO doing this because there is no endpoint avilable to delete versions doing this to run all the tests on a new database
var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../utils/env'),
    getVersiondata = require('../../data/metadataversion/GetVersionData'),
    getVersionDetailsData = require('../../data/metadataversion/GetVersionDetailsData'),
    getVersiondataData = require('../../data/metadataversion/GetVersiondataData'),
    getVersionDatagzData = require('../../data/metadataversion/GetVersionDatagzData'),
    versionHistoryData = require('../../data/metadataversion/GetVersionHistoryData'),
    versionHistoryURL = env.url + env.api + env.version + "metadata/version/history",
    getVersionURL = env.url + env.api + env.version + "metadata/version?versionName=Version_1",
    versionURL = env.url + env.api + env.version + "metadata/version";

describe("metadata get version API", function () {
    it("should give proper error message when no version is present", function () {
        var response = chakram.get(versionURL, env.properRequestParams);
        expect(response).to.have.json(getVersiondata.errorData);
        expect(response).to.have.status(500);
        return chakram.wait();
    });
});

describe("metadata get version details API", function () {
    it("should give proper error message when no version is present", function () {
        var response = chakram.get(getVersionURL, env.properRequestParams);
        expect(response).to.have.json(getVersionDetailsData.errorData);
        expect(response).to.have.status(500);
        return chakram.wait();
    });
});
describe("metadata get version data API", function () {
    it("should give proper error message when no version is present", function () {
        var response = chakram.get(versionURL + "/Version_1/data", env.properRequestParams);
        expect(response).to.have.json('status', getVersiondataData.errorStatus);
        expect(response).to.have.json('message', getVersiondataData.errorMessage + "Version_1");
        expect(response).to.have.status(500);
        return chakram.wait();
    });
});
describe("metadata get version data gz API", function () {
    it("should give proper error message when no version is present", function () {
        var response = chakram.get(versionURL + "/Version_1/data.gz", env.properRequestParams);
        expect(response).to.have.json('status', getVersionDatagzData.errorStatus);
        expect(response).to.have.json('message', getVersionDatagzData.errorMessage + "Version_1");
        expect(response).to.have.status(500);
        return chakram.wait();
    });
});

describe("get metadata version history API", function () {
    it("when no versions are/is present should give empty versions", function () {
        var response = chakram.get(versionHistoryURL, env.properRequestParams);
        expect(response).to.have.json(versionHistoryData.emptyVersionsList);
        expect(response).to.have.status(200);
        return chakram.wait();
    });

});
