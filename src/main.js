require('dotenv').config()

alert('Hello world!')

function tts() {
    const options = {
        method: 'POST',
        headers: { 'x-api-key': '<api-key>', 'Content-Type': 'application/json' },
        body: '{"text":"<string>","voice_id":123,"language":1,"gender":0,"age":123}'
    };

    fetch('https://client.camb.ai/apis/tts', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}