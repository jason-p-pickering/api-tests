var chakram = require('chakram'),
    jsonfile = require('jsonfile'),
    env = require('./../../utils/env');

expect = chakram.expect;

describe("DHIS2 API - Import-Export Module", function () {
    describe("Import metadata", function () {
        it("should import metadata", function () {
            var metadata = jsonfile.readFileSync('tmp/metadata.json');
            // TODO: extract api version to env or define apiversion as a test input argument.
            var response = chakram.post(env.url + "/api/23/metadata", metadata, env.properRequestParams);
            expect(response).to.have.status(200);
            expect(response).to.have.json(function (json) {
                // TODO: validate schema... http://dareid.github.io/chakram/example/spotify/
                console.dir(json);
            });
            return chakram.wait();
        });
        //TODO: implement more test cases.
    });
});