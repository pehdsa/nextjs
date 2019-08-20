import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import Link from "next/link";
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';
import Select from 'react-select';
import Paginate from 'react-js-pagination';
import Skeleton from './components/Skeleton';

import { getApiData, urlImgs, moneyFormatter, titleSite, itensPorPagina } from '../utils/utils';

const Imoveis = (props) => {    
    
    const bloco = React.createRef();

    const [ pageSkeleton, setPageSkeleton ] = useState(true);
    const [ pagina, setPagina ] = useState(parseInt(props.imoveis.pagina_atual));
    const [ totalImoveis, setTotalImoveis ] = useState(props.imoveis.total_registros);
    const [ listaImoveis, setImoveis ] = useState(props.imoveis.imoveis ? props.imoveis.imoveis : []);
    const [ filtros, setFiltros ] = useState([                
        { value: 'default', label: 'FILTRAR' },
        { value: 'recentes', label: 'Recentes' },
        { value: 'relevancia', label: 'Relevância' },
        { value: 'menorvalor', label: 'Menor Valor' },
        { value: 'maiorvalor', label: 'Maior Valor' },
    ]);
    const [ filtrado, setFiltrado ] = useState(props.filtro);

    const ref = useRef(true);

    useEffect(() => {
        if (ref.current) {
            ref.current = false;
            setTimeout(() => {setPageSkeleton(false)}, 100);
            return;
        }        
        setPageSkeleton(true);
        bloco.current.scrollIntoView({block: "start", behavior: "smooth"});
        
        const novaUrl = new Array();
        pagina && novaUrl.push(`pg=${pagina}`);
        (filtrado && filtrado != 'default') && novaUrl.push(`filtro=${filtrado}`);        
        window.history.pushState("", "", `/venda${novaUrl.length > 0 ? `?${novaUrl.join('&')}` : ''}`);
        
        async function getItens() {
            const response = await getApiData('busca','','',((filtrado && filtrado != 'default') ? filtrado : ''),'finalidade=2','',pagina);
            setImoveis(response.imoveis);
            setTimeout(() => {setPageSkeleton(false)}, 100);
        }
        getItens();        
        
    }, [pagina]);

    let renderSkeletonList = new Array();
    for (let i = 0; i < listaImoveis.length; i++) {
        renderSkeletonList[i] = i;        
    }    

    const refFiltro = useRef(true);
    useEffect(() => {  
        if (refFiltro.current) {
            refFiltro.current = false;
            setTimeout(() => {setPageSkeleton(false)}, 100);
            return;
        }  
        setPageSkeleton(true);

        const novaUrl = new Array();
        pagina && novaUrl.push(`pg=${pagina}`);
        (filtrado && filtrado != 'default') && novaUrl.push(`filtro=${filtrado}`);        
        window.history.pushState("", "", `/venda${novaUrl.length > 0 ? `?${novaUrl.join('&')}` : ''}`);

        async function getItens() {            
            const response = await getApiData('busca','','',((filtrado && filtrado != 'default') ? filtrado : ''),'finalidade=2','',pagina);
            setImoveis(response.imoveis);
            setTimeout(() => {setPageSkeleton(false)}, 100);
        }
        getItens();
    },[filtrado]);

    
    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.dadosAnunciante.telefones}>
                <Head>   
                    <meta name="metas-contato" />  
                    <title>Venda | { titleSite }</title>
                </Head>
                
                <ContentHeade title="Imóveis para Venda" tipoImoveis={props.infosBusca.tipoImoveis} uf={props.infosBusca.uf} />

                <div ref={bloco} className="container px-4 px-sm-0">

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

                        { totalImoveis > itensPorPagina && (
                            <div className="d-flex justify-content-center pt-2 pb-5 pagination-container">
                                <Paginate                                     
                                    hideFirstLastPages={true}
                                    activePage={pagina ? pagina : 1}
                                    itemsCountPerPage={itensPorPagina}
                                    totalItemsCount={totalImoveis}
                                    pageRangeDisplayed={5}
                                    onChange={e => setPagina(e)}
                                /> 
                            </div> 
                        ) }
                        

                        </>                     
                    ) : (
                        <div className="text-center py-5 my-5 font-32 opacity-50">Nenhum imóvel</div>                        
                    )}                                        

                </div>

            </Content>        
        </div>
    );
}

Imoveis.getInitialProps = async ( origin ) => {   
    
    const { pg } = origin.query;  
    const { filtro } = origin.query;  

    const imoveis = await getApiData('busca','','',(filtro ? filtro : ''),'finalidade=2','',( pg ? pg : '1'));
    const dadosAnunciante = await getApiData('dadosanunciante');    

    const infosBusca = {
        tipoImoveis: await getApiData('tipoimoveis')
        ,uf: await getApiData('estados')
    }
    
    return {imoveis, dadosAnunciante, filtro, infosBusca}; 
    
}

export default Imoveis; 