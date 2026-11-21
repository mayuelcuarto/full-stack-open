require('dotenv').config()
const express = require('express')
const Note = require('./models/note.js')

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

const app = express()
app.use(express.json())

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})