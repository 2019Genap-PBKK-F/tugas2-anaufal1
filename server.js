/* eslint-disable prettier/prettier */
const express = require("express");
const app = express();
const sql = require('mssql')
const hostname = 'localhost'
//const hostname = '10.199.14.46'
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

//tabel Data Dasar

app.get("/api/data-dasar/", function(req, res)
{
    var query = "select * from DataDasar"
    executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/nama", function(req, res)
{
  var query = 'select id,nama as name from DataDasar'
  executeQuery(res, query, null, 0)
})

app.get("/api/data-dasar/:id",function(req, res)
{
    var query = "select * from DataDasar where id=" + req.params.id
    executeQuery(res, query, null, 0)
})

app.post("/api/data-dasar/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
  ]

  var query = 'insert into DataDasar ( nama, create_date, last_update, expired_date ) values( @nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date )'
  executeQuery(res, query, model, 1)
})

app.put("/api/data-dasar/:id", function(req, res) {
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = 'update DataDasar set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id'
  executeQuery(res, query, model, 1)
})

app.delete("/api/data-dasar/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id }
  ]

  var query = "delete from DataDasar where id = @id"
  executeQuery(res, query, model, 1)
})

//Tabel Aspek
app.get("/api/aspek/", function(req, res)
{
   var query = "select * from Aspek"
   executeQuery(res, query, null, 0)
})

app.get("/api/aspek/nama", function(req, res)
{
   var query = 'select id,aspek as name from Aspek'
   executeQuery(res, query, null, 0)
})

app.get("/api/aspek/:id",function(req, res)
{
   var query = "select * from Aspek where id=" + req.params.id
   executeQuery(res, query, null, 0)
})

app.post("/api/aspek/", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
      { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
   ]

   var query = 'insert into Aspek ( aspek, komponen_aspek ) values( @aspek, @komponen_aspek )'
   executeQuery(res, query, model, 1)
})

app.put("/api/aspek/:id", function(req, res) {
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
      { name: 'komponen_aspek', sqltype: sql.VarChar, value: req.body.komponen_aspek }
   ]

   var query = 'update Aspek set aspek = @aspek, komponen_aspek = @komponen_aspek where id = @id'
   executeQuery(res, query, model, 1)
})

app.delete("/api/aspek/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
   ]

   var query = "delete from Aspek where id = @id"
   executeQuery(res, query, model, 1)
})

//tabel Jenis SatKer 

app.get("/api/jenis-satker/", function(req, res)
{
    var query = "select * from JenisSatker"
    executeQuery(res, query, null, 0)
})

app.get("/api/jenis-satker/:id", function(req, res)
{
    var query = "select * from JenisSatker where id=" + req.params.id;
    executeQuery(res, query, null, 0);
})

app.post("/api/jenis-satker/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'insert into JenisSatker ( id, nama, create_date, last_update, expired_date ) values( @id, @nama , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )';
  executeQuery(res, query, model, 1)
})

app.put("/api/jenis-satker/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = 'update JenisSatker set nama = @nama, last_update=CURRENT_TIMESTAMP where id = @id';
  executeQuery(res, query, model, 1)
})

app.delete("/api/jenis-satker/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id }
  ]

  var query = "delete from JenisSatker where id = @id" 
  executeQuery(res, query, model, 0)
})

//tabel Periode

app.get("/api/periode/", function(req, res)
{
    var query = "select * from Periode"
    executeQuery(res, query, null, 0)
})

app.post("/api/periode/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
  ]

  var query = "insert into Periode( id, nama, create_date, last_update ) values( @id, @nama , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP )"
  executeQuery(res, query, model, 1)
})

app.put("/api/periode/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama }
  ]

  var query = "update Periode set nama = @nama, last_update = CURRENT_TIMESTAMP where id = @id" 
  executeQuery(res, query, model, 1)
})

app.delete("/api/periode/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Numeric, value: req.body.id }
  ]

  var query = "delete from Periode where id = @id"
  executeQuery(res, query, model, 1)
})

//tabel Master Indikator

//Select
app.get("/api/master-indikator/", function(req, res)
{
   var query = "select * from MasterIndikator"
   executeQuery(res, query, null, 0)
})

