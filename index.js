let express = require('express')
let bodyParser = require('body-parser')
let app = express()

let dvds = [
    {
        title: 'Senhor dos aneis',
        year: 2000,
        id: 0,
        rent: {
            rented: false,
            renter: ""
        }
    }
]

let currentId = 1

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
            id: currentId,
            rent: {
                rented: false,
                renter: ""
            }
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
            foundDvd.title = data.title,
            foundDvd.year = data.year
            res.send(foundDvd)
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

    let foundDvd = dvds.findIndex(function(dvd){
        return dvd.id == id
    })

    if(foundDvd !== -1){
        dvds.splice(foundDvd, 1)
        res.status(200).send({message: 'Excluído com sucesso.'})
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

//put /dvds/:dvdId/rent
app.put('/dvds/:dvdId/rent', function(req, res){
    let data = req.body
    let id = req.params.dvdId

    let foundDvd = dvds.find(function(dvd){
        return dvd.id == id
    })

    if(foundDvd){
        if(data.renter){
            if(!foundDvd.rent.rented){
                foundDvd.rent.rented = true 
                foundDvd.rent.renter = data.renter 
                res.send(foundDvd)
            } else {
                res.status(400).send({message: 'O DVD já está alugado'})
            }
        } else {
            res.status(400).send({message: 'Bad Request'})
        }
    } else {
        res.status(404).send({message: 'DVD não encontrado'})
    }
})

//put /dvds/:dvdId/return
app.put('/dvds/:dvdId/return', function(req, res){
    let data = req.body
    let id = req.params.dvdId

    let foundDvd = dvds.find(function(dvd){
        return dvd.id == id
    })

    if(foundDvd){
        if(foundDvd.rent.rented){
            foundDvd.rent.rented = false 
            foundDvd.rent.renter = "" 
            res.send(foundDvd)
        } else {
            res.status(400).send({message: 'DVD já devolvido'})
        }
    } else {
        res.status(404).send({message: 'Dvd não encontrado'})
    }
})

app.listen(3000, function(){
    console.log('Hello World')
})