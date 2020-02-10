import styled from 'styled-components';

const Container = styled.div`
  /* Largura máxima */
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;

  /* Se passar de 700px o elemento fica centralizado na tela */
  margin: 80px auto;

  h1 {
    font-size: 20px;

    /* Propriedades abaixo centralizam o elemento h1 e icone verticamente */
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  /* O icone é um svg */
  svg {
    margin-right: 10px;
  }
`;

export default Container;
