var chakram = require('chakram'),
    env = require('./../../utils/env');

expect = chakram.expect;

describe("DHIS2 API - Data Administration - Option Set", function () {

    describe("Create a valid Option", function () {
        it("should be able to create a new Option", function () {
            this.timeout(5000);
            var payload = {code: '0', name: 'Zero'};
            var response = chakram.post(env.url + env.api + "options", payload, env.auth);

            expect(response).to.have.status(200);
            expect(response).to.have.json('message', 'Import was successful.');
            expect(response).to.have.json('response.importCount.imported', 1);
            return chakram.wait();
        });
    });

    describe("Create Option Set", function () {
        var optionResponse;
        var optionId;

        before(function () {
            optionResponse = chakram.get(env.url + "/api/options?filter=displayName:eq:Zero", env.auth);
            optionResponse.then(function (respObj) {
                optionId = respObj.body.options[0].id;
            });

            //TODO: delete Option Set if exists?
        });

        it("should be able to create a new Option Set named 'Test Option Set' without Options", function () {
            this.timeout(10000);
            /**
             * [UNIT_INTERVAL, LETTER, BOOLEAN, NUMBER, TEXT, DATE, LONG_TEXT, FILE_RESOURCE, USERNAME,
             * TRACKER_ASSOCIATE, COORDINATE, INTEGER_POSITIVE, DATETIME, EMAIL, TRUE_ONLY, INTEGER,
             *INTEGER_ZERO_OR_POSITIVE, TIME, INTEGER_NEGATIVE, PERCENTAGE, PHONE_NUMBER]
             */
            var payload = {name: 'Test Option Set', code: 'TEST_OPTION_SET', valueType: 'INTEGER'};
            var response = chakram.post(env.url + env.api + "optionSets", payload, env.auth);
            expect(response).to.have.status(200);
            expect(response).to.have.json('message', 'Import was successful.');
            expect(response).to.have.json('response.importCount.imported', 1);
            return chakram.wait();
        });

        it("should be able to update existent Option Set name from 'Test Option Set' to 'Test Option Set New'", function () {
            this.timeout(10000);
            var optionSetResponse = chakram.get(env.url + "/api/optionSets?filter=code:eq:TEST_OPTION_SET", env.auth);

            expect(optionSetResponse).to.have.json(function (json) {
                var optionSetId = json.optionSets[0].id;
                var payload = {name: 'Test Option Set New'};
                var response = chakram.put(env.url + env.api + "optionSets/" + optionSetId, payload, env.auth);

                expect(response).to.have.status(200);
                return chakram.wait();
            });
            return chakram.wait();
        });

        it("should be able to update existent Option Set code from 'TEST_OPTION_SET' to 'TEST_OPTION_SET_NEW'", function () {
            this.timeout(10000);
            var optionSetResponse = chakram.get(env.url + "/api/optionSets?filter=code:eq:TEST_OPTION_SET", env.auth);

            expect(optionSetResponse).to.have.json(function (json) {
                var optionSetId = json.optionSets[0].id;
                var payload = {name: 'Test Option Set New', code: 'TEST_OPTION_SET_NEW'};
                var response = chakram.put(env.url + env.api + "optionSets/" + optionSetId, payload, env.auth);

                expect(response).to.have.status(200);
                expect(response).to.have.json('response.importCount.updated', 1);

                return chakram.wait();
            });
            return chakram.wait();
        });

        it("shouldn't be able to update existent Option Set type from 'INTEGER' to 'TEXT'", function () {
            this.timeout(10000);
            var optionSetResponse = chakram.get(env.url + "/api/optionSets?filter=code:eq:TEST_OPTION_SET_NEW", env.auth);

            expect(optionSetResponse).to.have.json(function (json) {
                var optionSetId = json.optionSets[0].id;
                var payload = {name: 'Test Option Set New', valueType: 'TEXT'};
                var response = chakram.put(env.url + env.api + "optionSets/" + optionSetId, payload, env.auth);

                // TODO: currently is possible to change types...
                expect(response).to.have.status(400);
                //expect(response).to.have.json('response.importCount.updated', 1);

                return chakram.wait();
            });
            return chakram.wait();
        });

        it("should be able to create a new Option Set named 'Test Option Set02' with Option", function () {
            this.timeout(10000);
            var payload = {
                name: 'Test Option Set02', code: 'TEST_OPTION_SET02', valueType: 'INTEGER',
                options: [{id: optionId}]
            };

            var response = chakram.post(env.url + env.api + "optionSets", payload, env.auth);
            expect(response).to.have.status(200);
            expect(response).to.have.json('message', 'Import was successful.');
            expect(response).to.have.json('response.importCount.imported', 1);

            return chakram.wait();
        });
    });

    describe("Add Option to Option Set", function () {
        this.timeout(10000);

        var optionResponse;
        var optionSetResponse;

        before(function () {
            optionResponse = chakram.get(env.url + "/api/options?filter=displayName:eq:Zero", env.auth);
            optionSetResponse = chakram.get(env.url + "/api/optionSets?filter=code:eq:TEST_OPTION_SET_NEW", env.auth);
        });

        it("should be able to add Option to Option Set", function () {
            expect(optionResponse).to.have.status(200);
            expect(optionResponse).to.have.json('options[0].displayName', 'Zero');

            expect(optionSetResponse).to.have.status(200);
            expect(optionSetResponse).to.have.json('optionSets[0].displayName', 'Test Option Set New');

            return chakram.all([optionResponse,optionSetResponse]).then(function(responses) {
                var payload = {name: 'Test Option Set New', options: [{id: responses[0].body.options[0].id}]};

                var updateResponse = chakram.put(env.url + env.api + "optionSets/" + responses[1].body.optionSets[0].id, payload, env.auth);
                expect(updateResponse).to.have.status(200);
                expect(updateResponse).to.have.json('message', 'Import was successful.');
                expect(updateResponse).to.have.json('response.importCount.updated', 1);

                return chakram.wait();
            });
        });

        // get resource that was created http://localhost:8085/api/options?filter=displayName:eq:0-14 years
    });
});