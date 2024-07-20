const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

//Available Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.get('/vi/vi', (req, res) => {         //Can create different Endpoints-- instead we make folder structure, that helps to maintain large projects
//   res.send('vi 2')
// })
// app.get('/signup', (req, res) => {
//   res.send('Signing up')
// })


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})