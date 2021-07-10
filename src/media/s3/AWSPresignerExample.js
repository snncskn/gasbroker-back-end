const { generateGetUrl, generatePutUrl } = require('./AWSPresigner');

let Key = './demo.txt';
generateGetUrl(Key)
    .then(getUrl => {
        console.log('getUrl', ': ', getUrl);
    });

Key = './demo.txt';
generatePutUrl(Key)
    .then(getUrl => {
        console.log('getUrl', ': ', getUrl);
    });