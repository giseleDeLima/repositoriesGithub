import React from 'react';

/* Importando algumas propriedades do react router dom que é um módulo para fazer
roteamento do aplicação front, ele exporta vários tipos de roteadores
BrowserRouter: Permite fazer a navegação entre um pág e outra e nossas rotas eleas ficam
como uma barra como um endereço localhost:3000/contato quer dizer que queremos acessar a
//pág de contato
Switch: Garante que apenas uma rota seja chamada por momento, porque o react-router-dom
ele pode chamar mais de uma rota, onde dois componentes podem ser chamados em tela */
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Importando os componentes para ser utilizado nas rotas */
import Main from './pages/Main';
import Repository from './pages/Repository';

function Routes() {
  /* O retorno será nossas rotas, tudo no react é um componente inclusive cada rota
  será um componente, cada componente importado terá uma rota */
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/Repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
