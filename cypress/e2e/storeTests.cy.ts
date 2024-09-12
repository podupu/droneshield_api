import { faker } from '@faker-js/faker';

describe('Store API Tests', () => {
  let orderId: number;

  it('should retrieve pet inventories by status (200 OK)', () => {
    cy.request('GET', '/store/inventory').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object');
    });
  });

  it('should place a new order (200 OK)', () => {
    const newOrder = {
      id: faker.number.int(),
      petId: faker.number.int(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: false
    };

    cy.request('POST', '/store/order', newOrder).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      orderId = response.body.id;
    });
  });

  it('should fail to place an order with missing required fields (400 Bad Request)', () => {
    const incompleteOrder = {
      petId: faker.number.int(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      shipDate: new Date().toISOString(),
      status: 'placed'
    };

    cy.request({
      method: 'POST',
      url: '/store/order',
      body: incompleteOrder,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail to place an order with invalid data types (400 Bad Request)', () => {
    const invalidOrder = {
      id: 'invalid_id',
      petId: 'invalid_pet_id',
      quantity: 'invalid_quantity',
      shipDate: 'invalid_date',
      status: 'invalid_status',
      complete: 'invalid_complete'
    };

    cy.request({
      method: 'POST',
      url: '/store/order',
      body: invalidOrder,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should retrieve an order by ID (200 OK)', () => {
    cy.request('GET', `/store/order/${orderId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', orderId);
    });
  });

  it('should fail to retrieve an order with invalid ID (404 Not Found)', () => {
    cy.request({
      method: 'GET',
      url: '/store/order/999999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should delete an order by ID (200 OK)', () => {
    cy.request('DELETE', `/store/order/${orderId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should fail to delete an order with invalid ID (404 Not Found)', () => {
    cy.request({
      method: 'DELETE',
      url: '/store/order/999999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should fail to delete an already deleted order (404 Not Found)', () => {
    cy.request({
      method: 'DELETE',
      url: `/store/order/${orderId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
