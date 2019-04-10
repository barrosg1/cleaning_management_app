const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Staff = require("../../models/Staff");

const validateStaffInput = require("../../validation/staff");

// @route   GET api/staff
// @desc    Get all staff
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Staff.find()
      .sort({ name: "asc" })
      .then(staff => {
        if (staff.length === 0) {
          return res.status(404).json({ nostafffound: "There are no staff" });
        }
        res.status(200).json(staff);
      })
      .catch(err =>
        res.status(404).json({ nostafffound: "There are no staff" })
      );
  }
);

// @route   GET api/staff/:id
// @desc    Get staff by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Staff.findById({ _id: req.params.id })
      .then(staff => res.json(staff))
      .catch(err =>
        res.status(400).json({ nostafffound: "No staff found with that ID" })
      );
  }
);

// @route   POST api/staff
// @desc    Create staff
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStaffInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newStaff = new Staff({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone
    });

    newStaff.save().then(staff => res.json(staff));
  }
);

// @route   PATCH api/staff/:id
// @desc    Update staff
// @access  Private
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const updateStaffField = {};
    updateStaffField.user = { _id: req.user.id, name: req.user.name };

    if (req.body.name) updateStaffField.name = req.body.name;
    if (req.body.email) updateStaffField.email = req.body.email;
    if (req.body.address) updateStaffField.address = req.body.address;
    if (req.body.phone) updateStaffField.phone = req.body.phone;

    Staff.findOneAndUpdate(req.params.id, updateStaffField)
      .then(() =>
        res.status(200).json({ msg: "Successfully updated", updateStaffField })
      )
      .catch(err => res.status(304).json(err));
  }
);

// @route   DELETE api/staff/:id
// @desc    Delete staff
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Staff.findOneAndRemove({ _id: req.params.id })
      .then(staff => {
        if (!staff) {
          return res
            .status(404)
            .json({ nostafffound: "No staff found with that ID" });
        }
        res.status(200).json({ message: staff.name + " was deleted" });
      })
      .catch(err =>
        res.status(404).json({ nostafffound: "No staff found with that ID" })
      );
  }
);

module.exports = router;
