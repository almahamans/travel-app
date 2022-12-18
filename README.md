# Travel App
## Description 
An app to obtains a desired trip location, start date and end date from the user then displays weather discription and icon and an image of the location using information obtained from external APIs as well as trip long in days and how many days left to fly. The app suitable for all screen's size.

The app abel to check the value of entered input for destination if contain numbers also check the entered dates if it's in correct way then displays error messages. The app should display more than one Trip card in browser each has it is own information. 

The user can remove one trip card or all.
## Built with 
- Html5 > to build form.
- Scss > to make style and make the app responsive.
- JS dom.
- Node js > to upload all packegas.
- Express > to build routeres and server.
- Geonames api > accept city/country name and return lat and lon.
- Weatherbit api > accept city/country name and what returned from geonames api; return weather forcast.
- Pixabay api > to get images based on the entered city.
- Linked to-do list app (previous work) so the user can arrange her/his trip.
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
