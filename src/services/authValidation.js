export const validateForm = (formData, currentState) => {
    // Name validation 
    if (currentState === "Sign Up") {
        const nameRegex = /^[A-Za-z ]{3,}$/;
        if (!formData.name.trim()) {
            return 'Name is required';
        } else if (!nameRegex.test(formData.name.trim())) {
            return 'Name must be at least 3 letters and contain only alphabets';
        }


        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            return 'Email is required';
        } else if (!emailRegex.test(formData.email.trim())) {
            return 'Please enter a valid email';
        }

        // Password validation
        const password = formData.password;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!password) {
            return 'Password is required';
        } else if (!passwordRegex.test(password)) {
            return 'Password must be at least 6 characters and include uppercase, lowercase, number, and special character';
        }
    }


    // for login validations
    if (currentState === "Login") {
        if (!formData.email.trim()) {
            return 'Email is required';
        }
        if (!formData.password) {
            return 'Password is required';
        }
    }

    return ''; // No errors
};
