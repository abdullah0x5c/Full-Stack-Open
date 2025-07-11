const express = require('express')
const app = express()

const phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/info', (req, res) => {
    const n = phonebook.length
    const time = (new Date).toString()
    res.send(`<p>Phonebook has info of ${n} people.</p><p>${time}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const exists = (phonebook.find(item => item.id == id))?1:0

    if(exists){
        const contact = phonebook.find(item => item.id == id)
        res.json(contact)
    }
    else{
        res.status(404).end()
    }

})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server running on Port', PORT)
})