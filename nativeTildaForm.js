$(window).on("load", function () {
  (function () {
    var tildaFormSuccessHandler = window.t_forms__onSuccess;
    var formCallbackList = {
      // formID : call function
      form583517633: localFormCallback,
    };

    window.t_forms__onSuccess = formSuccessHandler;

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
      console.log("success");
    }

    function localFormCallback(form) {
      var xhr = new XMLHttpRequest();
      // data from form
      var email = $(`#${form.id} input[name="email"]`).val();
      var name = $(`#${form.id} input[name="name"]`).val();
      var phone = $(`#${form.id} input[name="phone"]`)
        .val()
        .replace(/[^\+/s0-9]/g, "");
      var predmet = $(`#${form.id} input[name="predmet"]`).val();
      var vozrast = $(`#${form.id} input[name="vozrast"]:checked`).val();
      var prichina = $(`#${form.id} input[name="prichina"]`).val();
      var comment = $(`#${form.id} input[name="comment"]`).val();
      var startTime = $(`#${form.id} input[name="startTime"]:checked`).val();
      var sex = $(`#${form.id} input[name="sex"]:checked`).val();
      var connect = $(`#${form.id} input[name="connect"]:checked`).val();
      // referer link
      var referer = window.location.href.split("?")[0];

      // Google Apps Script deploy ID
      var googleSpreadsheetUrl =
        "https://script.google.com/macros/s/AKfycbyoAG5HoQ3LlEfjxzUCRmCAw1r9tFHGeZ9qlRmwdzpRLnb0Hbw89np462TAhQJFmy6M3g/exec";
      // URL params data
      var params = new URLSearchParams(location.search);

      // add form data to URL params string
      params.set("email", email);
      params.set("name", name);
      params.set("phone", phone);
      params.set("predmet", predmet);
      params.set("vozrast", vozrast);
      params.set("prichina", prichina);
      params.set("comment", comment);
      params.set("startTime", startTime);
      params.set("sex", sex);
      params.set("connect", connect);
      params.set("referer", referer);

      try {
        xhr.open("GET", googleSpreadsheetUrl + "?" + params.toString(), true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(null);
      } catch (e) {
        console.error(e);
      } finally {
        var successUrl = form.getAttribute("data-success-url");

        if (successUrl) window.location.href = successUrl;
      }
    }
  })();
});
