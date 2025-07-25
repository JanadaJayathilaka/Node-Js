const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
// blog routes
router.get("/", (req, res) => {
  blogController.blog_index(req, res);
});

router.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/create", (req, res) => {
  res.render("create", { title: "Create Page" });
});

router.get("/:id", (req, res) => {
  blogController.blog_details(req, res);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});
// export the router
module.exports = router;
