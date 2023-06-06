# About

---

Библиотека скриптов для отправки данных с [Tilda](https://tilda.cc/ru/), написанный с помощью JavaScript и Google Apps Script.

В проект входят функции:

- Отправка данных в Google Sheets,
- Отправка данных в CRM2,
- Обработка UTM меток,
- Обработка редиректов.

# Features

---

- Решения для B2C и B2B
- Возможные подходы к использованию хэндлеров форм Tilda (Нативная форма, поэтапная форма, форма Zero блока) и организации взаимодействия с [Google Apps Script](https://workspace.google.com/intl/ru/products/apps-script/)
- Интеграция с Google Workspace и автоматизация задач

# Example usage

---

### Форма в Zero блоке, редирект добавленный через настройки формы

```shell
nativeRedirectZeroForm.js

```

- Кейс, когда редирект указан в data-success-url формы. Ждем выполнения отправки в Google Sheets, прежде чем нативный редирект сработает
- Требуется подставить ID формы, ID деплоя в Google Apps Script
- Support: Chrome, Safari, Mozilla firefox

### Форма в Zero блоке, редирект в ЛКУ

```shell
LKRedirectZeroForm.js

```

- Кейс, когда редирект происходит кодом с tilda-integration (ЛКУ, онбординг)
- Требуется подставить ID формы, ID деплоя в Google Apps Script
- Support: Chrome, Safari, Mozilla firefox

### Форма Tilda шаблона с выбором ответов

```shell
nativeTildaForm.js

```

- Кейс, когда форма сверстана шаблонным блоком Tilda
- Требуется подставить атрибут data-success-callback формы (t396_onSuccess, t678_onSuccess,t_forms\_\_onSuccess - посмотреть в DOMe атрибуты формы), ID формы, ID деплоя в Google Apps Script
- Support: Chrome, Safari, Mozilla firefox

### Форма шаблона Tilda с выбором ответов + редирект

```shell
nativeTildaFormWithRedirect.js

```

- Кейс, когда форма сверстана шаблонным блоком Tilda и указан редирект в настройках формы
- Требуется подставить атрибут data-success-callback формы (t396_onSuccess, t678_onSuccess,t_forms\_\_onSuccess - посмотреть в DOMe атрибуты формы), ID формы, ID деплоя в Google Apps Script
- Support: Chrome, Safari, Mozilla firefox

### Форма в Zero блоке, нативный редирект для B2B направления

```shell
sendDataFromB2B.js

```

- localFormCallback - объявление функции для отправки данных в Google Sheets
- submitForm - объявление функции для отправки данных в CRM2
- callFormListeners - функция-хелпер для вызова всех листенеров
- Support: Chrome, Safari, Mozilla firefox

### Форма в Zero блоке, кастомные редиректы и отправка в CRM для B2B направления

```shell
sendDataFromB2B.js

```

- Отправка данных в Google Sheets и заявки в CRM2 с одной формы, отправка данных в Google Sheets и редирект после регистрации с другой формы
- callLessonRegListeners, callQuizRegListeners - вызов нужных листенеров на формы
- localLessonRegCallback, submitLessonReg - отправка данных ордера в CRM2 и в Google Sheets. Редирект в ЛКУ вызывается при успешном ордере
- localQuizRegCallback, submitQuizReg - отправка данных регистрации в Google Sheets и функция, управляющая редиректом
- Функция для нативной заявки Tilda должна быть ассинхронной, функция для кастомного запроса - синхронная
- setTimeout для редиректа в новой вкладке - фикс для Mozilla firefox и Safari
- Support: Chrome, Safari, Mozilla firefox
