# TownSquare

Social Media App

## Website

[Click here to watch a video demo](https://drive.google.com/file/d/1Ext6K_odyTyfKsVvN2OWercw-vLhbpZu/view)

## Description

TownSquare is a social media application designed for user interactivity. It allows users to create profiles, post thoughts, and respond to others' posts. The most important feature of the app is the ability to manage friend connections, you can add or remove friends. Functionality for updating and deleting posts provides users with control over their content. The application utilizes the power of MongoDB's CRUD operations, while Express.js provides the routing.

## Installation

1. Run "npm install" in CLI
2. Run "npm start" in CLI
3. Now you can go to Insomnia to test all the routes

## Table of Contents

- [Website](#website)
- [Description](#description)
- [Installation](#installation)
- [Technology](#technology)
- [Usage](#usage)
- [Image](#image)
- [Code](#code)
- [Learning](#learning)
- [Author](#author)
- [Credits](#credits)
- [Contributing](#Contributing)
- [Questions](#questions)
- [License](#license)

## Technology

- Express.js
  [Learn about Express.js](https://expressjs.com/)

- Node.js
  [Learn about Node.js](https://nodejs.org/en)

- Day.js
  [Learn about Day.js](https://day.js.org/)

- Insomnia
  [Learn about Insomnia](https://insomnia.rest/)

- JavaScript
  [Learn about JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- Mongoose
  [Learn about Sequelize](https://mongoosejs.com/)

- MongoDB
  [Learn about dotenv](https://www.mongodb.com/)

- Git
  [Learn about Git](https://git-scm.com/)

## Usage

This back-end app allows you to create, update and delete users, posts, comments, reactions and friends

# Image

![Alt Text](/Images/Screenshot%202023-05-23%20at%2012.48.40%20AM.png)

## Code

I wanted to highlight this code snippet because the deleteThought function is an basic example of a RESTful API DELETE route in Mongoose/MongoDB, showcasing how to handle data deletion in a database. This snippet illustratess the asynchronous nature of JavaScript with the utilization of promises. After deleting a thought by its ID, it ensures data integrity by also updating the associated user's thoughts.

```JavaScript
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json(err));
  },

```

## Learning

- MongoDB
- Mongoose
- mongoose/MongoDB file structure
- API testing with Insomnia

## Author

Matthew Gibson

- [Portfolio](https://github.com/ohSweetWampum)
- [LinkedIn](https://www.linkedin.com/in/matthew-gibson-6b9b12237/)
- [Github](https://github.com/ohSweetWampum)

## Credits

- Thanks to all the instructors and the in-class examples/activities they provided were especially helpful for this application.

## Contributing

If you would like to contribute, please contact me at [mtgibson888@gmail.com](mailto:mtgibson888@gmail.com)

## Questions

If you have any questions about this application, please contact me at [mtgibson888@gmail.com](mailto:mtgibson888@gmail.com) or check out my [GitHub Profile](https://github.com/ohSweetWampum)

## License

This application is covered by the MIT license

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

```

```
