import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import "./ListingProduct.css";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ListingProduct(props) {
  console.log("PROPS", props.data);
  const { name, thumbnail, category, sellPrice, discount, saleIn, weight, id  } = props.data;
  return (
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Item>
            <div className="listing--container">
                <div className="listing--link">
                    {thumbnail && (<div className="listing--image--container" style={{paddingTop: "120%"}}>
                        <div className="listing--image--div" style={{paddingTop: "120%"}}>
                            <img className="listing--image" alt={name} src={thumbnail}/>
                        </div>
                    </div>
                  )}
                    <div className="listing--details--section">
                        <div className="listing--details--right">
                          <div><span className="listing--size--span">W</span> <span className="weight">{weight}{saleIn}</span></div>
                          {/* <div><span className="listing--size--span">S</span> {stock}q</div> */}
                        </div>
                        {category && <div className="listing--category">{category}</div>}
                        <div className="listing--name">{name}</div>
                        <div className="listing--price">
                          <div className="listing--price--original">₹{`${sellPrice - parseInt(discount)}/${saleIn}`}</div>
                          <div className="listing--price--mrp">M.R.P.&nbsp;&nbsp;₹{sellPrice}</div>
                          <div className="listing--price--discount">(₹{discount} off)</div>
                        </div>
                    </div>
                    <Link to={`/products/${id}`} state={{"product": props.data}}><Button variant="contained" style={{width: "100%"}}>View Details</Button></Link>
                </div>
            </div>
          </Item>
        </Grid>
  );
}