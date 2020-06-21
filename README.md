
A Node js restful API that serves all the latest news using the [NewsAPI](https://newsapi.org/) endpoints. 

### Endpoints
  * /user 
    * /login (POST) - takes email and password in the request body and returns the user data as well as the access token.
    * /register (POST) - takes FullName, email and password, makes sure the email is not a duplicate and stores them in the Mongo collection.
    * /subscribe (PATCH) - takes access token and source's Id and adds it to the user's subscription array.
    * /unsubscribe (PATCH) - takes access token and source's Id and removes it from the user's subscription array.
    * /feed (GET) - takes access token and returns a response containing all articles published by the user's subscription list.
* /headlines - gets the latest news headlines from a specific news source.
  



### Usage
  - Made for consumption by any clientside app.




### Built with

* [Node JS](https://nodejs.org/en/) -  a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express JS](https://expressjs.com/) - Node.js web application framework that makes creating a robust API quick and easy.
* [Mongo DB](https://www.mongodb.com/) - NoSQL database program, MongoDB uses JSON-like documents with optional schemas.


### Dependencies

*[Mongoose](https://mongoosejs.com/)- MongoDB object modeling for Node.js. Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
* [express-validator](https://express-validator.github.io/docs/) - express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
*  [lodash](https://www.npmjs.com/package/lodash) - node utility library that provides helpful methods for modularity, performance & extras.
*  [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) - The most powerful schema description language and data validator for JavaScript. Used for registeration and login form validation.
* [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js that supprts automatic transforms for JSON data. Used for making requests to the NewsAPI endpoints.
 ### Security 

* [bcrypt](https://www.npmjs.com/package/bcryptjs) -  For hashing passwords and comparing hashed passwords with those provided by user. It uses salt rounds to increase the necessary time for hashing a password thus protecting against brute force attacks.
*  [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - allows you to decode, verify and generate JWT. The access token is included in all the request header to protect against CSRF attacks.
*  [Helmet](https://helmetjs.github.io/docs/) - Helmet is a collection of 12 middleware functions to help set some HTTP response headers to protect against xss attacks.


### Development 
* [nodemon](https://www.npmjs.com/package/nodemon) - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.


### Deployment

[Heroku](https://dashboard.heroku.com/apps) - a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

