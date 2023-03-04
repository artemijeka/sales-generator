import { maskPhone } from "./_maskPhone";

document.addEventListener("DOMContentLoaded", function () {
  try {
    let popup = document.querySelector(".js-popup");
    let background = document.querySelector(".js-background");
    let closePopup = document.querySelector(".js-close-popup");
    let openPopup = document.querySelector(".js-open-popup");

    let form = document.querySelector(".js-form");
    let formInputAll = form.querySelectorAll("input");
    // let formSubmit = form.querySelector(".js-form-submit");

    openPopup.addEventListener("click", (e) => {
      popup.classList.add("--active");
      background.classList.add("--active");
    });

    [closePopup, background].forEach((el) => {
      el.addEventListener("click", (e) => {
        background.classList.remove("--active");
        popup.classList.remove("--active");
        setTimeout(() => {
          popup.classList.remove("--sended");
          popup.classList.remove("--error");
        }, 750);
      });
    });

    // .form
    maskPhone('input[type="tel"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let formData = new FormData();
      // let formData = [];
      formInputAll.forEach((el, i) => {
        formData.append(i, el.value);
        // formData[i] = el.value;
      });
      console.log(formData);

      let url =
        "https://web.master-artem.ru/projects/tests/generator-sales/mail.php";

      // popup.classList.add("--error");

      fetch(url, {
        method: "POST",
        body: formData,
        // body: new FormData(form),
        // body: JSON.stringify(formData),
      })
        .then((response) => response.text())
        .then((result) => {
          if (result === "sended") {
            popup.classList.add("--sended");
          } else if (result === "error") {
            popup.classList.add("--error");
          }
        })
        .catch((error) => {
          console.log("error", error);
          popup.classList.add("--error");
        });
    });
  } catch (err) {
    console.error("TRY-CATCH ERROR: ", err);
  } finally {
  }
});
