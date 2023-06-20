# About

Отправка данных в Google SpreadSheet с ZeroBlock формы, редирект в личный кабинет после успешного запроса на API

# Example usage

### 1. Вставить `script.js` в блок T123 в тэгах `<script></script>`

### 2. Записать ID форм, с которых нужно отправить данные в объект `formCallbackList`

```js
var formCallbackList = {
  form123456789: localFormCallback,
  form987654321: localFormCallback,
};
```

### 3. Вызвать необходимые события в `callFormListeners`.

`saveDataToSpreadSheet` - отправляет данные в Google Apps Script, `createOrder` - создает заявку в CRM2 и редиректит в ЛКУ при успешном запросе

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
