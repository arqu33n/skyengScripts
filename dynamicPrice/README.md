# About

Рендер карточек с ценами, привязанными к контракту в системе CRM.

![priceexample](https://github.com/arqu33n/skyengScripts/blob/master/dynamicPrice/example/price.gif?raw=true)

# Features

- Динамическая отрисовка цен из указанного контракта
- Обновление цены, расчет выгоды
- Поддержка валюты: рубли, евро, доллары
- Выбор отображаемых продуктов. По умолчанию: русскоязычный преподаватель, англоязычный преподаватель, премиум
- Отображение модального окна с рассрочкой

# Example usage

### 1. Разместить `price.html` в требуемый Zero блок в элементе `html`

### 2. Разместить `price.css` и `price.js` в блок T123 в тэгах `<style></style>` и `<script></script>` соответственно

### 3. По умолчанию контракт определяется по `companyId` - адресу лендинга по компании. Для использования любого статичного контракта нужно добавить его ID в переменную `companyId` или заменить эндпоинт

```js
let companyId = window.location.pathname.replace(/\//g, "");

`https://corporate-marketing-backend.skyeng.ru/landing/public/v2/prices/by-preferred-link/${companyId}`;
```

### 4. При необходимости заменить serviceTypeKey в фильтре по продукту

```js
.filter(
        (item) =>
          [
            "english_adult_native_speaker",
            "english_adult_not_native_speaker",
            "english_adult_not_native_speaker_premium",
          ].indexOf(item.serviceTypeKey) != -1
      )
```

### 5. Конфигурация очередности отрисовки карточек

```js
.sort((a, b) => {
        const target = "english_adult_not_native_speaker";
        if (a.serviceTypeKey == target) {
          return -1;
        } else if (b.serviceTypeKey == target) {
          return 1;
        }
        return 0;
      });
```

### 6. Конфигурация карточек по пакетам уроков. Если требуется добавить описание пакетов - раскомментировать item.positions. Пакет 96 уроков не выводится, пакеты 32 и 128 уроков выводятся с пометками "популярный" и "выгодный".

```js
filteredData.forEach((item) => {
  // item.positions[0].description = `Стартовый пакет,чтобы попробовать онлайн-обучение`
  item.positions = item.positions.filter(
    (position) => position.quantity !== 96
  );
  item.positions.forEach((position) => {
    if (position.quantity == 32) {
      position.isPopular = true;
    }
    if (position.quantity == 128) {
      position.isProfitable = true;
    }
  });
});
```

### 7. Прокинуть serviceTypeKey в заявку при выборе продукта. Указать ID формы, собирающей заявки

```js
if ($("#english_adult_native_speaker").hasClass("active")) {
  $('#form364633753 input[name="stk"]').val("english_adult_native_speaker");
  $('#form351984290 input[name="stk"]').val("english_adult_native_speaker");
}
```

### 8. Наполнение карточки с ценой. Функция `createCard` отвечает за конфигурацию карточки цены продукта. Проверка на наличие рассрочки, выгоды, валюты по размеру пакета продукта и настройка требуемого отображения

### 9. Функция `createTab` отвечает за конфигурацию превью карточек продуктов

### 10. Функция `getCheapestPrice` находит самую низкую цену для заполнения текста "от N ₽" в превью

### 11. Функция-хелпер `normalizePrice` отвечает за округление чисел и корректное отображение валюты

### 12. Функция-хелпер `getNumberText` отвечает за склонение уроков, месяцев и т.д.

### 13. Функция `updateInstallmentModalText` отвечает за заполнение модального окна рассрочки. Рассчет цен рассрочки в скрипте `installment.js`.

### Чтобы настроить блок рассрочки, требуется:

- создать попап (Zero блок + блок BF503), задать ему хук `#popupInstallment`.

### Элементам задать классы:

- Для периода рассрочки - `installment-period`
- Для первоначального взноса - `installment-initial-fee`
- Для стоимости одного урока - `installment-lesson-cost`
