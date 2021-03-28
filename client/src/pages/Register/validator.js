const validation = (form) =>  {
    let errors = {};

    // First Name
    if (form.firstName.length === 0){
        errors.firstName = "Please fill in with your first name";
    }

    // Last Name
    if (form.lastName.length === 0){
        errors.lastName = "Please fill in with your last name";
    }

    // Email Address
    if (form.email.length === 0){
        errors.email = "Please fill in the email address";
    }else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email.toLowerCase())){
        errors.email = "Please type a valid email address";
    }

    // Password
    if (form.password.length === 0){
        errors.password = "Please fill in the password";
    }else if (form.password.length < 6){
        errors.password = "Your password should be at least 6 characters long";
    }else if (form.password !== form.password2){
        errors.password = "Your passwords do not match";
    }

    return {
        validationErrors: errors,
        isValid: Object.keys(errors).length === 0
    }
}

export default validation;