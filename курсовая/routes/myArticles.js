const {Router} = require("express")
const router = Router()
const topic = require('../data/topicModel');


router.get('/', (req, res)=>{
    const currentUser = req.session.user
    topic.find({user: currentUser}).populate('user').lean()
        .then(topic =>{
            res.render('myArticles', {topic})
        })
        .catch(error => {
            console.error(error);
            res.send('Error retrieving topics');
        });
    
})




module.exports = router