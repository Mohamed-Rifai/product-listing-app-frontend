import React, { useState } from "react";
import axios from '../../axios'

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");


  const categories = [
    {
      name: 'ios',
      id: 123
    },
    {
      name: 'android',
      id: 456
    },
    {
      name: 'mac',
      id: 789
    },
    {
      name: 'windows',
      id: 1011
    }
  ]
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
        name,
        price,
        description,
        category :"634c4568f0234567890abcde"
      };
  
      axios.post("/add-product", productData)
        .then(function (res) {
         
          alert("Product created successfully!");
        })
        .catch(function (err) {
          
          alert("An error occurred while creating the product.");
        });
  };

  return (
    <div className="container p-5">
      <header className="mb-4">
        <h1>Add Product</h1>
      </header>
 
      <form onSubmit={handleSubmit} className="  justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="form-control mb-3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <textarea
            name="description"
            placeholder="Description"
            className="form-control mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            name="category"
            className="form-control mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled selected>
    Choose your category
  </option>
            {categories && categories.map((category) => (
  <option key={category.id} value={category.id}>
    {category.name}
  </option>
))}
          </select>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary mt-3">
            Add Product
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default AddProduct;
