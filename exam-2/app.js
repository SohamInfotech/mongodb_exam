const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const friend = require('./modal/soham')

mongoose.connect('mongodb://localhost:27017/kubavat-exam2')
    .then((res) => {
        console.log("conect sucses");
    })
    .catch((er) => {
        console.log(er);

    })

app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const alldata = await friend.find()
    res.render('index', { alldata, edit: null })
    
})

app.post('/createdata', async (req, res) => {
    console.log(req.body);
    const data = req.body
    if (data.id!=="") {
      await friend.findByIdAndUpdate(data.id,data)
    } else {
        await friend.create(data)
    }
    res.redirect('/')
})
app.get('/deletedata', async (req, res) => {
    const deleteid = req.query.delete
    console.log(deleteid);
    await friend.findByIdAndDelete(deleteid)
    res.redirect('/')
})

app.get('/Editdata', async (req, res) => {
    const editid = req.query.edit1;
    console.log(editid);
    const edit = await friend.findById(editid)
    const alldata = await friend.find()
    res.render('index', { alldata, edit })



})

app.listen(3000)