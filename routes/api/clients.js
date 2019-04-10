const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Client = require("../../models/Client");

// TODO: Load Input Validation
const validateClientInput = require("../../validation/client");

// @route   GET api/clients
// @desc    Get all clients
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Client.find()
      .sort({ name: "asc" })
      .then(clients => {
        if (clients.length === 0) {
          return res
            .status(404)
            .json({ noclientsfound: "There are no clients" });
        }
        res.status(200).json(clients);
      })
      .catch(err =>
        res.status(404).json({ noclientsfound: "There are no clients" })
      );
  }
);

// @route   GET api/clients/:clientId
// @desc    Get client by id
// @access  Private
router.get(
  "/:clientId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Client.findById({ _id: req.params.clientId })
      .then(client => res.json(client))
      .catch(err =>
        res.status(400).json({ noclientsfound: "No client found with that ID" })
      );
  }
);

// @route   POST api/clients
// @desc    Create client
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateClientInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newClient = new Client({
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      location: req.body.location,
      phone: req.body.phone,
      cleaningtype: req.body.cleaningtype,
      monthlypayment: req.body.monthlypayment,
      annualpayment: req.body.annualpayment,
      paymentYTD: req.body.paymentYTD,
      description: req.body.description
    });

    newClient.save().then(client => res.json(client));
  }
);

// @route   PATCH api/clients/:id
// @desc    Update client
// @access  Private
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updatedClientFields = {};
    updatedClientFields.user = { _id: req.user.id, name: req.user.name };

    if (req.body.name) updatedClientFields.name = req.body.name;
    if (req.body.company) updatedClientFields.company = req.body.company;
    if (req.body.email) updatedClientFields.email = req.body.email;
    if (req.body.location) updatedClientFields.location = req.body.location;
    if (req.body.phone) updatedClientFields.phone = req.body.phone;
    if (req.body.cleaningtype)
      updatedClientFields.cleaningtype = req.body.cleaningtype;
    if (req.body.monthlypayment)
      updatedClientFields.monthlypayment = req.body.monthlypayment;
    if (req.body.annualpayment)
      updatedClientFields.annualpayment = req.body.annualpayment;
    if (req.body.paymentYTD)
      updatedClientFields.paymentYTD = req.body.paymentYTD;
    if (req.body.description)
      updatedClientFields.description = req.body.description;

    Client.findOneAndUpdate(req.params.id, updatedClientFields)
      .then(() =>
        res
          .status(200)
          .json({ msg: "Successfully updated", updatedClientFields })
      )
      .catch(err => res.status(304).json(err));
  }
);

// @route   DELETE api/clients/:id
// @desc    Delete client
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Client.findOneAndRemove({ _id: req.params.id })
      .then(client => {
        if (!client) {
          return res
            .status(404)
            .json({ noclientfound: "No client found with that ID" });
        }
        res.status(200).json({ message: client.name + " was deleted" });
      })
      .catch(err =>
        res.status(404).json({ noclientfound: "No client found with that ID" })
      );
  }
);

module.exports = router;
