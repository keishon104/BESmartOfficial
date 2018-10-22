# BE Smart Hackathon 2018

During the [Black Enterprise BE Smart Hackathon](https://www.blackenterprise.com/besmart/) the Florida A&M University team made a application to solve current problems that American Airlines experienced. Those problem areas included: before traveling to the airport, traveling to the airport, and traveling from one flight to another. Our application gives users the ability to use AR to scan size of travel luggage, pay for luggage inside the app, view directions to the American Airlines Terminal, Request a Uber to the Terminal, converse with a chatbot, and use Facial Recognition to speed up the TSA process. In addition we planned of notifying the user when to leave their current location based on their distance from the airport and when their flight is scheduled to leave.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node.js - Visit https://nodejs.org to download the software.
Development IDE - Our Team utilized Atom IDE to develop and test our code.
Kairos API keys.
Google Maps Keys
Uber Account
Twilio API Keys.

```

### Installing

To install the project and have it begin to run, do the following.


1. Clone Repo locally
```
$ git-clone https://github.com/keishon104/BESmartOfficial.git
```
2. install dependencies
```
$ npm install
```

3. Input the correct credentials to use the necessary APIs.
4. Run the program using

```
$ node server.js

or

$ nodemon server.js
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

There is currently no way to run tests on our code.


## Deployment

This code is currently deployed on the following links:
* **Version 1** - [Heroku](https://be-smart-hackathon.herokuapp.com)   
* **Version 2** - [Heroku](https://be-smart-ai.herokuapp.com)   


## API's Used

* [NodeJS](https://nodejs.org/en/) - a JavaScript runtime
* [ExpressJS](https://expressjs.com/) - a minimal and flexible Node.js web application framework.
* [Twilio](https://www.twilio.com/) - API used to send SMS to users.
* [API.AI](https://www.twilio.com/) - API used to train a chatbot that can understand language and respond to users.
* [Kairos Facial Recognition](https://www.kairos.com/) - API used to detect and recognize faces using Machine Learning.
* [DHS TSA API](https://www.dhs.gov/mytsa-api-documentation) - Returns the TSA wait time for airports.  



## Contributing

Please contact us if you want to contribute towards this project.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/keishon104/BESmartOfficial/tags).

## Authors

* **Brianna Bowen** - *Initial work* - [GitHub](https://github.com/bbowen22)

* **Daroush Renoit** - *Initial work* - [GitHub](https://github.com/dpeace8)

* **Kiana Blaine** - *Initial work* - [GitHub](https://github.com/k12blaine)

* **Keishon Smith** - *Initial work* - [GitHub](https://github.com/keishon104)




See also the list of [contributors](https://github.com/keishon104/BESmartOfficial/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Our team would like to thank the Black Enterprise for the opportunity to showcase our skills and network with fellow black entrepreneurs at the 2018 Black Enterprise Summit in San Francisco, California.

Made with :green_heart: by :snake:
