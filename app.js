const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.use(express.static('views'));

let books = [
    { title: "adventures of tomm sawyer", author: "mark Twain", price: "$10", description: "A classic novel." },
    { title: "arthashastra", author: "kautilya", price: "$15", description: "Another classic novel." },
    { title: "Gulliver's Travels", author: "swift", price: "$12", description: "A good story." },
    { title: "woleake",author:"chaucer" , price:"20$",description:"motivation book"},
    {title:"book1",author:"someone",price:"25$",description:"rich and poor"},
];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/add-book', (req, res) => {
    res.sendFile(__dirname + '/views/addBook.html');
});
app.get("/add-newbook",(req,res)=>{
        res.sendFile(__dirname + "/views/addnewbook");                       
});

app.post('/add-book', (req, res) => {
    const { title, author, price, description } = req.body;
    books.push({ title, author, price, description });
    res.redirect('/');
});
app.post('/add-book', (req, res) => {
    const { title, author, price, description } = req.body;
    

    books.push({ title, author, price, description });
    
    
    res.redirect('/books');
});
app.get('/book/:title', (req, res) => {
    const book = books.find(b => b.title === req.params.title);
    if (book) {
        res.send(`
            <h1>${book.title}</h1>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <a href="/">Back to bookstore</a>
        `);
    } else {
        res.status(404).send('Book found');
    }
});

app.listen(3000, () => {
    console.log('Server is running');
});
