import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z]/, "First letter must be uppercase"),

  age: Yup.number()
    .required("Age is required")
    .min(1, "Age must be non-negative"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: Yup.string()
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

  gender: Yup.string().required("Please select your gender"),

  termsAccepted: Yup.boolean()
    .required("You must accept the terms and conditions")
    .oneOf([true], "You must accept the terms and conditions"),

  picture: Yup.mixed<FileList>()
    .required("Picture is required")
    .test(
      "fileSize",
      "File size must be less than 2MB",
      (value: FileList | undefined): boolean => {
        if (!value || value.length === 0) {
          return false;
        }
        return value[0].size < 2 * 1024 * 1024;
      },
    )
    .test(
      "fileType",
      "File must be a .png or .jpeg",
      (value: FileList | undefined): boolean => {
        if (!value || value.length === 0) {
          return false;
        }
        return ["image/jpeg", "image/png"].includes(value[0].type);
      },
    ),

  country: Yup.string().required("Country is required"),
});

export default validationSchema;
