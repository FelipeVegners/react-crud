//Calls the enviroment variables
require('dotenv/config')

const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config/DB')
const passport = require('passport')

const businessRoute = require('./routes/business')
const users = require('./routes/users')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { useNewUrlParser: true, useFindAndModify: false }).then(
  () => { console.log('Database is connected bro!') },
  err => { console.log('Can not connect to the database ' + err) }
  )

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/business', businessRoute)
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../build')))

// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../build/index.html'))
});

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

app.use('/users', users)


app.listen(PORT, () => console.log('Server is running on port:', PORT) )