// contact.js — quote form → prefilled mailto (no backend).
// Intercepts submit, validates required fields, then opens the visitor's
// email client addressed to Barracuda with the field values in the body.
(function () {
  "use strict";

  var RECIPIENT = "aengus@ivorygroup.co.za";

  var form = document.getElementById("quote-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  var fields = {
    name: document.getElementById("name"),
    company: document.getElementById("company"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    details: document.getElementById("details")
  };

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", !!isError);
    status.classList.toggle("is-ok", !isError && !!message);
  }

  // Clear an error state as soon as the visitor edits a field.
  Object.keys(fields).forEach(function (key) {
    var el = fields[key];
    if (!el) return;
    el.addEventListener("input", function () {
      el.removeAttribute("aria-invalid");
      el.classList.remove("field-invalid");
    });
  });

  function markInvalid(el) {
    if (!el) return;
    el.setAttribute("aria-invalid", "true");
    el.classList.add("field-invalid");
  }

  function validate() {
    var firstInvalid = null;

    // Native HTML5 constraint check covers required + email format.
    Object.keys(fields).forEach(function (key) {
      var el = fields[key];
      if (!el) return;
      if (!el.checkValidity()) {
        markInvalid(el);
        if (!firstInvalid) firstInvalid = el;
      }
    });

    return firstInvalid;
  }

  function buildBody() {
    var lines = [
      "Name: " + fields.name.value.trim(),
      "Company: " + (fields.company.value.trim() || "-"),
      "Email: " + fields.email.value.trim(),
      "Phone: " + (fields.phone.value.trim() || "-"),
      "",
      "Project details:",
      fields.details.value.trim()
    ];
    return lines.join("\r\n");
  }

  function buildSubject() {
    var who = fields.company.value.trim() || fields.name.value.trim();
    return "Quote request" + (who ? " — " + who : "");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var firstInvalid = validate();
    if (firstInvalid) {
      setStatus("Please fill in the required fields before submitting.", true);
      firstInvalid.focus();
      return;
    }

    var mailto =
      "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(buildSubject()) +
      "&body=" + encodeURIComponent(buildBody());

    // Opening a mailto: navigates the current tab in some browsers; assigning
    // to location triggers the mail client without leaving the page visibly.
    window.location.href = mailto;

    setStatus(
      "Your email app should now be opening with the message ready. " +
      "If nothing happens, email " + RECIPIENT + " directly.",
      false
    );
  });
})();
