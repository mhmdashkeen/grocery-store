import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Enter atleast 3 charater")
    .required("Name is required."),
  email: Yup.string()
    .email("Enter email in this format example@gmail.com.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Min 8 charater.")
    .required("Password is required.")
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter email in this format example@gmail.com.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Min 8 charater.")
    .required("Password is required.")
});

export const AddressSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Enter atleast 3 charater")
    .required("FullName is required."),
  phone: Yup.string()
    .min(10, "Min 10 charater.")
    .max(10, "Max 10 charater.")
    .required("Phone number is required."),
  houseNumber: Yup.string().required("House No., Building Name is required."),
  nearBy: Yup.string().required("Nearby is required.")
});

export const AddProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Enter atleast 2 charater")
    .required("Name is required."),
  buyPrice: Yup.number().default(0).required("Buy price is required"),
  sellPrice: Yup.number().default(0).required("Sell price is required"),
  weight: Yup.number().required("Weight is required")
});
