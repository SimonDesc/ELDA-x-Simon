module.exports = {
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx'],
};
