(function () {
  var tildaFormSuccessHandler = window.t396_onSuccess;
  var formCallbackList = {
    // formID : call function
    form586317900: localFormCallback,
    form586317901: localFormCallback,
    form586317922: localFormCallback,
    form586404225: localFormCallback,
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

  function localFormCallback(form) {
    var xhr = new XMLHttpRequest();
    // data from form
    var email = $(`#${form.id} input[name="email"]`).val();
    var parentName = $(`#${form.id} input[name="parentName"]`).val();
    var parentPhone = $(`#${form.id} input[name="parentPhone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    var name = $(`#${form.id} input[name="name"]`).val();
    var childPhone = $(`#${form.id} input[name="childPhone"]`).val();
    var referer = window.location.href;

    // Google Apps Script deploy ID
    var googleSpreadsheetUrl =
      "https://script.google.com/macros/s/AKfycbwrKTqXfiQCcwD8c4avAwsO00fWqLtnY7FJ4zJJtlBq2d2gHm-itaje5VdfWGaKpJ1C/exec";
    // URL params data
    var params = new URLSearchParams(location.search);

    // add form data to URL params string
    params.set("email", email);
    params.set("parentName", parentName);
    params.set("parentPhone", parentPhone);
    params.set("name", name);
    params.set("childPhone", childPhone);
    params.set("referer", referer);

    var successUrl = form.getAttribute("data-success-url");
    if (successUrl) {
      form.removeAttribute("data-success-url");
    }

    try {
      xhr.open("GET", googleSpreadsheetUrl + "?" + params.toString(), true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
          return;
        }

        if (successUrl) {
          window.location.href = successUrl;
        }
      };

      xhr.send(null);
    } catch (e) {
      console.error(e);
    }
  }
})();
