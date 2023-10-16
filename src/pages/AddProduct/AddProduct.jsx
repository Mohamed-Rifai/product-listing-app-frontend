import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from '../../axios'

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();

  
useEffect(()=>{

axios
     .get('/get-all-category')
     .then((res)=>{
        
        const allCategories = res.data
        const subCategories = allCategories.filter(category => category.parent !==null)
        console.log(subCategories);
        setCategories(subCategories)
     })
     .catch((err)=> {
        console.log('add product useEffect :',err);
     })

},[])



  const handleSubmit = (e) => {
    e.preventDefault();


    const selectedCategory = categories.find((cat) => cat.name === category);


    const productData = {
        name,
        price,
        description,
        category :selectedCategory._id
      };
      console.log(productData);
  
      axios.post("/add-product", productData)
        .then(function (res) {
         
          alert("Product created successfully!");
          navigate('/')

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
            <option value="" disabled>
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
