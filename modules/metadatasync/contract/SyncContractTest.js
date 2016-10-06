var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../../utils/integrationEnv'),
    localUrl = env.localUrl + env.api + env.version,
    hqUrl = env.hqUrl + env.api + env.version,
    syncMetadataLocalUrl = localUrl + "metadata/sync?versionName=",
    systemSettingsUrl = localUrl + "systemSettings",
    data = require('../../../data/metadatasync/ContractTestData');


describe("metadata sync API  when there is no proper authorization", function () {
    it("should give 401 error", function () {
        var response = chakram.get(syncMetadataLocalUrl + data.version, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });
});

describe("metadata sync API  when remote server is not configured on local", function () {
    it("should give a 500 error", function () {
        var response = chakram.get(syncMetadataLocalUrl + data.version, env.properRequestParams);
        expect(response).to.have.status(500);
        expect(response).to.have.json(data.remoteServerNotConfigured);
        return chakram.wait();
    });
});

describe("metadata sync API  when remote server details are incorrect", function () {
    before("setting invalid username and password for HQ server details on local", function () {
        return chakram.post(systemSettingsUrl, data.invalidServerDetails, env.properRequestParams)
    });
    it("should give a 500 error, authentication failed", function () {
        var response = chakram.get(syncMetadataLocalUrl + data.version, env.properRequestParams);
        expect(response).to.have.status(500);
        expect(response).to.have.json(data.serverAuthenticationFailed);
        return chakram.wait();
    });
});


describe("metadata sync API  when remote server details are correct", function () {
    before("setting valid username and password for HQ server details on local", function () {
        return chakram.post(systemSettingsUrl, data.validServerDetails, env.properRequestParams);
    });

    it("should give a 400 error when version not present", function () {
        var response = chakram.get(syncMetadataLocalUrl + data.version, env.properRequestParams);
        expect(response).to.have.status(400);
        expect(response).to.have.json(data.errorData);
        return chakram.wait();
    });

    it("should give a 400 error when wrong parameter is entered", function () {
        var response = chakram.get(syncMetadataLocalUrl + "qwerty", env.properRequestParams);
        expect(response).to.have.status(400);
        expect(response).to.have.json(data.errorData);
        return chakram.wait();
    });
    it("should give a 500 error when a null parameter is passed", function () {
        var response = chakram.get(syncMetadataLocalUrl + "", env.properRequestParams);
        expect(response).to.have.status(500);
        expect(response).to.have.json(data.nullparameter);
        return chakram.wait();
    });
});

