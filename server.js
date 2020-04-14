/* eslint-disable prettier/prettier */
const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = 'localhost';
const port = 8025;

//CORS Middleware
app.use(function (req, res, next) {
   //Enabling CORS 
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, *");
   next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const config = {
   user: 'sa',
   password: 'SaSa1212',
   server: '10.199.13.253',
   database: 'nrp05111740000138'
};

var executeQuery = function(res, query, model, reqType) {
   sql.connect(config, function(err){
      if(err) {
         res.end('Connection Error\n' + err)
      }
      else {
         var request = new sql.Request()
         if(reqType != 0) {
         model.forEach(function(m)
         {
            request.input(m.name, m.sqltype, m.value);
         });
         }
         request.query(query, function(err, response){
         if(err) {
            console.log('Query Error\n' + err)
         }
         else{
            // console.log(response.recordset)
            res.send(response.recordset)
            
         }
      })
   }
})
}

//GET FUNCTION

app.get("/api/mahasiswa/", function(req, res)
{
   var query = "select * from mahasiswa";
   executeQuery(res, query, null, 0);
});

app.get("/api/mahasiswa/:id", function(req, res)
{
   var query = "select * from mahasiswa where id =" + req.params.id;
   executeQuery(res, query, null, 0);
});

app.get("/api/gender/", function(req, res)
{
   var query = "select * from gender";
   executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/", function(req, res)
{
   var query = "select * from DataDasar"
   executeQuery(res, query, null, 0);
});

app.get("/api/data-dasar/nama", function(req, res)
{
   var query = 'select id,nama as name from DataDasar'
   executeQuery(res, query, null, 0);
})

app.get("/api/data-dasar/:id",function(req, res)
{
   var query = "select * from DataDasar where id=" + req.params.id;
   executeQuery(res, query, null, 0);
});

app.get("/api/unit/", function(req, res)
{
   var query = "select * from Unit"
   executeQuery(res, query, null, 0);
});

app.get("/api/unit/:id", function(req, res)
{
   var query = "select * from Unit where id=" + req.params.id;
   executeQuery(res, query, null, 0);
});

app.get("/api/nama-unit", function(req, res)
{
   var query = "select id, nama as name from Unit";
   executeQuery(res, query, null, 0);
})

app.get("/api/kategori/", function(req, res)
{
   var query = "select id,nama as name from KategoriUnit"
   executeQuery(res, query, null, 0);
});

app.get("/api/kategori/:id", function(req, res)
{
   var query = "select * from KategoriUnit where id=" + req.params.id;
   executeQuery(res, query, null, 0);
});

app.get("/api/capaian-unit/",function(req, res)
{
    var query = "select * from Capaian_Unit"
    executeQuery(res, query, null, 0);
});

app.get("/api/capaian-unit/:DataDasar_id&:Unit_id",function(req, res)
{
    var query = "select * from Capaian_Unit where DataDasar_id =" + req.params.DataDasar_id + 'and Unit_id =' + req.params.Unit_id;  
    executeQuery(res, query, null, 0);
});

// POST FUNCTION

app.post("/api/mahasiswa/", function(req, res)
{
   var model = [
      { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
      { name: 'jk', sqltype: sql.VarChar, value: req.body.jk },
      { name: 'lahir', sqltype: sql.Char, value: req.body.lahir },
      { name: 'ukt', sqltype: sql.VarChar, value: req.body.ukt },
      { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
      { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif}
   ]

   var query = 'insert into mahasiswa ( nrp, nama, angkatan, jk, lahir, ukt, foto, aktif ) values( @nrp, @nama, @angkatan, @jk, @lahir, @ukt, @foto, @aktif)';
   executeQuery(res, query, model, 1)
})

app.post("/api/data-dasar/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }    
   ]

   var query = 'insert into DataDasar ( nama ) values( @nama )';
   executeQuery(res, query, model, 1)
})

app.post("/api/unit/", function(req, res)
{
   var model = [
      { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama}     
   ]

   var query = 'insert into Unit ( KategoriUnit_id, nama ) values( @KategoriUnit_id, @nama )';
   executeQuery(res, query, model, 1)
})

app.post("/api/kategori/", function( req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
   var query = 'insert into KategoriUnit( nama ) values( @nama )';
   executeQuery(res, query, model, 1)
})

app.post("/api/capaian-unit/", function(req, res)
{
  var model = [
    { name: 'DataDasar_id', sqltype: sql.Int, value: req.body.DataDasar_id },
    { name: 'Unit_id', sqltype: sql.Int, value: req.body.Unit_id },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = 'insert into Capaian_Unit ( DataDasar_id, Unit_id, waktu, capaian ) values( @DataDasar_id, @Unit_id, CURRENT_TIMESTAMP, @capaian )';
  executeQuery(res, query, model, 1)
})

// PUT FUNCTION

app.put('/api/mahasiswa/:id',function(req, res ) {
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id }, 
      { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'angkatan', sqltype: sql.Char, value: req.body.angkatan },
      { name: 'jk', sqltype: sql.VarChar, value: req.body.jk },
      { name: 'lahir', sqltype: sql.Char, value: req.body.lahir },
      { name: 'ukt', sqltype: sql.VarChar, value: req.body.ukt },
      { name: 'foto', sqltype: sql.VarChar, value: req.body.foto },
      { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif }
   ]
  
   var query = "update mahasiswa set nama = @nama, nrp = @nrp, angkatan = @angkatan, jk = @jk, lahir = @lahir, ukt = @ukt, foto = @foto, aktif = @aktif WHERE id = @id";
   executeQuery(res, query, model, 1);
});

app.put("/api/data-dasar/:id", function(req, res) {
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
   ]

   var query = 'update DataDasar set nama = @nama where id = @id';
   executeQuery(res, query, model, 1)
})

app.put("/api/unit/:id", function(req, res) {
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'KategoriUnit_id', sqltype: sql.Int, value: req.body.KategoriUnit_id },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
   ]

   var query = 'update Unit set KategoriUnit_id = @KategoriUnit_id, nama = @nama where id = @id';
   executeQuery(res, query, model, 1)
})

