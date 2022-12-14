// this file was taken from week 8 lab
module.exports = (express, app) => {
    const controller = require("../controllers/follow.controller.js");
    const router = express.Router();

    // Select all follower relations
    router.get("/", controller.all);

    // Select all subscribers to a publisher
    router.get("/subs/:pub", controller.subs);

    // Select all publishers to a subscriber
    router.get("/pubs/:sub", controller.pubs);

    // Establish a follower relationship
    router.post("/", controller.create);

    // Gte feed
    router.get("/feed/:id", controller.feed);

    // Remove a reaction by id
    router.delete("/:pub/:sub", controller.destroy);
  
    // Add routes to server.
    app.use("/api/follows", router);
  };
  