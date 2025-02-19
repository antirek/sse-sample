const axios = require('axios');

const getStreamAxios = async () => {
  const url = 'http://localhost:3000/streaming';
  const response = await axios.get(url, {
    headers: {
      'Accept': 'text/event-stream',
    },
    responseType: 'stream',
    adapter: 'fetch', // <- this option can also be set in axios.create()
  });
  
  console.log('axios got a response');
  const stream = response.data;
  console.log('stream', stream instanceof ReadableStream);

  const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log(value);
  }
}

(getStreamAxios)()
