// this file was taken from week 8 lab
module.exports = (express, app) => {
    const controller = require("../controllers/reaction.controller.js");
    const router = express.Router();

    // Add a reaction to a post
    router.post("/", controller.create);

    // Add a reaction to a post
    router.delete("/", controller.destroy);
  
    // Add routes to server.
    app.use("/api/react", router);
  };
  