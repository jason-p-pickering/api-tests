var chakram                = require('chakram'),
    _                      = require('lodash'),
    expect                 = chakram.expect,
    chai                   = require('chai'),
    chaiexpect             = chai.expect,
    env                    = require('../../../utils/integrationEnv'),
    localUrl               = env.localUrl + env.api + env.version,
    hqUrl                  = env.hqUrl + env.api + env.version,
    createVersionURL       = hqUrl + "metadata/version/create?type=",
    syncMetadataLocalUrl   = localUrl + "metadata/sync?versionName=",
    getVersionDataHqURL    = hqUrl + "metadata/version/",
    getVersionDataLocalURL = localUrl + "metadata/version/",
    //TODO refactor version /24 when 2.25 releases.
    importHqURL            = hqUrl + "24/metadata/",
    version                = process.env.version,
    run                    = process.env.run,
    data                   = require('../../../data/metadatasync/versiondata/' + version),
	serverData = require('../../../data/metadatasync/ContractTestData'),
	metadataCompareUtil    = require('../../../utils/metadataCompareUtil');

console.log(version);
console.log(run);

describe("metadata sync API ", function() {
	var setupData, syncSetUp, locResponse;
	before("creating versions on HQ after importing json", function() {
		chakram.post(localUrl +"systemSettings", serverData.validServerDetails, env.properRequestParams);
		if(run != "withDB")
			return chakram.post(importHqURL, data.body, env.properRequestParams)
				.then(function(chakramResponse) {
					return chakramResponse.body;
				})
				.then(function() {
					return chakram.post(createVersionURL + data.type, {}, env.properRequestParams)
						.then(function(data) {
							setupData = data;
						});
				});

	});

	it("should sync version from HQ to local", function() {
		locResponse = chakram.get(syncMetadataLocalUrl + version, env.properRequestParams);
		expect(locResponse).to.have.status(200);
		return chakram.wait();
	});

	it("should get version data same as in hq after metadata sync", function() {
		expect(chakram.get(getVersionDataHqURL + version + "/data", env.properRequestParams)).to.have.status(200).then(function(res) {
			var hQData = res.body;
			var localData = chakram.get(getVersionDataLocalURL + version + "/data", env.properRequestParams);
			expect(localData).to.have.status(200);
			expect(localData).to.have.json(hQData);
			return chakram.wait()
		});
		return chakram.wait();
	});

	it("should compare local and hq entities after metadata sync", function() {
		return Promise.all([chakram.get(getVersionDataHqURL + version + "/data", env.properRequestParams)])
			.then(function(response) {
				chaiexpect(response[0].response.statusCode).to.equal(200);
				var body = response[0].body;
				var entities = Object.keys(body);
				entities.shift();
				var promise = _.map(entities, function(entity) {
					return metadataCompareUtil.compareMetadataEntity(body[entity], entity);
				});
				return Promise.all(promise);
			});
	});
});