app.get("/api/master-indikator/nama", function(req, res)
{
   var query = "select id,nama as name from MasterIndikator"
   executeQuery(res, query, null, 0)
})

//Insert
app.post("/api/master-indikator/", function(req, res)
{
  var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
      { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_penyebut },
      { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_pembilang },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
      { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = "insert into MasterIndikator( id_aspek, id_pembilang, id_penyebut, nama, deskripsi, default_bobot, create_date, last_update, expired_date )"
               + "values ( @id_aspek, @id_pembilang, @id_penyebut, @nama, @deskripsi, @default_bobot, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @expired_date)"
   executeQuery(res, query, model, 1)
})

//Update
app.put("/api/master-indikator/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.body.id },
      { name: 'id_aspek', sqltype: sql.Int, value: req.body.id_aspek },
      { name: 'id_pembilang', sqltype: sql.Int, value: req.body.id_penyebut },
      { name: 'id_penyebut', sqltype: sql.Int, value: req.body.id_pembilang },
      { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
      { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.deskripsi },
      { name: 'default_bobot', sqltype: sql.Float, value: req.body.default_bobot },
      { name: 'expired_date', sqltype: sql.DateTime, value: req.body.expired_date }
   ]

   var query = "update MasterIndikator set id_aspek = @id_aspek, id_pembilang = @id_pembilang, id_penyebut = @id_penyebut, nama = @nama, deskripsi = @deskripsi," 
               + " default_bobot = @default_bobot, expired_date = @expired_date, last_update = CURRENT_TIMESTAMP where id = @id"
   executeQuery(res, query, model, 1)
})

//Delete
app.delete("/api/master-indikator/:id", function(req, res)
{
   var model = [
      { name: 'id', sqltype: sql.Int, value: req.params.id }
   ]
  
   var query = "delete from MasterIndikator where id = @id"
   executeQuery(res, query, model, 1)
})
//tabel Indikator Periode

app.get("/api/indikator-periode", function(req, res)
{
  var query = "select * from Indikator_Periode"
  executeQuery(res, query, null, 0)
})

app.post("/api/indikator-periode", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = "insert into Indikator_Periode( id_master, id_periode, bobot ) values( @id_master, @id_periode, @bobot )"
  executeQuery(res, query, model, 1)
})

app.put("/api/indikator-periode/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = 'update Indikator_Periode set id_master = @id_master, id_periode=@id_periode, bobot=@bobot where id = @id'
  executeQuery(res, query, model, 1)
})

app.delete("/api/indikator-periode/:id", function(req, res)
{
  var query = "delete from Indikator_Periode where id=" + req.params.id;
  executeQuery(res, query, null, 0);
})

//tabel Satuan Kerja

app.get("/api/satuan-kerja/", function(req, res)
{
  var query = "select * from SatuanKerja"
  executeQuery(res, query, null, 0)
})

app.get("/api/satuan-kerja/:id", function(req, res)
{
    var query = "select * from SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
})

app.post("/api/satuan-kerja/", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.body.id },
    { name: 'id_ins_satker', sqltype: sql.Numeric, value: req.body.id_ins_satker },
    { name: 'id_induk_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { nama: 'email', sqltype: sql.VarBinary, value: req.body.email },
    { name: 'level_unit', sqltype: sql.VarChar, value: req.body.email} 
  ]

  var query = "insert into SatuanKerja( id_ins_satker, id_induk_satker, nama, email,level_unit ) values( @id_ins_satker, @id_induk_satker, @nama, @email, @level_unit )"
  executeQuery(res, query, model, 1)
})

app.put("/api/satuan-kerja/:id", function(req, res)
{
  var model = [
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.body.id },
    { name: 'id_ins_satker', sqltype: sql.Numeric, value: req.body.id_ins_satker },
    { name: 'id_induk_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_induk_satker },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.nama },
    { nama: 'email', sqltype: sql.VarBinary, value: req.body.email },
    { name: 'level_unit', sqltype: sql.VarChar, value: req.body.email} 
  ]

  var query = "update SatuanKerja set id_ins_satker = @id_ins_satker, id_induk_satker=@id_induk_satker, nama=@nama, email=@email, level_unit=@level_unit where id = @id"
  executeQuery(res, query, model, 1)
})

