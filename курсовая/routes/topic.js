const {Router} = require('express')
const router = Router()
const topicModel = require('../data/topicModel');
const commentModel = require('../data/commentsModel');

router.get(`/`, async (req, res)=>{
    const topicId = req.query.id;
    const currentUser = req.session.user;

    try {
        
        const topic = await topicModel.findById(topicId).lean();
        if (!topic) {
            return res.status(404).send('Topic not found');
        }

        
        const comments = await commentModel.find({topicId: topicId  }).lean();

        res.render('topic', { topic, comments, currentUser });
    } catch (error) {
        console.error(error);
    }

    
})


router.post('/', async (req, res)=>{
    const user = req.session.user
    const comment = req.body.comment
    const topicId = req.query.topicId
    
    const newCommentModel = new commentModel({user, comment, topicId})
    
    await newCommentModel.save()
    console.log(topicId)
    res.redirect(`/topic?id=${topicId}`);
})



module.exports = router