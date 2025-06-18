import 'dotenv/config'
import express from 'express'
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

let teaData = []
let nextId = 1

// enter tea data
app.post('/tea' , (req , res) =>{
    const {name , price } = req.body
    const newtea = {id : nextId++ , name , price }
    teaData.push(newtea)
    res.status(200).send(newtea)
})

//get tea data
app.get('/tea' , (req , res) =>{
    res.send(teaData)
})

//get tea data by id
app.get('/tea/:id' , (req , res) =>{
    const teaId = teaData.find(t => t.id === parseInt(req.params.id))
    if(!teaId) {
        return res.status(404).send('tea not found')
    }
    else{
        res.status(200).send(teaId)
    }
})

//update tea data by id
app.put('/tea/:id' , (req , res) =>{
    const teaId = teaData.find(t => t.id === parseInt(req.params.id))
    if(!teaId) {
        return res.status(404).send('tea not found')
    }
    const {name , price } = req.body
    teaId.name = name
    teaId.price = price
    res.status(200).send("Updated")
})

//delete tea data by id
app.delete('/tea/:id' , (req , res) =>{
    const teaId = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(teaId === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(teaId , 1)
    return res.status(200).send("deleted")
})

app.listen(port , ()=>{
    console.log(`Server is Listening on :${port}`);
})