# Freedom Walking Boilderplate

I want to build a boilerplate with a skeleton including the backend, the front end was developed based on Object Oriented Programming, the unit test, and CICD. This project will be reused for the particular project in the future. This project means to show up my skills so some technology will be duplicated

## Tech stack

### Backend: 
- NextJS: **pages/api**
- Restful API
- GraphQL
- Socket IO

### Front-end: 
- State Management: **Redux Toolkit** was customize to match with OOP & **Vercel SWR** for NextJS
- Micro front-end  **NXJS** includes: + 
    - packages/app: This is an application that uses template UI and library core projects to save many develop time
    - packages/core: Where will create logic for any application. This project has responsible like as library. It will be integrated with 3rd library or created by myself
    - packages/template: Where will create customized UXUI for any application. This project used **TailwindCSS/PostCSS** as a core framework

### CICD:
- **Docker**: Using **Docker Hub** as a repository to store projects before deploying to the server
- **GitHub Actions**: Continue Integrated and Continue Delivery. I split 3 environments including the dev, staging, and prod server. Each step in CICD also was cached to save much time when installing packages, testing, and deploying to the server

### VPS (Virtual Private Server)
- **Digital Ocean** Droplet

### Database:
- **PostgreSQL**
- **Typeform**

### Unit Test
- **Jest Library**

## Packages Version
- TypeScript: 5.0.4
- NextJS 13.3.1
- React: 18.2.0
- Tailwinds 3.3.1
- Typeform 0.3.15
- Postgres ^8.4.0
- reflect-metadata ^0.1.13
- node: ^19.7.3
- pg: ^8.6.6

## How to Start and Usage

The front-end app at front-end and API at backend were developed on NextJS.
- It was used absolutely path
- Allow to use Decorator
- Apply reflected-metadata

### Backend:
```typescript
yarn dev
yarn test
yarn build & yarn start
```
   The route displayed on the browser looks like this: localhost:3000/api/test
### Front-end:
   For application project
```typescript
 yarn dev:app
```
   For core project
```typescript
yarn dev:core
```
  For template project
```typescript
yarn dev:template
```
### Configuration
TypeScript config
```typescript
{
  "ts-node": {
    // Do not forget to `yarn add -D tsconfig-paths`
    "require": [
      "tsconfig-paths/register"
    ]
  },
  "compilerOptions": {
    "lib": [
      "es5",
      "es6",
      "DOM"
    ],
    ...
    "outDir": "./build",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    ...
    "baseUrl": ".",
    "paths": {
      "@db/*": [
        "./src/database/*"
      ],
      "@*": [
        "./src*"
      ],
      "@root/*": [
        "./*"
      ]
    },
    "plugins": [
      {
        "name": "next"
      }
    ],
    "strictNullChecks": true
  },
  "include": [
    "src",
    "**/*.ts",
    "**/*.tsx",
    "next.config.js",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

```
Jest Configuration
```typescript
module.exports = {
    preset: 'ts-jest',
    setupFiles: ["dotenv/config"],
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
```
jest.setup.ts
```typescript
import 'reflect-metadata';
```
tailwind.config.js
```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
```
### Environment
- dev
- staging
- prod
- local.development
- local.production

### Other