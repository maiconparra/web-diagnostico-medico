import React from 'react';

import './styles.css'

function DevItem({ sintomas }){
  return (
    <li className="dev-item">
    <header>
      <img src={sintomas.fotoUrl} alt={sintomas.name}/>
      <div className="user-info">
          <strong>{sintomas.name}</strong>
          <span>{sintomas.techs.join(', ')}</span>
          <p> Teste </p>
          <a href="">Acessar Perfil no Github</a>
      </div>
    </header>
  </li>
  );
}

export default DevItem;