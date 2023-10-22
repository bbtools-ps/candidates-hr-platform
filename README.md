# Candidates - HR assistance platform

Small web application for every HR professional. Some of the features:

- Search candidate by name or by skill
- Add/remove/edit candidate

This project uses [React.js](https://reactjs.org/), functional components and hooks.
It also uses 3rd party packages such as [zustand](https://zustand-demo.pmnd.rs/) for the global state management together with React's useContext, and [react-widnow](https://react-window.vercel.app/#/examples/list/fixed-size) for list virtualization/optimization.

For now this project doesn't communicate with a database, everything is done in the current session of the page. If the page is reloaded (e.g. Logo is clicked, or F5 key on the keyboard is pressed) all data is lost and the application is back to it's initial state.

## Project setup

To install all dependencies:

`npm install`

To start the project in the local development mode:

`npm start`

To make the build:

`npm run build`

To start the tests:

`npm test:unit`

`npm test:e2e`

Cypress studio
`npm test:cypress`

## Live demo

[Click here for the live demo](https://bbtools-candidates.netlify.app/)
