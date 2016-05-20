var chakram = require('chakram'),
    expect = chakram.expect,
    host = 'localhost',
    port = '8085';

var authorization = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
    }
};

describe("DHIS2 - User Module - Create User", function () {

    it("should create a new User", function () {
        var johnDoe = {
            "firstName": "John",
            "surname": "Doe",
            "email": "johndoe@mail.com",
            "userCredentials": {
                "username": "johndoe",
                "password": "your-password-123",
                "userRoles": [{
                    "id": "Euq3XfEIEbx"
                }]
            }
        };

        var response = chakram.post("http://" + host + ":" + port + "/api/users", johnDoe, authorization);

        expect(response).to.have.status(200);
        expect(response).not.to.have.header('non-existing-header');
        expect(response).to.have.json('importCount.imported', 1);
        return chakram.wait();
    });
});


describe("DHIS2 - User Module - Update User", function () {
    var response;

    before(function () {
        response = chakram.get("http://" + host + ":" + port + "/api/users?query=john", authorization);
        return response;
    });

    it("should update a existent User", function () {
        expect(response).to.have.status(200);
        expect(response).to.have.json('users[0].displayName', 'John Doe');

        expect(response).to.have.json(function (json) {
            var johnDoe2 = {
                "firstName": "John",
                "surname": "Doe",
                "email": "newemail@mail.com",
                "userCredentials": {
                    "username": "johndoe",
                    "password": "your-password-123",
                    "userRoles": [{
                        "id": "Euq3XfEIEbx"
                    }]
                }
            };

            var updateResponse = chakram.put("http://" + host + ":" + port + "/api/users/" + json.users[0].id, johnDoe2,
                authorization);

            expect(updateResponse).to.have.status(200);
            expect(updateResponse).not.to.have.header('non-existing-header');
            expect(updateResponse).to.have.json('importCount.updated', 1);

            return chakram.wait();
        });
        return chakram.wait();
    });
});