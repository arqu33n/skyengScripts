function doGet(e) {
  // SpreadSheet ID
  var sheet = SpreadsheetApp.openById(
    "1OUnfsti473I-OCStntAdUFXn4eh1R9g77AkekaY4aqs"
  );
  var n = sheet.getRange("A1").getValue() + 2;
  var d = new Date();
  sheet.getRange("A" + n).setValue(d);
  // Column value
  sheet.getRange("B1").setValue("name");
  sheet.getRange("C1").setValue("email");
  sheet.getRange("D1").setValue("phone");
  sheet.getRange("E1").setValue("referer");
  sheet.getRange("F1").setValue("utm_page");
  sheet.getRange("G1").setValue("promoCode");
  sheet.getRange("H1").setValue("utm_source");
  sheet.getRange("I1").setValue("source_type");
  sheet.getRange("J1").setValue("utm_medium");
  sheet.getRange("K1").setValue("utm_term");
  sheet.getRange("L1").setValue("utm_content");
  sheet.getRange("M1").setValue("utm_campaign");
  sheet.getRange("N1").setValue("product");
  sheet.getRange("O1").setValue("manager");
  sheet.getRange("P1").setValue("workflow");

  sheet.getRange("B" + n).setValue(e.parameter.name);
  sheet.getRange("C" + n).setValue(e.parameter.email);
  sheet.getRange("D" + n).setValue(e.parameter.phone);
  sheet.getRange("E" + n).setValue(e.parameter.referer);
  sheet.getRange("F" + n).setValue(e.parameter.utm_page);
  sheet.getRange("G" + n).setValue(e.parameter.promoCode);
  sheet.getRange("H" + n).setValue(e.parameter.utm_source);
  sheet.getRange("I" + n).setValue(e.parameter.source_type);
  sheet.getRange("J" + n).setValue(e.parameter.utm_medium);
  sheet.getRange("K" + n).setValue(e.parameter.utm_term);
  sheet.getRange("L" + n).setValue(e.parameter.utm_content);
  sheet.getRange("M" + n).setValue(e.parameter.utm_campaign);
  sheet.getRange("N" + n).setValue(e.parameter.product);
  sheet.getRange("O" + n).setValue(e.parameter.manager);
  sheet.getRange("P" + n).setValue(e.parameter.workflow);

  sheet.getRange("A1").setValue(n - 1);
}
