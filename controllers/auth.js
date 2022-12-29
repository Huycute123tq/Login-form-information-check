const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const SHA256 = require('crypto-js')

const connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
      });

exports.register = (req,res) =>{
        console.log(req.body);
        

        
        const { name, email, password } = req.body;
        connection.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) =>{
                if(error){
                        console.log(error);
                }
                if(results.length > 0){
                        
                        return res.render('register.hbs', {
                                message: 'This account has been registered, please try again!'
                        });
                }


                let hashedPassword = SHA256.SHA256(password).toString();
                // console.log( 'check', hashedPassword);
                
                             connection.query('INSERT INTO users SET ?', {name: name, email:  email, password: hashedPassword}, (error, results) => {
                        if(error){
                                console.log(error);
                        }else{
                                console.log(results);
                                return res.render('register.hbs', { 
                                message:'User registered successfully'
                                });
                                
                        
                        }
        })

   
        
        
        
        });

        
}   


//---------------------------------------------------------------------------------------

            
        exports.login = (req,res) =>{
                console.log(req.body);
                


        
                
                const { email, password } = req.body;
                // console.log('sha', SHA256.SHA256('123456').toString());
                let checkPassword = SHA256.SHA256(password).toString();
                // console.log('checkPassword',checkPassword);
                connection.query('SELECT password FROM users WHERE password = ?', [checkPassword], async(error, results) =>{
                        // console.log('checkk', results[0].password );  
                        // console.log('checkk', results);
                        
                        if(results[0]?.password && results[0].password === checkPassword){
                                return res.render('after-login.hbs')
                                
                        }else{
                                return res.render('login.hbs', {
                                        message: 'This account has password wrong, please try again!'
                                })

                        }

                })
                


                connection.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) =>{
                        // console.log('result', results);
                        if(error){
                                console.log(error);
                               
                        }
                        
                        if(results.length > 0){
                                return res.render('after-login.hbs', {
                                        // message: 'This account has been registered, please try again!'
                                }

                                
                                
                                
                                );
                        }else{
                                return res.render('login.hbs', {
                                        message: 'This account does not exist! maybe you have the wrong password or email'
                                })
                        }

                        
                        
                        


                });

                
                
                
                
        
                         
                
                


                
        }


