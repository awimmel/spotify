# Spotify Analysis
This is a simple web application that takes users' JSON streaming history files (provided by Spotify) and analyzes their listening habits accordingly.
**Please note that this project is very much a work in progress and is far from its finished state.**

# Dependencies
- [core-js v3.6.5](https://www.npmjs.com/package/core-js)
- [TypeScript v4.1.3](https://www.typescriptlang.org/)
- [Vue v2.6.12](https://vuejs.org/v2/guide/installation.html)
- [Quasar v1.15.19](https://quasar.dev/)
- [Axios v0.21.1](https://www.npmjs.com/package/axios)
- [Node.js v10.16.3](https://nodejs.org/en/)
- [Express v4.17.12](https://www.npmjs.com/package/express)
- [MongoDB v3.6.18](https://www.npmjs.com/package/mongodb)
- [bcrypt v5.0.1](https://www.npmjs.com/package/bcrypt)
- [body-parser v1.19.0](https://www.npmjs.com/package/body-parser)
- [config v3.3.6](https://www.npmjs.com/package/config)
- [cors v2.8.5](https://www.npmjs.com/package/cors)
- [Helmet v4.6.0](https://www.npmjs.com/package/helmet)
- [Mongoose v.5.12.15](https://www.npmjs.com/package/mongoose)
- [Morgan v1.10.0](https://www.npmjs.com/package/morgan)

# Current State
- Logging in and creating users seems to work, but definitely has some bugs that need to be fixed.
- Users can upload files once they're signed in, and a Quasar table displays some simple statistics regarding their listening habits.

# Recent Updates
- Most recent push allows automatic sign-in for newly created users and provides a more graceful to handle failed login attempts

# Future work
- Uploaded JSON files need to be stored in MongoDB and tied to their corresponding users. This will allow for users to leave the site and review their analysis on a subsequent visit.
- Certain actions for users, such as signing out, keeping a user logged in upon a page refresh, and changing their username/password are necessary features to add soon.
- The analysis of users' streaming histories is pretty trivial at the moment. In the future, I should work on developing more complex measures of users' habits.
- The current solution for finding a user's top artists and songs is far from the most efficient solution.
- Microsoft's PowerBI could be useful in the future as I look for graphical ways to represent each user's data.
- Making calls to Spotify's API would provide users with even more details into their listening habits, and I should definitely research its potential uses more in the future.
- Of course, the application's styling could also be drastically improved.
