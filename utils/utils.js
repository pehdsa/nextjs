import React from 'react';
import 'isomorphic-fetch';
import qs from 'qs';

const apiId = "46";
const apiKey = "28ea23df7550efae4710b0df99d39390";
const apiUrl = "https://www.infoimoveis.com.br/webservice/infows.php";
const urlImgs = "https://www.infoimoveis.com.br/";

const getApiData = async ( acao, registro="", resultados="", ordenacao="", busca="" ) => {
    
    const dataDestaque = {
        acao,
        registro,
        resultados,
        ordenacao,
        busca,
        anunciante: apiId,
        chave: apiKey
    }
    
    const myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded", 
        "Access-Control-Allow-Origin": "*"
    });

    const options = { 
        method: 'POST',
        body: qs.stringify(dataDestaque),
        headers: myHeaders,
        mode: 'cors',
        credentials: 'omit' 
    };
    
    const response = await fetch(apiUrl, options);
    const destaques = await response.json();
    
    return destaques;
    
}

const moneyFormatter = (valor) => {    
    return parseFloat(valor).toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

export { apiUrl, apiKey, apiId, urlImgs, getApiData, moneyFormatter }