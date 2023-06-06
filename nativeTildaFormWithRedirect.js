$(window).on("load", function () {
  (function () {
    var tildaFormSuccessHandler = window.t678_onSuccess;
    var formCallbackList = {
      // formID : call function
      form580335679: callLessonRegListeners,
    };

    window.t678_onSuccess = formSuccessHandler;

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

    async function callLessonRegListeners(form) {
      await localLessonRegCallback(form);
    }

    function localLessonRegCallback(form) {
      var xhr = new XMLHttpRequest();
      // data from form
      var email = $(`#${form.id} input[name="email"]`).val();
      var name = $(`#${form.id} input[name="name"]`).val();
      var phone = $(`#${form.id} input[name="phone"]`)
        .val()
        .replace(/[^\+/s0-9]/g, "");
      var childClass = $(`#${form.id} input[name="childClass"]:checked`).val();
      var subject = $(`#${form.id} input[name="subject"]`).val();
      // referer link
      var referer = window.location.href.split("?")[0];

      // Google Apps Script deploy ID
      var googleSpreadsheetUrl =
        "https://script.google.com/macros/s/AKfycbyGH00KZA8nDJm5xXLqLNNQXpwlUWC_FwGnFgP52gA_lMuT4_3QVi5utmxrrfypbGSlrQ/exec";
      // URL params data
      var params = new URLSearchParams(location.search);

      // add form data to URL params string
      params.set("email", email);
      params.set("name", name);
      params.set("phone", phone);
      params.set("childClass", childClass);
      params.set("subject", subject);
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
});
