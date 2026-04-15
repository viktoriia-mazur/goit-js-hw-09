import '../css/2-form.css';

const form = document.querySelector('.feedback-form');
const localStorageKey = "feedback-form-state";

// 1. Оголошуємо об'єкт formData
let formData = { email: "", message: "" };

// 2. Перевірка сховища при завантаженні сторінки
const savedData = localStorage.getItem(localStorageKey);

if (savedData) {
    formData = JSON.parse(savedData);
    // Заповнюємо поля форми даними зі сховища
    form.elements.email.value = formData.email ?? "";
    form.elements.message.value = formData.message ?? "";
}

// 3. Відстеження змін у формі (делегування на подію input)
form.addEventListener('input', (event) => {
    const key = event.target.name;
    const value = event.target.value.trim(); // Прибираємо пробіли по краях

    formData[key] = value;
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

// 4. Обробка сабміту
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Перевірка на порожні поля
    if (formData.email === "" || formData.message === "") {
        alert("Fill please all fields");
        return;
    }

    // Якщо все добре: вивід у консоль, очищення сховища, об'єкта та форми
    console.log(formData);
    
    localStorage.removeItem(localStorageKey);
    formData = { email: "", message: "" };
    form.reset();
});
