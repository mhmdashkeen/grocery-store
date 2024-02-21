import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProducts, getCategory, getProducts, getProductsCategory } from '../slice/Product';
import CartIncDec from './CartIncDec';
import Categories from './Categories';

const ProductListing = ({addRemoveCart}) => {
    const productsDetail = useSelector(state => state.products);
    const loggedInUser = useSelector(state => state.products.loggedInUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if(productsDetail.productsLists.length === 0){
            dispatch(getProducts());
            dispatch(getCategory());
        }
    }, []);

    return (
        <div className="container">
            <div className="row">
                <Categories />
                <div className="col-9">
                    <h3>Products</h3>
                    <div className="row abc">
                        {!productsDetail.loading ? <div className='col-12' style={{textAlign: "center"}}>Loading</div> : 
                             productsDetail.productsLists.length === 0 ? <div className='col-12' style={{textAlign: "center"}}>No Product.</div> :
                             productsDetail.productsLists.map(product => {
                                 return <div className="col-4" key={product.id}>
                                 <div className="card">
                                     <img src={product.thumbnail} className="card-img-top" alt=""/>
                                     <div className="card-body">
                                         <h5 className="card-title">{product.name}</h5>
                                         <p className="card-text" title={product.description}>{product.description}</p>
                                         {loggedInUser?.isAdmin && (<><Link to={`/edit/${product.id}`}  state={{"product": product}} style={{width: "100%"}} className="btn btn-secondary mt-3">Edit</Link>
                                         <button onClick={() => dispatch(deleteProducts(product.id))} style={{width: "100%"}} className="btn btn-primary  mt-3">Delete</button></>)}
                                         <Link to={`/products/${product.id}`} state={{"product": product}} style={{width: "100%"}} className="btn btn-primary mt-3">View Details</Link>
                                     </div>
                                 </div>
                             </div>
                             })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default React.memo(ProductListing);