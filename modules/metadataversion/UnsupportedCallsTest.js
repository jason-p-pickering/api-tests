var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../utils/env'),
    unsupportedCallsdata = require('../../data/metadataversion/UnsupportedCallsData'),
    versionHistoryURL = env.url + env.api + env.version + "metadata/version/history",
    versionURL = env.url + env.api + env.version + "metadata/version",
    getVersionURL = env.url + env.api + env.version + "metadata/version?versionName=Version_1",
    mdSyncApiUrl = env.url + env.api + env.version + "metadata/sync?versionName=Version_1",
    getVersionDataURL = env.url + env.api + env.version + "metadata/version/Version_1/data",
    getVersionDatagzURL = env.url + env.api + env.version + "metadata/version/Version_1/data.gz",
    createAtomicVersionURL = env.url + env.api + env.version + "metadata/version/create?type=ATOMIC",
    createBest_EffortVersionURL = env.url + env.api + env.version + "metadata/version/create?type=ATOMIC";

describe("metadata get version API", function () {
    it("does a post call should give 405 error", function () {
        var response = chakram.post(versionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.postCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(versionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(versionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});

describe("metadata get versionHistory API", function () {
    it("does a post call should give 405 error", function () {
        var response = chakram.post(versionHistoryURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.postCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(versionHistoryURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(versionHistoryURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});

describe("metadata get version with version parameter API", function () {
    it("does a post call should give 405 error", function () {
        var response = chakram.post(getVersionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.postCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(getVersionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(getVersionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});

describe("metadata get versionHistory API", function () {
    it("does a post call should give 405 error", function () {
        var response = chakram.post(mdSyncApiUrl,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.postCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(mdSyncApiUrl,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(mdSyncApiUrl,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});



describe("metadata get version data API", function () {
    it("does a post call should give 405 error", function () {
        var response = chakram.post(getVersionDataURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.postCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(getVersionDataURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(getVersionDataURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});


describe("metadata get version data gz API", function () {
    it("does a post call should give 405 error", function () {
        var response = chakram.post(getVersionDatagzURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.postCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(getVersionDatagzURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(getVersionDatagzURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});

describe("metadata create atomic version API", function () {
    it("does a get call should give 405 error", function () {
        var response = chakram.get(createAtomicVersionURL, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.getCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(createAtomicVersionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(createAtomicVersionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});

describe("metadata create Best_Effort version API", function () {
    it("does a get call should give 405 error", function () {
        var response = chakram.get(createBest_EffortVersionURL, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.getCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a put call should give 405 error", function () {
        var response = chakram.put(createBest_EffortVersionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.putCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
    it("does a delete call should give 405 error", function () {
        var response = chakram.delete(createBest_EffortVersionURL,{}, env.properRequestParams);
        expect(response).to.have.json(unsupportedCallsdata.deleteCallError);
        expect(response).to.have.status(405);
        return chakram.wait();
    });
});