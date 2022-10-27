// For external API calls
const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
    const {
        propertiesToSend: {firstname},
    } = context;

    try {
        const {data} = await axios.get('https://meme-api.herokuapp.com/gimme/1');
        // memes contains a list of 100 memes, get a random one
        const randomMeme = data.memes[0];
        const memeSections = [
            {
                type: 'tile',
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
                    }
                ]
            },
            {
                type: 'tile',
                body: [
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
                ]
            }
        ];

        sendResponse({
            sections: [
                {
                    type: 'tile',
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
                        }
                    ]
                },
                {
                    type: 'tile',
                    body: [
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
                    ]
                }
            ]
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
