<!-- PROJECT SHIELDS -->

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/johnloberger/MyClimate-Frontend">
    <img src="https://media.giphy.com/media/VI2UC13hwWin1MIfmi/giphy.gif" alt="Logo">
  </a>

  <h3 align="center">Welcome to MyClimate!</h3>

  <p align="center">
    This React front-end, Ruby on Rails back-end web application is designed to allow individuals to view real-time data pertaining to air quality index and ClimateScore. 
    <br />
    <br />
    <a href="https://myclimate.netlify.app/login">🖥️ LIVE Demo!</a>
    ·
    <a href="https://github.com/johnloberger/MyClimate-Frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/johnloberger/MyClimate-Frontend/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://i.imgur.com/9DtnaKz.png)

If you didn't know, our planet is changing. In many ways, our planet is improving positively, however, this is not true for every aspect surrounding this floating rock we call home. I wanted to create an application to visualize air pollution across the globe and spread awareness to the impending doom which is climate change.

Here's why:
* I was extremely curious in experimenting with API technologies such as Google Maps and the World Air Quality Index API
* I am a passionate humanitarian who values all human life, which is currently being threatened by globally increasing temperatures
* If only 1% of my network stumbles upon this web application and feels compelled to contribute to any climate change fund then I will have made a difference no matter how futile

Creating this web application was an extremely emotional rollercoaster with many ups, and many, many downs. I had never worked with external API technologies before and there are about five different Google Map React packages to choose from.

Regardless, I really hope you enjoy the interactive map and get to explore your favorite location's air quality index scores and forecasts!

### Built With
Below are all of the technologies, libraries, and packages I used to create this application. This may not be an all-encompassing list.
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Material UI](https://material-ui.com/)
* [Chart JS](https://www.npmjs.com/package/react-chartjs-2)
* [Ruby on Rails](https://rubyonrails.org/)
* [Google Maps API](https://www.npmjs.com/package/google-maps-react)
* [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/overview)
* [Google Places Autocomplete](https://developers.google.com/places/web-service/autocomplete)
* [World Air Quality Index API](https://aqicn.org/api/)
* [Climate Score™ API](https://rapidapi.com/sameckhouse/api/climate-score)



<!-- GETTING STARTED -->
## Getting Started

To setup and run this project locally, please complete the following instructions.

### Prerequisites

You should know how to setup basic React apps and RoR APIs.

### Installation

1. Clone the 'Frontend' repo
```sh
git clone https://github.com/johnloberger/MyClimate-Frontend.git
```
2. Clone the 'Backend' repo
```sh
git clone https://github.com/johnloberger/MyClimate-Backend.git
```
3. Install packages on the back-end directory
```sh
bundle install
```
4. Create the database
```sh
rails db:create
```
5. Migrate the database
```sh
rails db:migrate
```
6. Seed the database if you want!
```sh
rails db:seed
```
7. Start the back-end server on a different port!
```sh
rails s -p 3001
```
8. Install NPM packages on the front-end directory and start the server!
```sh
npm install && npm start
```
9. Enjoy the application



<!-- USAGE EXAMPLES -->
## Usage

To use this application, simply explore the Google Map and hover/click on any map marker to reveal the data for that location. Locations can be saved to a user's 'saved locations.'


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/johnloberger/MyClimate-Frontend/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

John Loberger - [My Website](http://jloberger.com) - johnloberger@gmail.com

Project Link: [https://github.com/johnloberger/MyClimate-Frontend](https://github.com/johnloberger/MyClimate-Frontend)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [© 2008-2019 The World Air Quality Project](https://aqicn.org/faq/)
* [ClimateScore™](https://climatescore.com/)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[forks-shield]: https://img.shields.io/github/forks/johnloberger/MyClimate-Frontend.svg?style=flat-square
[forks-url]: https://github.com/johnloberger/MyClimate-Frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/johnloberger/MyClimate-Frontend.svg?style=flat-square
[stars-url]: https://github.com/johnloberger/MyClimate-Frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/johnloberger/MyClimate-Frontend.svg?style=flat-square
[issues-url]: https://github.com/johnloberger/MyClimate-Frontend/issues
[license-shield]: https://img.shields.io/github/license/johnloberger/MyClimate-Frontend.svg?style=flat-square
[license-url]: https://github.com/johnloberger/MyClimate-Frontend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/johnloberger

