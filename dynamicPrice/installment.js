$(document).ready(function () {
  setTimeout(() => {
    $(
      ".click-button-english-not-native, .click-button-english-native, .click-button-english-premium"
    ).click(() => {
      setTimeout(() => {
        const cardsWithInstallment = $("#dataTable_reverse .price_card").filter(
          (_, card) => {
            return card.querySelector(".installment_button");
          }
        );
        cardsWithInstallment.each((_, card) => {
          function getCurrencyBySignString(string) {
            const signMap = {
              USD: "$",
              RUB: "₽",
              EUR: "€",
            };

            for (const [currency, sign] of Object.entries(signMap)) {
              if (string.includes(sign)) {
                return currency;
              }
            }

            throw new Error("Unknown currency provided");
          }
          const lessonsAmount = parseInt(
            card.querySelector(".price_number").innerText
          );
          const lessonCost = parseInt(
            card.querySelector(".price_text").innerText
          );
          const targetModalId = card
            .querySelector(".installment_button a")
            .getAttribute("href");
          const modal = document.querySelector(
            `[data-tooltip-hook="${targetModalId}"]`
          );
          const installmentPeriod = parseInt(
            modal.querySelector(".installment-period").innerText
          );
          const lessonCurrency = getCurrencyBySignString(
            card.querySelector(".price_text").innerText
          );
          modal.querySelector(".installment-initial-fee div").innerText =
            normalizePrice(
              (lessonCost * lessonsAmount) / installmentPeriod,
              lessonCurrency
            );
          modal.querySelector(".installment-lesson-cost div").innerText =
            normalizePrice(lessonCost, lessonCurrency);
          // console.log(lessonsAmount, lessonCost, modal)
        });
      }, 0);
    });
  }, 2000);
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
});

// Скрыть нулевую экономию в рассрочке

$(document).ready(function () {
  setTimeout(() => {
    $(".click-button-english-premium").click(() => {
      setTimeout(() => {
        const cardWithoutDiscount = $("#dataTable_reverse .price_card").filter(
          (_, card) => {
            return (
              card.querySelector(".save").innerText.replace(/[^0-9]/g, "") == 0
            );
          }
        );
        cardWithoutDiscount.children(".save").css("display", "none");
      }, 0);
    });
  }, 2000);
});
