import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
const Range = Slider.Range;
import Router from 'next/router';
import NumberFormat from 'react-number-format';

import { getApiData, moneyFormatter } from '../../utils/utils';

export default props => {

    const [ loading, setLoading ] = useState(false);
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
        { value: '1', label: 'Aluguel' },
        { value: '2', label: 'Venda' }
    ]);
    const [tipoImovel, setTipoImovel] = useState(props.infosBusca.tipoImoveis);
    const [uf, setUf] = useState(props.infosBusca.estados);
    const [cidade, setCidade] = useState([
        { value: '', label: 'Selecione' }
    ]);
    const [bairro, setBairro] = useState([
        { value: '', label: 'Selecione' }
    ]);    
             
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
            setCidade([{value: '', label: 'Carregando'}]);
            const response = await getApiData('cidades',valor);
            setCidade(response);
        } else if (tipo === 'cidade') {
            setFormulario({ ...formulario, cidade: valor });
            setBairro([{value: '', label: 'Carregando'}]);
            const response = await getApiData('bairros',valor);
            setBairro(response);
        } else if (tipo === 'bairro') {
            setFormulario({ ...formulario, bairro: valor });            
        }

    }

    function handleSubmit() {
        setLoading(true);
        Router.push({
            pathname: '/busca',
            query: { ...formulario },
        });
    }
    
    return (
        
        <header className="content-header-primary">
        
            <div className="container py-4">                
               
                <div className="content-search bg-white shadow">
                    <form className="d-flex flex-column h-100">
                        
                        <h2 className="font-24 m-0 pb-3 color-primary">Encontre no Site</h2>
                    
                        <div className="flex-grow-1">
                            <div className="row">
                                
                                <div className="col-12 pb-2 mb-1">
                                    <Select className="select" classNamePrefix="react-select" placeholder="FINALIDADE" onChange={e => handleOptionChange('finalidade',e.value)} options={finalidade} />
                                </div>

                                <div className="col-12 pb-2 mb-1">
                                    <Select className="select" classNamePrefix="react-select" placeholder="TIPO DO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoImovel} /> 
                                </div>

                                <div className="col-12 col-md-4 pb-2 mb-1 pr-3 pr-md-0">
                                    <Select className="select" classNamePrefix="react-select" placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={uf} />
                                </div>

                                <div className="col-12 col-md-8 pb-2 mb-1 pl-3 pl-md-0">
                                    <Select className="select" classNamePrefix="react-select" placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} />
                                </div>

                                <div className="col-12 pb-2 mb-2">
                                    <Select className="select" classNamePrefix="react-select" placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} />                                        
                                </div>

                                <div className="col-12 pb-2 mb-1">
                                    
                                    <label className="d-block font-12 color-5f5 pb-1"><b>VALOR DESEJADO</b></label>  
                                    
                                    <div className={ finalidadeSelecionada === '1' ? 'd-block' : 'd-none' }>
                                        <Range allowCross={false} step={100} defaultValue={[minAluguel, maxAluguel]} min={minAluguel} max={maxAluguel} onChange={e => setValuesAluguel({min: e[0], max: e[1]})} />
                                        <div className="d-flex justify-content-between font-12 color-5f5 pt-3 pb-1 text-center">
                                            <NumberFormat disabled className="bg-transparent font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valuesAluguel.min} />
                                            <NumberFormat disabled className="bg-transparent text-right font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valuesAluguel.max} />                                            
                                        </div>  
                                    </div>

                                    <div className={ finalidadeSelecionada === '2' ? 'd-block' : 'd-none' }>
                                        <Range allowCross={false} step={20000} defaultValue={[minVenda, maxVenda]} min={minVenda} max={maxVenda} onChange={e => setValuesVenda({min: e[0], max: e[1]})} />
                                        <div className="d-flex justify-content-between font-12 color-5f5 pt-3 pb-1 text-center">
                                            <NumberFormat disabled className="bg-transparent font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valuesVenda.min} />
                                            <NumberFormat disabled className="bg-transparent text-right font-12 d-inline-block border-0 p-0 m-0 font-weight-bolder color-active" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={valuesVenda.max} />                                            
                                        </div>
                                    </div>                                    

                                </div>                               

                            </div>
                        </div>
                        
                        <button type="button" className="btn btn-primary font-14 w-100 py-3" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                            { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                            { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                        </button>

                    </form>
                </div>

            </div>
                
        </header>
        
    );
    
}
