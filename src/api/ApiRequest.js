import axios from 'axios';

const API_KEY = 'ARXVMG3W2ARFBO50';

const url = axios.create({
    baseURL: 'https://www.alphavantage.co/query',
});

export const getStockSuggestions = (word) => {
    let result = url
        .get(`?function=SYMBOL_SEARCH&keywords=${word}&apikey=${API_KEY}`)
        .then((response) => {
            console.log("api response is ", response.data);
            return response.data;
          
        })
        .catch((error) => {
            return error;
        });
    return result;
};

export const getStockDetails = (word) =>{
  let result =  url.get(`?function=OVERVIEW&symbol=${word}&apikey=${API_KEY}`).then((response)=>{
    console.log("stock details is", response.data);
    return response.data;

  }).catch((error) =>{
      return error;
  })

  return result;
}