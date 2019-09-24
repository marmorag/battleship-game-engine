module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
    verbose: true,
};
