# Проект VuzStack

**Проект VuzStack - единый стабильный сервис для поступления**

Поступление в ВУЗ-ы России в 2021 и 2022 было похоже на русскую рулетку: правила были нечеткие, а сама система очень не стабильной. Сайты постоянно "ложились", а приемная коммисия просто опускала руки.

Но проект VuzStack должен побороть всю эту систему, предоставив: удобный дизайн, чат с тех.поддержкой и ясные правила поступления, основанные на математическом алгоритме.

Пример работы:

1. Вася Пупкин закончил 11 классов и сдал ЕГЭ
2. Он регистрируется на сайте vuzstack.ru: указывая ФИО и почту
3. Верифицируется, показав фото, где он держит паспорт.
4. Указывает на сайте свои баллы
5. Указывает направления в вуз-ах, куда хочет поступть: от самого желанного, к запасному варианту
6. В начале августа компьютер рассчитывает желания и баллы всех абитуриентов и выдает каждому компромисное решение
7. В вузы отправляется список поступивших, а абитуриентам - поздравительные письма

Параллельно этому Вася Пупкин может читать stories-ы по поступлению в ВУЗ и общаться с тех.поддержкой.

# Q&A

### Как достигнется компромисс для всех?

Сервис использует алгоритм Гейла-Шепли - нобелевских лауреатов по экономике. Он позволяет достичь этого!

### В чем преимущество для абитуриентов?

- Меньше вероятность никуда не поступить на бюджет
- Жители Москвы и Санкт-Петербурга не имеют никаких преимуществ в поступлении, чем жители регионов России
- Можно без проблем "поступать" в несколько городов одновременно

### В чем преимущество для ВУЗ-ов?

- Больше бюджетных мест заполнится
- Нет необходимости вести приемную комиссию на бюджетные места на программы бакалавриата/специалитет

### Через это можно поступить?

Это всего лишь проект, а точнее инициатива. "Критикуешь - предлагай". Вот мы и предложили, и показали то, как может выглядеть система поступления

### Обязательно ли загружать свой паспорт и указывать свои результаты ЕГЭ и ИД?

Как написано выше, это всего лишь проект на стадии бета, поэтому указывать паспорт - излишне. Просто загрузите любое фото и идите дальше :)

### Кто разработчик?

Разработал сервис простой школьник из Тверской области Александр Кудрявцев, параллельно своей основной работе NodeJS Backend Developer-а на таллинский it startup.

### Как поддержать проект?

Автор сам зарабатывает на оплату серверов и лицензий, но для него очень важна медийная поддержка: не все умеют писать код, но сделать репост и **рассказать друзьям про одиозный проект** - могут все.

Но если ты:

- Front-end разработчик
- DevOps инженер
- React Native разработчик
- Юрист, который поможет составить пользовательское соглашение
- UI/UX дизайнер, который поможет советами по дизайну
- Иллюстратор, который поможет с логотипом

то твой даже маленький вклад может помочь с проектом. Смотри stack в самом конце.

### Что будет дальше?

После разработки сервиса проект будет передан в Министерство. В дальнейшем они могут использовать этот почти готовый проект, прикрутив проверку на верность введеных баллов ЕГЭ и ИД, добавив функционал для льготников и т.п.

Также проект использует лицензию MIT - каждый может брать наработки и использовать в своих целях.

# Road Map

**Август-октярь 2022** - разработка основного функционала: регистрация и верификация, выбор вузов, само поступление и алгоритм Гейла-Шепли

**Ноябрь-декабрь 2022** - разработка фич: stories о поступлении и чат с тех.поддержкой

**Декабрь 2022** - деплой приложения

# Stack

backend:

- Node
- Linux
- TypeScript
- Nest + TypeORM
- MySQL
- Redis + BullJS
- Cloudinary для пользовательских данных

frontend:

- JavaScript
- React
- Redux + Redux Toolkit
- Tailwind
