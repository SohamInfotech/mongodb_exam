const express = require("express")
const app = express()
const bodyparsel = require("body-parser");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
const mongodb = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/";
const client = new mongodb(url)

const db = client.db('kubavat_exam')
const collection = db.collection("data")
app.use(bodyParser.urlencoded({ extended: true }))
// database ne connect kre db na collection stahe

client.connect(url)
    .then((res) => {
        console.log("connect");

    })
    .catch((err) => {
        console.log(err);

    })


app.set("view engine", "ejs");
app.get("/", async (req, res) => {
    const data = await collection.find().toArray()
    console.log(data);

    res.render("index", { data,editdata: null })
})


app.post('/add', async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    if (id) {
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    } else {
        await collection.insertOne(req.body);
    }
    res.redirect('/');
})


app.get('/deleteId', async (req, res) => {
    const id = req.query.delete;
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.redirect('/');
})

app.get('/update', async (req, res) => {
    const id = req.query.up;

    
    ditdata = await collection.findOne({ _id: new ObjectId(id) });
    if (editdata) {
        res.render("reseltu", { data: [], editdata });
    }
})
app.listen(8080)