import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import CreateCategory from './pages/CreateCategory/CreateCategory';
import AddProduct from './pages/AddProduct/AddProduct';
import ProductList from './pages/ProductLists/ProductList';

const App = () => {
  return (
   
    <div>
      <Router>
        <Routes>
         <Route path='/' element={<ProductList/>}/>
         <Route path='/create-category' element={<CreateCategory/>}/>
         <Route path='/add-products' element={<AddProduct/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
