// this file was taken from week 8 lab
module.exports = (express, app) => {
    const controller = require("../controllers/post.controller.js");
    const router = express.Router();
  
    // Select all posts.
    router.get("/", controller.all);

    // Select a single post with id.
    router.get("/:id", controller.one);

    // Select a single post with id.
    router.patch("/:id", controller.update);
  
    // Create a new post.
    router.post("/", controller.create);

    // Delete an existing post.
    router.delete("/", controller.destroy);  
  
    // Add routes to server.
    app.use("/api/posts", router);
  };
  