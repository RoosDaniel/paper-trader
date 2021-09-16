const axios = require('axios');

exports.getStock = symbol => {
    const generateUrl = (symbol, apiKey="PAM5048IVNSRSQN0") => {
        let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY`;
        url += `&symbol=${symbol}&apikey=${apiKey}`;
        return url;
    }
    
    return axios.get(generateUrl(symbol), {
        headers: {'User-Agent': 'request'}
    })
}
