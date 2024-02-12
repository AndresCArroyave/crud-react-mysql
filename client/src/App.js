import './App.css';
import { useState } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [titulo,setTitulo] = useState("");
  const [autor,setAutor] = useState("");
  const [descripcion,setDescripcion] = useState("");
  const [id,setId] = useState(0);

  const [editar,setEditar] = useState(false);

  const [booksList,setBooks] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create",{
      titulo:titulo,
      autor:autor,
      descripcion:descripcion
    }).then(()=>{
      getBooks();
      limpiarCampos();
      alert("Libro Registrado");
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update",{
      id_libro:id,
      titulo:titulo,
      autor:autor,
      descripcion:descripcion
    }).then(()=>{
      getBooks();
      limpiarCampos();
      alert("Libro Actualizado");
    });
  }

  const eliminarLibro = (id_libro) => {
  Axios.delete(`http://localhost:3001/delete/${id_libro}`).then(()=>{
      getBooks();
      limpiarCampos();
      alert("Libro Eliminado");
    });
  }

  const limpiarCampos = ()=> {
    setTitulo("");  
    setAutor("");
    setDescripcion("");
    setId("")
    setEditar(false)
  }

  const editarLibro = (val)=>{
      setEditar(true);

      setTitulo(val.titulo);
      setAutor(val.autor);
      setDescripcion(val.descripcion);
      setId(val.id_libro);
  }

  const getBooks = () => {
    Axios.get("http://localhost:3001/books",).then((response)=>{
      setBooks(response.data);
    });
  }

  return (
    <div className="container">
      <div className="card text-center mt-5 bg-secondary">
        <div className="card-header">
          GESTION DE LIBROS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Titulo: </span>
            <input type="text"
             onChange={(event) => {
              setTitulo(event.target.value)
            }}
            className="form-control" value={titulo} placeholder="Ingrese titulo del libro"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Autor: </span>
            <input type="text" value={autor}
             onChange={(event) => {
              setAutor(event.target.value)
            }}
            className="form-control" placeholder="Ingrese nombre de autor" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Descripcion: </span>
            <input type="text" value={descripcion}
             onChange={(event) => {
              setDescripcion(event.target.value)
            }}
            className="form-control" placeholder="Ingrese descripcion del libro"/>
          </div>

        </div>
        <div className="card-footer text-body-secondary">
          {
            editar? 
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button> 
            </div> 
            : <button className='btn btn-success' onClick={add}>Registrar</button>  
          }
        </div>
      </div>

      <table className="table table-striped mt-4">
            <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Autor</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        
            
        {
          booksList.map((val,key)=>{
            return <tr key={val.id_libro}>
                    <th>{val.id_libro}</th>
                    <td>{val.titulo}</td>
                    <td>{val.autor}</td>
                    <td>{val.descripcion}</td>
                    <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" 
                      onClick={()=>{
                        editarLibro(val)
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" onClick={()=>{
                        eliminarLibro(val.id_libro);
                      }} className="btn btn-danger">Eliminar</button>
                    </div>
                    </td>
                  </tr>
          })
        }
        <div className="App">
          <div className='lista'>
          <button className='mt-5 bg-success text-white rounded' onClick={getBooks}>Traer Informacion</button>
          </div>
        </div>
        
      </table>

    </div>
  );
}

export default App;
