// import React,{useEffect, useState} from 'react'
// import axios from '../../axios'

// const CreateCategory = () => {

//     const categories = ["phone", "laptop", "tablet"];


//     const [categoryName, setCategoryName] = useState('');
//     const [subCategoryName,setSubCategoryName] = useState('')


//     useEffect(()=> {

    

//     })
  
//     // const handleCategoryName = (e) => {
//     //   setCategoryName(e.target.value);
//     // };
  
   
  
//     const handleSubmit = (e) => {
//       e.preventDefault();

//       //send category name to backend
//       axios
//           .post('/add-category',{categoryName})
//           .then((res) => {
//             console.log('category added',res.data);
//           })
//           .catch((err)=>{
//             console.log('category adding error',err);
//           })

//      };

//   const handleAddSubcategory =(subcategory)=>{

//     console.log(subcategory);
        
//   }
//   return (
//     <div className="container mt-4">
//       <h2>Add Your Categories</h2>
//       <div className="row">
//       <form onSubmit={handleSubmit} className='row'>
//         <div className="col-8">
            
//           <input
//             type="text"
//             name='name'
//             className="form-control"
//             placeholder="Category Name"
//             value={categoryName}
//             onChange={(e)=> setCategoryName(e.target.value) }
//           />
//         </div>
//         <div className="col-4">
//           <button className="btn btn-primary" type='submit'>
//             Add Category
//           </button>
//         </div>
//         </form> 
//       </div>
//       <div className="mt-4">
//         <h4>Categories</h4>
//         <ul>
//           {categories.map((category, index) => (
//             <li key={index}>
//               <div className="d-flex align-items-center">
//               <h5>{category}</h5>

//               <input
//                   type="text"
//                   name="subCategoryName"
//                   className="form-control ml-2"
//                   placeholder="Subcategory Name"
//                   value={subCategoryName}
//                   onChange={(e)=> setSubCategoryName(e.target.value)}
//                 />
//                 <button
//                   className="btn btn-primary ml-2"
//                   onClick={() => handleAddSubcategory(subCategoryName)}
//                 >
//                   Add Subcategory
//                 </button>
//               </div>
//               <ul>
//                 <li>Phone 1</li>
//                 <li>Phone 2</li>
//                 <li>Phone 3</li>
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
  
//   )
// }

// export default CreateCategory



// import React, { useEffect, useState } from "react";
// import {Modal} from 'react-bootstrap'
// import axios from "../../axios";

// const CreateCategory = () => {
//   const categories = ["phone", "laptop", "tablet"];

//   const [categoryName, setCategoryName] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {}, []);

//   const handleCategoryName = (e) => {
//     setCategoryName(e.target.value);
//   };

//   const handleSubCategoryName = (e) => {
//     setSubCategoryName(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // send category name to backend
//     axios
//       .post("/add-category", { categoryName })
//       .then((res) => {
//         console.log("category added", res.data);
//       })
//       .catch((err) => {
//         console.log("category adding error", err);
//       });
//   };

//   const handleAddSubcategory = (e) => {
//     e.preventDefault();

//     // send subcategory data to the backend
//     axios
//       .post("/add-subcategory", { subCategoryName })
//       .then((res) => {
//         console.log("subcategory added", res.data);
//         setModalVisible(false);
//       })
//       .catch((err) => {
//         console.log("subcategory adding error", err);
//       });
//   };

//   const openModal = () => {
//     setModalVisible(true);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Add Your Categories</h2>
//       <div className="row">
//         <form onSubmit={handleSubmit} className="row">
//           <div className="col-8">
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="Category Name"
//               value={categoryName}
//               onChange={handleCategoryName}
//             />
//           </div>
//           <div className="col-4">
//             <button className="btn btn-primary" type="submit">
//               Add Category
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="mt-4">
//         <h4>Categories</h4>
//         <ul>
//           {categories.map((category, index) => (
//             <li key={index}>
//               <div className="d-flex align-items-center">
//                 <h5>{category}</h5>

//                 <button
//                   className="btn btn-primary ml-2"
//                   onClick={openModal}
//                 >
//                   Add Subcategory
//                 </button>
//               </div>
//               <ul>
//                 <li>Phone 1</li>
//                 <li>Phone 2</li>
//                 <li>Phone 3</li>
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <Modal
//         isOpen={modalVisible}
//         onClose={() => setModalVisible(false)}
//         title="Add Subcategory"
//       >
//         <div className="modal-body">
//           <input
//             type="text"
//             name="subCategoryName"
//             className="form-control"
//             placeholder="Subcategory Name"
//             value={subCategoryName}
//             onChange={handleSubCategoryName}
//           />
//         </div>
//         <div className="modal-footer">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={() => setModalVisible(false)}
//           >
//             Close
//           </button>
//           <button
//             type="submit"
//             className="btn btn-primary"
//             onClick={handleAddSubcategory}
//           >
//             Add Subcategory
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CreateCategory;



import React, { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import axios from "../../axios";

const CreateCategory = () => {

  const [mainCategories,setMainCategories] = useState([])
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState('')

  



useEffect(()=> {

axios
    .get('/get-top-level-category')
    .then((res)=>{
 
  setMainCategories(res.data)
})
.catch((err)=>{
  console.log('main category find error' , err);
})


},[])


  

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubCategoryName = (e) => {
    setSubCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // send category name to backend
    axios
      .post("/add-category", { categoryName })
      .then((res) => {
        console.log("category added", res.data);
      })
      .catch((err) => {
        console.log("category adding error", err);
      });
  };

  const handleAddSubcategory = () => {
    // send subcategory name to  backend
    axios
      .post("/add-subcategory", { subCategoryName,categoryId })
      .then((res) => {
        console.log("subcategory added", res.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.log("subcategory adding error", err);
      });
  };

  const openModal = (id) => {
    setShowModal(true);
    setCategoryId(id)
console.log(id);

    
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
        <h4>Categories</h4>
        <ul>
          {mainCategories.map((category, index) => (
           
            <li key={index}>
              <div className="d-flex align-items-center">
                <h5>{category.name}</h5>

                <button
                  className="btn btn-primary ml-2"
                  onClick={() => openModal(category._id)}
                >
                  Add Subcategory
                </button>
              </div>
              <ul>
                <li>Phone 1</li>
                <li>Phone 2</li>
                <li>Phone 3</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

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

