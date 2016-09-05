var faker = require('faker');

module.exports = {
    testUser: {
        firstName: "Paulo",
        //firstName: faker.name.firstName(),
        surname: "Grácio",
        email: "paulo.gracio@dhis2.com",
        userCredentials: {
            username: "pgracio",
            password: "your-password-123",
            userRoles: [{
                id: "Euq3XfEIEbx"
            }]
        }
    },
    testUserUpdated: {
        firstName: "Paulo",
        surname: "Ribeiro",
        userCredentials: {
            username: "pgracio",
            password: "your-password-1234",
            userRoles: [{
                id: "Euq3XfEIEbx"
            }]
        }
    },
    testUserInvalidPassword: {
        firstName: "Paulo",
        surname: "Ribeiro",
        userCredentials: {
            username: "pgracio",
            password: "s1",
            userRoles: [{
                id: "Euq3XfEIEbx"
            }]
        }
    }
};