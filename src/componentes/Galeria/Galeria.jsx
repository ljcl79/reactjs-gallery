import { useState, useEffect } from "react";
import './Galeria.css';

function Galeria() {
  const [autor,setAutor] = useState('');
  const [pagina, setPagina] = useState(1);
  const [listaImagenes, setListaImagenes] = useState([]);
  // 2. LLamamos al función que consume la API al momento de montar el componente
  useEffect(() => {
    consultarInformacion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina]);

  //Filtro por autor
  const listaImagenesFiltradas = listaImagenes.filter(e => e.author.toLowerCase().startsWith(autor.toLowerCase()));

  // 1. Función que consulta la API
  const consultarInformacion = async () => {
    const url = 'https://picsum.photos/v2/list?page='+pagina+'&limit=4';
    
    const response = await fetch(url);
    const data = await response.json();
    
    setListaImagenes([...listaImagenes,...data]);
    
  }
  
  return (
    <div className="d-flex flex-column">
        <div className="d-flex">
            <div className="col-lg-6 col-md-6 p-2">
                <span>Filtro de autor:</span>
                <input name="filtro" id="filtro" value={autor} onChange={(e) => setAutor(e.target.value)} className="w-100"/>
            </div>
            <div className="col-lg-6 col-md-6 p-2 d-flex align-items-center">
                <button className="btn btn-success w-100" onClick={() => setPagina(pagina + 1)}>Mas imagenes</button>
            </div>
        </div>
      
      <div className="grid-container">
      {listaImagenesFiltradas.map(f => 
      <div className="card item" key={f.id}>
        <img src={f.download_url} alt={f.author} title={f.author} />
        <p>Autor: {f.author}</p>
      </div>
      )}
      </div>
    </div>
  );
}
export default Galeria;

