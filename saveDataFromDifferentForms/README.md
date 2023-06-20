# About

Скрипт для отправки данных с двух и более форм на лендинге. Отправка данных в Google SpreadSheet с ZeroBlock формы + редирект в личный кабинет после успешного запроса на API и отправка данных в Google SpreadSheet с ZeroBlock формы + редирект на внешний URL

# Example usage

### 1. Вставить `script.js` в блок T123 в тэгах `<script></script>`

### 2. Записать ID форм, с которых нужно отправить данные в объект `formCallbackList`

```js
var formCallbackList = {
  form594612135: callRequestListeners,
  form594917042: callRegistrationListeners,
};
```

### 3. Вызвать необходимые события в `callRequestListeners` и `callRegistrationListeners`

`callRequestListeners` - отправляет данные в Google Apps Script и создает заявку в CRM2, `callRegistrationListeners` - отправляет данные в Google Apps Script и редиректит на финальную страницу/в телеграм/и т.п.

### 4. Отправка данных в Google SpreadSheet

4.1 Выбрать поля формы, с которых нужно отправить данные в переменные и добавить их к параметрам:

```js
var email = $(`#${form.id} input[name="email"]`).val();
```

```js
params.set("email", email);
```

4.2 Записать ID деплоя скрипта из Google Apps Script в переменную googleSpreadsheetUrl

```js
var googleSpreadsheetUrl =
  "https://script.google.com/macros/s/AKfycbwrKTqXfiQCcwD8c4avAwsO00fWqLtnY7FJ4zJJtlBq2d2gHm-itaje5VdfWGaKpJ1C/exec";
```

### 5. Отправка данных в CRM2

5.1 Выбрать поля формы, с которых нужно отправить данные в переменные и добавить их в данные Ajax запроса:

```js
email = $(`#${form.id} input[name="email"]`).val();
```

```js
data: JSON.stringify({
  email: email,
});
```

5.2 При необходимости проставить в данных Ajax запроса промокод и serviceTypeKey

```js
data: JSON.stringify({
  serviceTypeKey: "english_adult_not_native_speaker",
  promoCode: "somePromoCode",
});
```

5.3 При успешном запросе вызывается редирект в ЛКУ `window.location = data.data.loginLink`;

### 6. Редирект

В `customRedirect` прописать необходимые манипуляции при редиректе

### 7. Примечания

`setTimeout` для редиректа - решение для поддержки браузеров Safari и Mozilla Firefox.
В браузерах на базе Chromium отправка данных в Google Apps Script завершается после редиректа. В Safari и Mozilla Firefox действия на странице полностью прерываются после ухода с нее.

В случае регистрации на лендинге с кастомным редиректом (`callRegistrationListener`) функция отправки данных в Google Apps Script ассинхронная. В этом кейсе мы ждем завершения отправки данных в Google SpreadSheet и только потом совершаем редирект. Иначе отправка оборвется

```js
// order
async function callRequestListeners(form) {
  saveOrderDataToSpreadSheet(form);
  createOrder(form);
}
// registration
async function callRegistrationListeners(form) {
  await saveRegistrationDataToSpreadSheet(form);
  customRedirect();
}
```
