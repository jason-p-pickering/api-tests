var buildAuth = function (user) {
    return 'Basic ' + new Buffer(user.userCredentials.username + ':' + user.userCredentials.password).toString('base64');
};

module.exports = {
    buildParams: function (user) {
        return {headers: {'Authorization': buildAuth(user), 'Cache-Control': "no-cache"}}
    }
};
