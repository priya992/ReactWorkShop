
# ReactWorkShop

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step series to get a development env running

```
1. git clone {{repo name}}
2. cd ReactWorkShop
3. npm install
4. npm run start
5. npm run start:dev (to run on watch mode - hot reloading)
5. run application on url: http://localhost:3000

```

## Running the tests

The test cases in the application uses the snapshot testing of Jest.

Run test cases using the below command on terminal

```
1. yarn run test

```

## Added Features

1. Fetching data using JSON file only (not added data in redux directly).
2. Added pagination using IntersectionObserver.
3. Added back to top button which scroll user to top. Back-To-Top button only appears when user scroll downs.
4. Added search functionality. On click of search icon, the search input field opens and in that user can enter the value. Added debouncing in search input.
5. While searching, pagination will not work. So need to close the search by clicking close icon button on top right corner.
6. Added empty state in case there is no search data available.
7. Added UT for components only for now using jest.
8. Added different chunk for footer.


### What can be improved

1. UT for container/actions and reducers.
2. We can configure Eslint
3. We can use module import resolver.
4. We can use Dark mode and lite mode themes for the app. We can follow this blog (https://javascript.plainenglish.io/implementing-dark-mode-reactjs-2fba91cda7f2).
5. We can use TypeScript to get the compile time errors.
6. We can use scss, emotions etc for styling. I ahve tried using it but there was some issue on webpack so using only css files.
