// set params
var urlParams = location.search.slice(1);

function replaceParam(name, value) {
  if (!urlParams.includes(name)) {
    urlParams = urlParams + "&" + name + "=" + value;
  } else if (
    urlParams.includes(name + "=&") ||
    urlParams.endsWith(name + "=")
  ) {
    urlParams = urlParams.replace(name + "=", name + "=" + value);
  }
}

// задать необходимые параметры (заменяются, если отсутствуют в URL)
replaceParam("utm_page", "blackfriday21");
replaceParam("source_type", "corporate");

// задать необходимые параметры (заменяются всегда)
let searchParams = new URLSearchParams(urlParams);
searchParams.set("utm_source", "b2b-special-mechanics");
searchParams.set("product", "type-skyeng_course|name-skyeng-assist");
searchParams.set("utm_campaign", "skyeng-assist");
searchParams.set("source_type", "corporate");
searchParams.set("workflow", "b2b");
// urlParams = searchParams.toString()
window.history.replaceState(null, null, "?" + searchParams.toString());

let currentParams = new URLSearchParams(window.location.search);

let tgRedirectLink = new URL(`https://salebot.site/skyeng_assist_1`);
for (let [key, value] of currentParams) {
  tgRedirectLink.searchParams.set(key, value);
}
let finalRedirectLink = new URL(`https://corporate.skyeng.ru/bot-assist-final`);
for (let [key, value] of currentParams) {
  finalRedirectLink.searchParams.set(key, value);
}

setInterval(function () {
  urlParams.split("&").forEach(function (param) {
    document
      .querySelectorAll('input[type="hidden"]')
      .forEach(function (element) {
        var name = param.split("=")[0];
        var value = param.split("=")[1];

        if (element.name == name) {
          element.value = value;
        }
      });
  });
}, 1000);

// сохранение UTM меток при переходе

$(document).ready(function () {
  let currentParams = new URLSearchParams(window.location.search);
  $("a").each(function () {
    let href = $(this).attr("href");

    if (!href || href.startsWith("#") || !href.includes("/")) return;

    let link;
    try {
      if (href.startsWith("/")) {
        link = new URL(location.origin + href);
      } else {
        link = new URL(href);
      }
    } catch (e) {
      return;
    }

    for (let [key, value] of currentParams) {
      link.searchParams.set(key, value);
    }

    $(this).attr("href", link);
  });
});
