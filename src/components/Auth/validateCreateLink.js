export default function validateCreateLink(values) {
    let errors = {

    };

    if (!values.description) {
        errors.description = "Description Required";
    } else if (values.description.length < 10) {
        errors.description = "Invalid description, must be at least 10 characters";
    }

    if (!values.url) {
        errors.url = "URL Required"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "url must be valid";
    }

    return errors;
}
