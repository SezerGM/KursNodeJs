const {Router} = require('express')
const router = Router()
const User = require('../data/userModel');

router.get('/', (req, res) => {
    res.render('signIn', { title: 'Sign In' });
});


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send('Both username and password are required.');
    }
  
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.send('Invalid username or password.');
    }
  
    req.session.user = username; 
    res.redirect(`/`)
    
  });

module.exports = router