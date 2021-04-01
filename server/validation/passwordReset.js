import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateLoginInput(data) {
    let errors = {};
    
    data.password1 = !isEmpty(data.password1) ? data.password1 : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Password 1 check
    if (Validator.isEmpty(data.password1)) {
        errors.password1 = "Password field is required";
    } 

    // Password 2 check
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password field is required";
    } 

    // Password length check
    if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
        errors.password1 = "Password must be at least 6 characters";
    }

    // Passwords match check
    if (!Validator.equals(data.password1, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};