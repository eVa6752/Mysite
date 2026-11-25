// 1. Кнопка «Подробнее» на странице «Обо мне»
const moreButton = document.querySelector('#showMore');
const moreText = document.querySelector('#moreText');

if (moreButton && moreText) {
    moreButton.addEventListener('click', () => {
        moreText.classList.toggle('d-none');

        moreButton.textContent = moreText.classList.contains('d-none')
            ? 'Подробнее'
            : 'Скрыть';
    });
}

// 2. Переключение светлой и тёмной темы на всех страницах
const themeButton = document.querySelector('#theme');

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        themeButton.textContent = document.body.classList.contains('light-theme')
            ? 'Тёмная тема'
            : 'Светлая тема';
    });
}

// 3. Проверка формы обратной связи на странице «Контакты»
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const commentInput = document.querySelector('#comment');
    const formMessage = document.querySelector('#formMessage');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !email.includes('@') || !comment) {
            formMessage.textContent = 'Заполни все поля и проверь email.';
            formMessage.className = 'text-danger mt-3';
            return;
        }

        formMessage.textContent = `Спасибо, ${name}! Форма заполнена правильно.`;
        formMessage.className = 'text-success mt-3';

        contactForm.reset();
    });
}

// 4. Создание карточек проектов из данных JSON на главной странице
const projectsList = document.querySelector('#projectsList');

function renderProjects(projects) {
    projectsList.innerHTML = projects.map((project) => `
        <div class="col-md-4">
            <article class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}">Подробнее</a>
            </article>
        </div>
    `).join('');
}

if (projectsList) {
    fetch('./data/projects.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить projects.json');
            }

            return response.json();
        })
        .then((projects) => {
            renderProjects(projects);
        })
        .catch((error) => {
            projectsList.textContent = 'Не удалось загрузить проекты. Проверь файл data/projects.json.';
            console.error(error);
        });
}