app.put("/api/kategori/:id", function( req, res)
{
   var model = [
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
   ]
   var query = 'update KategoriUnit set nama = @nama where id=' + req.params.id;
   executeQuery(res, query, model, 1)
})

app.put("/api/capaian-unit/:DataDasar_id&:Unit_id", function(req, res) {
   var model = [
     { name: 'DataDasar_id_new', sqltype: sql.Int, value: req.body.DataDasar_id },
     { name: 'Unit_id_new', sqltype: sql.Int, value: req.body.Unit_id },
     { name: 'waktu', sqltype: sql.DateTime, value: req.body.waktu },
     { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
   ]
 
   var query = 'update Capaian_Unit set DataDasar_id = @DataDasar_id_new, Unit_id = @Unit_id_new, waktu = CURRENT_TIMESTAMP, capaian = @capaian where DataDasar_id = ' + req.params.DataDasar_id + ' and Unit_id =' + req.params.Unit_id;
   executeQuery(res, query, model, 1)
 })

// DELETE FUNCTION

app.delete("/api/mahasiswa/:id", function(req, res)
{
   var query = "delete from mahasiswa where id=" + req.params.id;
   executeQuery(res, query, null, 0);
})

app.delete("/api/data-dasar/:id", function(req, res)
{
   var query = "delete from DataDasar where id=" + req.params.id;
   executeQuery(res, query, null, 0);
})

app.delete("/api/unit/:id", function(req, res)
{
   var query = "delete from Unit where id=" + req.params.id;
   executeQuery(res, query, null, 0);
})

app.delete("/api/kategori/:id", function(req, res)
{
   var query = "delete from KategoriUnit where id=" + req.params.id;
   executeQuery(res, query, null, 0);
})

app.delete("/api/capaian-unit/:DataDasar_id&:Unit_id", function(req, res)
{
   var query = "delete from Capaian_Unit where DataDasar_id=" + req.params.DataDasar_id + 'and Unit_id =' + req.params.Unit_id;
   executeQuery(res, query, null, 0);
})

//  LISTEN

app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});
