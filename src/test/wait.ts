export const wait = (f: CallableFunction) =>
  new Promise((resolve, reject) => {
    let watchdog: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    const stop = (cb: CallableFunction) => {
      cb();
      clearTimeout(watchdog);
      clearInterval(interval);
    };
    watchdog = setTimeout(
      () => stop(() => reject(new Error("Wait Timeout"))),
      1000
    );
    interval = setInterval(() => {
      try {
        f();
        stop(resolve); // if given f doesn't throw, wait end successfully
      } catch (e) {}
    }, 1);
  });
