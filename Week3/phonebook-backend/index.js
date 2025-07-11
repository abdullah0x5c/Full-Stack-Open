const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())


morgan.token('postData', function(req, res) {return (req.method==="POST")?(JSON.stringify(req.body)):("")} )


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let phonebook = [
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
    },
    { 
      "id": "100",
      "name": "test", 
      "number": "test"
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

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const exists = (phonebook.find(item => item.id == id))?1:0

    if(exists){
        phonebook = phonebook.filter(item => item.id != id)
        res.status(204).end()
    }
    else{
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const reqContact = req.body
    const identifier = Math.max(...phonebook.map(item => Number(item.id))) + 1

    const nameExists = reqContact.name?1:0
    const numberExists = reqContact.number?1:0
    const nameRepeat = phonebook.find(item => item.name == reqContact.name)?1:0

    if(!nameExists){
        res.status(400).json({ error: 'name must not be empty' })
    }
    else if(!numberExists){
        res.status(400).json({ error: 'number must not be empty' })
    }
    else if(nameRepeat){
        res.status(400).json({ error: 'name must be unique' })
    }
    else{
    const Contact = {
        "id": String(identifier),
        "name": reqContact.name, 
        "number": reqContact.number
    }

    phonebook = phonebook.concat(Contact)

    res.json(Contact)}
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server running on Port', PORT)
})