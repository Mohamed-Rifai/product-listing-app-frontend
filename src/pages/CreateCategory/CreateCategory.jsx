import React,{useEffect, useState} from 'react'
import axios from '../../axios'

const CreateCategory = () => {

    const categories = ["phone", "laptop", "tablet"];


    const [categoryName, setCategoryName] = useState('');
    // const [parentCategory, setParentCategory] = useState(null);


    useEffect(()=> {

    

    })
  
    const handleCategoryName = (e) => {
      setCategoryName(e.target.value);
    };
  
   
  
    const handleSubmit = (e) => {
      e.preventDefault();

      //send category name to backend
      axios
          .post('/add-category',{categoryName})
          .then((res) => {
            console.log('category added',res.data);
          })
          .catch((err)=>{
            console.log('category adding error',err);
          })

     };

  const handleAddSubcategory =()=>{

  }
  return (
    <div className="container mt-4">
      <h2>Add Your Categories</h2>
      <div className="row">
      <form onSubmit={handleSubmit} className='row'>
        <div className="col-8">
            
          <input
            type="text"
            name='name'
            className="form-control"
            placeholder="Category Name"
            value={categoryName}
            onChange={handleCategoryName}
          />
        </div>
        <div className="col-4">
          <button className="btn btn-primary" type='submit'>
            Add Category
          </button>
        </div>
        </form> 
      </div>
      <div className="mt-4">
        <h4>Categories</h4>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <h5>{category}</h5>
              <button className="btn btn-primary">Add Subategory</button>
              <ul>
                <li>Phone 1</li>
                <li>Phone 2</li>
                <li>Phone 3</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  
  )
}

export default CreateCategory