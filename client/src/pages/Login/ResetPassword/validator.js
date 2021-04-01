const validation = ({ password1, password2 }) =>  {
    let errors = [];

    // Passwords Match
    if(password1 !== password2 && password1.length > 0){
        errors.push("* Passwords do not match")
    }

    // Minimum 6 characters
    if(password1.length < 6){
        errors.push("* Password mush be at least 6 characters long")
    }

    // Has at least 1 letter
    let regExp = /[a-zA-Z]/g;
    if (!regExp.test(password1)){
        errors.push("* Password mush include at least 1 letter")
    }

    // Has at least 1 Number
    let regExp2 = /\d/;
    if (!regExp2.test(password1)){
        errors.push("* Password mush include at least 1 number")
    }


    return {
        validationErrors: errors,
        isValid: errors.length === 0,
    }
}

export default validation;