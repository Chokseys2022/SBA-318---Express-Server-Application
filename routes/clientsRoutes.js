const express = require("express");
const router = express.Router();

const clients = require("./data/clients");
const { validateClient } = require("./utilities/validation");

router.route("/")
  .get((req, res) => {
    res.json(clients);
  })
  .post((req, res) => {
    const { name, username, email, newClient, contactNumber } = req.body;
    
    // Validate incoming data
    const validationError = validateClient(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Check for duplicate username
    if (clients.some(c => c.username.toLowerCase() === username.toLowerCase())) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const client = {
      id: clients.length > 0 ? clients[clients.length - 1].id + 1 : 1,
      name,
      username,
      email,
      newClient,
      contactNumber,
    };

    clients.push(client);
    res.status(201).json(client);
  });

router.route("/:id")
  .get((req, res, next) => {
    const client = clients.find(c => c.id == req.params.id);
    if (client) {
      res.json(client);
    } else {
      next();
    }
  })
  .patch((req, res, next) => {
    const client = clients.find(c => c.id == req.params.id);
    if (!client) {
      return next();
    }

    // Allow only specified properties to be updated
    const allowedProperties = ["name", "username", "email", "newClient", "contactNumber"];
    for (const key in req.body) {
      if (allowedProperties.includes(key)) {
        client[key] = req.body[key];
      }
    }

    res.json(client);
  })
  .delete((req, res, next) => {
    const index = clients.findIndex(c => c.id == req.params.id);
    if (index !== -1) {
      const deletedClient = clients.splice(index, 1)[0];
      res.json(deletedClient);
    } else {
      next();
    }
  });

module.exports = router;
