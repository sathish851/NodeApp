const { response, request } = require("express");
const express = require("express");
const router = require("./src/routes");
const app = express();
const port = 3050;

var cors = require('cors')
app.use(cors())

app.use(express.json());


app.get("/",(request,response)=>{
    response.send("Project Management");
});

app.use('/api/',router)

app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});

