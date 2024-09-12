# Bug Report 1

## Summary
GET /pet/{petId} returns a 500 Internal Server Error for non-existent pet IDs.

## Steps to Reproduce
Send a GET request to `/pet/999999999` with a non-existent pet ID.

## Expected Result
The API should return a 404 Not Found status indicating that the pet does not exist.

## Actual Result
The API returns a 500 Internal Server Error.

## Severity
Critical

## Priority
P1


# Bug Report 2

## Summary
DELETE /pet/{petId} endpoint returns incorrect status code for an invalid pet ID.

## Steps to Reproduce
Send a DELETE request to `/pet/999999999` with an invalid pet ID.

## Expected Result
The API should return a 404 Not Found status indicating that the pet does not exist.

## Actual Result
The API returns a 200 OK status with an empty response body.

## Severity
High

## Priority
P2



# Bug Report 3

## Summary
POST /pet/{petId}/uploadImage endpoint fails with unsupported image formats.

## Steps to Reproduce
Send a POST request to `/pet/1/uploadImage` with an image file of an unsupported format (e.g., `.gif`).

## Expected Result
The API should return a 400 Bad Request status with a message indicating that the file format is not supported.

## Actual Result
The API returns a 500 Internal Server Error.

## Severity
Critical

## Priority
P1


### Priority Levels
- **P1:** Critical issues, immediate fix required.
- **P2:** High-priority issues, needs prompt attention.
- **P3:** Medium-priority issues, address when possible.
- **P4:** Low-priority issues, minor impact.
- **P5:** Very low priority, deferred or non-essential.

These priorities help teams decide the order in which issues should be addressed and ensure that critical problems are resolved quickly while less urgent issues are handled in due course.