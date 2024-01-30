import React from 'react';

const CartIncDec = ({addRemoveCart, product, disableDec}) => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <button disabled={disableDec !== undefined && product.quantity === 1} onClick={() => addRemoveCart(product, "decrease")} className="btn btn-secondary">-</button>
            <span>{product.quantity}</span>
            <button  onClick={() => addRemoveCart(product, "increase")} className="btn btn-secondary">+</button>
        </div>
    );
}
 
export default React.memo(CartIncDec);