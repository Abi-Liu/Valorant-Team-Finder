<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Abi-Liu/Valorant-Team-Finder">
    <img src="client/src/assets/LogoIcon.svg" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">Valorant Team Finder</h3>

  <p align="center">
    Valorant Team Finder is a passion project that I decided to make because I couldn't find anywhere to matchmake with folks when playing solo.
    <br />
    It is a full-stack application where users can create an account and find teammates to queue with in the popular FPS game, Valorant. Users will have customized profiles showcasing their rank as well as tracking their statistics from their 5 most recent games so        users can see how they've been doing in their matches, as well as a review system to rate their experiences playing with that user. They can then join or create a team with other online users.
    <br />
    <a href="https://github.com/Abi-Liu/Valorant-Team-Finder"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Abi-Liu/Valorant-Team-Finder">View Demo</a>
    ·
    <a href="https://github.com/Abi-Liu/Valorant-Team-Finder/issues">Report Bug</a>
    ·
    <a href="https://github.com/Abi-Liu/Valorant-Team-Finder/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![typescript][typescript]][typescript-url]
- [![React][react.js]][react-url]
- [![Node][node.js]][node-url]
- [![express][express]][express-url]
- [![mongodb][mongodb]][mongodb-url]
- [![material][material]][material-url]
- [![jest][jest]][jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This project requires you to have NPM installed. If you don't, you can do so by entering this command in your terminal

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Abi-Liu/Valorant-Team-Finder.git
   ```
2. Install NPM packages in both the client and server folders
   ```sh
   cd client
   npm install
   ```
   ```sh
   cd backend
   npm install
   ```
3. Create a `.env` file in the root of the backend folder, and enter a PORT variable, Database connection variable, as well as a session secret variable
   ```md
   PORT = 8000;
   DB_STRING = "YOUR_DB_URI";
   SESSION_SECRET = YOUR_SECRET
   ```
4. start both the frontend and backend separately.

```sh
 cd client
 npm run dev
```

```sh
cd backend
npm start
```

_Note_ To run locally, you will need to change the urls in the project to your localhost port numbers. An easy way of doing this is to search for all instances of `valorantfinder` and change it to your respective localhost port.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

See the [open issues](https://github.com/Abi-Liu/Valorant-Team-Finder/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Abi Liu - abiliu018@gmail.com

Project Link: [https://github.com/Abi-Liu/Valorant-Team-Finder](https://github.com/Abi-Liu/Valorant-Team-Finder)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Abi-Liu/Valorant-Team-Finder.svg?style=for-the-badge
[contributors-url]: https://github.com/Abi-Liu/Valorant-Team-Finder/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Abi-Liu/Valorant-Team-Finder.svg?style=for-the-badge
[forks-url]: https://github.com/Abi-Liu/Valorant-Team-Finder/network/members
[stars-shield]: https://img.shields.io/github/stars/Abi-Liu/Valorant-Team-Finder.svg?style=for-the-badge
[stars-url]: https://github.com/Abi-Liu/Valorant-Team-Finder/stargazers
[issues-shield]: https://img.shields.io/github/issues/Abi-Liu/Valorant-Team-Finder.svg?style=for-the-badge
[issues-url]: https://github.com/Abi-Liu/Valorant-Team-Finder/issues
[license-shield]: https://img.shields.io/github/license/Abi-Liu/Valorant-Team-Finder.svg?style=for-the-badge
[license-url]: https://github.com/Abi-Liu/Valorant-Team-Finder/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/abiliu
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en
[express]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[mongodb]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[material]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[material-url]: https://mui.com/
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[jest]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[jest-url]: https://jestjs.io/
