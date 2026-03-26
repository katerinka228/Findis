document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors(form);
        let isValid = true;

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === '') {
            showError(emailInput, 'Введите email');
            isValid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            showError(emailInput, 'Введите корректный email');
            isValid = false;
        }

        if (password === '') {
            showError(passwordInput, 'Введите пароль');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                email: email,
                password: password
            };
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            alert('Вход выполнен! Данные в консоли.');
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