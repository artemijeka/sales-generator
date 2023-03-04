document.addEventListener("DOMContentLoaded", function () {
  try {
    let popup = document.querySelector(".js-popup");
    let background = document.querySelector(".js-background");
    let closePopup = document.querySelector(".js-close-popup");
    let openPopup = document.querySelector(".js-open-popup");

    openPopup.addEventListener("click", function (e) {
      popup.classList.add("--active");
      background.classList.add("--active");
    });

    [closePopup, background].forEach((el) => {
      el.addEventListener("click", function (e) {
        background.classList.remove("--active");
        popup.classList.remove("--active");
      });
    });

    //if (!something) {//создание собственной ошибки по условию
    //  throw new Error("Описываем собственную ошибку")//возможные конструкторы: Error ReferenceError SyntaxError TypeError URIError EvalError RangeError InternalError
    //}
  } catch (err) {
    console.error("TRY-CATCH ERROR: ", err);
  } finally {
  }
});
