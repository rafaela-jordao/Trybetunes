import propTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      resultApi: [],
      musicList: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const album = musics.filter((music, index) => index !== 0);
    this.setState({
      resultApi: musics,
      musicList: album,
      loading: false,
    });
  }

  render() {
    const { resultApi, musicList, loading } = this.state;
    console.log(resultApi);
    return (
      <div data-testid="page-album">
        <h2>Album</h2>
        {
          loading
            ? <Loading />
            : (

              <div>
                <img src={ resultApi[0].artworkUrl100 } alt={ resultApi[0].artistName } />

                <h3 data-testid="album-name">{resultApi[0].collectionName}</h3>
                <p data-testid="artist-name">{resultApi[0].artistName}</p>

                <div className="music-list">
                  {musicList.map((music) => (
                    <MusicCard
                      key={ music.trackName }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                    />
                  ))}
                </div>
              </div>
            )
        }
      </div>

    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }),
}.isRequirede;

// Ajuda da Luá Octaviano para entender o pq de não estar conseguindo renderizar a imagem, nome do álbum e artista na tela.
// solução: uso do loading e acesso a ResultApi através do índice.

export default Album;
