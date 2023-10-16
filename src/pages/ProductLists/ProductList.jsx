import React, { useState, useEffect } from "react";
import axios from "../../axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");



  const categories = [
    {
      name: "635c4568f0234567890abcde",
      id: 123
    },
    {
      name: 'Laptop',
      id: 456
    },
    {
      name: 'Tablet',
      id: 789
    },
   
  ]




  
  useEffect(() => {
    // Get the products from the backend
    axios.get("/get-all-products")
      .then(function (res) {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  const filterProducts = (products, category) => {
    if (category === "All") {
      return products;
    } else {
      return products.filter((product) => product.category === category);
    }
  };
  
  const filteredProducts = filterProducts(products, selectedCategory);
  

  const totalCount = products.length
  const count = products.filter((product) => product.category === selectedCategory).length;
 console.log(count);
  
  return (
    <div className="container">
      <header className="mb-4">
        <h1 className="text-center">Enjoy our products!</h1>
      </header>

      <h2 className="text-center mb-3">Electronics ({totalCount})</h2>

      <h3 className="mb-2">Subcategories:</h3>

      <ul className="list-group" style={{ display: "flex", flexDirection: "column" }}>
      <li className="list-group-item">
    <a href="#" onClick={() => setSelectedCategory("All")}>All ({products.length})</a>
  </li>
  {categories.map((subcategory) => (
    
    <li className="list-group-item" key={subcategory.id}>
      <a href="#" onClick={() => setSelectedCategory(subcategory.name)}>
        {subcategory.name} ({count})
      </a>
    </li>
  ))}
      </ul>

      <div className="row mt-5">
        {filteredProducts.map((product) => (
  <div className="col-md-4 mb-3" key={product.id}>
    <div className="card">
      <img className="card-img-top" src={product.image} alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <a href={`/products/${product.id}`} className="btn btn-primary">
          View product
        </a>
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default ProductList;
