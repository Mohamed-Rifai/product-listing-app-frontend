import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import axios from "../../axios";
import { Link } from "react-router-dom";



   const CreateCategory = () => { 

     const [mainCategories, setMainCategories] = useState([]);
     const [subCategories, setSubCategories] = useState([]);
     const [categoryName, setCategoryName] = useState("");
     const [subCategoryName, setSubCategoryName] = useState("");
     const [showModal, setShowModal] = useState(false);
     const [categoryId, setCategoryId] = useState('');
     

  useEffect(() => {
    // Fetch all categories
    axios.get('/get-all-category')
      .then((res) => {
        const categorizedCategories = res.data;
        const mainCategories = categorizedCategories.filter(category => category.parent ===null);
        const subCategories = categorizedCategories.filter(category => category.parent !==null);

        setMainCategories(mainCategories);
        setSubCategories(subCategories);
      })
      .catch((err) => {
        console.log('Error fetching categories', err);
      });
  }, []);

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubCategoryName = (e) => {

    setSubCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send category name to backend
    axios.post("/add-category", { categoryName })
      .then((res) => {
        console.log("category added", res.data);
       
        window.location.reload();
      })
      .catch((err) => {
        console.log("category adding error", err);
      });
  };

  const handleAddSubcategory = () => {
    if (subCategoryName) {
      // send subcategory name and parent category ID to the backend
      axios
        .post("/add-subcategory", { subCategoryName, categoryId })
        .then((res) => {
          console.log("subcategory added", res.data);
          setShowModal(false);
          window.location.reload()
        })
        .catch((err) => {
          console.log("subcategory adding error", err);
        });
    } else {
      alert('Field is required');
    }
  };
  

  const openModal = (id) => {
    setShowModal(true);
    setCategoryId(id);
  };


  return (
    <div className="container mt-4">
      <h2>Add Your Categories</h2>
      <div className="row">
        <form onSubmit={handleSubmit} className="row">
          <div className="col-8">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Category Name"
              value={categoryName}
              required
              onChange={handleCategoryName}
            />
          </div>
          <div className="col-4">
            <button className="btn btn-primary" type="submit">
              Add Category
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <h4>Main Categories</h4>
        <ul>
          {mainCategories.map((category, index) => (
            <li key={index}>
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5>{category.name}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => openModal(category._id)}
                >
                  Add Subcategory
                </button>
              </div>
              <ul>
                {subCategories
                  .filter(subcategory => subcategory.parent === category._id)
                  .map((subcategory, subIndex) => (
                    <li key={subIndex}>{subcategory.name}</li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/">Home</Link>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="subCategoryName"
            className="form-control"
            placeholder="Subcategory Name"
            value={subCategoryName}
            required
            onChange={handleSubCategoryName}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSubcategory}>
            Add Subcategory
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateCategory;



