# Travel App
## Description 
An app to obtains a desired trip location, start date and end date from the user then displays real-time weather information, temperature and an image of the location using information obtained from external APIs as well as trip long in days and how many days left to fly. The app suitable for all screen's size.

The app abel to check the value of entered input for destination if contain numbers also check the entered dates if it's in correct way then displays error messages. The app should display more than one Trip card in browser each has it is own information. 

The user can remove one trip card or all.
## Built with 
- Html5 > to build form and inhance the SEO.
- Css > to make style and make the app responsive.
- JS dom.
- Node js > to upload all packegas.
- Express > to build routeres and server.
- Geonames api > accept city/country name and return lat and lon.
- Weatherbit api > accept city/country name and what returned from geonames api; return weather forcast.
- Pixabay api > to get images based on the entered city.
- Linked to-do list app (previous work) so the passenger can arrange its trip.
## How to use it 
- To ensure all packages and dependencies installed:

`npm install`

- To run express serevr (port 3001):

`npm start`

- To test:

`npm test`

## Photos of the project
#### - UI (linked To-Do app -previose work- to help the passenger to arrange its trip)
![UI](https://user-images.githubusercontent.com/43613434/236657237-30ccdc6a-cffb-4c31-868a-3c573b9818bd.png)
#### - User can type distenation and dates of the trip
![User can type distenation and dates of the trip](https://user-images.githubusercontent.com/43613434/236657267-c1d1a234-0016-4486-a819-58e94c331546.png)
#### - Result after pressing search button and shows the ability to add multiple cards
![Result](https://user-images.githubusercontent.com/43613434/236657339-f86773d9-9d64-48a6-8435-7de98b4979e6.png)




### Future work
 Add localStorage, add information about the entered destination and use React js framework 
