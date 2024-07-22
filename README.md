# wbtask

## Requirements

1. Node.js v20.
2. Firebase CLI: Install, authenticate, and download the functions, auth, and firestore emulators.

## Running Locally

1. Change into the functions directory.
2. Install package dependencies with npm.
3. Copy `functions/sample.env` to `functions/.env` and set the appropriate environment variables. The `functions/service-account-key.json` is only required when deploying functions.
4. In one terminal, with functions as working directory, run `npm run watch` to compile typescript in watch mode.
5. In another terminal, with functions as working directory, run `npm run serve` to start the firebase emulators.
