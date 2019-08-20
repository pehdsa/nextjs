import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import NumberFormat from 'react-number-format';

import { getApiData } from '../../utils/utils';

export default props => {
    
    const [ loading, setLoading ] = useState(false);
    const [ formulario, setFormulario ] = useState({ 
        finalidade: '',
        tipo: '',
        uf: '',
        cidade: '',
        bairro: '',
        valorde: '',
        valorate: ''
     });    
    const [finalidade, setFinalidade] = useState([
        { value: '1', label: 'Aluguel' },
        { value: '2', label: 'Venda' }
    ]);
    const [tipoImovel, setTipoImovel] = useState(props.tipo);
    const [uf, setUf] = useState(props.uf);
    const [cidade, setCidade] = useState([{ value: '', label: 'Selecione' }]);        
    const [bairro, setBairro] = useState([{ value: '', label: 'Selecione' }]);    

    async function handleOptionChange(tipo, valor) {
        
        if (tipo === 'finalidade') {
            setFormulario({ ...formulario, finalidade: valor });
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
        } else if (tipo === 'valorde') {            
            setFormulario({ ...formulario, valorde: valor.replace('R$ ','').split('.').join('') });
        } else if (tipo === 'valorate') {
            setFormulario({ ...formulario, valorate: valor.replace('R$ ','').split('.').join('') });                     
        }

    }

    async function handleSubmit() {
        setLoading(true);
        Router.push({
            pathname: '/busca',
            query: { ...formulario },
        });        
    }

    return (
        
        <div className="searchbox pb-2 pb-md-3">
            <div className="row shadow mx-0 p-4">
                
                <div className="col-3">
                    <Select className="select" classNamePrefix="react-select" value={finalidade.find(item => item.value == formulario.finalidade)} placeholder="FINALIDADE" onChange={e => handleOptionChange('finalidade',e.value)} options={finalidade} />
                </div>
                <div className="col-3">
                    <Select className="select" classNamePrefix="react-select" value={tipoImovel.find(item => item.value == formulario.tipo)} placeholder="TIPO IMÓVEL" onChange={e => handleOptionChange('tipo',e.value)} options={tipoImovel} />
                </div>
                <div className="col-2">
                    <Select className="select" classNamePrefix="react-select" value={uf.find(item => item.value == formulario.uf)} placeholder="UF" onChange={e => handleOptionChange('uf',e.value)} options={uf} />
                </div>
                <div className="col-4">
                    <Select className="select" classNamePrefix="react-select" value={cidade.find(item => item.value == formulario.cidade)} placeholder="CIDADE" onChange={e => handleOptionChange('cidade',e.value)} options={cidade} />
                </div>
                <div className="col-3 pt-3">
                    <Select className="select" classNamePrefix="react-select" value={bairro.find(item => item.value == formulario.bairro)} placeholder="BAIRRO" onChange={e => handleOptionChange('bairro',e.value)} options={bairro} />                                        
                </div>
                <div className="col-3 pt-3">
                    <NumberFormat className="font-14" placeholder="VALOR MÍNIMO" thousandSeparator={true} prefix={'R$ '} value={formulario.valorde} onChange={(e) => handleOptionChange('valorde',e.value)} />
                </div>
                <div className="col-3 pt-3">
                    <NumberFormat className="font-14" placeholder="VALOR MÁXIMO" thousandSeparator={true} prefix={'R$ '} value={formulario.valorate} onChange={(e) => handleOptionChange('valorate',e.value)} />
                </div>
                <div className="col-3 pt-3">
                    <button type="button" className="btn btn-primary font-14 w-100 py-2" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                        { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                        { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                    </button>
                </div>
            </div>
        </div>
        
    );
    
}
