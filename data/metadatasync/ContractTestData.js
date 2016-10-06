var env = require('../../utils/integrationEnv');
module.exports = {
    version: "Version_100",
    remoteServerNotConfigured: {
        "httpStatus": "Internal Server Error",
        "httpStatusCode": 500,
        "status": "ERROR",
        "message": "Remote server is not configured"
    },
    errorData: {
        "httpStatus": "Bad Request",
        "httpStatusCode": 400,
        "status": "ERROR",
        "message": "Error in parsing inputParams Server Error. Http call failed with status code: 500 Caused by: {\"httpStatus\":\"Internal Server Error\",\"httpStatusCode\":500,\"status\":\"ERROR\",\"message\":\"No metadata versions exist. Please check again later.\"}"
    },
    serverAuthenticationFailed: {
        "httpStatus": "Internal Server Error",
        "httpStatusCode": 500,
        "status": "ERROR",
        "message": "Authentication failed"
    },
    validServerDetails:{
        "keyRemoteInstanceUsername": "admin",
        "keyRemoteInstanceUrl": env.hqUrl,
        "keyRemoteInstancePassword": "district"
    },
    invalidServerDetails:{
        "keyRemoteInstanceUsername": "admin",
        "keyRemoteInstanceUrl": env.hqUrl,
        "keyRemoteInstancePassword": "District"
    },
    nullparameter:{
        "httpStatus": "Internal Server Error",
        "httpStatusCode": 500,
        "status": "ERROR",
        "message": "Exception occurred while doing metadata sync MetadataVersion for the Sync cant be null. The ClassListMap could not be constructed."
    }
};