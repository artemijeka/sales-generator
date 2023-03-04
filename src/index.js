document.addEventListener("DOMContentLoaded", function () {
  try {

    ()=>{
      console.log('test')
    }

    //if (!something) {//создание собственной ошибки по условию
    //  throw new Error("Описываем собственную ошибку")//возможные конструкторы: Error ReferenceError SyntaxError TypeError URIError EvalError RangeError InternalError
    //}
  } catch (err) {
    console.error("TRY-CATCH ERROR: ", err);
  } finally {
  }
});
