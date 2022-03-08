import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const caracter = 2;
    this.setState(() => ({
      name: target.value,
      btnDisabled: target.value.length < caracter,
    }));
  }

  render() {
    const { name, btnDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              type="text"
              name="search"
              id="search"
              placeholder="Nome do artista"
              onChange={ this.handleChange }
              value={ name }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              id="search-button"
              disabled={ btnDisabled }
            >
              Pesquisar
            </button>

          </label>
        </form>
      </div>
    );
  }
}

export default Search;