app.delete("/api/satuan-kerja/:id", function(req, res)
{
    var query = "delete from SatuanKerja where id=" + req.params.id;
    executeQuery(res, query, null, 0);
})

//tabel Capaian Unit

app.get("/api/capaian-unit/",function(req, res)
{
    var query = "select * from Capaian_Unit"
    executeQuery(res, query, null, 0)
})

app.post("/api/capaian-unit/", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "insert into Capaian_Unit values( @id_satker, @id_datadasar, @capaian, CURRENT_TIMESTAMP )"
  executeQuery(res, query, model, 1)
})

app.put("/api/capaian-unit/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'id', sqltype: sql.UniqueIdentifier, value: req.params.id },
    { name: 'id2', sqltype: sql.Int, value: req.params.id2 }
  ]

  var query = "update Capaian_Unit set id_satker = @id_satker, id_dasar = @id_dasar, capaian = @capaian where id_satker = @id and id_datadasar = @id2"
  executeQuery(res, query, model, 1)
})

app.delete("/api/capaian-unit/:id&:id2", function(req, res)
{
  var model = [
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'id_datadasar', sqltype: sql.Int, value: req.body.id_datadasar }
  ]

  var query = "delete from Capaian_Unit where id_satker = @id and id_datadasar = @id2"
  executeQuery(re, query, model, 1)
})

//tabel Indikator Satuan Kerja

app.get("/api/indikator-satuan-kerja/", function(req, res)
{
  var query = "select * form Indikator_SatuanKerja"
  executeQuery(res, query, null, 0)
})

app.post("/api/indikator-satuan-kerja/", function(req, res)
{
  var model = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'target', sqltype: sql.Float, value: req.body.target },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian }
  ]

  var query = "insert into Indikator_SatuanKerja values( @id_periode, @id_master, @id_satker, @bobot, @target, @capaian, CURRENT_TIMESTAMP"
  executeQuery(res, query, model, 1)
})

app.put("/api/indikator-satuan-kerja/:id&:id2&:id3", function(req, res)
{
  var model = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_satker },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'target', sqltype: sql.Float, value: req.body.target },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian },
    { name: 'id', sqltype: sql.Numeric, value: req.params.id },
    { name: 'id2', sqltype: sql.Int, value: req.params.id2 },
    { name: 'id3', sqltype: sql.UniqueIdentifier, value: req.params.id3 }
  ]

  var query = "update Indikator_SatuanKerja set id_periode = @id_periode, id_master = @id_master, id_satker = @id_satker, bobot = @bobot, target = @target " +
              "capaian = @capaian, last_update = CURRENT_TIMESTAMP where id_periode = @id and id_master = @id2 and id_satker = @id3"
  executeQuery(res, query, model, 1)
})

app.delete("/api/indikator-satuan-kerja/:id&:id2&:id3", function(req, res)
{
  var model = [
    { name: 'id_periode', sqltype: sql.Numeric, value: req.body.id_periode },
    { name: 'id_master', sqltype: sql.Int, value: req.body.id_master },
    { name: 'id_satker', sqltype: sql.VarChar, value: req.body.id_satker }
  ]

  var query = "delete from Indikator_SatuanKerja where id_periode = @id_periode and id_master = @id_master and id_satker = @id_satker"
  executeQuery(res, query, model, 1)
})

//tabel abmas
app.get("/api/abmas/", function(req, res)
{
    var query = "select * from abmas"
    executeQuery(res, query, null, 0);
})

//tabel dosen
app.get("/api/dosen/", function(req, res)
{
    var query = "select * from dosen"
    executeQuery(res, query, null, 0);
})

//tabel penelitian
app.get("/api/penelitian/", function(req, res)
{
    var query = "select * from penelitian"
    executeQuery(res, query, null, 0);
})

//tabel publikasi
app.get("/api/publikasi/", function(req, res)
{
    var query = "select * from publikasi"
    executeQuery(res, query, null, 0);
})

//tabel Log Indikator Satuan Kerja

app.get("/api/log-indikator-satker", function(req, res){
  var query = "select * from Indikator_SatuanKerja_Log"
  executeQuery(res, query, null, 0)
})
//  LISTEN

app.listen(port, hostname, function () {
  var message = "Server runnning on Port: " + port;
  console.log(message);
});