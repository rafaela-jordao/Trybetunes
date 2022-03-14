import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: false,
    };
  }

  // Requisito 8 - mecanismo para add músicas na lista de músicas favoritas.
  // Ajuda do Gabriel Pinheiro na monitoria (14/03/22) para finalizar e entender o erro (trackId undefined) apresentado no requisito.
  addFavoritesSongs = ({ target }) => {
    const { music } = this.props;
    this.setState({
      loading: true,
      favorite: target.checked,
    }, async () => {
      if (target.checked === true) {
        await addSong(music);
      }
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { loading, favorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    return (

      <div>
        { loading
          ? <Loading />
          : (

            <>
              <div>
                <p>{trackName}</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                </audio>
              </div>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name="music-favorite"
                  id={ trackId }
                  checked={ favorite }
                  onChange={ this.addFavoritesSongs }
                />
              </label>

            </>

          )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
