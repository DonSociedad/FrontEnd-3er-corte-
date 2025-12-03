import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  preset: 'ts-jest',

  // 👇 ESTA ES LA SOLUCIÓN DEL ERROR
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default createJestConfig(config)
