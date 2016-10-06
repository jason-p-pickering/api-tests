var chakram = require('chakram'),
    expect = chakram.expect,
    env = require('../../utils/env'),
    data = require('../../data/metadataversion/CreateVersionData'),
    createVersionURL = env.url + env.api + env.version + "metadata/version/create?type=";

describe("metadata create version API", function () {
    it("should fail to create atomic version when there is no proper authorization", function () {
        chakram.post(createVersionURL + data.typeAtomic, {}, env.improperRequestParams)
            .then(function (response) {
            console.log(response)
            });
       // expect(response).to.have.header('Content-Disposition', 'attachment; filename="metadata.json.gz"');
        expect(response).to.have.status(401);
        return chakram.wait();
    });
//TODO: use one more 'descibe' to describe a scenario. 'it' should only have the behavior. extract all whens to descibe.
    xit("should fail to create best_effort version when there is no proper authorization", function () {
        var response = chakram.post(createVersionURL + data.typeBestEffort, {}, env.improperRequestParams);
        expect(response).to.have.status(401);
        return chakram.wait();
    });

    it("should fail to set up a random version when user tries to create version other than atomic or best_effort", function () {
        var response = chakram.post(createVersionURL + data.typeRandom, {}, env.properRequestParams);
        expect(response).to.have.status(500);
        expect(response).to.have.json(data.errorData);
        return chakram.wait();
    });

    it("should successfully set up an atomic version", function () {
        var postResponse = expect(chakram.post(createVersionURL + data.typeAtomic, {}, env.properRequestParams)).to.have.status(200)
            .then(function (postResponse) {
                var responseBody = postResponse.body;
                expect(responseBody).to.have.property('name');
                expect(responseBody).to.have.json('type', data.typeAtomic);
            });
        return chakram.wait();
    });

    it("should successfully set up a best_effort version", function () {
        var postResponse = expect(chakram.post(createVersionURL + data.typeBestEffort, {}, env.properRequestParams)).to.have.status(200)
            .then(function (postResponse) {
                var responseBody = postResponse.body;
                expect(postResponse).to.have.property('name');
                expect(postResponse).to.have.json('type', data.typeBestEffort);
            });
        return chakram.wait();
    });
})
;


