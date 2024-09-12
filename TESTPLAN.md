
# Petstore API Testing

## Test Plan and Strategy

### 1. Introduction

This document outlines the test plan for API testing of the Swagger Petstore. The goal is to ensure that the Petstore API behaves as expected for all CRUD operations related to the "Pets" resource.

### 2. Objectives

- Verify the correct creation of pets.
- Validate retrieval of pet details.
- Test updates to existing pet records.
- Ensure proper deletion of pets.

### 3. Scope

The testing will cover the following operations for the "Pets" resource:

- **Create:** Adding new pets to the Petstore.
- **Read:** Retrieving pet details.
- **Update:** Modifying existing pet details.
- **Delete:** Removing pets from the Petstore.

### 4. Testing Strategy

#### 4.1. Testing Approach

- **Manual and Automated Testing:** While initial tests may be performed manually, automated tests will be developed for consistent and repeatable validation.
- **Tools:** Cypress for API testing with TypeScript.

#### 4.2. Testing Methodology

- **Positive Testing:** Verify that the API performs as expected with valid inputs.
- **Negative Testing:** Ensure the API handles invalid inputs and edge cases gracefully.
- **Boundary Testing:** Check the limits of input values and sizes.
- **Performance Testing:** Ensure the API performs well under typical load conditions.

### 5. Test Scenarios

#### 5.1. Create (POST /pet)

- **Valid Pet Creation**
  - **Input:** Valid pet data.
  - **Expected Result:** Pet is created successfully with a 200 OK status.

- **Missing Required Fields**
  - **Input:** Pet data missing required fields (e.g., name).
  - **Expected Result:** API returns a 400 Bad Request status with an error message.

- **Invalid Data Types**
  - **Input:** Pet data with invalid data types (e.g., string for id).
  - **Expected Result:** API returns a 400 Bad Request status indicating invalid data.

- **Duplicate Pet ID**
  - **Input:** Pet data with an existing pet ID.
  - **Expected Result:** API returns a 409 Conflict status.

#### 5.2. Read (GET /pet/{petId})

- **Valid Pet ID**
  - **Input:** Existing pet ID.
  - **Expected Result:** Pet details are returned with a 200 OK status.

- **Invalid Pet ID**
  - **Input:** Non-existent pet ID.
  - **Expected Result:** API returns a 404 Not Found status.

- **Pet ID Format**
  - **Input:** Pet ID with incorrect format (e.g., string instead of number).
  - **Expected Result:** API returns a 400 Bad Request status.

#### 5.3. Update (PUT /pet)

- **Valid Pet Update**
  - **Input:** Valid pet data with existing pet ID.
  - **Expected Result:** Pet is updated successfully with a 200 OK status.

- **Non-existent Pet ID**
  - **Input:** Valid pet data with a non-existent pet ID.
  - **Expected Result:** API returns a 404 Not Found status.

- **Invalid Data Types**
  - **Input:** Pet data with invalid data types (e.g., string for id).
  - **Expected Result:** API returns a 400 Bad Request status.

- **Partial Update**
  - **Input:** Update only specific fields (e.g., change status but not name).
  - **Expected Result:** Only the specified fields are updated.

#### 5.4. Delete (DELETE /pet/{petId})

- **Valid Pet Deletion**
  - **Input:** Existing pet ID.
  - **Expected Result:** Pet is deleted successfully with a 200 OK status.

- **Invalid Pet ID**
  - **Input:** Non-existent pet ID.
  - **Expected Result:** API returns a 404 Not Found status.

- **Unauthorized Deletion**
  - **Input:** Attempt to delete pet without proper authorization.
  - **Expected Result:** API returns a 401 Unauthorized status.

### 6. Test Data

- **Valid Pet Data:** Use the `createDummyPet` function to generate valid pet data for tests.
- **Invalid Pet Data:** Use invalid data formats and missing fields for negative testing.

### 7. Execution

- **Test Environment:** Tests will be executed against the Petstore API available at [https://petstore.swagger.io/](https://petstore.swagger.io/).
- **Test Schedule:** Test cases will be executed during the testing phase, with automated scripts running after each code change.

### 8. Reporting

- **Defects:** Any issues found during testing will be reported using the bug report format.
- **Test Results:** Results will be documented, including pass/fail status and any anomalies.

### 9. Conclusion

The test plan ensures comprehensive coverage of CRUD operations for the Pets resource. By validating the API against various scenarios, we aim to confirm the robustness and reliability of the Petstore API.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [Avinash Eediga](mailto:avinash.eediga@gmail.com).