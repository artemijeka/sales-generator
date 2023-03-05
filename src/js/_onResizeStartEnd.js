/**
 * @author1 https://stackoverflow.com/questions/5489946/how-to-wait-for-the-end-of-resize-event-and-only-then-perform-an-action#answer-5490021
 * @author2 web.master-artem.ru
 * @param {Function} onResizeCallback
 * @param {Function} onResizeEndCallback
 * @param {Number} timeout
 */
export function onResizeStartEnd(onResizeCallback, onResizeEndCallback, timeout) {
  var doEndResizeCallback;
  // var doStartResizeCallback = true;
  // var resizeStart;
  var resizeStart = false;

  window.onresize = function () {
    // Если старт ещё не инициализирован
    if (!resizeStart) {
      // Инициализируем старт
      resizeStart = true;
      // И запускаем стартовый колбэк
      onResizeCallback();
      console.log("onResizeCallback");
    }

    clearTimeout(doEndResizeCallback);
    doEndResizeCallback = setTimeout(() => {
      onResizeEndCallback();
      console.log("onResizeEndCallback");
      resizeStart = false;
    }, timeout);
  };
}
