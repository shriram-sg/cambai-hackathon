<<<<<<< Updated upstream
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function tts(text) {
    const inputVal = document.getElementById("myInput")
    console.log(inputVal)

    const options = {
        method: 'POST',
        headers: { 'x-api-key': '44ae73e5-6594-4b11-8bfe-fced6eff0edf', 'Content-Type': 'application/json' },
        body: `{ "text": "${inputVal.value}", "voice_id": 8776, "language": 1, "gender": 0, "age": 123 }`
    };

    let response = await fetch('https://cors-anywhere.herokuapp.com/https://client.camb.ai/apis/tts', options)
    let jsonResp = await response.json()
    let taskId = await jsonResp.task_id

    let done = false;
    let runId;

    while (!done) {
        console.log(1)
        await sleep(5000)

        const poll_options = { method: 'GET', headers: { 'x-api-key': '44ae73e5-6594-4b11-8bfe-fced6eff0edf' } };

        response = await fetch(`https://cors-anywhere.herokuapp.com/https://client.camb.ai/apis/tts/${taskId}`, poll_options)
        jsonResp = await response.json()

        console.log(jsonResp)

        if (jsonResp.status == "SUCCESS") {
            done = true
            runId = jsonResp.run_id
        }
    }

    console.log(runId)

    const result_options = { method: 'GET', headers: { 'x-api-key': '44ae73e5-6594-4b11-8bfe-fced6eff0edf', 'Access-Control-Allow-Origin': '*' }, mode: 'cors' };

    //result_response = await fetch(`https://client.camb.ai/apis/tts_result/${runId}`, result_options)
    let result_response = await fetch(`https://cors-anywhere.herokuapp.com/https://client.camb.ai/apis/tts_result/${runId}`, result_options)
    let arr = await result_response.arrayBuffer()

    const ctx = new AudioContext();
    let audio = await ctx.decodeAudioData(arr)

    console.log(audio)

    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);

    console.log(inputVal.value)
}

document.getElementById("button").addEventListener('click', () => tts('hi'))


=======
>>>>>>> Stashed changes
