import { faker } from '@faker-js/faker';

describe('User API Tests', () => {
  let username: string;
  let userId: number;

  it('should create a list of users (200 OK)', () => {
    const users = [
      {
        id: faker.number.int(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        userStatus: 1
      },
      {
        id: faker.number.int(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        userStatus: 1
      }
    ];

    cy.request('POST', '/user/createWithList', users).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should retrieve a user by username (200 OK)', () => {
    cy.request('GET', `/user/${username}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('username', username);
    });
  });

  it('should fail to retrieve a non-existent user by username (404 Not Found)', () => {
    cy.request({
      method: 'GET',
      url: '/user/invalidUsername',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should update a user (200 OK)', () => {
    const updatedUser = {
      id: userId,
      username: username,
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: 1
    };

    cy.request('PUT', `/user/${username}`, updatedUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('firstName', 'UpdatedFirstName');
      expect(response.body).to.have.property('lastName', 'UpdatedLastName');
    });
  });

  it('should fail to update a non-existent user (404 Not Found)', () => {
    const updatedUser = {
      username: 'nonExistentUser',
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: 1
    };

    cy.request({
      method: 'PUT',
      url: '/user/nonExistentUser',
      body: updatedUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should delete a user by username (200 OK)', () => {
    cy.request('DELETE', `/user/${username}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should fail to delete a non-existent user (404 Not Found)', () => {
    cy.request({
      method: 'DELETE',
      url: '/user/invalidUsername',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should log in a user (200 OK)', () => {
    cy.request('GET', `/user/login?username=${username}&password=password`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should fail to log in with incorrect credentials (400 Bad Request)', () => {
    cy.request({
      method: 'GET',
      url: '/user/login?username=wrongUser&password=wrongPassword',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should log out the current user session (200 OK)', () => {
    cy.request('GET', '/user/logout').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should create a list of users with input array (200 OK)', () => {
    const users = [
      {
        id: faker.number.int(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        userStatus: 1
      }
    ];

    cy.request('POST', '/user/createWithArray', users).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should create a new user (200 OK)', () => {
    const newUser = {
      id: faker.number.int(),
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      userStatus: 1
    };

    cy.request('POST', '/user', newUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('username', newUser.username);
      username = newUser.username;
      userId = newUser.id;
    });
  });

  it('should fail to create a user with missing required fields (400 Bad Request)', () => {
    const incompleteUser = {
      username: faker.internet.userName(),
    };

    cy.request({
      method: 'POST',
      url: '/user',
      body: incompleteUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail to create a user with invalid data types (400 Bad Request)', () => {
    const invalidUser = {
      id: 'invalid_id',
      username: 12345,
      firstName: true,
      lastName: {},
      email: 'invalid_email',
      password: [],
      phone: 'invalid_phone',
      userStatus: 'invalid_status'
    };

    cy.request({
      method: 'POST',
      url: '/user',
      body: invalidUser,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
