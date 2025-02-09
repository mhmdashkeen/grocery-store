import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, editProduct } from '../slice/Product';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { getCategory } from '../slice/Category';
import { LoadingButton } from '@mui/lab';

const formObject = {
  name: "",
  description: "",
  buyPrice: 0,
  sellPrice: 0,
  category: "",
  discount: 0,
  thumbnail: "",
  brand: "",
  weight: "",
  available: true,
  saleIn: "kg",
  profit: 0,
  profitPercentage: 0
} 
const AddProduct = () => {
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

    const { state } = useLocation();
    const categories = useSelector(state => state.category);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(state !== null ? state.product : formObject);
    const [loading, setLoading] = useState(false);

    const saveProduct = () => {
      setLoading(true);
      if(state !== null) {
        dispatch(editProduct(formValues))
        .unwrap()
        .then(() => {
          setFormValues(formObject);
          setLoading(false);
          console.log("Success");
        })
        .catch((e) => {
          console.log("API Error", e.message);
          setLoading(false);
          toast(e.message);
        })
      } else {
        dispatch(addProduct(formValues))
        .unwrap()
        .then(() => {
          setFormValues(formObject);
          setLoading(false);
          console.log("Success");
        })
        .catch((e) => {
          console.log("API Error", e.message);
          setLoading(false);
          toast(e.message);
        })
      }
    }

    const handleCancel = () => {
      setFormValues(formObject);
    }

    useEffect(() => {
      if(categories.length === 0){
        dispatch(getCategory());
      }
    }, []);

    const handleSellChange = (e) => {
        const profit = e.target.value - formValues.buyPrice;
        const profitPercentage = (e.target.value - formValues.buyPrice) * 100 / e.target.value + "%";
        const discount = parseInt(profitPercentage) > 10 ? 0 : null;
        setFormValues((prevState) => ({
        ...prevState,
        profit,
        profitPercentage,
        discount
        }))
    }

    const handleBuyChange = (e) => {
      const profit = formValues.sellPrice - e.target.value;
      const profitPercentage = parseInt(profit * 100 / formValues.sellPrice) + "%";
      const discount = parseInt(profitPercentage);
      setFormValues((prevState) => ({
      ...prevState,
      profit,
      profitPercentage,
      discount
      }))
  }

    console.log('STTE', formValues);

    return (
        <div className="container" style={{padding: "30px 0px"}}>
          <div className='row'>
            <div className='col-6'>
              <div className="form-group">
                <TextField fullWidth label="Name" variant="standard" type="text" id="name"
                  required
                  value={formValues.name}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    name: e.target.value
                    }))
                  }}
                  name="name"/>
              </div>
            </div>

            {/* <div className='col-6'>
              <div className="form-group">
               <Textarea aria-label="Description" required minRows={3}  placeholder="Description" value={formValues.description}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    description: e.target.value
                    }))
                  }}
                  name="description"/>
              </div>
            </div> */}

            <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Buy price" variant="standard" type="number" id="buyPrice"
                  required
                  value={formValues.buyPrice}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    buyPrice: parseInt(e.target.value)
                    }))
                  }}
                  onBlur={(e) => handleBuyChange(e)}
                  name="buyPrice"/>
              </div>
            </div>

            <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Sell Price" variant="standard" type="number" id="sellPrice"
                  required
                  value={formValues.sellPrice}
                  onChange={(e) => setFormValues((prevState) => ({
                    ...prevState,
                    sellPrice: parseInt(e.target.value)
                    }))}
                  onBlur={(e) => handleSellChange(e)}
                  name="sellPrice"/>
              </div>
            </div>

            <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Profit" variant="standard" type="number" id="profit"
                  value={formValues.profit}
                  readonly
                  name="profit"/>
              </div>
            </div>

            <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Profit Percentage" variant="standard" type="text" id="profitPercentage"
                  value={formValues.profitPercentage}
                  readonly
                  name="profitPercentage"/>
              </div>
            </div>

            {/* <div className='col-6'>
              <div className="form-group">
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard-label"
                  value={formValues.category}
                  onChange={(e) => setFormValues((prevState) => ({
                    ...prevState,
                    category: e.target.value
                    }))}
                  label="Category"
                  name="category"
                >
                  {categories.map(c => <MenuItem key={c.id} value={c.value}>{c.label}</MenuItem>)}
                </Select>
              </FormControl>
              </div>
            </div> */}
           <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Discount" variant="standard" type="number" id="discount"
                  required
                  value={formValues.discount}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    discount: e.target.value
                    }))
                  }}
                  name="discount"/>
              </div>
            </div>
            
            {/* <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Thumbnail" variant="standard" type="url" id="thumbnail"
                  required
                  value={formValues.thumbnail}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    thumbnail: e.target.value
                    }))
                  }}
                  name="thumbnail"/>
              </div>
            </div> */}
            <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Brand" variant="standard" type="text" id="brand"
                  required
                  value={formValues.brand}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    brand: e.target.value
                    }))
                  }}
                  name="brand"/>
              </div>
            </div>
            <div className='col-6'>
              <div className="form-group">
              <TextField fullWidth label="Weight" variant="standard" type="text" id="weight"
                  required
                  value={formValues.weight}
                  onChange={(e) => {
                    setFormValues((prevState) => ({
                    ...prevState,
                    weight: e.target.value
                    }))
                  }}
                  name="weight"/>
              </div>
            </div>
            <div className='col-6'>
              <div className="form-group">
              <FormControl variant="standard" fullWidth>
                <InputLabel id="available">Available</InputLabel>
                <Select
                  labelId="available"
                  id="available"
                  value={formValues.available}
                  onChange={(e) => setFormValues((prevState) => ({
                    ...prevState,
                    available: e.target.value
                    }))}
                  label="available"
                  name="available"
                >
                  <MenuItem key="yes" value="yes">Yes</MenuItem>
                  <MenuItem key="no" value="no">No</MenuItem>
                </Select>
              </FormControl>
              </div>
            </div>
            <div className='col-6'>
              <div className="form-group">
              <FormControl variant="standard" fullWidth>
                <InputLabel id="saleIn">SaleIn</InputLabel>
                <Select
                  labelId="saleIn"
                  id="saleIn"
                  value={formValues.saleIn}
                  onChange={(e) => setFormValues((prevState) => ({
                    ...prevState,
                    saleIn: e.target.value
                    }))}
                  label="saleIn"
                  name="saleIn"
                >
                  <MenuItem key="kg" value="kg">KG</MenuItem>
                  <MenuItem key="packet" value="packet">Packet</MenuItem>
                </Select>
              </FormControl>
              </div>
            </div>
            <div className='col text-right'>
              <Stack spacing={2} direction="row" justifyContent={"end"}>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                <LoadingButton
                      loading={loading}
                      variant="contained"
                      onClick={saveProduct}
                    >
                  <span>{state !== null ? "Update" : "Add"} Product</span>
                </LoadingButton>
              </Stack>
            </div>
          </div>
      </div>
    );
}
 
export default React.memo(AddProduct);