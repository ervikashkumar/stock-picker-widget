import logo from './logo.svg';
import './App.scss';
import SearchBox from './components/searchbox/SearchBox';
import { useState } from 'react';
import StockDetail from './components/stockdetails/StockDetail';

function App() {

const [selectedStock, setSelectedStock] = useState("");

  return (
    <div className="App">
    <SearchBox setSelectedStock ={setSelectedStock}></SearchBox>

    <StockDetail selectedStock = {selectedStock} />

    </div>
  );
}

export default App;
