const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(cookieParser());

app.get('/', (req, res)=>{
    res.cookie('prevpage', 'home', {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, 
    });
    res.status(200).json({
        message: "Thank you for visiting this page!"
    })
});

app.get('/products', (req, res) =>{
    console.log(req.cookies.prevpage);
    let messageStr = '';
    if(req.cookies.prevpage) {
        messageStr = `You have vistied the ${req.cookies.prevpage} page`;
    }
    res.status(200).json({
        message: messageStr
    })
});

app.get('/clearCookie', (req, res)=>{
    res.clearCookie('prevpage', {path: '/'});
    res.status(200).json({
        message: 'I have cleared the cookie'
    })
})

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
});