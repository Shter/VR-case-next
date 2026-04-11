const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^cheerio$': '<rootDir>/node_modules/cheerio/dist/commonjs/index.js',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/lib/(.*)$': '<rootDir>/app/lib/$1',
    '^@/types/(.*)$': '<rootDir>/app/types/$1',
    '^@/data/(.*)$': '<rootDir>/app/data/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/layout.tsx',
    '!app/**/loading.tsx',
    '!app/**/error.tsx',
    '!app/**/template.tsx',
    '!app/**/page.tsx',
    '!app/**/globals.css',
    '!app/**/head.tsx',
    '!app/types/**/*',
    '!app/**/types/**/*',
    '!app/robots.ts',
    '!app/sitemap.ts',
    '!app/lib/supabase/**',
    '!app/components/client/RetroParallaxBackground.tsx',
    '!app/components/client/RetroBackgroundLoader.tsx',
    '!app/juegos/components/GameBrowser.tsx'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      statements: 0.7,
      branches: 0.6,
      functions: 0.65,
      lines: 0.7
    }
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
};

module.exports = createJestConfig(customJestConfig);
