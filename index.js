

const express = require('express')
const app = express()
const PORT = 3000;

app.use(express.json())

app.post('/user', (req,res) => {
    console.log(req.body);
    
    res.send("hello world");
})

app.listen(PORT, ()=>{
    console.log(`done at http://localhost:${PORT}/user`);
    
})