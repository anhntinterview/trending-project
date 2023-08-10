module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/**.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@db/(.*)$': '<rootDir>/src/database/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@root/(.*)$': '<rootDir>/$1',
        // Add other aliases as needed
    },
};
