/* keyframe para fazer animações */

import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff6b6b' : '#eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

/* Fazer animação no spinner para ele rodar.
podemos utilizar como se fosse uma animação no css, e dentro do css precisamos informar
de que estado meu item vai para qual estado */
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

/* Estamos adicionando um atributo a esta botão dizendo o type dele é submit
E através de props estamos acessando os atributos deste componente */

/* Vou setar uma propriedade disabled neste componente baseado no atributo loading */
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 1;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  /* Somando essas propriedades vai garantir que todo conteudo do botão seja centralizado */
  display: flex;
  justify-content: center;
  align-items: center;

  /* & serve para se referir a este elemento ao botão, aqui caso a propriedade disabled
  receber o valor true, e este valor vem da propriedade loading, ele aplica essas
  estilizações */
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Se a propriedade loading for true, aqui poderiamos até utilizao o operador ternario
  mas como não teremos uma condição else que não bata, então utilizamos o && e as estilizações
  só serão aplicadas se a propriedade loading estiver como true*/

  /* Chamamos o css que importamos do styled components e coloco o que eu quero aplicar de
  css para este meu elemento, e aplico a estilização a cada 2 segundos uma animação
  totalmente linear e infinita */

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  /* Tirar os bolinhas da lista */
  list-style: none;
  margin-top: 30px;

  /* E para cada tag <li> */
  li {
    padding: 15px 0; /* Espaçamento em cima e em baixo de 15px */
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* Ele vai jogar o titulo para a esquerda e detalhes direita */
    align-items: center;

    /* Adcionar uma bordar conza entre cada <li> da minha lista */
    /* Me referencio pelo elemento atual + li ou seja estou pegando todos os li
    e pegando qualquer li que seja seguido pelo um li anterior, ou seja ele não vai
    aplicar essa estilização no primeiro li, apenas nos demais */
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none; /* Para tirar o anderline do link */
    }
  }
`;
