var chakram = require('chakram'),
    jsonfile = require('jsonfile'),
    env = require('./../../utils/env');

expect = chakram.expect;

describe("DHIS2 API - Data Entry - Data Value Sets", function () {
    describe("Send data values", function () {
        // TODO: consider the usage of CSV metadata import to import required data for tests.
        it("should send a set of data values", function () {
            this.timeout(999999);
            var metadata = jsonfile.readFileSync('data/data-entry/dataValueSets_good.json');
            var response = chakram.post(env.url + env.api + "dataValueSets?preheatCache=false", metadata, env.properRequestParams);
            expect(response).to.have.status(200);
            // TODO: currently this assumes all required data is setup... once it's not test won't fail but no data is imported.
            expect(response).to.have.json('importCount.imported', 0);
            return chakram.wait();
        });
    });
});