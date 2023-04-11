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
const url = 'mongodb+srv://tommy:12345654321@cluster0.lkrga.mongodb.net/test'
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server is up")
})