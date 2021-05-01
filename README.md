# Pyplanet-Stats   
![](https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png)
[![](https://img.shields.io/badge/license-Creative%20Commons%20Attribution--NonCommercial--NoDerivatives%204.0%20International%20License-informational)](http://creativecommons.org/licenses/by-nc-nd/4.0/)

### Web application that provide statistics about a Trackmania server running on PyPlanet (https://github.com/PyPlanet/PyPlanet)

Example:
![](https://i.imgur.com/btUbFwp.png)

### Main features
* Compatible with a Trackmania2020 or a ManiaPlanet server running on PyPlanet
* View and sort: 
  - players
  - record of a players
  - maps
  - map records
  - all records
* Can be sorted by rank, login, nickname, average, ..
* Easily customizable :
  - Language selection : English or French
  - Dark/Light Mode
  - Set default rows per page
  - Language, dark/light mode and default rows per page are saved in memory for the next visit
  - Resize sidebar/drawer

### Built With
* [NestJS](https://nestjs.com/)
* [Vue](https://vuejs.org)
* [Vuetify](https://vuetifyjs.com/en/)

Prerequisites
- **A Web server**
- **A PyPlanet database**
- **node**
- **npm**

### Installation
**1. Clone the repo**
```sh
# HTTPS
git clone https://github.com/micm0/pyplanet-stats.git
```
**2. Install NPM packages**
```sh
cd frontend/
npm install
cd ..
cd backend/
npm install
```
**3. Setup and run backend**<br/>
Create a new file called `ormconfig.json` in backend directory
and fill it with the pyplanet database details you want to use.
```
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "pyplanet_database",
  "entities": ["dist/**/*.entity{.ts,.js}"]
}
```
Build backend with
`npm run build`

Run with
`npm run start:prod`

**4. Setup and run frontend**<br/>
- Host the frontend on a domain name or localhost to `frontend/dist/`. Backend can be hosted with a proxy.

- Edit as you wish the file ´frontend/public/config.json´
  * drawerImage -> link to an image to be shown on the left side menu
  * mxOrTmx -> mx for TM², Tmx for TM2020
  * apiSite -> link to the backend api
  ```
  {
    "drawerImage": "https://image.link",
    "mxOrTmx": "mx",
    "apiSite": "http://localhost:3000/api"
  }
  ```
- Build frontend with
  `npm run build`


