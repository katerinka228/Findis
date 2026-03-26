document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        console.log('Данные формы:');
        for (const [key, value] of Object.entries(formData)) {
            console.log(`${key}:`, value);
        }
        console.log('Время отправки:', new Date().toLocaleString());
    });
});