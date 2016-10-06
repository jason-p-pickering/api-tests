var chakram    = require('chakram'),
    _          = require('lodash'),
    chai       = require('chai'),
    chaiexpect = chai.expect,
    expect                 = chakram.expect,
    env        = require('./integrationEnv'),
    localUrl   = env.localUrl + env.api + env.version,
    hqUrl      = env.hqUrl + env.api + env.version,
    run        = process.env.run;

var parseJsonData = function(entityJson) {
	delete(entityJson.lastUpdated);
	delete(entityJson.href);
	delete(entityJson.created);
	delete(entityJson.lastLogin);
	delete(entityJson.user);
	return entityJson;
};

this.compareMetadataEntity = function(entities, entityName) {
	var promise = _.map(entities, function(entity) {
		console.log(" comparing " + entityName + " of local with HQ");
		if(run == "withDB") {
			var localDataUrl = localUrl + "/" + entityName + "/" + entity.id + ".json?fields=";
			_.map(entity, function(k, v) {
				localDataUrl = localDataUrl + v + ",";
			});
			return Promise.all([chakram.get(localDataUrl, env.properRequestParams)])
				.then(function(response) {
					var hqData = parseJsonData(entity);
					var localData = parseJsonData(response[0].body)
					chaiexpect(hqData).to.deep.equal(localData);
				});
		}
		else {
			return Promise.all([chakram.get(hqUrl + "/" + entityName + "/" + entity.id, env.properRequestParams), chakram.get(localUrl + "/" + entityName + "/" + entity.id, env.properRequestParams)])
				.then(function(responses) {
					var hqData = parseJsonData(responses[0].body);
					var localData = parseJsonData(responses[1].body);
					console.log(" comparing " + entityName + "/" + entity.id + " of local with HQ");
					expect(hqData).to.deep.equal(localData);
				});
		}
	});
	return Promise.all(promise);
};