exports.main = async (context = {}, sendResponse) => {
    sendResponse({
        sections: [
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
        ],
    });
};
