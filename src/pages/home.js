import React from 'react';

import HomeMain from '../components/home/HomeMain';
import Navbar from '../components/navbar/Navbar';

function Home() {
  return (
    <div className="App">
      <Navbar/>
      <HomeMain/>
    </div>
  );
}

export default Home;
