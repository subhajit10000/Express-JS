const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 5000;
app.use(express.json());
const mock = require("./mock.json")



// GET Method
app.get('/users', (req,res) => {
    res.send(mock);
})



//POST Method
app.post('/users', (req,res)=>{
    const body = req.body;
    mock.push({...body})
    fs.writeFile('./mock.json', JSON.stringify(mock), (err,data)=>{
        if (err) {
            return res.json({"status": "failed"})
        } else {
            res.json({
                "status": "success",
                "data": mock
                    })
                }
        })
})






// SERVER RESPONSE
app.listen(PORT, ()=>{
    console.log(`done at http://localhost:${PORT}/users`);
    }) 
