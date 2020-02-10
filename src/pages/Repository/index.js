import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

/* Componente pode receber propriedades props ao ser chamado, neste caso na rota
 recebemos uma propriedade chamada match, e dentro dela tem uma outra propriedade que se
 chama params e la dentro estará nossos parametros */

/* Realizamos o decode da propriedade */
class Repository extends Component {
  /* O tipo da propriedade match é um objeto porque dentro dela tem outra propriedade que
  é params, para definir uma propriedade do tipo objeto eu utilizo shape e digo que ela
  é obrigatória, e dentro deste objeto eu tenho uma propriedade chamada params ela tbm é
  um objeto porque dentro dela tem a propriedade repository, e dentro da repository como
  não tenho mais propriedade eu digo que ela é uma string */
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {}, // Como é um unico repositorio começo ele como um obj e não array
    issues: [], // e as issues como são varias inicio como um array
    loading: true,
  };

  /* Quando o componente aparece em tela */
  async componentDidMount() {
    /* Dado que vem através da minha URL */
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    /* Temos que efetuar duas chamadas a API uma com as informações do repositório solicitado
    e outra com as issues que são os comentários de usuários do github, poderiamos efetuar
    essas chamadas de forma isolada:
    const response = await api.get(...)
    const issues = await api.get(...)
    Porém a requisição das issues não tem necessidade de aguardar a finalização da primeira
    requisição, então não faz sentido fazer dessa forma... então vamos fazer as duas chamadas
    serem feitas ao mesmo tempo, e passamos um array com todas as promisses ou seja com
    todas as chamadas que queremos fazer a api as duas serão executadas juntas.
    Agora só ira passar para a proxima linha de quando as duas chamadas finalizarem.

    Pegando o valor de cada retorno: os valores são retornadas em um array a primeira
    posição ira vim o resultado da primeira chamada a api e a segunda posição a segunda
    chamada da api, então podemos fazer uma desestruturação onde o primeiro onde o resultado
    da primeira chamado eu coloco dentro de repository e a segunda dentro de issues

    Na chamada a api das issues passamos algumas query params que nada mais é que filtros
    para busca, neste caso vamos retornar apenas as issues que os estados delas são open
    ou seja issues em aberto que não foram resolvidas, e vou retornar apenas 5 itens
    */

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 10,
        },
      }),
    ]);

    /* .data é onde os dados vem no axios */
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1> {repository.name} </h1>
          <p> {repository.description} </p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            // Transforma em string
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  {/* Não vamos usar o link do react-router-dom porque não é nenhum
                  link interno, queremos redirecionar o usuário para a pagina html daquela
                  issue */}
                  <a href={issue.html_url}> {issue.title} </a>

                  {/* Labels: */}
                  {issue.labels.map(label => (
                    <span key={String(label.id)}> {label.name} </span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}

export default Repository;
