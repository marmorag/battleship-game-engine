module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'js'],
    verbose: true,
    coverageDirectory: './coverage/',
    collectCoverage: !!process.env.CI,
    collectCoverageFrom: ['src/**/*.ts'],
};
