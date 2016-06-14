var chakram = require('chakram'),
    jsonfile = require('jsonfile'),
    env = require('./../../utils/env');

expect = chakram.expect;

describe("DHIS2 API - Import-Export Module", function () {
    describe("Metadata Export", function () {
        it("should export id and displayName for all data elements, ordered by displayName", function () {
            this.timeout(10000);
            var filter = "?dataElements:fields=id,name&dataElements:order=displayName:desc";
            var response = chakram.get(env.url + "/api/23/metadata" + filter, env.auth);

            expect(response).to.have.status(200);
            expect(response).to.have.json(function (json) {
                expect(json).to.have.all.keys(['date', 'dataElements']);
                expect(json.dataElements).to.have.length.above(854);
                jsonfile.writeFile('./../../tmp/metadata.json', json);
                return chakram.wait();
            });

            return chakram.wait();
        });

        //TODO: implement more test cases.
    });
});