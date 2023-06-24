const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

// Models
const Task = require('./models/Task')

// Routes
const taskRoutes = require('./routes/tasksRoutes')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tasks', taskRoutes)

conn
  .sync()
  .then(() => {
    app.listen(8081)
  })
  .catch((err) => console.log(err))
