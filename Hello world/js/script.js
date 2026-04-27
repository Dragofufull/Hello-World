document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЕЧАТЬ ТЕКСТА (Typewriter) ---
    const introElement = document.getElementById('typewriter-intro');
    const codeElement = document.getElementById('typewriter-code');

    const introContent = '<Вокруг очень много информации. <br> Зачастую, когда хочешь принять важное жизненное решение — очень <br> сильно устаёшь и в итоге многое упускаешь. <br> Чтобы не упускать важные моменты жизни и не терять деньги и время, <br> мы создали этот справочник и постоянно обновляем его./>';
    const codeContent = 'не упускай важные моменты жизни <span style="color: #adff2f;">=</span> <br><span style="color: #ff00d4;">live</span>; <br>не теряй время <span style="color: #adff2f;">=</span> <span style="color: #ffa500;">time</span>; <br>не теряй деньги <span style="color: #adff2f;">=</span> money; <br>с этим тебе поможет этот <span style="color: #ff00d4;">справочник</span> :)';

    function typeEffect(element, content, speed, callback) {
        if (!element) return;
        let i = 0;
        let isTag = false;
        let currentText = "";

        function type() {
            if (i < content.length) {
                let char = content.charAt(i);
                if (char === "<") isTag = true;
                if (char === ">") isTag = false;
                currentText += char;
                element.innerHTML = currentText;
                i++;
                if (isTag) type(); else setTimeout(type, speed);
            } else if (callback) callback();
        }
        type();
    }

    if (introElement) {
        typeEffect(introElement, introContent, 40, () => {
            setTimeout(() => typeEffect(codeElement, codeContent, 60), 500);
        });
    }

    // --- 2. ИНДИКАТОР ПРОКРУТКИ (Scroll Bar) ---
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById("myBar");
        if (bar) bar.style.width = scrolled + "%";
    });

    // --- 3. МАСКА ТЕЛЕФОНА (+374) ---
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (!value.startsWith('374')) value = '374' + value;
            let formattedValue = '+374 ';
            if (value.length > 3) formattedValue += '(' + value.substring(3, 5);
            if (value.length > 5) formattedValue += ') ' + value.substring(5, 7);
            if (value.length > 7) formattedValue += '-' + value.substring(7, 9);
            if (value.length > 9) formattedValue += '-' + value.substring(9, 11);
            e.target.value = formattedValue.trim();
        });

        phoneInput.addEventListener('keydown', (e) => {
            if (e.target.value.length <= 5 && e.key === 'Backspace') e.preventDefault();
        });
    }

    // --- 4. ВАЛИДАЦИЯ ПОЛЕЙ ---
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');

    function validateInput(input, condition) {
        if (!input) return;
        if (input.value.length === 0) {
            input.classList.remove('valid', 'invalid');
        } else if (condition) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    }

    if (nameInput) {
        nameInput.addEventListener('input', () => validateInput(nameInput, nameInput.value.length >= 2));
    }
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateInput(emailInput, emailRegex.test(emailInput.value));
        });
    }

    // --- 5. ОТПРАВКА ФОРМЫ ---
    const form = document.getElementById('my-form');
    const registerBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            registerBtn.innerText = "Обработка...";
            registerBtn.style.opacity = "0.7";

            const data = new FormData(e.target);

            try {
                const response = await fetch(e.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    registerBtn.classList.add('success');
                    registerBtn.innerText = "Успешно отправлено";
                    registerBtn.style.opacity = "1";
                    form.reset();
                    console.log("%c 🎉 Furiku, письмо улетело!", "color: #adff2f; font-size: 20px;");
                } else {
                    registerBtn.innerText = "Ошибка отправки";
                }
            } catch (error) {
                registerBtn.innerText = "Ошибка сети";
            }
        });
    }

    // --- 6. КЛИК ПО ИМЕНИ ---
    const myName = document.querySelector('.copyright-name');
    if (myName) {
        myName.addEventListener('click', () => {
            console.log("%c Привет от Furiku! 🚀", "color: #adff2f; font-size: 20px; font-weight: bold;");
            alert("Спасибо, что заглянули!");
        });
    }

    // --- 7. АНИМАЦИЯ СПИСКА (Scroll Observer) ---
    const topics = document.querySelectorAll('.topics-list');
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topics.forEach((topic, index) => {
                    setTimeout(() => {
                        topic.classList.add('show');
                    }, index * 150); 
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const guideSection = document.querySelector('.guide-contest-list');
    if (guideSection) {
        observer.observe(guideSection);
    }

    // --- 8. ПЛАВНЫЙ СКРОЛЛ КНОПКИ ---
    const mainBtn = document.querySelector('.btn');
    if (mainBtn) {
        mainBtn.addEventListener('click', () => {
            const registerSection = document.getElementById('register');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const translations = {
        'RU': {
            'nav_logo': 'Изучение нового начинается с',
            'nav_about': 'О справочнике', 'nav_guide': 'Содержание', 'nav_prices': 'Цены', 'nav_subscribe': 'Подписка',
            'nav_catalog_h1': 'С ПОЛЬЗОЙ ДЛЯ', 'nav_community': 'КОМЬЮНИТИ',
            'nav_catalog_p': 'Справочник айтишника. Релокация, трудоустройство, IT-мероприятия, чаты по странам.',
            'cta_btn': 'Хочу справочник', 'for_you_title': 'Этот справочник для тебя, если ты',
            'card_1': 'Начинающий айтишник и хочешь войти в среду', 'card_2': 'Крутой айтишник и хочешь больше движа',
            'card_3': 'Переехал в другую страну', 'card_4': 'Планируешь релокацию',
            'guide_title': 'Содержание справочника', 'topic_1': 'Релокация', 'topic_2': 'Чаты по странам',
            'topic_3': 'Работа', 'topic_4': 'Оплата', 'topic_5': 'Бизнес', 'topic_6': 'IT тусовки', 'topic_7': 'Дополнительные материалы',
            'team_msg_title': 'сообщение от', 'we_can_title': 'МЫ МОЖЕМ', 'we_can_subtitle': 'помочь тебе найти свое комьюнити',
            'stat_countries': 'Стран в чатах', 'stat_guides': 'Полезных гайдов', 'stat_reviews': 'Положительных отзывов',
            'price_title': 'Стоимость подписки', 'li_1': 'Найдешь команду в любой стране', 'li_2': 'Новая информация каждую неделю',
            'li_3': 'Доступ ко всем гайдам(50+)', 'update_info': 'Обновления справочника происходят каждый месяц, появляются новые разделы, актуализируется информация.',
            'duration_1': '1 месяц', 'duration_3': '3 месяца', 'duration_forever': 'навсегда',
            'form_title': 'Заполните контактные данные', 'form_name': 'Имя', 'form_email': 'Почта', 'form_btn': 'Перейти к оплате',
            'intro_text': '<Вокруг очень много информации. <br> Зачастую, когда хочешь принять важное жизненное решение — очень <br> сильно устаёшь и в итоге многое упускаешь. <br> Чтобы не упускать важные моменты жизни и не терять деньги и время, <br> мы создали этот справочник и постоянно обновляем его./>',
            'code_text': 'не упускай важные моменты жизни <span style="color: #adff2f;">=</span> <br><span style="color: #ff00d4;">live</span>; <br>не теряй время <span style="color: #adff2f;">=</span> <span style="color: #ffa500;">time</span>; <br>не теряй деньги <span style="color: #adff2f;">=</span> money; <br>с этим тебе поможет этот <span style="color: #ff00d4;">справочник</span> :)',
            'nav_partners': 'Партнеры',
            'nav_team': 'Наша команда',
            'nav_projects': 'Наши проекты',
            'nav_Politics': 'Политика',
            'nav_input_all': 'Подписка на анонсы. Разреши нам присылать тебе уведомления',
            'li_4': 'Удобный бот в «Телеграме»',
            'li_5': 'Нет аналогов на русскоязычной платформе',
        },
        'AM': {
            'nav_logo': 'Նորի ուսումնասիրումը սկսվում է',
            'nav_about': 'Ուղեցույցի մասին', 'nav_guide': 'Բովանդակություն', 'nav_prices': 'Գներ', 'nav_subscribe': 'Բաժանորդագրություն',
            'nav_catalog_h1': 'ՕԳՏԱԿԱՐ', 'nav_community': 'ՀԱՄԱՅՆՔԻ ՀԱՄԱՐ',
            'nav_catalog_p': 'Տեղեկատվական տեխնոլոգիաների ձեռնարկ: Ռելոկացիա, զբաղվածություն, ՏՏ միջոցառումներ, զրուցարաններ ըստ երկրների:',
            'cta_btn': 'Ստանալ ուղեցույցը', 'for_you_title': 'Այս ուղեցույցը քեզ համար է, եթե դու',
            'card_1': 'Սկսնակ ՏՏ մասնագետ ես և ուզում ես մտնել միջավայր', 'card_2': 'Փորձառու ՏՏ մասնագետ ես և ուզում ես ավելի շատ շփում',
            'card_3': 'Տեղափոխվել ես այլ երկիր', 'card_4': 'Պլանավորում ես տեղափոխվել',
            'guide_title': 'Ուղեցույցի բովանդակությունը', 'topic_1': 'Տեղափոխում', 'topic_2': 'Չատեր ըստ երկրների',
            'topic_3': 'Աշխատանք', 'topic_4': 'Վճարումներ', 'topic_5': 'Բիզնես', 'topic_6': 'ՏՏ հավաքույթներ', 'topic_7': 'Լրացուցիչ նյութեր',
            'team_msg_title': 'հաղորդագրություն', 'we_can_title': 'ՄԵՆՔ ԿԱՐՈՂ ԵՆՔ', 'we_can_subtitle': 'օգնել քեզ գտնել քո համայնքը',
            'stat_countries': 'Երկրներ չատերում', 'stat_guides': 'Օգտակար ուղեցույցներ', 'stat_reviews': 'Դրական կարծիքներ',
            'price_title': 'Բաժանորդագրության արժեքը', 'li_1': 'Կգտնես թիմ ցանկացած երկրում', 'li_2': 'Նոր տեղեկատվություն ամեն շաբաթ',
            'li_3': 'Հասանելիություն բոլոր ուղեցույցներին (50+)', 'update_info': 'Ուղեցույցի թարմացումները տեղի են ունենում ամեն ամիս, հայտնվում են նոր բաժիններ, արդիականացվում է տեղեկատվությունը:',
            'duration_1': '1 ամիս', 'duration_3': '3 ամիս', 'duration_forever': 'ընդմիշտ',
            'form_title': 'Լրացրեք կոնտակտային տվյալները', 'form_name': 'Անուն', 'form_email': 'Էլ. փոստ', 'form_btn': 'Անցնել վճարմանը',
            'intro_text': '<Տեղեկատվությունը շատ է: <br> Հաճախ, երբ ցանկանում ես կյանքի կարևոր որոշում կայացնել, շատ ես հոգնում <br> և արդյունքում շատ բան բաց ես թողնում: <br> Որպեսզի բաց չթողնես կյանքի կարևոր պահերը և չկորցնես փող ու ժամանակ, <br> մենք ստեղծել ենք այս ուղեցույցը և մշտապես թարմացնում ենք այն:/>',
            'code_text': 'բաց մի թող կյանքի կարևոր պահերը <span style="color: #adff2f;">=</span> <br><span style="color: #ff00d4;">live</span>; <br>մի կորցրու ժամանակը <span style="color: #adff2f;">=</span> <span style="color: #ffa500;">time</span>; <br>մի կորցրու փողերը <span style="color: #adff2f;">=</span> money; <br>այս հարցում քեզ կօգնի այս <span style="color: #ff00d4;">ուղեցույցը</span> :)',
             'nav_partners': 'Գործընկերներ',
            'nav_team': 'Մեր թիմը',
            'nav_projects': 'Մեր նախագծերը',
            'nav_Politics': 'Քաղաքականություն',
             'nav_input_all': 'Բաժանորդագրվեք հայտարարություններին: Թույլ տվեք մեզ ձեզ ծանուցումներ ուղարկել',
            'li_4': 'Հարմար բոտ «Telegram»',
            'li_5': 'Ռուսալեզու հարթակում անալոգներ չկան',
        }
    };
  

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        const langText = langBtn.querySelector('.lang-text');
        const flagIcon = document.getElementById('flag-icon');
        let currentLang = 'RU';

        langBtn.addEventListener('click', () => {
            // Меняем язык
            currentLang = (currentLang === 'RU') ? 'AM' : 'RU';

            // Меняем кнопку и флаг
            if (langText) langText.textContent = currentLang;
            if (flagIcon) {
                flagIcon.src = currentLang === 'RU' 
                    ? 'https://flagcdn.com/w20/ru.png' 
                    : 'https://flagcdn.com/w20/am.png';
            }

            // Переводим элементы
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[currentLang] && translations[currentLang][key]) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translations[currentLang][key];
                    } else {
                        element.textContent = translations[currentLang][key];
                    }
                }
            });
            console.log(`Язык изменен на: ${currentLang}`);
        });
    }

});