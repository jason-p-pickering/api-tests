module.exports = {
    url: "http://localhost:8085", //localhost:8085
    auth: {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q='
        }
    },
    authXML: {
        headers: {
            Accept: 'application/xml',
            Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q='
        }
    }
};