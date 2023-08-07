# FullStack Book App with React Redux and Django
A Fullstack CRUD Book App with Django User Authentication (Token Authentication), Technologies Used: React, Redux, Django, REST Framework, Knox, HTML, CSS, Bootstrap and Fontawesome

# Live Website
https://bookify-d04d6.web.app

# Setting up the Application

after downloading/cloning the repository code follow below steps (keep the whole code in some directory/folder first):

1) Move in backend folder through terminal and run following commands

`pipenv install`

`pip install requirements.txt`

`python manage.py runserver`

2) Move in frontend folder through terminal and run follwing commands

`npm i`

`npm start`

# Book CRUD System - README

This is a web application that allows users to perform CRUD operations on books. The application consists of two components: a Django backend API and a React frontend client.

## Getting Started

Follow the instructions below to set up and run the project locally on your machine.

### Prerequisites

- Node.js and npm
- Python 3 and pip
- PostgreSQL or MySQL database

### Installation

1. Clone the repository:

```
git clone `https://github.com/AyoBakre/bookify.git`
```

2. Backend setup:

   a. Create a virtual environment and activate it:

```
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
```

   b. Install dependencies:

```
pip install -r requirements.txt
```

   c. Set up the database:

```
# Create a PostgreSQL or MySQL database and update the database settings in settings.py
python manage.py makemigrations
python manage.py migrate
```

   d. Run the backend server:

```
python manage.py runserver
```

3. Frontend setup:

```
cd frontend
npm install
```

4. Run the frontend development server:

```
npm start
```

The application should now be running at http://localhost:3000.

## API Endpoints

### List of Books

GET /api/books/

Description: Retrieve a list of all books.

### Create Book

POST /api/books/

Description: Create a new book.

Request Body:

```
{
  "title": "Book Title",
  "author": "Book Author"
}
```

### Retrieve Book

GET /api/books/:id/

Description: Retrieve details of a specific book by its ID.

### Update Book

PUT /api/books/:id/

Description: Update an existing book by its ID.

Request Body:

```
{
  "title": "Updated Title",
  "author": "Updated Author"
}
```

### Delete Book

DELETE /api/books/:id/

Description: Delete a book by its ID.

## Deployment

To deploy the application to a production server, follow the steps below:

1. Backend:

   a. Set the `DEBUG` setting to `False` in `settings.py`.

   b. Collect static files:

```
python manage.py collectstatic
```

   c. Configure the database connection and other production settings in `settings.py`.

   d. Deploy the Django backend to a production server, I used Railway in my case. 

   e. Create the Procfile, runtime.txt and then link Github repo with railway

2. Frontend:

   a. Build the React frontend for production:

```
cd frontend
npm run build
```

   b. Deploy the build files to a web server, i used firebase. 

   c. run firebase deploy

## Authors

- [Ayomide Bakre](https://github.com/AyoBakre)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

