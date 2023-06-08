(function () {
  var tildaFormSuccessHandler = window.t396_onSuccess;
  var formCallbackList = {
    // formID : call function
    form111111111: localFormCallback,
    form222222222: localFormCallback,
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
    var name = $(`#${form.id} input[name="name"]`).val();
    var phone = $(`#${form.id} input[name="phone"]`)
      .val()
      .replace(/[^\+/s0-9]/g, "");
    // referer link
    var referer = window.location.href.split("?")[0];

    // Google Apps Script deploy ID
    var googleSpreadsheetUrl =
      "https://script.google.com/macros/s/AKfycbyzNchG2aPZKVykbF13unPXK4ffvPBLuNAXrmWpq0Dju2B117XAhimdsrEVRm7Fk123/exec";
    // URL params data
    var params = new URLSearchParams(location.search);

    // add form data to URL params string
    params.set("email", email);
    params.set("name", name);
    params.set("phone", phone);
    params.set("referer", referer);

    try {
      xhr.open("GET", googleSpreadsheetUrl + "?" + params.toString(), true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(null);
    } catch (e) {
      console.error(e);
    }
  }
})();
