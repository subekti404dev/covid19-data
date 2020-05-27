const axios = require('axios').default;

const getHtml = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

// getHtml('https://covid19.go.id/').then(console.log).catch(console.log)

module.exports = {
    getHtml
}