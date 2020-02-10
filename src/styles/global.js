/* Importar uma função que cria estilo global para toda a aolicação */
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* Essas propriedades faz com que o margin o padding e todos os outros espaçamentos
  que podemos adicionar em um elemento eles sejam sempre somados com a largura do elemento
  por exemplo: um elemento possui 280px de largura -width- e se adicionar 10px de padding
  ele não vai chegar a 300 ele continua 280px só que o conteudo desse elemento ele é
  expremido para 260 que seria 280 - 10 de cada lado */
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    /* Faz com que a página possa ocupar 100% da altura, por padrão ele ocupa sempre só
    a altura que o nosso conteúdo possui */
    min-height: 100%;
  }

  body{
    background: #7159c1;
    /* colocar important porque o browser tenta tirar essa propriedade, deixa
    as fontes mais definidas */
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
