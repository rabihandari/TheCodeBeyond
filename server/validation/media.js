import isEmpty from 'is-empty';

export default function validateImage(file) {
    let errors = {};

    // Validate extension
    let extension = file.filename.split('/').pop().split('.').pop()
    if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg'){
        errors.extension = "File cannot be of type " + extension.toUpperCase()
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};