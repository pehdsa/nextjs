import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import Router from 'next/router';

import { getApiData } from '../../utils/utils';

export default props => {

    const [ show, setShow ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ formulario, setFormulario ] = useState({ finalidade: '',tipo: '',uf: '',cidade: '',bairro: '',valorde: '',valorate: '' });
    const [ finalidade, setFinalidade ] = useState([{ value: '1', label: 'Aluguel' },{ value: '2', label: 'Venda' }]);
    const [ tipoImovel, setTipoImovel ] = useState(props.tipoImoveis ? props.tipoImoveis : {});
    const [ uf, setUf ] = useState(props.uf ? props.uf : {});
    const [ cidade, setCidade ] = useState([{ value: '', label: 'Selecione' }]);        
    const [ bairro, setBairro ] = useState([{ value: '', label: 'Selecione' }]);

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
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <header className="content-header">        
            <div className="d-flex align-items-center justify-content-between container py-4">
                <h1 className="font-24 font-md-28 text-white text-center text-md-left m-0">{props.title}</h1> 
                <button onClick={handleShow} className={`p-1 m-0 bg-transparent border-0${props.noSearch ? ' d-block d-md-none' : ''}`}><img src="/static/img/search.svg" width="25" height="25" /></button>
            </div>                
        </header>

        <Modal className="modal-style" centered show={show} onHide={handleClose}>          
            <Modal.Body className="p-4">          
                <h2 className="font-24 m-0 pb-3 color-primary">Encontre no Site</h2>      
                <div className="row py-2">
                                
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

                    <div className="col-12 pb-2 mb-2">
                        <NumberFormat className="font-14" placeholder="VALOR MÍNIMO" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} onChange={(e) => handleOptionChange('valorde',e.target.value)} />
                    </div>
                    
                    <div className="col-12 pb-2 mb-2">
                        <NumberFormat className="font-14" placeholder="VALOR MÁXIMO" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} onChange={(e) => handleOptionChange('valorate',e.target.value)} />
                    </div>                       

                </div>
                
                <button type="button" className="btn btn-primary font-14 w-100 px-4 py-3 shadow" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                    { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                    { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                </button>   
                                                                    
            </Modal.Body>
        </Modal>

        </>
        
    );
    
}
