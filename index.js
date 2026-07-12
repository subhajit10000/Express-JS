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




//PATCH Method
app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    // Find user index
    const userIndex = mock.findIndex(user => user.id === id);

    // User not found
    if (userIndex === -1) {
        return res.json({
             status: "failed",
            message: "User not found"
        });
    }

    // Update user
    mock[userIndex] = {
    ...mock[userIndex],
    ...body
    };

    // Save updated data
    fs.writeFile('./mock.json', JSON.stringify(mock), (err,data) => {

        if (err) {
            return res.json({
                    status: "failed"
                    });
        }

        res.json({
            status: "success",
            message: "User updated successfully",
            data: mock
        });

    });

});





//PUT Method
app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    // Find user index
    const userIndex = mock.findIndex(user => user.id === id);

    // User not found
    if (userIndex === -1) {
        return res.json({
            status: "failed",
            message: "User not found"
        });
    }

    // Update user
    mock[userIndex] = {
        ...mock[userIndex],
        ...body
    };

    // Save updated data
    fs.writeFile('./mock.json', JSON.stringify(mock), (err,data) => {

        if (err) {
            return res.json({
                status: "failed"
            });
        }

        res.json({
            status: "success",
            message: "User updated successfully",
            data: mock[userIndex]
        });

    });

});


// SERVER RESPONSE
app.listen(PORT, ()=>{
    console.log(`done at http://localhost:${PORT}/users`);
    }) 
