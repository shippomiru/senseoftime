let timer: number | undefined;

self.onmessage = (e) => {
  if (e.data === 'start') {
    timer = self.setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  } else if (e.data === 'stop') {
    if (timer) {
      self.clearInterval(timer);
      timer = undefined;
    }
  }
}; 