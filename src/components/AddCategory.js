import React, { useState } from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeCategory } from "../slice/Category";

const AddCategory = () => {
    const [formValues, setFormValues] = useState({
        category: "",
        categoryName: ""
    });
    const [catLoading, setCatLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const categories = useSelector(state => state.category);
    const dispatch = useDispatch();

    const addCat = () => {
        setLoading(true);
        dispatch(addCategory(formValues.categoryName))
        .unwrap()
        .then(() => {
            setLoading(false);
            setFormValues((prevState) => ({
                ...prevState,
                categoryName: ""
            }))
        })
        .catch((e) => {
          console.log("API Error", e);
          setLoading(false);
        })
    }

    const remCategory = () => {
        setCatLoading(true);
        dispatch(removeCategory(formValues.category))
        .unwrap()
        .then(() => {
            setCatLoading(false);
        })
        .catch((e) => {
          console.log("API Error", e);
          setCatLoading(false);
        })
    }

    console.log("CAT", categories);
    return (
        <div className="row">
            <div className='col-6'>
                <div className="form-group">
                <Stack spacing={2} direction="column" justifyContent={"end"}>
                    <TextField id="standard-basic" fullWidth label="Category" variant="standard" type="text"
                    required
                    value={formValues.categoryName}
                    onChange={(e) => {
                        setFormValues((prevState) => ({
                        ...prevState,
                        categoryName: e.target.value
                        }))
                    }}
                    name="categoryName"/>
                     <LoadingButton
                        loading={loading}
                        variant="contained"
                        onClick={addCat}
                        >
                    <span>Add Category</span>
                </LoadingButton>
                </Stack>
                </div>
            </div>
            {categories.length !== 0 ? 
            <div className='col-6'>
                <div className="form-group">
                <Stack spacing={2} direction="column" justifyContent={"end"}>
                    <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard-label"
                        value={formValues.category}
                        onChange={(e) => {
                            setFormValues(prevState => ({
                                ...prevState,
                                [e.target.name]: e.target.value
                            }));
                        }}
                        label="Category"
                        name="category"
                    >
                        {categories.map(c => <MenuItem key={c.id} value={c.value}>{c.label}</MenuItem>)}
                    </Select>
                    </FormControl>
                    <LoadingButton
                        loading={catLoading}
                        variant="contained"
                        onClick={remCategory}
                        >
                        <span>Remove Category</span>
                    </LoadingButton>
                </Stack>
                </div>
            </div> : <div>Categories Yet to load</div>}
        </div>
    );
}
 
export default AddCategory;