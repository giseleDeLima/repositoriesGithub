import React, { Component } from 'react';

/* react-icons/nome do pacote de icones que queremos utilizar
{ nome do icone -ctrl + espaço } */
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
  };

  // Carrega os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      /* Convertemos novamente a estrutura que estava armazenada em JSON para um
      valor em objeto do javascript  */
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados no localStorage
  /* Temos acesso as props e state desse componente, como não temos nenhuma
  propriedade no componente colocamos _ , e comparamos se o estado de repositórios
  mudou do meu estado atual de repositórios */
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      /* localStorage não aceita array apenas string */
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    const { newRepo, repositories } = this.state;

    try {
      if (newRepo === '') {
        throw new Error('Você precisa indicar um repositório');
      }

      const hasRepo = repositories.find(repo => repo.name === newRepo);
      if (hasRepo) {
        throw new Error('Repositório duplicado');
      }

      // Fazer chamadas a api utilizando a bibloteca axios como ela vai demorar um pouco
      // utilizamos a async await, metodo get para buscar uma informação
      const response = await api.get(`/repos/${newRepo}`);

      // Não vamos utilizar todas as informações que vem da api do github, então
      // fazemos a desestruturação para pegar apenas os dados necessários
      const data = {
        name: response.data.full_name,
      };

      // Agora pegamos esta informação que veio da api e colocamos dentro do array
      // repositories, como temos que montar novamente o array pegamos todas as informações
      // que já tem dentro desse array com ...repositories, e acrescentamos o registro em data
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositórios"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {/* conditional render react - ou seja Renderização condicional
            Se a propriedade loading estiver como true ele mostra o icone de
            spinner, se for false ele mostra o icone de mais para adicionar um
            repositorio */}

            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span> {repository.name} </span>

              {/* a variavel repository.name ela guarda a informação do
              dono do repositório/nome do repositório, e a barra dentro de uma url ela
              significa como se fosse um endereço a mais uma pasta a mais, então precisamos
              realizar um encode neste texto, para que esta barra não seja contada como uma
              barra e sim um caractere especial
              encodeURIComponent é uma função do javascript que vai realizar o encode */}

              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
