
# Project Title

Problem Statement

Hey there, Mr. X. You have been appointed to design a railway management system like IRCTC, where users can come on the platform and check if there are any trains available between 2 stations.
The app will also display how many seats are available between any 2 stations and the user can book a seat if the availability > 0 after logging in. Since this has to be real-time and multiple users can book seats simultaneously, your code must be optimized enough to handle large traffic and should not fail while doing any bookings. If more than 1 users simultaneously try to book seats, only either one of the users should be able to book. Handle such race conditions while booking.

There is a Role Based Access provision and 2 types of users would exist :
1. Admin - can perform all operations like adding trains, updating total seats in a train, etc.
2. Login users - can check availability of trains, seat availability, book seats, get booking details, etc.

Mandatory requirement:

1. You need to protect all the admin API endpoints with an API key that will be known only to you and the admin so that no one can add
false data to your system.

2. For booking a seat and getting specific booking details, you need to send the Authorization Token received in the login endpoint.

## Tech Stack

**Server:** Node, Express

**Database:** SQL


## Features

- Register a User
- Login User
- Add a New Train
- Get Seat Availability
- Book a Seat
- Get Specific Booking Details



## API Reference

#### Users

```http
  POST /api/auth/login
```
```http
  POST /api/auth/register
```



#### Trains

```http
  GET /api/trains/getTrains?source=${src_station}&destination=${dest_station}
```
```http
  GET /api/bookings/getBooking/${user_id}
```
```http
  POST /api/trains/add
```
```http
  POST /api/bookings/bookSeat
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
`PORT`

`DB_HOST`

`DB_USER`   

`DB_PASSWORD` 

`DB_NAME`

`DB_PORT`    

`JWT_SECRET`

`ADMIN_API_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/jkarthik-2004/IRCTC_API.git
```

Go to the project directory

```bash
  cd IRCTC_API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
