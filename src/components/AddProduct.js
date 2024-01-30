import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, editProduct } from '../slice/Product';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

const formObject = {
  name: "",
  description: "",
  price: 0,
  category: "",
  discountPercentage: 0,
  thumbnail: ""
} 
const AddProduct = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(state !== null ? state.product : formObject);

    const saveProduct = () => {
      if(state !== null) {
        console.log("aa");
        dispatch(editProduct(formValues))
        .unwrap()
        .then(() => {
          setFormValues(formObject);
          console.log("Success");
        })
        .catch((e) => {
          console.log("API Error", e.message);
          toast(e.message);
        })
      } else {
        dispatch(addProduct(formValues))
        .unwrap()
        .then(() => {
          setFormValues(formObject);
          console.log("Success");
        })
        .catch((e) => {
          console.log("API Error", e.message);
          toast(e.message);
        })
      }
    }

    // console.log('STTE', state.product.id, formValues);

    return (
        <div style={{padding: "30px 0px"}}>
          <div className='row'>
            <div className='col-6'>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={formValues.name}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    name: e.target.value
                    }))
                  }}
                  name="name"
                />
              </div>
            </div>

            <div className='col-6'>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" required rows="3" value={formValues.description}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    description: e.target.value
                    }))
                  }}
                  name="description"></textarea>
              </div>
            </div>

            <div className='col-6'>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  required
                  value={formValues.price}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    price: e.target.value
                    }))
                  }}
                  name="price"
                />
              </div>
            </div>

            <div className='col-6'>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  required
                  value={formValues.category}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    category: e.target.value
                    }))
                  }}
                  name="category"
                />
              </div>
            </div>

            <div className='col-6'>
              <div className="form-group">
                <label htmlFor="discountPercentage">Discount Percentage</label>
                <input
                  type="number"
                  className="form-control"
                  id="discountPercentage"
                  required
                  value={formValues.discountPercentage}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    discountPercentage: e.target.value
                    }))
                  }}
                  name="discountPercentage"
                />
              </div>
            </div>
            
            <div className='col-6'>
              <div className="form-group">
                <label htmlFor="thumbnail">Thumbnail</label>
                <input
                  type="url"
                  className="form-control"
                  id="thumbnail"
                  required
                  value={formValues.thumbnail}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    thumbnail: e.target.value
                    }))
                  }}
                  name="thumbnail"
                />
              </div>
            </div>
            <div className='col-6'>
              <button
              onClick={saveProduct}
              className="btn btn-success">
               {state !== null ? "Update" : "Add"} Product
              </button>
            </div>
          </div>
      </div>
    );
}
 
export default AddProduct;