const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"library"
})

app.post("/create",(req,res)=>{
   const titulo = req.body.titulo;
   const autor = req.body.autor;
   const descripcion = req.body.descripcion;
   
   db.query('INSERT INTO books(titulo,autor,descripcion) VALUES(?,?,?)',[titulo,autor,descripcion],
   (err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.send(result)
    }
   }
   );
});

app.get("/books",(req,res)=>{
    db.query('SELECT * FROM books',
    (err,result)=>{
     if(err){
         console.log(err)
     }else{
         res.send(result)
     }
    }
    );
 });

 app.put("/update",(req,res)=>{
    const id = req.body.id_libro;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const descripcion = req.body.descripcion;
    
    db.query('UPDATE books SET titulo=?,autor=?,descripcion=? WHERE id_libro=?',[titulo,autor,descripcion,id],
    (err,result)=>{
     if(err){
         console.log(err)
     }else{
         res.send(result)
     }
    }
    );
 });

 app.delete("/delete/:id_libro",(req,res)=>{
    const id = req.params.id_libro;
    
    
    db.query('DELETE FROM books WHERE id_libro=?',[id],
    (err,result)=>{
     if(err){
         console.log(err)
     }else{
         res.send(result)
     }
    }
    );
 });
 

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
}) 