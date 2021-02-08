# Reversi Game
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a board game to play 1v1 or vs computer.<br/><br/>
Project is using Client - REST API Architecture.<br/><br/>
Users are authenticated with JSON Web Token.


## Technologies
Project is created with:
* PHP version: 7.4
* Laravel version: 8.0
* React version: 16.14
* Typescript: 4.0

## Setup
To run this project:

```
Front:
cd game
npm install
npm start

Api:
cd api
composer install
php artisan serve

Also is needed to configure database and .env file.
