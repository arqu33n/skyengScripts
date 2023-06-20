(function () {
  var tildaFormSuccessHandler = window.t396_onSuccess;
  var formCallbackList = {
    // formID : call function
    form594612135: callRequestListeners,
    form594917042: callRegistrationListeners,
  };

  window.t396_onSuccess = formSuccessHandler;

  async function formSuccessHandler(form) {
    if (!form) return;

    const originalArg = form;

    if (form instanceof jQuery) {
      form = form.get(0);
    }

    var callback = formCallbackList[form.id];

    if (callback) {
      await callback.call(form, form);
    }

    if (tildaFormSuccessHandler) {
      tildaFormSuccessHandler(originalArg);
    }
  }
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

  function saveOrderDataToSpreadSheet(form) {
    var xhr = new XMLHttpRequest();
    // data from form
    var email = $(`#${form.id} input[name="email"]`).val();
    var name = $(`#${form.id} input[name="name"]`).val();
    var phone = $(`#${form.id} input[name="phone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    var company = $(`#${form.id} input[name="company"]`).val();
    var landing_name = $(`#${form.id} input[name="landing_name"]`).val();
    var lead_type = $(`#${form.id} input[name="lead_type"]`).val();
    var referer = window.location.href.split("?")[0];

    // Google Apps Script deploy ID
    var googleSpreadsheetUrl =
      "https://script.google.com/macros/s/AKfycby81otj_z51bobn8jMz1i2mF6OT7CJYWYCi8mp6CNPCf9LfYEnblVsu29l0fvAE37If/exec";
    var params = new URLSearchParams(location.search);

    // URL params data
    params.set("email", email);
    params.set("name", name);
    params.set("phone", phone);
    params.set("company", company);
    params.set("landing_name", landing_name);
    params.set("lead_type", lead_type);
    params.set("referer", referer);

    return new Promise((resolve) => {
      try {
        xhr.open("GET", googleSpreadsheetUrl + "?" + params.toString(), true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }

          var successUrl = form.getAttribute("data-success-url");

          if (successUrl) {
            window.location.href = successUrl;
          }

          resolve();
        };
        xhr.send(null);
      } catch (e) {
        console.error(e);
      }
    });
  }

  function createOrder(form) {
    // data from form
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
        serviceTypeKey: "english_adult_not_native_speaker",
        utm_page: utm_page,
        utm_source: utm_source,
        source_type: source_type,
        utm_medium: utm_medium,
        utm_term: utm_term,
        utm_content: utm_content,
        utm_campaign: utm_campaign,
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

  function saveRegistrationDataToSpreadSheet(form) {
    var xhr = new XMLHttpRequest();
    // data from form
    var email = $(`#${form.id} input[name="email"]`).val();
    var name = $(`#${form.id} input[name="name"]`).val();
    var phone = $(`#${form.id} input[name="phone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    var company = $(`#${form.id} input[name="company"]`).val();
    var landing_name = $(`#${form.id} input[name="landing_name"]`).val();
    var lead_type = $(`#${form.id} input[name="lead_type"]`).val();
    var captain = $(`#${form.id} input[name="captain"]`).val();
    var team = $(`#${form.id} input[name="team"]`).val();
    var referer = window.location.href.split("?")[0];

    // Google Apps Script deploy ID
    var googleSpreadsheetUrl =
      "https://script.google.com/macros/s/AKfycbyHF1uKSDjfHFZPWpcMPDBHWTxS4P9AOACh456LyVlNfujYu8ZoW0Hsrq8WE2eWZeIe1w/exec";
    // URL params data
    var params = new URLSearchParams(location.search);

    // add form data to URL params string
    params.set("email", email);
    params.set("name", name);
    params.set("phone", phone);
    params.set("company", company);
    params.set("landing_name", landing_name);
    params.set("lead_type", lead_type);
    params.set("captain", captain);
    params.set("team", team);
    params.set("referer", referer);

    return new Promise((resolve) => {
      try {
        xhr.open("GET", googleSpreadsheetUrl + "?" + params.toString(), true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) {
            return;
          }

          var successUrl = form.getAttribute("data-success-url");

          if (successUrl) {
            window.location.href = successUrl;
          }

          resolve();
        };

        xhr.send(null);
      } catch (e) {
        console.error(e);
      }
    });
  }

  function customRedirect() {
    if (window.innerWidth <= 960) {
      window.location = tgRedirectLink;
    } else {
      setTimeout(() => {
        window.open(tgRedirectLink, "_blank");
        window.location = currentPageLink;
      });
    }
  }
})();
