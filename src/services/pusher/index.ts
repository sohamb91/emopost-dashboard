import Pusher from 'pusher-js';

const pusherClient = new Pusher('9d2fc89b0d6058d7d281', {
  cluster: 'ap2',
  forceTLS: true,
});

export { pusherClient };
