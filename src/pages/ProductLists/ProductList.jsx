import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import './productList.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    // Get the products from the backend
    axios
      .get("/get-all-products")
      .then(function (res) {
        setProducts(res.data.products);
        setCategories(res.data.mainCategories);
        setSubcategories(res.data.subcategories);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const filterProducts = (products, category) => {
    if (category === "All") {
      return products;
    } else {
      return products.filter((product) => product.category.parent === category._id);
    }
  };

  const filteredProducts = filterProducts(products, selectedCategory);

  // Filter subcategories of main category
  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.parent === selectedCategory._id
  );

  // Filter products based on the selected subcategory
  const filteredProductsBySubcategory = filteredProducts.filter(
    (product) => product.category.name === selectedSubCategory
  );

  return (
    <div className="container">
      <header className="mb-4">
        <h1 className="text-center">Enjoy our products!</h1>
      </header>

      <div className="d-flex justify-content-between">
        <h2 className="mb-3">Electronics ({products.length})</h2>
        <div className="btn-group">
          <Link to="/add-products" className="btn btn-success">
            Add Product
          </Link>
          <Link to="/create-category" className="btn btn-info">
            Add Category
          </Link>
        </div>
      </div>

      <div className="mb-2">
        <p className="mb-0" onClick={() => setSelectedCategory("All")}>
          Subcategories:
        </p>
        <ul className="list-group">
          {categories.map((category) => (
            <li className="list-group-item" key={category.id}>
              <Link onClick={() => setSelectedCategory(category)}>
                {category.name} ({category.productCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {filteredSubcategories.length > 0 && (
        <div className="mb-2">
          <p>Subcategories:</p>
          <ul className="list-group" style={{ display: "flex", flexDirection: "column" }}>
            {filteredSubcategories.map((subcategory) => (
              <li key={subcategory._id}>
                <Link className="list-group-item" onClick={() => setSelectedSubCategory(subcategory.name)}>
                  {subcategory.name} ({subcategory.productCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="row mt-5">
        {(selectedSubCategory ? filteredProductsBySubcategory : filteredProducts).map((product) => (
          <div className="col-md-3 mb-3" key={product._id}>
            <div className="card">
              <img className="card-img-top" src={ 'https://via.placeholder.com/200x200'} alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">$: {product.price}</p>
                <Link to={`/products/${product._id}`} className="btn btn-primary">
                  View product
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


