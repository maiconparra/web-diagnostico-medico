import React, { useState, useEffect } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './SideBar.css';
import './Main.css';

//Component
//Propriedade
//Estado


function App() {

  const [ diags, setDiags ] = useState([]);

  
  const [ name, setName ] = useState('');
  const [ sintomas, setSintomas ] = useState('');
  const [ filiacao, setFiliacao ] = useState('');
  const [ nomeFiliado, setNomeFiliado ] = useState('');
  const [ diagnostico, setDiagnostico ] = useState('');

useEffect(() => {
  async function loadDiags(){
    const response = await api.get('/sintomas');
    
    setDiags(response.data);
  }

  loadDiags();
}, []);

function monstraDiag(){
    if((sintomas[0] === 'Vomito') && (sintomas[1] === "Febre") && (sintomas[2] === "Diarreia")){
      setDiagnostico('Virose');
   }else if((sintomas[0] === 'Febre') && (sintomas[1] === "Secreção nasal") && (sintomas[2] === "Dor de cabeça")){
      setDiagnostico('Sinusite');
   }else if((sintomas[0] === "Dor de cabeça") && (sintomas[1] === "Sonolencia") && (sintomas[2] === "Febre")){
     setDiagnostico('Gripe');
   }else {
      setDiagnostico("Dignostico não Encontrado");
   }
}

async function handleAddSintomas(e){
  e.preventDefault();

  monstraDiag();

  const response = await api.post('/sintomas', {
    name,
    sintomas,
    filiacao,
    nomeFiliado,
    diagnostico
  });

  setName(' ');
  setSintomas(' ');
  setFiliacao(' ');
  setNomeFiliado(' ');
  setDiagnostico(' ');

  setDiags([...diags, response.data]);
}

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddSintomas}>
          <div className='input-block'>
            <label htmlFor="name">Nome</label>
            <input 
            name="name" 
            id="name" 
            required
            value={name}
            onChange={e => setName(e.target.value)}
            />
          </div>
        
          <div className='input-block'>
            <label htmlFor="sintomas">Sintomas</label>
            <input 
            name="sintomas" 
            id="sintomas" 
            required 
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
            />
          </div>

          <div className="input-group">
            
              <div className="input-g">
                <label htmlFor="filiacao">Filiação</label>
                <input
                 name="filiacao"
                id="filiacao" 
                required 
                value={filiacao}
                onChange={e => setFiliacao(e.target.value)}
                />
              </div>

              <div className="input-g">
                <label htmlFor="longitude">Nome Filiado</label>
                <input 
                name="nomeFiliado" 
                id="nomeFiliado" 
                required 
                value={nomeFiliado} 
                onChange={e => setNomeFiliado(e.target.value)}
                />
              </div>

          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {diags.map(diags => (
            <li key={diags._id} className="dev-item">
            <header>
              <div className="user-info">
                  <strong>{diags.name}</strong>
                  <span>{diags.sintomas.join(', ')}</span>
                  <p>{diags.diagnostico}</p>
              </div>
            </header>
          </li>
          ))}
        
        </ul>
      </main>
    </div>
  );
}

export default App;
