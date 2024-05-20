const express = require('express')
const session = require('express-session');
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/addArticles')
const signInRouter = require('./routes/signIn')
const signUpRouter = require('./routes/signUp')
const articlesRouter = require('./routes/articles')
const authMiddleware = require('./routes/authMiddleware');
const topicRouter = require('./routes/topic');
const myArticlesRouter = require('./routes/myArticles');
const mongoose = require('mongoose');
const User = require('./data/userModel')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  ALLOW_PROPTYPE_LOOKUP: true
})

mongoose.connect('mongodb://localhost:27017/forum')
  

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


app.use(session({
  secret: 'testSession',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.get(`/logout`, (req, res)=>{
  req.session.destroy()
  res.redirect(`/`)
})

app.use('/', homeRoutes)
app.use('/addArticles',authMiddleware, addRoutes)
app.use('/signIn', signInRouter)
app.use('/signUp', signUpRouter)
app.use('/articles',authMiddleware, articlesRouter)
app.use('/topic',authMiddleware, topicRouter)
app.use('/myArticles',authMiddleware, myArticlesRouter)
app.use('/addComment',authMiddleware, topicRouter)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})