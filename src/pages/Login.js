import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnDisabled: true,
      loading: false,
      loggedIn: false,
    };
  }

  handleChange({ target }) {
    const caracter = 3;
    this.setState(() => ({
      name: target.value,
      btnDisabled: target.value.length < caracter,
    }));
  }

  buttonClick(event) {
    const { name } = this.state;
    event.preventDefault();
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        loading: false,
        loggedIn: true,
      });
    });
  }

  render() {
    const { name, btnDisabled, loading, loggedIn } = this.state;
    return (
      <div data-testid="page-login">
        {loading === true
          ? <Loading />
          : (
            <form className="form">
              <label htmlFor="name">
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Digite seu nome"
                  onChange={ (event) => this.handleChange(event) }
                  value={ name }
                />
              </label>

              <button
                data-testid="login-submit-button"
                type="button"
                name="button"
                id="login-submit-button"
                disabled={ btnDisabled }
                onClick={ (event) => this.buttonClick(event) }
              >
                Entrar
              </button>
            </form>
          )}
        {loggedIn && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
