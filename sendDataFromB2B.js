(function () {
  var tildaFormSuccessHandler = window.t396_onSuccess;
  var formCallbackList = {
    // ID форм   -   функция для вызова
    form591280887: callFormListeners,
    form592956654: callFormListeners,
  };

  window.t396_onSuccess = formSuccessHandler;

  function formSuccessHandler(form) {
    if (!form) return;

    const originalArg = form;

    if (form instanceof jQuery) {
      form = form.get(0);
    }

    var callback = formCallbackList[form.id];

    if (callback) {
      callback.call(form, form);
    }

    if (tildaFormSuccessHandler) {
      tildaFormSuccessHandler(originalArg);
    }
  }

  function callFormListeners(form) {
    localFormCallback(form);
    submitForm(form);
  }
  function localFormCallback(form) {
    var xhr = new XMLHttpRequest();

    var email = $(`#${form.id} input[name="email"]`).val();
    var name = $(`#${form.id} input[name="name"]`).val();
    var phone = $(`#${form.id} input[name="phone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    var company = $(`#${form.id} input[name="company"]`).val();
    var landing_name = $(`#${form.id} input[name="landing_name"]`).val();
    var lead_type = $(`#${form.id} input[name="lead_type"]`).val();
    var promoCode = $(`#${form.id} input[name="promoCode"]`).val();

    // ID деплоя(развертывания) скрипта
    var googleSpreadsheetUrl =
      "https://script.google.com/macros/s/AKfycbxQOwYuiNn5VwwM9JBnLASCZY8DQWFTsEa1f_-P7yEyJQsDC6ZUO1WzbxdIX6mLU772Cg/exec";
    var params = new URLSearchParams(location.search);

    // в params.set видимые поля формы
    params.set("email", email);
    params.set("name", name);
    params.set("phone", phone);
    params.set("company", company);
    params.set("landing_name", landing_name);
    params.set("lead_type", lead_type);
    params.set("promoCode", promoCode);

    try {
      xhr.open("GET", googleSpreadsheetUrl + "?" + params.toString(), true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(null);
    } catch (e) {
      console.error(e);
    }
  }

  function submitForm(form) {
    email = $(`#${form.id} input[name="email"]`).val();
    name = $(`#${form.id} input[name="name"]`).val();
    phone = $(`#${form.id} input[name="phone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    email = $(`#${form.id} input[name="email"]`).val();
    utm_page = $(`#${form.id} input[name="utm_page"]`).val();
    source_type = $(`#${form.id} input[name="source_type"]`).val();
    utm_source = $(`#${form.id} input[name="utm_source"]`).val();
    utm_medium = $(`#${form.id} input[name="utm_medium"]`).val();
    utm_term = $(`#${form.id} input[name="utm_term"]`).val();
    utm_content = $(`#${form.id} input[name="utm_content"]`).val();
    utm_campaign = $(`#${form.id} input[name="utm_campaign"]`).val();
    company = $(`#${form.id} input[name="company"]`).val();
    promoCode = $(`#${form.id} input[name="promoCode"]`).val();
    $.ajax({
      type: "POST",
      url: "https://corp.skyeng.ru/landing/public/v2/order",
      data: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        generateLoginLinkTo: "https://student.skyeng.ru/",
        serviceTypeKey: "english_adult_not_native_speaker_premium",
        utm_page: utm_page,
        utm_source: utm_source,
        source_type: source_type,
        utm_medium: utm_medium,
        utm_term: utm_term,
        utm_content: utm_content,
        utm_campaign: utm_campaign,
        promoCode: "ASSIST",
        company: company,
        landing_param_key: "utm_page",
        hitId: getHit,
        timezone: getZone,
      }),
      xhrFields: {
        withCredentials: true,
      },
      success: function (data) {
        window.location = data.data.loginLink;
      },
    });
  }
})();
