module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.test.js',
        '<rootDir>/src/**/*.test.js'
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx}',
        '!src/**/index.{js,jsx}',
        '!src/**/*.config.{js,jsx}',
        '!src/**/*.setup.{js,jsx}'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/.next/',
        '/out/',
        '/dist/'
    ],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(@tanstack/react-query|use-debounce)/)'
    ]
};
