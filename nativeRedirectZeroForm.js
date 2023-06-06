(function () {
  var tildaFormSuccessHandler = window.t396_onSuccess;
  var formCallbackList = {
    // formID : call function
    form111111111: localFormCallback,
    form222222222: localFormCallback,
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

  function localFormCallback(form) {
    var xhr = new XMLHttpRequest();
    // data from form
    var email = $(`#${form.id} input[name="email"]`).val();
    var name = $(`#${form.id} input[name="name"]`).val();
    var phone = $(`#${form.id} input[name="phone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    // referer link
    var referer = window.location.href.split("?")[0];

    // Google Apps Script deploy ID
    var googleSpreadsheetUrl =
      "https://script.google.com/macros/s/AKfycbxOM1wBnil1UhYKr7o--r2rTMYGMDArRl3GUp_CYyqsoA5KbmfiD07Qob6LPz2Ji123/exec";
    // URL params data
    var params = new URLSearchParams(location.search);

    // add form data to URL params string
    params.set("email", email);
    params.set("name", name);
    params.set("phone", phone);
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
})();
