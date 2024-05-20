const {Router} = require('express')
const router = Router()
const topic = require('../data/topicModel')

router.get('/', (req, res) => {
    topic.find().populate('user').lean()
    .then(topic => {
      res.render('articles', { topic });
    })
});

module.exports = router