const express = require('express')
const app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/add', async (req, res) => {
    const fist5Char = req.body.txtPic.substr(0, 5)
    const fist6Char = req.body.txtPic.substr(0, 6)
    if (fist5Char != 'http:' && fist6Char != 'https:') {
        res.render('add', { 'error': 'Picture phai bat dau la http: hoac https:' })
        return
    }
    const newProduct = {
        'name': req.body.txtName,
        'picture': req.body.txtPic
    }
    await saveProduct(newProduct)
    res.redirect('/')
})
//duong dan den database
const url = 'mongodb+srv://diopadreco:d1tm3m4y@cluster0.hsu2f0n.mongodb.net/?retryWrites=true&w=majority'
//import thu vien MongoDB
const MongoClient = require('mongodb').MongoClient;

async function saveProduct(newProduct) {
    //1.ket noi den database server voi dia chi la url
    let client = await MongoClient.connect(url);
    //2.truy cap database GCH1006
    let dbo = client.db("GCH1006")
    //3.insert 
    return await dbo.collection('product2').insertOne(newProduct)
}
app.get('/addProduct', (req, res) => {
    res.render('add')
})

app.get('/view', async(req,res)=>{
    let client = await MongoClient.connect(url);
    let dbo = client.db("GCH1006")
    let results = await dbo.collection("product2").find().toArray()
    res.render('viewAll',{results:results})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server is up")
})