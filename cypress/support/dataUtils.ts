import { faker } from '@faker-js/faker';

export interface Pet {
    id: number;
    category?: {
        id: number;
        name: string;
    };
    name: string;
    photoUrls: string[];
    tags?: {
        id: number;
        name: string;
    }[];
    status: "available" | "pending" | "sold";
}

export interface Order {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: "placed" | "approved" | "delivered";
    complete: boolean;
}

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userStatus: number;
}

// Function to create dummy Pet data
export function createDummyPet(): Pet {
    return {
        id: faker.number.int({ min: 1, max: 10000 }),
        category: {
            id: faker.number.int({ min: 1, max: 100 }),
            name: faker.animal.type(),
        },
        name: faker.animal.dog(),
        photoUrls: [faker.image.url()],
        tags: [
            {
                id: faker.number.int({ min: 1, max: 100 }),
                name: faker.hacker.adjective(),
            }
        ],
        status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
    };
}

// Function to create dummy Order data
export function createDummyOrder(): Order {
    return {
        id: faker.number.int({ min: 1, max: 10000 }),
        petId: faker.number.int({ min: 1, max: 10000 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
        shipDate: faker.date.past().toISOString(),
        status: faker.helpers.arrayElement(['placed', 'approved', 'delivered']),
        complete: faker.datatype.boolean(),
    };
}

// Function to create dummy User data
export function createDummyUser(): User {
    return {
        id: faker.number.int({ min: 1, max: 10000 }),
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        userStatus: faker.number.int({ min: 0, max: 1 }),
    };
}