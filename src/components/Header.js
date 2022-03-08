import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({
      user: usuario.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header
        data-testid="header-component"
        className="header"
      >
        {
          loading ? <Loading />
            : (<p data-testid="header-user-name">{user}</p>)
        }
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>

      </header>
    );
  }
}

export default Header;
