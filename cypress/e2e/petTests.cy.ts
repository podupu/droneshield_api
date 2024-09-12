import { faker } from '@faker-js/faker';
import { Pet } from '../support/types'; 
import { createDummyPet } from '../support/dataUtils';

describe('Pet API Tests', () => {
  let petId: number;
  let validImageFile: Blob;
  let invalidImageFile: Blob;

  before(() => {
    validImageFile = new Blob([new Uint8Array([1, 2, 3])], { type: 'image/jpeg' });
    invalidImageFile = new Blob([new Uint8Array([1, 2, 3])], { type: 'text/plain' });
  });

  it('should create a new pet (200 OK)', () => {
    const newPet: Pet = {
      id: faker.number.int(), 
      name: faker.animal.dog(),
      category: { id: faker.number.int(), name: faker.animal.type() },
      photoUrls: [faker.image.url()],
      tags: [{ id: faker.number.int(), name: faker.word.adjective() }],
      status: 'available'
    };

    cy.request('POST', '/pet', newPet).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      petId = response.body.id;
    });
  });

  it('should retrieve the created pet (200 OK)', () => {
    cy.request('GET', `/pet/${petId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
    });
  });

  it('should update the pet (200 OK)', () => {
    const updatedPet: Pet = {
      id: petId,
      name: 'Fluffy Updated',
      category: { id: faker.number.int(), name: faker.animal.type() },
      photoUrls: [faker.image.url()],
      tags: [{ id: faker.number.int(), name: faker.word.adjective() }],
      status: 'pending'
    };

    cy.request('PUT', '/pet', updatedPet).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Fluffy Updated');
      expect(response.body.status).to.eq('pending');
    });
  });

  it('should fail to retrieve a non-existent pet (404 Not Found)', () => {
    cy.request({
      method: 'GET',
      url: '/pet/999999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should delete the created pet (200 OK)', () => {
    cy.request('DELETE', `/pet/${petId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should fail to create a pet with invalid data (400 Bad Request)', () => {
    const invalidPet = {
      name: 'Invalid Pet',
      status: 'invalid_status'
    };

    cy.request({
      method: 'POST',
      url: '/pet',
      body: invalidPet,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


  it('should upload a valid image for a pet (200 OK)', () => {
    cy.request({
      method: 'POST',
      url: `/pet/${petId}/uploadImage`,
      body: validImageFile,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should fail to upload an image for a non-existent pet (404 Not Found)', () => {
    cy.request({
      method: 'POST',
      url: `/pet/999999999/uploadImage`,
      body: validImageFile,
      headers: { 'Content-Type': 'multipart/form-data' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should fail to upload an invalid image format (400 Bad Request)', () => {
    cy.request({
      method: 'POST',
      url: `/pet/${petId}/uploadImage`,
      body: invalidImageFile,
      headers: { 'Content-Type': 'multipart/form-data' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail to upload without an image file (400 Bad Request)', () => {
    cy.request({
      method: 'POST',
      url: `/pet/${petId}/uploadImage`,
      headers: { 'Content-Type': 'multipart/form-data' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


  it('should fail to add a pet with missing required fields (400 Bad Request)', () => {
    const petWithoutName = {
      id: faker.number.int(),
      category: { id: faker.number.int(), name: faker.animal.type() },
      photoUrls: [faker.image.url()],
      status: 'available'
    };

    cy.request({
      method: 'POST',
      url: '/pet',
      body: petWithoutName,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('should fail to add a pet with invalid data types (400 Bad Request)', () => {
    const invalidPet = {
      id: 'not-a-number', // invalid ID
      name: faker.animal.dog(),
      category: { id: faker.number.int(), name: faker.animal.type() },
      photoUrls: [faker.image.url()],
      status: 'available'
    };

    cy.request({
      method: 'POST',
      url: '/pet',
      body: invalidPet,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


  it('should fail to update a pet with a non-existent pet ID (404 Not Found)', () => {
    const updatedPet = createDummyPet();
    updatedPet.id = 999999999;
    updatedPet.name = 'Non-existent Pet';

    cy.request({
      method: 'PUT',
      url: '/pet',
      body: updatedPet,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should fail to update a pet with invalid data types (400 Bad Request)', () => {
    const invalidUpdatedPet = {
      id: petId,
      name: 'Updated Pet',
      category: { id: faker.number.int(), name: faker.animal.type() },
      photoUrls: [faker.image.url()],
      status: 'available'
    };

    // Invalid data type for ID
    invalidUpdatedPet.id = 'invalid-id';

    cy.request({
      method: 'PUT',
      url: '/pet',
      body: invalidUpdatedPet,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


  it('should find pets by valid status (200 OK)', () => {
    cy.request('GET', '/pet/findByStatus?status=available').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should fail to find pets by invalid status (400 Bad Request)', () => {
    cy.request({
      method: 'GET',
      url: '/pet/findByStatus?status=invalid_status',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


  it('should find pets by valid tags (200 OK)', () => {
    cy.request('GET', '/pet/findByTags?tags=dog').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should fail to find pets by invalid tags (400 Bad Request)', () => {
    cy.request({
      method: 'GET',
      url: '/pet/findByTags?tags=invalid_tag',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


  it('should find pet by valid ID (200 OK)', () => {
    cy.request('GET', `/pet/${petId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', petId);
    });
  });

  it('should fail to find pet by invalid ID (404 Not Found)', () => {
    cy.request({
      method: 'GET',
      url: '/pet/999999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });


  it('should update pet with valid form data (200 OK)', () => {
    const formData = new FormData();
    formData.append('name', 'Updated Pet');
    formData.append('status', 'available');

    cy.request({
      method: 'POST',
      url: `/pet/${petId}`,
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should fail to update pet with invalid ID (404 Not Found)', () => {
    const formData = new FormData();
    formData.append('name', 'Updated Pet');
    formData.append('status', 'available');

    cy.request({
      method: 'POST',
      url: '/pet/999999999',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('should fail to update pet with missing form data (400 Bad Request)', () => {
    cy.request({
      method: 'POST',
      url: `/pet/${petId}`,
      body: {},
      headers: { 'Content-Type': 'multipart/form-data' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });


  it('should delete a pet with valid ID (200 OK)', () => {
    cy.request('DELETE', `/pet/${petId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should fail to delete a pet with invalid ID (404 Not Found)', () => {
    cy.request({
      method: 'DELETE',
      url: '/pet/999999999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
