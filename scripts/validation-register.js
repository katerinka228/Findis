document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors(form);
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm_password');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Валидация имени
        if (name === '') {
            showError(nameInput, 'Введите имя');
            isValid = false;
        } else if (name.length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        }

        // Валидация email
        if (email === '') {
            showError(emailInput, 'Введите email');
            isValid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            showError(emailInput, 'Введите корректный email');
            isValid = false;
        }

        // Валидация пароля
        if (password === '') {
            showError(passwordInput, 'Введите пароль');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Пароль должен быть не менее 6 символов');
            isValid = false;
        }

        // Валидация подтверждения пароля
        if (confirmPassword === '') {
            showError(confirmPasswordInput, 'Подтвердите пароль');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordInput, 'Пароли не совпадают');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                name: name,
                email: email,
                password: password
            };
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            alert('Регистрация успешна! Данные в консоли.');
        }
    });

    function showError(input, message) {
        input.classList.add('border-red-500');
        const error = document.createElement('p');
        error.classList.add('text-red-500', 'text-sm', 'mt-1');
        error.textContent = message;
        input.parentNode.appendChild(error);
    }

    function clearErrors(form) {
        form.querySelectorAll('.border-red-500').forEach(el => {
            el.classList.remove('border-red-500');
        });
        form.querySelectorAll('.text-red-500.text-sm.mt-1').forEach(el => el.remove());
    }

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            const parent = this.parentNode;
            const errorMessages = parent.querySelectorAll('.text-red-500.text-sm.mt-1');
            errorMessages.forEach(el => el.remove());
        });
    });
});