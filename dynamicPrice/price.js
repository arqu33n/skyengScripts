$(document).ready(function () {
  getData();
});
let filteredData = [];
let companyId = window.location.pathname.replace(/\//g, "");

async function getData() {
  const request = await fetch(
    `https://corporate-marketing-backend.skyeng.ru/landing/public/v2/prices/by-preferred-link/${companyId}`
  );
  const { data } = await request.json();
  if (!data) {
    filteredData = [];
  } else {
    filteredData = data
      .filter(
        (item) =>
          [
            "english_adult_native_speaker",
            "english_adult_not_native_speaker",
            "english_adult_not_native_speaker_premium",
          ].indexOf(item.serviceTypeKey) != -1
      )
      .sort((a, b) => {
        const target = "english_adult_not_native_speaker";
        if (a.serviceTypeKey == target) {
          return -1;
        } else if (b.serviceTypeKey == target) {
          return 1;
        }
        return 0;
      });
  }
  // console.log(data);

  filteredData.forEach((item) => {
    // item.positions[0].description = `Стартовый пакет,чтобы попробовать онлайн-обучение`
    // item.positions[1].description = `Определить сильные и слабые стороны, составить план`
    // item.positions[2].description = `Отличный вариант, чтобы увидеть первые результаты`
    // item.positions[3].description = `Перейдете на уровень выше и сможете поддержать беседу`
    // item.positions[4].description = `Подойдет, если вы решили наконец выучить английский`
    // item.positions[5].description = `Лучший выбор, если вы решили взяться за английский по-максимуму`
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
  insertElements();
  $("#english_adult_not_native_speaker .card-preview-btn").click();

  //   SET CURRENT STK

  $(".card-preview-btn").on("click", function () {
    if ($("#english_adult_native_speaker").hasClass("active")) {
      $('#form364633753 input[name="stk"]').val("english_adult_native_speaker");
      $('#form351984290 input[name="stk"]').val("english_adult_native_speaker");
      // $('#form363545618 input[name="stk"]').val('english_adult_native_speaker');
      // $('#form362315966 input[name="stk"]').val('english_adult_native_speaker');
    }
    if ($("#english_adult_not_native_speaker").hasClass("active")) {
      $('#form364633753 input[name="stk"]').val(
        "english_adult_not_native_speaker"
      );
      $('#form351984290 input[name="stk"]').val(
        "english_adult_not_native_speaker"
      );
      // $('#form363545618 input[name="stk"]').val('english_adult_not_native_speaker');
      // $('#form362315966 input[name="stk"]').val('english_adult_not_native_speaker');
    }
    if ($("#english_adult_not_native_speaker_premium").hasClass("active")) {
      $('#form364633753 input[name="stk"]').val(
        "english_adult_not_native_speaker_premium"
      );
      $('#form351984290 input[name="stk"]').val(
        "english_adult_not_native_speaker_premium"
      );
      // $('#form363545618 input[name="stk"]').val('english_adult_not_native_speaker_premium');
      // $('#form362315966 input[name="stk"]').val('english_adult_not_native_speaker_premium');
    }
  });
}
function insertElements() {
  const tabRoot = document.getElementById("tab");
  const contentRoot = document.getElementById("tab-content");

  const elements = filteredData.map(({ serviceTypeKey, positions }) => {
    const tab = createTab(serviceTypeKey);
    const card = createCard(positions, serviceTypeKey);

    return {
      tab,
      card,
    };
  });

  const tabs = elements.map((item) => item.tab);
  // const cards = elements.map(item => item.card)
  elements.forEach((element) => {
    // debugger
    tabRoot.appendChild(element.tab);
    tabRoot.appendChild(element.card);
  });

  tabs.forEach((tab, index) => {
    tab.querySelector("button").addEventListener("click", () => {
      tabRoot.childNodes.forEach((node) => {
        node.classList.remove("show");
      });
      tabRoot.childNodes.forEach((node) => {
        node.classList.remove("active");
      });

      tab.classList.add("active");

      document.getElementById(tab.id + "-content").classList.add("show");
    });

    //  if (index === 0) {
    //   tab.classList.add('active')
    //     document.getElementById(tab.id + "-content").classList.add('show')
    //  }

    //   tabRoot.appendChild(tab)
  });
}

function createCard(positions, serviceTypeKey) {
  const card = document.createElement("div");
  card.classList.add("price-card");

  card.id = serviceTypeKey + "-content";

  const cardItems = positions.map((position) => {
    const cardItem = document.createElement("div");
    cardItem.classList.add("card__item");
    if (position.isPopular) {
      cardItem.classList.add("card__item_popular");
    }
    if (position.isProfitable) {
      cardItem.classList.add("card__item_profitable");
    }

    if (position.currency == `EUR`) {
      position.currencySymbol = `€`;
    }
    if (position.currency == `USD`) {
      position.currencySymbol = `$`;
    }
    if (position.currency == `RUB`) {
      position.currencySymbol = `₽`;
    }

    const elements = [
      `<div class="card__quantity">${position.quantity} ${getNumberText(
        position.quantity,
        ["урок", "урока", "уроков"]
      )}</div>`,
    ];
    elements.push(
      `<div class="uuid-for-coockie">${serviceTypeKey}|${position.uuid}</div>`
    );
    if (
      position.costWithoutDiscount &&
      position.cost < position.costWithoutDiscount
    ) {
      if (position.quantity > 16) {
        // elements.push(`<div class="card__description"> ${position.description}</div>`)
        elements.push(
          `<div class="card__price_installment-button"><img src="https://static.tildacdn.com/tild3732-3136-4634-a335-626233633862/Icon-installment.svg" alt="image"><a href="#popupInstallment">Рассрочка</a></div>`
        );
        elements.push(
          `<div class="card__price_without_discount margin-43"> ${Math.round(
            position.costWithoutDiscount / position.quantity
          )}</div>`
        );
        elements.push(
          `<div class="card__price">${Math.round(
            position.cost / position.quantity
          )}  ${position.currencySymbol}  <span>/занятие</span></div>`
        );
        elements.push(
          `<div class="card__discount">Экономия ${
            position.costWithoutDiscount - position.cost
          } ${position.currencySymbol}</div>`
        );
        elements.push(
          `<a href="#adults_english_order" class="card__btn">Купить</a>`
        );
      } else {
        // elements.push(`<div class="card__description"> ${position.description}</div>`)
        elements.push(
          `<div class="card__price_without_discount margin-83">${Math.round(
            position.costWithoutDiscount / position.quantity
          )}</div>`
        );
        elements.push(
          `<div class="card__price"> ${Math.round(
            position.cost / position.quantity
          )} ${position.currencySymbol} <span>/занятие</span></div>`
        );
        elements.push(
          `<div class="card__discount">Экономия  ${
            position.costWithoutDiscount - position.cost
          } ${position.currencySymbol}</div>`
        );
        elements.push(
          `<a href="#adults_english_order" class="card__btn">Купить</a>`
        );
      }
    } else {
      if (position.quantity > 16) {
        elements.push(
          `<div class="card__price_installment-button"><img src="https://static.tildacdn.com/tild3732-3136-4634-a335-626233633862/Icon-installment.svg" alt="image"><a href="#popupInstallment">Рассрочка</a></div>`
        );
        elements.push(
          `<div class="card__price margin-66"> ${Math.round(
            position.cost / position.quantity
          )} ${position.currencySymbol}  <span>/занятие</span></div>`
        );
        elements.push(
          `<a href="#adults_english_order" class="card__btn">Купить</a>`
        );
      } else {
        elements.push(
          `<div class="card__price margin-106"> ${Math.round(
            position.cost / position.quantity
          )} ${position.currencySymbol}  <span>/занятие</span></div>`
        );
        elements.push(
          `<a href="#adults_english_order" class="card__btn">Купить</a>`
        );
      }
    }

    cardItem.innerHTML = elements.join("");

    cardItem.querySelector(".card__price_installment-button a") &&
      cardItem
        .querySelector(".card__price_installment-button a")
        .addEventListener("click", () => {
          updateInstallmentModalText(position);
        });

    return cardItem;
  });

  cardItems.forEach((item) => {
    card.appendChild(item);
  });

  return card;
}

function createTab(serviceTypeKey) {
  const TYPE_NAMES = {
    english_adult_not_native_speaker: {
      title: "Английский язык",
      tabPrice: `<span>от</span> ${getCheapestPrice(serviceTypeKey)}`,
      // titleDescription: 'Русскоязычный преподаватель',
      tabDescription: `<li>Общайтесь уверенно в жизни и на работе</li>
        <li>Старт с любым уровнем</li>
         <li>Быстрые результаты без стресса</li>
         <li>70% урока на английском</li>`,
    },
    english_adult_native_speaker: {
      title: "Английский с носителем",
      tabPrice: `<span>от</span> ${getCheapestPrice(serviceTypeKey)}`,
      // titleDescription: 'Общайтесь только на английском',
      tabDescription: `<li>Быстро адаптируйтесь к языковой среде</li>
        <li>Занятия только на английском</li>
         <li>Для быстрой подготовки к переезду</li>
         <li>Отработка произношения</li>`,
    },
    english_adult_not_native_speaker_premium: {
      title: `Premium
        </br>
        `,
      tabPrice: `<span>от</span> ${getCheapestPrice(serviceTypeKey)}`,
      // titleDescription: 'Более 150 премиум-преподавателей',
      tabDescription: `<li>Учитесь у лучших преподавателей Skyeng</li>
        <li>Разработанная под вас программа</li>
         <li>Безлимитный перенос уроков</li>
         <li>Специальный IT-курс</li>`,
    },
  };

  const tab = document.createElement("div");

  tab.classList.add("tab__item");

  const { title, tabDescription, tabPrice } = TYPE_NAMES[serviceTypeKey];
  const elements = [
    `<div class="card__header"><div class="title">${title}</div><div class="card--preview-desc-price">${tabPrice}</div></div>`,
    //   `<span class= "title-desc"> ${titleDescription}</span>`,
    `<ul class="card-preview-desc">${tabDescription}</ul>`,
    `<button class="card-preview-btn">Смотреть цены</button>`,
  ];

  tab.innerHTML = elements.join("");
  tab.id = serviceTypeKey;

  return tab;
}

function getCheapestPrice(serviceTypeKey) {
  const currentServiceTypeKey = filteredData.find(
    (item) => item.serviceTypeKey === serviceTypeKey
  );

  const [cheapestPosition] = currentServiceTypeKey.positions.sort((a, b) => {
    const priceA = Math.round(a.cost / a.quantity);
    const priceB = Math.round(b.cost / b.quantity);

    return priceA - priceB;
  });

  return normalizePrice(
    cheapestPosition.cost / cheapestPosition.quantity,
    cheapestPosition.currency
  );
}

function getNumberText(number, names) {
  const single = names[0];
  const mid = names[1];
  const multiple = names[2];
  number = Math.abs(number) % 100;
  const singleDigit = number % 10;

  if (number > 10 && number < 20) {
    return multiple;
  } else if (singleDigit > 1 && singleDigit < 5) {
    return mid;
  } else if (singleDigit == 1) {
    return single;
  } else {
    return multiple;
  }
}

function normalizePrice(number, currency = "RUB") {
  const map = {
    USD: "$",
    RUB: "₽",
    EUR: "€",
  };

  return (
    Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
    " " +
    map[currency]
  );
}

function updateInstallmentModalText({ cost, quantity, currency }) {
  const installmentPeriodMap = {
    128: 5,
    64: 3,
    32: 2,
  };
  const modal = document.querySelector(
    `[data-tooltip-hook="#popupInstallment"]`
  );
  modal.querySelector(".installment-initial-fee div").innerText =
    normalizePrice(cost / installmentPeriodMap[quantity], currency);
  modal.querySelector(".installment-lesson-cost div").innerText =
    normalizePrice(cost / quantity, currency);

  modal.querySelector(".installment-period div").innerText =
    installmentPeriodMap[quantity] +
    ` ` +
    getNumberText(installmentPeriodMap[quantity], [
      "месяц",
      "месяца",
      "месяцев",
    ]);
}
