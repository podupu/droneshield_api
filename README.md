# Petstore API Testing

#CI/CD
[CircleCI](https://app.circleci.com/pipelines/circleci/QmhhSZw4MHEYrcV7zaF5La/D9wuaMemB4RiAqLfqVAg1P?branch=master)


<img src="images/ci.png" width="900">



#Report
[https://output.circle-artifacts.com/output/job/c38bb55a-93a9-448b-9916-5f7b0c8e3474/artifacts/0/cypress-reports/mochawesome.html]


<img src="images/report.png" width="900">

## Overview

This project contains automated tests for the Swagger Petstore API, focusing on CRUD operations for the "Pets" resource. The testing is done using Cypress with TypeScript. Additionally, performance tests are included using Apache JMeter, and Postman collections are run using Newman for API testing.

**Please look for details in the below files**:
- README.md 
- TESTPLAN.md 
- EXERCISE.md
- BUGREPORT.md

## Prerequisites

- Node.js and npm (for running Cypress and Newman)
- Apache JMeter (for performance testing)
- Postman (to export the Postman collection)
- Cypress and Newman installed globally or locally

## Setup

## Prerequisites
- Node.js (>= 16.x)
- npm (>= 6.x)


## 1. Clone the Repository

```bash
git clone https://github.com/podupu/droneshield_api.git
cd droneshield_api
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run Cypress Tests

To run the Cypress tests, use:

```bash
npx cypress open
```

Or to run the tests headlessly:

```bash
npx cypress run
```

## 4. Running Tests

- Run all tests: `npm test`
- Open Cypress Test Runner: `npm run test:open`

## Project Structure

- **cypress/e2e/api-tests**: Contains API test cases.
- **cypress/support**: Custom commands and setup.
- **cypress/plugins**: Cypress plugins configuration.


### Run Postman Collection with Newman

1. **Install Newman**:

   ```bash
   npm install -g newman
   ```

2. **Run Collection**:

   ```bash
   newman run petstore-collection.json
   ```

3. **Generate HTML Report**:

   ```bash
   newman run petstore-collection.json -r html --reporter-html-export report.html
   ```


## Performance Testing with JMeter

1. **Download and Install JMeter**:
   - Download JMeter from [Apache JMeter](https://jmeter.apache.org/download_jmeter.cgi).

2. **Run Performance Tests**:
   - Execute the test using JMeter GUI or CLI:
     ```bash
     jmeter -n -t petstore-jmeter-test.jmx -l performance-results.jtl
     ```
   - Analyze the results using JMeter or a JTL file viewer.


## Reporting Issues
Please refer to the `BUGREPORT.md` file for the bug reporting template.
