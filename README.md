# Expensesapp

## Requirements

- Node and NPM
- Maven

## Run

First, you need to import the project as an "Existing Maven Project", then run it as Java Application.

When the application has started, in a command line, go to the _front_ folder and run: `npm i && npm start`. This will build the project directly to the `targes/static` folder in watch mode, so your changes will be compiled and placed there in every save.

Open in the browset `http://localhost:8080`. User: `test@test.com`, password: `password`.

## Build

Inside the _front_ folder: `npm run build`

Then, in the root folder, run: `mvn package`

To run the built application, go to `target` and run `java -jar expensesapp-0.0.1-SNAPSHOT.jar`
