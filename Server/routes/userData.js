const express = require('express');
const router = express.Router();
const Data = require('../Models/Data'); // Adjust the path to your Data model

// Save Data
router.post('/saveData', async (req, res) => {
  const { name, field, gender, email, phone, status } = req.body;
  if (!name || !field || !gender) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newData = new Data({ name, field, gender, email, phone, status });
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully', data: newData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Get Data
router.get('/getData', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

// Delete User
router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Data.findByIdAndDelete(userId);

    if (result) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
