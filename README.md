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

### Форма в Zero блоке, редирект в ЛКУ

```shell
LKRedirectZeroForm.js

```

### Форма Tilda шаблона с выбором ответов

```shell
nativeTildaForm.js

```

### Форма шаблона Tilda с выбором ответов + редирект

```shell
nativeTildaFormWithRedirect.js

```

### Форма в Zero блоке, кастомные редиректы и отправка в CRM для B2B направления

```shell
sendDataFromB2B.js

```
