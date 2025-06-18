import { statusTextEl } from "../main.js";
import { showStatus } from "./status.js";

export function validate() {
    const form = document.getElementById('form');
    if (!form) {
        console.error('Form element not found');
        return;
    }

    const validator = new window.JustValidate('#form');

    validator
    .addField(document.querySelector('#name'), [
        {
            rule: 'required',
            errorMessage: 'Введите ваше имя',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальная длина 3 символа',
        },
        {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Минимальная длина 20 символа',
        },
    ])
    .addField(document.querySelector('#email'), [
        {
          rule: 'required',
          errorMessage: 'Введите вашу почту',
        },
        {
          rule: 'email',
          errorMessage: 'Неверный формат',
        },
    ])
    .addField(document.querySelector('#agree'), [
        {
          rule: 'required',
          errorMessage: 'Согласие обязательно',
        },
    ])
    .onSuccess(async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Ошибка при отправке');

            const result = await response.json();
            console.log('Ответ от сервера:', result);
            statusTextEl.textContent = 'Благодарим за обращение!'
            showStatus()
            form.reset();
        } catch (err) {
            console.error(err);
            statusTextEl.textContent = 'Ошибка при отправке обращения!'
            showStatus()
            form.reset();
        }
    });
}