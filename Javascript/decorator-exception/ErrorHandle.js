/**
 *
 * 异步函数处理
 * @export
 * @param {AnyFunction} fn
 * @param {*} context
 * @param {ErrorHandler} callback
 * @returns
 */
function observerAsyncHandler(fn, context, callback) {
  return async function (...args) {
    try {
      const r = await fn.call(context || this, ...args);
      return r;
    } catch (err) {
      callback(err);
    }
  };
}

/**
 * 同步函数处理
 * @param {AnyFunction} fn
 * @param {*} context
 * @param {ErrorHandler} callback
 * @returns
 */
function observerSyncHandler(fn, context, callback) {
  return function (...args) {
    try {
      const r = fn.call(context || this, ...args);
      return r;
    } catch (err) {
      callback(err);
    }
  };
}

/**
 *
 * 自动识别同步还是异步方法
 * @param {any} fn
 * @param {any} context
 * @param {any} callback
 * @returns
 */
function observerAllHandler(fn, context, callback) {
  //AsyncGeneratorFunction 和  AsyncFunction
  if (fn.constructor.name.startsWith("Async")) {
    return observerAsyncHandler(fn, context, callback);
  }
  return observerSyncHandler(fn, context, callback);
}
