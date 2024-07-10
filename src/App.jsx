import React from 'react';
import { Provider } from 'react-redux';
import { productStore } from './Redux/ProductStore';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div>
      <Provider store={productStore}>
        <Header />
        <Home />
      </Provider>
      <Footer />
    </div>
  );
};

export default App;