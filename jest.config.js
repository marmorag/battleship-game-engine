module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: 'node',
    verbose: true,
};
