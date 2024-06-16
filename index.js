document.getElementById('entityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const sentence = document.getElementById('sentence').value;

    // Cloudmersive API key and URL
    const apiKey = 'c1da13c8-7e05-4773-8060-5774ba6d6cff';  // Replace with your actual Cloudmersive API key
    const url = 'https://api.cloudmersive.com/nlp/ExtractEntitiesString';

    // Data to be sent in the API request
    const data = {
        "Input": sentence
    };

    console.log('Sending request to Cloudmersive API with data:', data);

    // Fetch API to call Cloudmersive NLP API
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Apikey': apiKey
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received response from Cloudmersive API:', data);
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '<h2>Recognized Entities:</h2>';
        const list = document.createElement('ul');

        // Ensure data.Entities exists and is an array before processing
        if (data && data.Entities && Array.isArray(data.Entities)) {
            data.Entities.forEach(entity => {
                const listItem = document.createElement('li');
                listItem.textContent = `${entity.EntityType}: ${entity.Text}`;
                list.appendChild(listItem);
            });
            outputDiv.appendChild(list);
        } else {
            outputDiv.innerHTML = '<p>No entities found in the input sentence.</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '<p style="color: red;">An error occurred while processing your request. Please try again later.</p>';
    });
});
