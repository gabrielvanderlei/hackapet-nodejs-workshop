let express = require('express')
let bodyParser = require('body-parser')
let app = express()

let dvds = [
    {
        title: 'Senhor dos aneis',
        year: 2000
    }
]

let currentId = 0

app.use(bodyParser.json())

app.get('/dvds', function(request, response){
    response.send(dvds)
})

app.post('/dvds', function(req, res){
    let data = req.body

    if(data.title && data.year){
        dvds.push({
            title: data.title,
            year: data.year,
            id: currentId
        })

        currentId++
        res.send(dvds)
    } else {
        res.status(400).send({message: 'Bad Request'})
    }
})

app.put('/dvds/:dvdId', function(req, res){
    let data = req.body
    let id = req.params.dvdId
    let dvdIndex = 0

    let foundDvd = dvds.find(function(dvd, index){
        dvdIndex = index
        return dvd.id == id
    })

    if(foundDvd){
        if(data.title && data.year){

            dvds[dvdIndex] = {
                title: data.title,
                year: data.year,
                id: foundDvd.id
            }
    
            res.send(dvds)
        } else {
            res.status(400).send({message: 'Bad Request'})
        }
    } else {
        res.status(404).send({message: 'Dvd não encontrado'})
    }
})

app.delete('/dvds/:dvdId', function(req, res){
    let data = req.body
    let id = req.params.dvdId
    let dvdIndex = 0

    let foundDvd = dvds.find(function(dvd, index){
        dvdIndex = index
        return dvd.id == id
    })

    if(foundDvd){
        dvds.splice(dvdIndex, 1)
        res.send(dvds)
    } else {
        res.status(404).send({message: 'Dvd não encontrado'})
    }
})

app.get('/dvds/:dvdId', function(req, res){
    let id = req.params.dvdId

    let foundDvd = dvds.find(function(dvd){
        return dvd.id == id
    })

    if(foundDvd){
        res.send(foundDvd)
    } else {
        res.status(404).send({message: 'Dvd não encontrado'})
    }
})

app.listen(3000, function(){
    console.log('Hello World')
})