import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

class App extends React.Component {
  render() {
    return (

      <>
        <p>TrybeTunes</p>

        <div>
          <Header />
          <Sidebar />
          <Content />
        </div>
      </>
    );
  }
}

export default App;
