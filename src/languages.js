document.addEventListener('DOMContentLoaded', function () {
    const mockResponse = [
        { id: 1, language: 'english (united states)', short_name: 'en-us' },
        { id: 2, language: 'afrikaans (south africa)', short_name: 'af-za' },
        { id: 3, language: 'amharic (ethiopia)', short_name: 'am-et' }
    ]
    let sourceLanguagesData; // Variable to store fetched source languages data
    const languagesDropdown = document.getElementById('languages')

    async function fetchSourceLanguages() {
        const options = {
            method: 'GET',
            headers: { 'x-api-key': '7bc113b8-17aa-4b84-a869-402ce5685490' }
        };

        const targetUrl = 'https://client.camb.ai/apis/source_languages';

        try {
            const response = await fetch('https://cors-anywhere.herokuapp.com/' + targetUrl, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function populateLanguagesDropdown() {
        try {
            // Check if source languages data is already fetched
            if (!sourceLanguagesData) {
                sourceLanguagesData = await fetchSourceLanguages();
            }

            for (let i = 0; i < sourceLanguagesData.length; i++) {
                let language = sourceLanguagesData[i].language;

                let opt = document.createElement("option");
                opt.value = sourceLanguagesData[i].id; // Assign value to the option
                opt.innerHTML = language;

                languagesDropdown.appendChild(opt);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Populate the dropdown when the DOM content is loaded
    populateLanguagesDropdown();

    function selectedLanguage() {
        const language = sourceLanguagesData.find(lang => lang.language.toLowerCase() === languagesDropdown.value.toLowerCase());
        return language ? language.id : null
    }

    document.getElementById('submit').addEventListener('click', () => {
        console.log(selectedLanguage())
    })
})
