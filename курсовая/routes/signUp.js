const {Router} = require('express')
const router = Router()
const User = require('../data/userModel');

router.get('/', (req, res) => {
    res.render('signUp', { title: 'Sign Up' });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send('Both username and password are required.');
    }
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('Username already exists.');
    }
  
    const newUser = new User({ username, password });
    await newUser.save();
    res.redirect(`/`)
  });
  
module.exports = router