<h1 align="center">
 
  <br>
  LinkedInsight 
</h1>

<p align="center">
  <b>An npm package for scraping LinkedIn profiles</b>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/linkedin-scrapper.svg" alt="npm version">
 
  <img src="https://img.shields.io/npm/l/linkedin-scrapper.svg" alt="license">
  <img src ="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm package">

</p>

------------------------------

LinkedInsight is an npm package that allows you to scrape LinkedIn profiles and retrieve information such as profile details, certifications, awards, skills, projects, experience, and education. It utilizes the cheerio and puppeteer libraries to parse and extract data from LinkedIn web pages.


-------------------------------------

## Installation

To install LinkedInsight, use npm:

```bash
npm install linkedin -sight
 ````

## Usage
Here's an example of how to use LinkedInsight to scrape a LinkedIn profile:

````

const scrapper = require("linkedin-scrapper");

scrapper({
    url: "pragati1157/", // e.g., Pragati Kumari/
}).then(res => console.warn(res));


````


Make sure to replace "profile-id/" with the actual LinkedIn profile ID you want to scrape. The scrapper function returns a promise that resolves to the scraped data.

## Dependencies
LinkedInsight relies on the following dependencies:

```
cheerio

puppeteer
```

Please ensure that you have these dependencies installed in your project.


## Disclaimer

It's important to note that web scraping may be against LinkedIn's terms of service. Make sure to review and comply with LinkedIn's policies before using LinkedInsight or any similar web scraping tools.


