import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateFeedback(data) {
    let errors = {};
    
    data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.subject = !isEmpty(data.subject) ? data.subject : "";
    data.body = !isEmpty(data.body) ? data.body : "";

    // fullName check
    if (Validator.isEmpty(data.fullName)) {
        errors.fullName = "Name field is required";
    }

    // Email check
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Subject check
    if (Validator.isEmpty(data.subject)) {
        errors.subject = "Subject field is required";
    }

    // Body check
    if (Validator.isEmpty(data.body)) {
        errors.body = "Body field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};