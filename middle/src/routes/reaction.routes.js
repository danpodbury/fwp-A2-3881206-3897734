// this file was taken from week 8 lab
module.exports = (express, app) => {
    const controller = require("../controllers/reaction.controller.js");
    const router = express.Router();

    // Select a reaction
    router.get("/", controller.all);

    // Add a reaction to a post
    router.post("/", controller.create);

    // Update a single reaction with id.
    router.patch("/:id", controller.update);

    // Remove a reaction by id
    router.delete("/:id", controller.destroy);
  
    // Add routes to server.
    app.use("/api/reactions", router);
  };
  