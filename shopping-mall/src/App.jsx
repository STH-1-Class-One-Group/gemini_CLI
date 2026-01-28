import React from 'react';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import MainCarousel from './components/MainCarousel';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './App.css'; // For any custom global styles

function App() {
  return (
    <div className="App">
      <Header />
      <NavigationBar />
      <MainCarousel />
      <ProductGrid title="베스트 상품" />
      <ProductGrid title="오늘의 특가" />
      <Footer />
    </div>
  );
}

export default App;