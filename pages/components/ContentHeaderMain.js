import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
const Range = Slider.Range;

import { getApiData, moneyFormatter } from '../../utils/utils';

export default props => {

    const [ formulario, setFormulario ] = useState({
        finalidade: '',
        tipo: '',
        uf: '',
        cidade: '',
        bairro: '',                
        valorde: '',
        valorate: '',
    })
    
    const [finalidade, setFinalidade] = useState([        
        { value: '2', label: 'Venda' },
        { value: '1', label: 'Aluguel' }
    ]);
    const [tipoImovel, setTipoImovel] = useState(props.infosBusca.tipoImoveis);
    const [uf, setUf] = useState(props.infosBusca.estados);
    const [cidade, setCidade] = useState([]);
    const [bairro, setBairro] = useState([]);    
             
    const [finalidadeSelecionada, setFinalidadeSelecionada] = useState('2');

    const [valuesAluguel, setValuesAluguel] = useState({min: parseInt(props.infosBusca.valoresAluguel[0].valor_minimo), max: parseInt(props.infosBusca.valoresAluguel[0].valor_maximo) });      
    const [minAluguel, setMinAluguel] = useState(parseInt(props.infosBusca.valoresAluguel[0].valor_minimo));
    const [maxAluguel, setMaxAluguel] = useState(parseInt(props.infosBusca.valoresAluguel[0].valor_maximo));   
    
    useEffect(() => {
        setFormulario({ ...formulario, valorde: valuesAluguel.min, valorate: valuesAluguel.max });
    },[valuesAluguel])

    const [valuesVenda, setValuesVenda] = useState({min: parseInt(props.infosBusca.valoresVenda[0].valor_minimo), max: parseInt(props.infosBusca.valoresVenda[0].valor_maximo) });      
    const [minVenda, setMinVenda] = useState(parseInt(props.infosBusca.valoresVenda[0].valor_minimo));
    const [maxVenda, setMaxVenda] = useState(parseInt(props.infosBusca.valoresVenda[0].valor_maximo)); 

    useEffect(() => {
        setFormulario({ ...formulario, valorde: valuesVenda.min, valorate: valuesVenda.max });
    },[valuesVenda])
    
    async function handleOptionChange(tipo, valor) {
        
        if (tipo === 'finalidade') {
            setFinalidadeSelecionada(valor); 
            if (valor === '1') {
                setFormulario({ ...formulario, finalidade: valor, valorde: valuesAluguel.min, valorate: valuesAluguel.max });
            } else if (valor === '2') {
                setFormulario({ ...formulario, finalidade: valor, valorde: valuesVenda.min, valorate: valuesVenda.max });
            }

        } else if (tipo === 'tipo') {
            setFormulario({ ...formulario, tipo: valor });
        } else if (tipo === 'uf') {
            setFormulario({ ...formulario, uf: valor });
            const response = await getApiData('cidades',valor);
            setCidade(response);
        } else if (tipo === 'cidade') {
            setFormulario({ ...formulario, cidade: valor });
            const response = await getApiData('bairros',valor);
            setBairro(response);
        } else if (tipo === 'bairro') {
            setFormulario({ ...formulario, bairro: valor });            
        }

    }

    function handleSubmit() {

        console.log(formulario);
                 
        /*
        setLoading(true);
        const response = await getApiData('faleconosco','','','','',formulario);
        if (response.status == 'sucesso' ) {
            notify('sucesso', 'Mensagem enviada com sucesso');            
        } else {
            notify('erro', 'Ocorreu um erro inesperado, tente novamente mais tarde');
        }        
        setLoading(false);
        */        

    }
    
    return (
        
        <header className="primary content-header">
        
            <div className="container py-4">
                
               
                <div className="content-search bg-white shadow">
                    <form className="d-flex flex-column h-100">
                        
                        <h2 className="font-24 m-0 pb-3 color-primary">Encontre no Site</h2>
                    
                        <div className="flex-grow-1">
                            <div className="row">
                                
                                <div className="col-12 pb-2 mb-1">
                                    <Select className="select" name="" placeholder="FINALIDADE" onChange={e => handleOptionChange('finalidade',e.value)} options={finalidade} />
                                </div>

                                <div className="col-12 pb-2 mb-1">
                                    <Select className="select" name="" placeholder="TIPO DO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoImovel} /> 
                                </div>

                                <div className="col-4 pb-2 mb-1 pr-md-0">
                                    <Select className="select" name="" placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={uf} />
                                </div>

                                <div className="col-8 pb-2 mb-1 pl-md-0">
                                    <Select className="select" name="" placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} />
                                </div>

                                <div className="col-12 pb-2 mb-2">
                                    <Select className="select" name="" placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} />                                        
                                </div>

                                <div className="col-12 pb-2 mb-1">
                                    
                                    <label className="d-block font-12 color-5f5 pb-1"><b>VALOR DESEJADO</b></label>  
                                    
                                    <div className={ finalidadeSelecionada === '1' ? 'd-block' : 'd-none' }>
                                        <Range allowCross={false} step={100} defaultValue={[minAluguel, maxAluguel]} min={minAluguel} max={maxAluguel} onChange={e => setValuesAluguel({min: e[0], max: e[1]})} />
                                        <div className="d-flex justify-content-between font-12 color-5f5 pt-3 pb-1 text-center"><b><span className="color-active">R$ {moneyFormatter(valuesAluguel.min)}</span></b> <b><span className="color-active">R$ {moneyFormatter(valuesAluguel.max)}</span></b></div>
                                    </div>

                                    <div className={ finalidadeSelecionada === '2' ? 'd-block' : 'd-none' }>
                                        <Range allowCross={false} step={20000} defaultValue={[minVenda, maxVenda]} min={minVenda} max={maxVenda} onChange={e => setValuesVenda({min: e[0], max: e[1]})} />
                                        <div className="d-flex justify-content-between font-12 color-5f5 pt-3 pb-1 text-center"><b><span className="color-active">R$ {moneyFormatter(valuesVenda.min)}</span></b> <b><span className="color-active">R$ {moneyFormatter(valuesVenda.max)}</span></b></div>
                                    </div>                                    

                                </div>                               

                            </div>
                        </div>
                        
                        <button type="button" className="btn btn-primary font-14 w-100 py-3" onClick={() => handleSubmit()}>BUSCAR AGORA</button>                            

                    </form>
                </div>
                

                

            </div>
            
            <style jsx>
                {`                
                    .content-header.primary {   
                        position: relative;                                             
                        background: url("/static/img/img-destaque-home.jpg") no-repeat center center;
                        background-size: cover !important;
                        background-color: #ddd;
                        z-index: 100;
                    }                    
                    
                    .content-header > .container { 
                        position: relative;
                        height: var(--content-primary-header-height); 
                    }                    
                    .content-header > .container h1 { position: relative;z-index: 2; }                     

                    .content-search {
                        position: absolute;
                        bottom:0;
                        right: 0;
                        width: 350px;
                        height: 460px;                        
                        transform: translate(0,110px);
                        padding: 30px 35px;
                    }            
                    
                    @import url('/static/css/range.css');
                    

                `}
            </style>
                
        </header>
        
        
        
        
        
    );
    
}
