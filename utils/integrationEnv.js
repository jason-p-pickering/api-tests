var hqURL = process.env.DHIS_HQURL,
    hqport = process.env.DHIS_HQPORT,
    localURL = process.env.DHIS_LOCALURL,
    localport = process.env.DHIS_LOCALPORT;

if (typeof hqURL == 'undefined' || !hqURL) {
    host = 'localhost'
}
if (typeof hqport == 'undefined' || !hqport) {
    port = 8085
}
if (typeof localURL == 'undefined' || !localURL) {
    host = 'localhost'
}
if (typeof localport == 'undefined' || !localport) {
    port = 8080
}
module.exports = {
    hqUrl: "http://" + hqURL + ":" + hqport,
    localUrl: "http://" + localURL + ":" + localport,
    api: "/api",
    version: "",
    properRequestParams: {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q='
        }
    },
    improperRequestParams: {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Basic YWRtaW4xOmRpc3RyaWN0'
        }
    }
};
