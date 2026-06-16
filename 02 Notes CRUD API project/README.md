# 02 Notes CRUD API

A simple Notes CRUD API built using Node.js and Express.js. This project demonstrates basic CRUD (Create, Read, Update, Delete) operations using an in-memory array.

## Features

* Create a new note
* Get all notes
* Update an existing note
* Delete a note
* RESTful API structure

## Technologies Used

* Node.js
* Express.js
* JavaScript

## API Endpoints

### Create Note

**POST** `/notes`

Request Body:

```json
{
  "title": "Learn Express",
  "description": "Practice CRUD operations"
}
```

### Get All Notes

**GET** `/notes`

### Update Note

**PATCH** `/notes/:index`

Request Body:

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

### Delete Note

**DELETE** `/notes/:index`

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project folder:

```bash
cd 02-notes-crud-api
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

Server will run on:

```text
http://localhost:3000
```

## Learning Objectives

This project was created to practice:

* Express.js routing
* HTTP methods (GET, POST, PATCH, DELETE)
* Request and response handling
* REST API fundamentals
* CRUD operations

## Author

Shah Fahad
