const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || "mongodb://localhost/exercise-track", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  username: {type: String, required: true},
  exercise: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
});

// Exercise schema
const exerciseSchema = new Schema({
  userId: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: {type: Date}
});

const User = mongoose.model("User", userSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Add new user
app.post('/api/exercise/new-user', (req, res) => {
  const newUser = new User({ username: req.body.username});
  newUser.save((err, usr) => {
    if(err){
      console.log('error', err);
      res.json({"error": "something went wrong"});
      return
    }
    res.json(usr);
  });  
})

// Get all users
app.get('/api/exercise/users', (req, res) => {
  User.find()
    .select('username _id')
    .exec((err, usrs) => {
    if(err){
      console.log(err)
      res.json({error: 'something went wrong'});
      return
    }
    res.json(usrs)
  })
})

// Add exercise
app.post('/api/exercise/add', (req, res) => {
  const userId = req.body.userId;
  if(!userId){
    res.json({ error: 'no user id'});
    return;
  }
  
  User.findById(userId)
  .exec((err, user) => {
    if(err){
      console.log('[ERROR] findById', err)
      res.json({ error: 'user was not found'})
      return;
    }
    
    const newEx = new Exercise({
      userId: userId,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date ? req.body.date : new Date()
    })
    
    newEx.save((err, ex) => {
      if(err){
        console.log('[ERROR] newEx.save', err)
        res.json({ error: 'user was not found'})
        return;
      }

      User.findByIdAndUpdate(userId, { exercise: user.exercise.concat(ex._id) })
          .exec((err, updatedUsr) => {
            if(err){
              console.log('[ERROR] findByIdAndUpdate', err)
              res.json({ error: 'user was not found'})
              return;
            }
        
        const retObj = {
          username: user.username,
          description: ex.description,
          duration: Number(ex.duration),
          _id: user._id,
          date: ex.date.toDateString()
        };
        
        
        res.json(retObj)
          });
    });
  });  
});

// Get log
app.get('/api/exercise/log', (req, res) => {
  const userId = req.query.userId;
  if(!userId){
    res.json({ error: 'no userid'})
    return
  }
  
  let query = {
    userId,
    date: { $lte: new Date() }
  };
  if(req.query.from) query.date.$gte = req.query.from;
  if(req.query.to) query.date.$lte = req.query.to;
  User.findById(userId).exec((err, user) => {
    if(err){
      console.log('[findById] error', err)
      res.json({ error: 'something went wrong'})
      return;
    }
    
    let limitCount = user.exercise.length;
    if(req.query.limit) limitCount = Number(req.query.limit);
    
    Exercise.find(query).limit(limitCount).exec((err, exercises) => {
      if(err){
        console.log('[Exercise.find] error', err)
        res.json({ error: 'something went wrong'})
        return;
      }
      
      const retObj = {
        userId: user._id,
        count: user.exercise.length,
        username: user.username,
        log: exercises
      };      
      res.json(retObj);
      
    })
  })
});

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})