var chakram = require('chakram'),
    env = require('./../utils/env'),
    jsonfile = require('jsonfile');

expect = chakram.expect;

describe("DHIS2 API - Metadata Module", function () {
    describe("Get metadata", function () {
        it("should export id and displayName for all data elements, ordered by displayName", function () {
            this.timeout(10000);
            var filter = "?dataElements:fields=id,name&dataElements:order=displayName:desc";
            var response = chakram.get(env.url + "/api/23/metadata" + filter, env.auth);

            expect(response).to.have.status(200);
            expect(response).to.have.json(function (json) {
                expect(json).to.have.all.keys(['date', 'dataElements']);
                expect(json.dataElements).to.have.length.above(854);
                jsonfile.writeFile('tmp/metadata.json', json);
                return chakram.wait();
            });

            return chakram.wait();
        });
    });

    describe("Import metadata", function () {
        it("should import metadata", function () {
            var metadata = jsonfile.readFileSync('tmp/metadata.json');
            var response = chakram.post(env.url + "/api/23/metadata", metadata, env.auth);
            expect(response).to.have.status(200);
            expect(response).to.have.json(function (json) {
                // TODO: validate schema... http://dareid.github.io/chakram/example/spotify/
                console.dir(json);
            });
            return chakram.wait();
        });
    });
});