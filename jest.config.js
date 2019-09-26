module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    modulePathIgnorePatterns: [
      "<rootDir>/dist"
    ],
    moduleFileExtensions: ['ts', 'js'],
    verbose: true,
    coverageDirectory: './coverage/',
    collectCoverage: !!process.env.CI,
    collectCoverageFrom: ['src/**/*.ts'],
};
