onmessage = async event => {

    const { code, data, duration } = event.data;

    let result;

    try {
        result = await eval(`( async () => {
         
          let PERF_ops = 0;
          let PERF_start = Date.now();
          let PERF_end = Date.now() + ${duration};
          ${data};

          while (Date.now() < PERF_end) {
            ${code};
            PERF_ops++;
          }
          return PERF_ops
        })()`); // IIFE -> Immediately Invoked Function Expression
    } catch (error) {
        console.log(error);
        result = 0;
    }

    postMessage(result);
}

