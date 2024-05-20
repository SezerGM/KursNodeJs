const {Router} = require('express')
const router = Router()
const topicModel = require('../data/topicModel');

router.get('/', (req, res) => {
  res.render('addArticles', {
    title: 'Add theme',
    isAdd: true
  })
})

router.post('/', async (req, res) => {
  const title = req.body.title;
  const description = req.body.text;
  const user = req.session.user
  const newTopic = new topicModel({ title, description, user });
  await newTopic.save()
  
  res.redirect('/')
})

module.exports = router