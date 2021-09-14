function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value === 'a@b.co') {
        setEmailError("Email da ton tai!!!")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Email ko hop le!!!")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length < 6) {
        setPasswordError("Password phai > 5 ki tu!!!")
    } else {
        setPasswordError("")
    }
}

function validateUsername(value, setUsernameError) {
    if (value.length < 2) {
        setUsernameError("Username phai > 1 ki tu!!!")
    } else {
        setUsernameError("")
    }
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword,
    validateUsername
};

export default utils;