import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import Link from "next/link";
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';
import Select from 'react-select';
import Paginate from 'react-js-pagination';
import Skeleton from './components/Skeleton';
import NumberFormat from 'react-number-format';
import qs from 'qs';

import { getApiData, urlImgs, moneyFormatter, titleSite, itensPorPagina } from '../utils/utils';

const Imoveis = (props) => {    

    const [ pageSkeleton, setPageSkeleton ] = useState(true);    
    const [ formulario, setFormulario ] = useState({ ...props.pesquisa });    
    const [ totalImoveis, setTotalImoveis ] = useState(parseInt(props.imoveis.total_registros));
    const [ listaImoveis, setImoveis ] = useState(props.imoveis.imoveis ? props.imoveis.imoveis : []);
    const [ filtros, setFiltros ] = useState([                
        { value: 'default', label: 'FILTRAR' },
        { value: 'recentes', label: 'Recentes' },
        { value: 'relevancia', label: 'Relevância' },
        { value: 'menorvalor', label: 'Menor Valor' },
        { value: 'maiorvalor', label: 'Maior Valor' },
    ]);
    const [ filtrado, setFiltrado ] = useState(props.filtro);

    let renderSkeletonList = new Array();
    for (let i = 0; i < listaImoveis.length; i++) { renderSkeletonList[i] = i; }
    
    const refFiltro = useRef(true);
    useEffect(() => {  
        if (refFiltro.current) {
            refFiltro.current = false;
            setTimeout(() => {setPageSkeleton(false)}, 100);
            return;
        }  
        setPageSkeleton(true);        
        window.history.pushState("", "", `/busca?${qs.stringify(formulario)}${(filtrado && filtrado != 'default') ? `&filtro=${filtrado}` : ''}`);
        async function getItens() {            
            const response = await getApiData('busca','','',((filtrado && filtrado != 'default') ? filtrado : ''),qs.stringify(formulario),'','');
            setImoveis(response.imoveis);
            setTimeout(() => {setPageSkeleton(false)}, 100);
        }
        getItens();
    },[filtrado]);

    /*BUSCA*/

    const [ loading, setLoading ] = useState(false);    
    const [finalidade, setFinalidade] = useState([{ value: '1', label: 'Aluguel' },{ value: '2', label: 'Venda' }]);
    const [tipoImovel, setTipoImovel] = useState(props.infosBusca.tipoImoveis);
    const [uf, setUf] = useState(props.infosBusca.estados);
    const [cidade, setCidade] = useState([{ value: '', label: 'Selecione' }]);        
    const [bairro, setBairro] = useState([{ value: '', label: 'Selecione' }]);    
    
    useEffect(() => {        
        async function getcidade() {
            setCidade([{value: '', label: 'Carregando'}]);
            const responseCidade = await getApiData('cidades',formulario.uf);
            setCidade(responseCidade);

            if (formulario.cidade) {
                setBairro([{value: '', label: 'Carregando'}]);
                const responseBairro = await getApiData('bairros',formulario.cidade);
                setBairro(responseBairro);                
            }            
        }
        getcidade();        
    },[uf]);    

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
        setPageSkeleton(true);
        window.history.pushState("", "", `/busca?${qs.stringify(formulario)}${(filtrado && filtrado != 'default') ? `&filtro=${filtrado}` : ''}`);
        const response = await getApiData('busca','','',((filtrado && filtrado != 'default') ? filtrado : ''),qs.stringify(formulario),'','');
        setImoveis(response.imoveis ? response.imoveis : []);
        setTotalImoveis(response.imoveis ? parseInt(response.total_registros) : 0);

        setTimeout(() => {setPageSkeleton(false)}, 100);
        setTimeout(() => {setLoading(false)}, 100);
    }

    
    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.dadosAnunciante.telefones}>
                
                <Head>                       
                    <title>Resultado da Busca | { titleSite }</title>
                </Head>
                
                <ContentHeade title="Resultado da Busca" noSearch={true} tipoImoveis={props.infosBusca.tipoImoveis} uf={props.infosBusca.estados} />

                <div className="container px-4 px-sm-0">

                    <div className="d-none d-md-block searchbox mt-2 mt-md-5">
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
                                <NumberFormat className="font-14" placeholder="VALOR MÍNIMO" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={formulario.valorde} onChange={(e) => handleOptionChange('valorde',e.target.value)} />
                            </div>
                            <div className="col-3 pt-3">
                                <NumberFormat className="font-14" placeholder="VALOR MÁXIMO" thousandSeparator="." decimalSeparator="," allowNegative={false} prefix={'R$ '} value={formulario.valorate} onChange={(e) => handleOptionChange('valorate',e.target.value)} />
                            </div>
                            <div className="col-3 pt-3">
                                <button type="button" className="btn btn-primary font-14 w-100 py-2" onClick={() => handleSubmit()} disabled={ loading ? true : false }>
                                    { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                                    { loading ? 'BUSCANDO' : 'BUSCAR AGORA' }
                                </button>
                            </div>
                        </div>
                    </div>

                    {listaImoveis.length > 0 ? (
                        <>

                        <header className={`${ pageSkeleton ? 'd-flex ' : 'd-none '}justify-content-between align-items-md-center flex-column flex-md-row pt-2 pt-md-5`}>
                            <Skeleton width={195} height={27} />
                            <Skeleton width={200} height={38} />
                        </header>
                        
                        <header className={`${ pageSkeleton ? 'd-none ' : 'd-flex '}topo-grid justify-content-between align-items-md-center flex-column flex-md-row pt-2 pt-md-5`}>
                            <div className="d-none d-md-block font-14 font-md-18 qtde pr-5">
                                <b className="pr-2">{totalImoveis > 1 ? `${totalImoveis} imóveis` : `${totalImoveis} imóvel` }</b>                                                               
                            </div>
                            <div>  
                                <Select className="select filtro" classNamePrefix="react-select" defaultInputValue={filtrado ? filtrado : ''} onChange={(e) => setFiltrado(e.value)} name="" placeholder="FILTRAR" options={filtros} />                                
                            </div>
                        </header>
                        
                        <div className={`${ pageSkeleton ? '' : 'd-none '}row pt-2 pb-5`}>
                            { renderSkeletonList.map((imovel, index) => {
                                return (
                                    <div key={index} className="col-12 col-md-6 col-xl-3 py-4">
                                        <div className="d-flex flex-column shadow h-100 item-grid">
                                            <div className="foto position-relative">
                                                <Skeleton className="skeleton-absolute" />
                                            </div>
                                            <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                                
                                                <div className="flex-grow-2">
                                                    <Skeleton width={100} height={12} />
                                                    <Skeleton className="mt-1" width={120} height={24} />                        
                                                </div>

                                                <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                                    <Skeleton width={177} height={11} />
                                                </div>
                                                
                                                <div className="endereco font-12 line-height-130 pl-0">
                                                    <Skeleton width={200} height={32} /> 
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) }
                        </div>
                        
                        <div className={`${ pageSkeleton ? 'd-none ' : ''}row pt-2 pb-5`}>
                            
                            { listaImoveis.map(imovel => {
                                return (
                                    <div key={imovel.id} className="col-12 col-md-6 col-xl-3 py-4">
                                        <Link href={`/imovel?id=${imovel.id}`}>
                                            <a className="d-flex flex-column shadow h-100 item-grid">
                                                <div className="foto position-relative">
                                                    { imovel.imagem ? (
                                                        <img src={`${urlImgs}/${imovel.imagem}`} alt={imovel.tipo} /> 
                                                    
                                                    ) : <img src="static/img/sm-foto.jpg" alt={imovel.tipo} /> }      
                                                    <Skeleton className="skeleton-absolute" />
                                                </div>
                                                <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                                    
                                                    <div className="flex-grow-2">
                                                        <div className="font-11 line-height-100 color-secondary">{imovel.finalidade}{imovel.tipo && <small className="ml-1 font-italic opacity-50">({imovel.tipo})</small>}</div>
                                                        <div className="font-20 color-primary">
                                                            { imovel.valor ? (
                                                                <b>R$ {moneyFormatter(imovel.valor)}</b>
                                                            ) :
                                                            (
                                                                <b>SEM VALOR</b>
                                                            ) }
                                                            
                                                        </div>
                                                        { imovel.valor_condominio && <div className="font-11 line-height-100 color-secondary">Condomínio: R$ {moneyFormatter(imovel.valor_condominio)}</div> }
                                                    </div>

                                                    <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                                        <div className="d-flex">
                                                            { imovel.dormitorios != 0 && <div className="info info-dormitorios font-11 line-height-100 pr-3"><div>{imovel.dormitorios}</div></div> }
                                                            { imovel.banheiros != 0 && <div className="info info-banheiros font-11 line-height-100 pr-3"><div>{imovel.banheiros}</div></div> }
                                                            { imovel.area != 0 && <div className="info info-area font-11 line-height-100 pr-3"><div>{imovel.area} m<sup>2</sup></div></div> }
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="endereco font-12 line-height-130">
                                                        <img src="/static/img/place.svg" alt="" />
                                                        {`${imovel.endereco} - ${imovel.bairro} | ${imovel.cidade}/${imovel.uf}`}
                                                    </div>
                                                    
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                );

                            }) }

                        </div>

                        </>                     
                    ) : (
                        <div className="text-center py-5 my-5 font-32 opacity-50">Nenhum imóvel</div>                        
                    )}                                        

                </div>

            </Content>
        </div>
    )

    
}

Imoveis.getInitialProps = async ( origin ) => {   
    
    const { filtro } = origin.query;  
    const pesquisa = { ...origin.query }    
    delete pesquisa.filtro; 

    const imoveis = await getApiData('busca','','',(filtro ? filtro : ''),qs.stringify(pesquisa),'','');    
    const dadosAnunciante = await getApiData('dadosanunciante');    

    const infosBusca = {
        tipoImoveis: await getApiData('tipoimoveis')
        ,estados: await getApiData('estados')
    }
    
    return {imoveis, dadosAnunciante, pesquisa, infosBusca, filtro}; 
    
}

export default Imoveis; 