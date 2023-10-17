import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [subcategories,setSubCatagory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState('');




 
  useEffect(() => {
    // Get the products from the backend
    axios.get("/get-all-products")
      .then(function (res) {
      
        setProducts(res.data.products);
        setCategories(res.data.mainCategories)
        setSubCatagory(res.data.subcategories)
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

  const totalCount = products.length
 
  
  return (
    <div className="container">
      <header className="mb-4">
        <h1 className="text-center">Enjoy our products!</h1>
      </header>

      <h2 className="text-center mb-3">Electronics ({totalCount})</h2>

      <h1 className="mb-2">Subcategories:</h1>

      <ul className="list-group" >
      <li className="list-group-item">
     <Link onClick={() => setSelectedCategory("All")}>All ({products.length})</Link>
   </li>
  {categories.map((category) => (
    
    <li className="list-group-item" key={category.id}>
      <Link  
      onClick={() => {
        setSelectedCategory(category); 
          
        }}>
        {category.name} ({category.productCount})
      </Link>
    </li>
  ))}
      </ul>



      {filteredSubcategories.length > 0 && (
        <>
          <h3 className="mb-2">Subcategories:</h3>
          <ul className="list-group" style={{ display: "flex", flexDirection: "column" }}>
            {filteredSubcategories.map((subcategory) => (
              <li className="list-group-item" key={subcategory._id} onClick={() => setSelectedSubCategory(subcategory.name)}>
                {subcategory.name} ({subcategory.productCount})
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="row mt-5">
        {selectedSubCategory
          ? filteredProductsBySubcategory.map((product) => (
              <div className="col-md-4 mb-3" key={product._id}>
                <div className="card">
                  <img className="card-img-top" src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <Link to={`/products/${product._id}`} className="btn btn-primary">
                      View product
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : filteredProducts.map((product) => (
              <div className="col-md-4 mb-3" key={product._id}>
                <div className="card">
                  <img className="card-img-top" src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
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




