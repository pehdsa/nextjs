import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import Link from "next/link";
import Content from './components/Content';
import ContentHeader from './components/ContentHeaderMain';
import Skeleton from './components/Skeleton';

import { getApiData, urlImgs, moneyFormatter, titleSite } from '../utils/utils';

const Home = (props) => {   
    
    const [ pageSkeleton, setPageSkeleton ] = useState(true);
    const [ destaques, setDestaques ] = useState(props.destaques);
    const [ noticias, setNoticias ] = useState(props.noticias);

    const refDestaque = useRef(true);
    useEffect(() => {
        if (refDestaque.current) {
            refDestaque.current = false;
            setTimeout(() => {setPageSkeleton(false)}, 800);
            return;
        }  
    },[destaques]);

    let renderSkeletonList = new Array();
    for (let i = 0; i < 4; i++) {
        renderSkeletonList[i] = i;        
    }

    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>                       
                    <title>{ titleSite }</title>
                </Head>
                
                <h1 className="esconde">Página Iniciaal</h1>
                
                <ContentHeader primary infosBusca={props.infosBusca} />

                <div className="container py-4 px-4 px-sm-0">
                    
                    <div className="pb-3 pb-md-5">
                        <h2 className="color-primary font-28 m-0 pb-2">Imóveis em Destaque</h2>
                        <p className="font-14 w-50 pr-0 pr-md-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    </div>

                    <div className={`${ pageSkeleton ? '' : 'd-none '}row`}>
                        { renderSkeletonList.map((imovel, index) => { 
                            return (
                                <div key={index} className="col-12 col-md-6 col-xl-3 py-3 py-xl-0">
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


                    <div className={`${ pageSkeleton ? 'd-none ' : ''}row`}>
                        
                        { destaques.map(dest => (
                            
                            <div key={dest.id} className="col-12 col-md-6 col-xl-3 py-3 py-xl-0">
                                <Link href={`/imovel?id=${dest.id}`}>
                                    <a className="d-flex flex-column shadow h-100 item-grid">
                                        <div className="foto position-relative"><img src={`${urlImgs}/${dest.imagem}`} alt={dest.tipo} /></div>
                                        <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                            
                                            <div className="flex-grow-2">
                                                <div className="font-11 line-height-100 color-secondary">{dest.finalidade}{dest.tipo && <small className="ml-1 font-italic opacity-50">({dest.tipo})</small>}</div>
                                                <div className="font-20 color-primary">
                                                    { dest.valor ? (
                                                        <b>R$ {moneyFormatter(dest.valor)}</b>
                                                    ) :
                                                    (
                                                        <b>SEM VALOR</b>
                                                    ) }                                                    
                                                </div>
                                                { dest.valor_condominio && <div className="font-11 line-height-100 color-secondary">Condomínio: R$ {moneyFormatter(dest.valor_condominio)}</div> }
                                            </div>

                                            <div className="d-flex infos flex-grow-1 align-items-center py-3">
                                                <div className="d-flex">
                                                    { dest.dormitorios != 0 && <div className="info info-dormitorios font-11 line-height-100 pr-3"><div>{dest.dormitorios}</div></div> }
                                                    { dest.banheiros != 0 && <div className="info info-banheiros font-11 line-height-100 pr-3"><div>{dest.banheiros}</div></div> }
                                                    { dest.area != 0 && <div className="info info-area font-11 line-height-100 pr-3"><div>{dest.area} m<sup>2</sup></div></div> }
                                                </div>
                                            </div>
                                            
                                            <div className="endereco font-12 line-height-130">
                                                <img src="/static/img/place.svg" alt="" />
                                                {`${dest.endereco} - ${dest.bairro} | ${dest.cidade}/${dest.uf}`}
                                            </div>
                                            
                                        </div>
                                    </a>
                                </Link>
                            </div>

                        )) }

                    </div>
                </div>

                <div className="container py-5 px-4 px-sm-0">
                    <div className="pb-3 pb-md-5">
                        <h2 className="color-primary font-28 m-0 pb-2">Notícias Imobiliárias</h2>
                        <p className="font-14 w-50 pr-0 pr-md-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    </div>
                    <div className="row">

                        { props.noticias.map(noti => (
                            <div key={noti.id} className="col-12 col-md-6 col-xl-3 py-3 py-xl-0">

                                <Link href={`/noticia?id=${noti.id}`}>
                                    <a className="d-flex flex-column shadow h-100 item-grid-noticia">
                                        <div className="foto"><img src={`${urlImgs}/${noti.imagem}`} alt={noti.titulo} /></div>
                                        <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">                                            
                                            <div className="flex-grow-1"><h2 className="font-14 line-height-130 color-primary m-0">{noti.titulo}</h2></div>
                                            <div className="py-3"><p className="m-0 font-14 line-height-130">{ noti.resumo }</p></div>
                                            <div className="ler-mais color-primary"><span className="line-height-100 font-14">LER MATÉRIA COMPLETA</span></div>
                                        </div>
                                    </a>
                                </Link>

                            </div>
                        )) }

                    </div>
                </div>                
                
            </Content>   

        </div>
    );
    
}

Home.getInitialProps = async () => {
    
    const destaques = await getApiData('destaques','','4');
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    const noticias = await getApiData('ultimasnoticias','','4');

    const infosBusca = {
        tipoImoveis: await getApiData('tipoimoveis')
        ,estados: await getApiData('estados')
        ,valoresAluguel: await getApiData('valores',1)
        ,valoresVenda: await getApiData('valores',2)
    }
    
    return {destaques, dadosAnunciante, telefones, noticias, infosBusca}; 
    
}

export default Home; 
