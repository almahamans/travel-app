# Travel App
## Description 
An app to obtains a desired trip location, start date and end date from the user then displays weather and an image of the location using information obtained from external APIs. The app suitable for all screen's size.

The app abel to check the value of entered input for destination if contain numbers also check the entered dates if it's in correct way then display error messages. The app should display more than one Trip card in browser each has it is own information.
## Built with 
- html5.
- scss > to make style and make the app responsive.
- js dom.
- node > upload all packegas.
- express > build routeres.
- geonames api > get cities name.
- Weatherbit api > get weather forcast.
- Pixabay api > get images based on the entered city.
- Linked to-do list app (previous work) so the user can arrange she/he's trip.
## How to use it 
- To ensure all packages and dependencies installed:

`npm install`

- To builds and generates dist folder for production:

`npm run build-prod`

- To builds and runs the webpack dev server for development:

`npm run build-dev`

- To run express serevr (port 3005):

`npm start`

- To test:

`npm test`
