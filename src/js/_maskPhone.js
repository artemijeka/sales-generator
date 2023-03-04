/**
 * Phone input mask | Маска ввода телефона
 * @author1  https://codesandbox.io/s/ylvn0?file=/src/index.js
 * @author2  web.master-artem.ru
 * @version 1.3 - 04.03.2023
 * @source (cacher) https://snippets.cacher.io/snippet/bb6b9c623872bb343fbd
 * @source (gist) https://gist.github.com/artemijeka/06fe9f88614253212814f6f4fb533a5e
 *
 * @param { String || Node } sonoan - Selector of phone input OR Node
 **/
export function maskPhone(sonoan) {
  let phoneInputAll = [];

  if (typeof sonoan === "string") {
    phoneInputAll = document.querySelectorAll(sonoan);
    console.log(phoneInputAll);
  } else if (typeof sonoan === "object") {
    phoneInputAll[0] = sonoan;
  }

  phoneInputAll.forEach(function (phoneInput) {
    phoneInput.addEventListener("blur", () => {
      if (phoneInput.value.length != 18) {
        /* +7 (123) 456-78-90 = 18 символов */
        phoneInput.value = "";
      }
    });

    phoneInput.addEventListener("focus", function () {
      inputHandler(phoneInput);
    });

    phoneInput.addEventListener("input", function () {
      inputHandler(phoneInput);
    });
  });

  function inputHandler(phoneInput) {
    const value = phoneInput.value.replace(/\D+/g, "");
    const numberLength = 11; //7 1 2 3 4 5 6 7 8 9 0 = 11 чисел

    let result = "+7 (";

    // Обработка значения которое находится в input value
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 0:
          continue;
        case 4:
          result += ") ";
          break;
        case 7:
          result += "-";
          break;
        case 9:
          result += "-";
          break;
        default:
          break;
      }
      result += value[i];
    }
    phoneInput.value = result;
  }
}
