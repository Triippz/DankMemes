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
        const memes = await axios.get('https://meme-api.herokuapp.com/gimme/1');
        // memes contains a list of 100 memes, get a random one
        const randomMeme = memes.data.memes[0];

        const memeSections = [
            {
                type: 'text',
                body: [
                    {
                        type: 'text',
                        text: `Hi ${firstname}, here's your meme titled: `${randomMeme.title},
                    },
                    {
                        type: 'text',
                        text: `This was originally posted on the subreddit ${randomMeme.subreddit} at: ${randomMeme.postLink}`,
                    },
                    {
                        type: 'image',
                        imageUrl: randomMeme.url,
                        altText: randomMeme.name,
                    },
                    {
                        type: 'image',
                        imageUrl: randomMeme.url,
                        altText: randomMeme.name,
                    },
                ]
            },
            {
                type: 'text',
                text: 'Press this button to get a Dank Meme!',
            },
            {
                type: 'button',
                text: 'Meme Me',
                onClick: {
                    type: 'SERVERLESS_ACTION_HOOK',
                    serverlessFunction: 'generate-meme',
                }
            }
        ];

        sendResponse({sections: [...memeSections]});
    } catch (error) {
        sendResponse({
            message: {
                type: 'ERROR',
                body: `Error: ${error.message}`,
            }
        });
    }
};