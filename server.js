const express = require('express')
const app = express()
const path = require('path');
const port = 5555
const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const server = express();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });

  
  const publicDirectory = path.join(__dirname, './public');
  app.use(express.static(publicDirectory));
  server.set('view engine','hbs');
//   connection.connect( (error)=>{
//         if(error){
//             console.log(error);
//         }else{
//             console.log("sucsess");
//         }
//   } )

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
// app.get('/', (req, res) => {
//   res.render("index.hbs");
// })

// app.get('/register', (req, res) => {
//     res.render("register.hbs");
//   })


//   app.get('/home', (req, res) => {
//     res.render("register.hbs");
//   })

app.use('/', require('./public/routes/pages'));
app.use('/auth', require('./public/routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})