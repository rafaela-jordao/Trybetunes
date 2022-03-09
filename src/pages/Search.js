import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      btnDisabled: true,
      list: [],
      artistName: '',
      loading: false,
      artist: '',
    };
  }

  // verifica se o input recebe dois ou mais caracteres e habilita o botão.
  handleChange = ({ target }) => {
    const caracter = 2;
    this.setState(() => ({
      artistName: target.value,
      btnDisabled: target.value.length < caracter,
    }));
  }

  btnSearch = () => {
    const { artistName } = this.state;
    this.setState({
      loading: true,
    },
    async () => {
      const albumList = await searchAlbumsAPI(artistName);
      this.setState({
        loading: false,
        artistName: '',
        list: albumList,
        artist: artistName,
      });
    });
  }

  render() {
    const { btnDisabled, list, artistName, loading, artist } = this.state;
    return (
      <div data-testid="page-search">
        {
          (loading === true)
            ? (<Loading />)
            : (
              <>
                <Header />

                <form>
                  <input
                    className="input-search"
                    type="text"
                    data-testid="search-artist-input"
                    name="artistName"
                    placeholder="Nome do artista"
                    value={ artistName }
                    onChange={ this.handleChange }
                  />

                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ btnDisabled }
                    onClick={ this.btnSearch }
                  >
                    Pesquisar
                  </button>
                </form>

                <div className="result-albums">
                  {artist && `Resultado de álbuns de: ${artist}`}
                </div>

                <div className="not-album">
                  {list.length === 0 && 'Nenhum álbum foi encontrado'}
                </div>
                <div className="card-album">
                  {list.map((album) => (
                    <div key={ album.collectionId }>
                      <div>{album.artistName}</div>
                      <div>{album.collectionName}</div>
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <Link
                        data-testid={ `link-to-album-${album.collectionId}` }
                        to={ `/album/${album.collectionId}` }
                      />
                    </div>
                  ))}
                </div>
              </>
            )
        }
      </div>
    );
  }
}

export default Search;
