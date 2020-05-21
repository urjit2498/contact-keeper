const express = require('express');
const router = express.Router();

// @route        GET api/contacts
// @desc         get all user contacts
// @access       Private
router.get('/', (req, res) => {
  res.send('Get all current user');
});

// @route        POST api/contacts
// @desc         Add new contacts
// @access       Private
router.post('/', (req, res) => {
  res.send('Add new contact');
});

// @route        PUT api/contacts/:id
// @desc         Update user contacts
// @access       Private
router.put('/:id', (req, res) => {
  res.send('Update user contact');
});

// @route        DELETE api/contacts/:id
// @desc         Delete user contacts
// @access       Private
router.delete('/:id', (req, res) => {
  res.send('Delete contacts');
});

module.exports = router;
