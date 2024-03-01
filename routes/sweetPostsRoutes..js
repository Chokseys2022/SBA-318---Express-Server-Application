const express = require("express");
const router = express.Router();

const sweetPosts = require("./data/sweetPosts");
const error = require("./utilities/error");

router
  .route("/")
  .get((req, res) => {
    res.json(sweetPosts);
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.dessertType && req.body.flavor && req.body.quantity && req.body.pickupOptions) {
      const post = {
        id: sweetPosts[sweetPosts.length - 1].id + 1,
        userId: req.body.userId,
        dessertType: req.body.dessertType,
        flavor: req.body.flavor,
        quantity: req.body.quantity,
        pickupOptions: req.body.pickupOptions,
      };

      sweetPosts.push(post);
      res.json(sweetPosts[sweetPosts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const id = parseInt(req.params.id);
    const post = sweetPosts.find((p) => p.id === id);
    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    const id = parseInt(req.params.id);
    const post = sweetPosts.find((p, i) => {
      if (p.id === id) {
        for (const key in req.body) {
          sweetPosts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const id = parseInt(req.params.id);
    const index = sweetPosts.findIndex((p) => p.id === id);
    if (index !== -1) {
      const deletedPost = sweetPosts.splice(index, 1);
      res.json(deletedPost);
    } else {
      next();
    }
  });

module.exports = router;
