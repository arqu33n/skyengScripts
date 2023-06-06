// native redirect link zero block form case

(function () {
  var tildaFormSuccessHandler = window.t396_onSuccess;
  var formCallbackList = {
    form592373067: localFormCallback,
    form592373069: localFormCallback,
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

    var email = $(`#${form.id} input[name="email"]`).val();
    var name = $(`#${form.id} input[name="name"]`).val();
    var phone = $(`#${form.id} input[name="phone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    var referer = window.location.href.split("?")[0];

    var googleSpreadsheetUrl =
      "https://script.google.com/macros/s/AKfycbxOM1wBnil1UhYKr7o--r2rTMYGMDArRl3GUp_CYyqsoA5KbmfiD07Qob6LPz2JiiVV/exec";
    var params = new URLSearchParams(location.search);

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
