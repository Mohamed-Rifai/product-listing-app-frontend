import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");
  




 
  useEffect(() => {
    // Get the products from the backend
    axios.get("/get-all-products")
      .then(function (res) {
      
        setProducts(res.data.products);
        setCategories(res.data.mainCategories)

      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);


  const filterProducts = (products, category) => {
    if (category === "All") {
      return products;
    } else {
      console.log(category);
      return products.filter((product) => product.category.parent === category._id);
    }
  };
  
  const filteredProducts = filterProducts(products, selectedCategory);
  

  const totalCount = products.length
 
  
  return (
    <div className="container">
      <header className="mb-4">
        <h1 className="text-center">Enjoy our products!</h1>
      </header>

      <h2 className="text-center mb-3">Electronics ({totalCount})</h2>

      <h3 className="mb-2">Subcategories:</h3>

      <ul className="list-group" style={{ display: "flex", flexDirection: "column" }}>
      <li className="list-group-item">
     <Link onClick={() => setSelectedCategory("All")}>All ({products.length})</Link>
   </li>
  {categories.map((category) => (
    
    <li className="list-group-item" key={category.id}>
      <Link  onClick={() => setSelectedCategory(category)}>
        {category.name} ({category.productCount})
      </Link>
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
        <Link to={`/products/${product.id}`} className="btn btn-primary">
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



// import React, { useState, useEffect } from "react";
// import {Link} from 'react-router-dom'
// import axios from '../../axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   useEffect(() => {
//     // Get the products from the backend
//     axios.get("/get-all-products")
//       .then(function (res) {
//         setProducts(res.data.products);
        
//       })
//       .catch(function (err) {
//         console.log(err);
//       });

//     // Get the categories from the backend
//     axios.get("/get-all-category")
//       .then(function (res) {
//         setCategories(res.data);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   }, []);

//   const filterProducts = (products, category) => {
//     if (category === "All") {
//       return products;
//     } else {
//       return products.filter((product) => product.category.name === category);
//     }
//   };

//   const filteredProducts = filterProducts(products, selectedCategory);

//   return (
//     <div className="container">
//       <header className="mb-4">
//         <h1 className="text-center">Enjoy our products!</h1>
//       </header>

//       <h2 className="text-center mb-3">Electronics ({products.length})</h2>

//       <h3 className="mb-2">Subcategories:</h3>

//       <ul className="list-group" style={{ display: "flex", flexDirection: "column" }}>
//         <li className="list-group-item">
//           <Link onClick={() => setSelectedCategory("All")}>All ({products.length})</Link>
//         </li>
//         {categories.map((subcategory) => (
//           <li className="list-group-item" key={subcategory.id}>
//             <Link onClick={() => setSelectedCategory(subcategory.name)}>
//               {subcategory.name} ({filteredProducts.length})
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <div className="row mt-5">
//         {/* {filteredProducts.map((product) => (
//           <div className="col-md-4 mb-3" key={product.id}>
//             <div className="card">
//               <img className="card-img-top" src={product.image} alt={product.name} />
//               <div className="card-body">
//                 <h5 className="card-title">{product.name}</h5>
//                 <p className="card-text">{product.description}</p>
//                 <Link to={`/products/${product.id}`} className="btn btn-primary">
//                   View product
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
