import React from 'react';
import 'isomorphic-fetch';
import qs from 'qs';
import { toast } from 'react-toastify';

const apiId = "46";
const apiKey = "28ea23df7550efae4710b0df99d39390";
const apiUrl = "https://www.infoimoveis.com.br/webservice/infows.php";
const urlImgs = "https://static.infoimoveis.com.br"; 
const urlSite = "http://localhost:3000"; 
const titleSite = "Deborah Barros - Corretora de Imóvies";

const getApiData = async ( acao, registro="", resultados="", ordenacao="", busca="", dados="" ) => {
    
    const dataDestaque = {
        acao,
        registro,
        resultados,
        ordenacao,
        busca,
        dados,
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

const existsOrError = (value) => {
    if(!value) return false;
    if(Array.isArray(value) && value.length === 0) return false;
    if(typeof value === 'string' && !value.trim()) return false;

    return true;
}

const equalsOrError = (valueA, valueB) => {
    if(valueA !== valueB) return false;
    return true;
}

const IsEmail = (email) => { var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;var check=/@[\w\-]+\./;var checkend=/\.[a-zA-Z]{2,3}$/;if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}else {return true;} }

const notify = (tipo, mensagem) => {

    if (tipo === 'sucesso') {
        toast.success(mensagem, {
            position: toast.POSITION.BOTTOM_RIGHT,
            //className: 'foo-bar',
            autoClose: 5000
        });            
    } else if (tipo === 'erro') {
        toast.error(mensagem, {
            position: toast.POSITION.BOTTOM_RIGHT,
            //className: 'foo-bar',
            autoClose: 5000
        });
    } else if (tipo === 'aviso') {
        toast.warn(mensagem, {
            position: toast.POSITION.BOTTOM_RIGHT,
            //className: 'foo-bar' ,
            autoClose: 5000
        });
    }

}

const isMobile = (celular) => {
    const numero = celular.replace('-', '').replace('(', '').replace(')', '').replace(' ', '').replace('_', '');
    const telefones_blacklist = ['000000000', '111111111','222222222','333333333','444444444','555555555','666666666','777777777','888888888','999999999'];
    let validaBlacklist = true;
    telefones_blacklist.forEach(function(valida){
            if(valida == numero.substr(2,9)){
                validaBlacklist = false;
                return false;
            }
        }
    );
    
    if(numero.length == 11 && numero.substr(2,1) == '9' && validaBlacklist){ 
        return true; 
    }else{ 
        return false;  
    } 
}

export { apiUrl, apiKey, apiId, urlImgs, urlSite, getApiData, moneyFormatter, existsOrError, equalsOrError, IsEmail, isMobile, notify, titleSite }