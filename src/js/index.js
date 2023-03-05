import { maskPhone } from "./_maskPhone";
import { onResizeStartEnd } from "./_onResizeStartEnd";



document.addEventListener("DOMContentLoaded", function () {
  try {
    let popup = document.querySelector(".js-popup");
    let background = document.querySelector(".js-background");
    let closePopup = document.querySelector(".js-close-popup");
    let openPopup = document.querySelector(".js-open-popup");

    let form = document.querySelector(".js-form");
    let formInputAll = form.querySelectorAll("input");
    // let formSubmit = form.querySelector(".js-form-submit");

    // Чтобы не проскакивала вёрстка попапа и подложки при загрузке
    [popup, background].forEach((el) => {
      el.style = "";
    });

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

    onResizeStartEnd(
      () => {
        popup.classList.add("--hide");
      },
      () => {
        popup.classList.remove("--hide");
      },
      500
    );

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

      formData.append("from", "CP@()(@YCB@HDFCB)@(tb(RRGCB&^389b");

      let url = "./mail.php";

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
          } else {
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
