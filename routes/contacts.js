const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route        GET api/contacts
// @desc         get all user contacts
// @access       Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    if (contacts.length == 0) {
      return res.json({
        msg: "I found nothing... I think you didn't save any contact yet...",
      });
    }

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error');
  }
});

// @route        POST api/contacts
// @desc         Add new contacts
// @access       Private
router.post(
  '/',
  [
    auth,
    [check('name', 'Name is required for contact saving').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    }
  }
);

// @route        PUT api/contacts/:id
// @desc         Update user contacts
// @access       Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build a contactObject
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns the contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized user' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route        DELETE api/contacts/:id
// @desc         Delete user contacts
// @access       Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns the contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized user' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact successfully deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
