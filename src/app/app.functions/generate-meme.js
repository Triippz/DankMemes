// For external API calls
const axios = require('axios');
// For HubSpot API calls (HubSpot node API client)
const hubspot = require('@hubspot/api-client');

exports.main = async (context = {}, sendResponse) => {
    const {
        propertiesToSend: {firstname},
    } = context;

    // Instantiating HubSpot node API client
    const hubspotClient = new hubspot.Client({
        accessToken: context.secrets.PRIVATE_APP_ACCESS_TOKEN,
    });

    try {
        const memes = await axios.get('https://api.imgflip.com/get_memes');
        // memes contains a list of 100 memes, get a random one
        const randomMeme = memes.data.data.memes[Math.floor(Math.random() * memes.data.data.memes.length)];

        sendResponse({
            sections: [
                {
                    type: 'text',
                    text: `Hi ${firstname}, here's your meme:`,
                },
                {
                    type: 'image',
                    imageUrl: randomMeme.url,
                    altText: randomMeme.name,
                },
            ],
        });

    } catch (error) {
        sendResponse({
            message: {
                type: 'ERROR',
                body: `Error: ${error.message}`,
            }
        });
    }
};
