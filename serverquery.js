var express = require('express');
var app = express();
const hostname = 'localhost';
const port = 8025;

var mahasiswaController = require('./Controller/MahasiswaController')();

app.get("/",function(request, response)
{
    response.json({"Message":"Welcome"});
});
app.use("/api/mahasiswa", mahasiswaController);

app.listen(port, function () {
    var message = "Server runnning on Port: " + port;
    console.log(message);
});

