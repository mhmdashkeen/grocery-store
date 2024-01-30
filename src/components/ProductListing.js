import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProducts, getCategory, getProducts, getProductsCategory } from '../slice/Product';
import CartIncDec from './CartIncDec';

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
                <div className="col">
                    <h3>Categories</h3>
                    <button type="button" className="btn btn-outline-primary btn-block" onClick={() => dispatch(getProducts())}>All Products</button>
                    {productsDetail.productsCategories.map(cat => <button key={cat} type="button" className="btn btn-outline-primary btn-block" onClick={() => dispatch(getProductsCategory(cat))}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>)}                    
                </div>
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
                                         {product.quantity !== undefined && product.quantity > 0 ? <><CartIncDec addRemoveCart={addRemoveCart} product={product} />
                                         <Link to={"/cart"} style={{width: "calc(100% - 30px)", position: "absolute", top: "0", left: "15px"}} className="btn btn-primary mt-3">Go to Cart</Link>
                                         </> : 
                                         <button onClick={() => addRemoveCart(product, "increase")} style={{width: "100%"}} className="btn btn-primary">Add to Cart</button>}
                                         {loggedInUser?.isAdmin && (<><Link to={`/edit/${product.id}`}  state={{"product": product}} style={{width: "100%"}} className="btn btn-secondary mt-3">Edit</Link>
                                         <button onClick={() => dispatch(deleteProducts(product.id))} style={{width: "100%"}} className="btn btn-primary  mt-3">Delete</button></>)}
                                         <Link to={`/products/${product.id}`} state={{"product": product}} style={{width: "100%"}} className="btn btn-secondary  mt-3">View Details</Link>
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