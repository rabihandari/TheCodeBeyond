const validation = (form) =>  {
    let errors = {};

    // Email Address
    if (form.email.length === 0){
        errors.email = "Please fill in the email address";
    }else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email.toLowerCase())){
        errors.email = "Please type a valid email address";
    }

    // Password
    if (form.password.length === 0){
        errors.password = "Please fill in the password";
    }

    return {
        validationErrors: errors,
        isValid: Object.keys(errors).length === 0
    }
}

export default validation;