import React from 'react';
import Head from 'next/head'
import Link from "next/link";
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';

import { getApiData, urlImgs, moneyFormatter, titleSite } from '../utils/utils';

const Home = (props) => {      

    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>   
                    <meta name="metas-home" />     
                    <title>{ titleSite }</title>
                </Head>
                
                <h1 className="esconde">Página Iniciaal</h1>
                
                <ContentHeade primary />

                <div className="container py-4">
                    <div className="pb-5">
                        <h2 className="color-primary font-28 m-0 pb-2">Imóveis em Destaque</h2>
                        <p className="font-14 w-50 pr-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    </div>
                    <div className="row">
                        
                        { props.destaques.map(dest => (
                            
                            <div key={dest.id} className="col-3">
                                <Link href={`/imovel?id=${dest.id}`}>
                                    <a className="d-flex flex-column shadow h-100 item-destaque">
                                        <div><img src={`${urlImgs}/${dest.imagem}`} alt={dest.tipo} /></div>
                                        <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                            
                                            <div className="flex-grow-2">
                                                <div className="font-11 line-height-100 color-secondary">{dest.finalidade}{dest.tipo && <small className="ml-1 font-italic opacity-50">({dest.tipo})</small>}</div>
                                                <div className="font-20 color-primary"><b>R$ {moneyFormatter(dest.valor)}</b></div>
                                                { dest.valor_condominio && <div className="font-11 line-height-100 color-secondary">Condomínio: R$ {moneyFormatter(dest.valor_condominio)}</div> }
                                            </div>

                                            <div className="d-flex item-infos flex-grow-1 align-items-center py-3">
                                                <div className="d-flex">
                                                    { dest.dormitorios != 0 && <div className="info info-dormitorios font-11 line-height-100 pr-3"><div>{dest.dormitorios}</div></div> }
                                                    { dest.banheiros != 0 && <div className="info info-banheiros font-11 line-height-100 pr-3"><div>{dest.banheiros}</div></div> }
                                                    { dest.area != 0 && <div className="info info-area font-11 line-height-100 pr-3"><div>{dest.area} m<sup>2</sup></div></div> }
                                                </div>
                                            </div>
                                            
                                            <div className="item-endereco font-12 line-height-130">
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

                <div className="container py-5">
                    <div className="pb-5">
                        <h2 className="color-primary font-28 m-0 pb-2">Notícias Imobiliárias</h2>
                        <p className="font-14 w-50 pr-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                    </div>
                    <div className="row">

                        { props.noticias.map(noti => (
                            <div key={noti.id} className="col-3">

                                <Link href="/">
                                    <a className="d-flex flex-column shadow h-100 noticia-destaque">
                                        <div><img src={`${urlImgs}/${noti.imagem}`} alt={noti.titulo} /></div>
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


            <style jsx>
            {`              
                .item-destaque { color: var(--main-color); }
                .item-destaque:hover { text-decoration: none; }
                .item-infos img { display: inline-block; width: 18px !important; }        
                .item-infos .info { position: relative; }
                .item-infos .info::after { position: absolute;top: 50%;right: 0;content: '';width: 2px;height: 8px;background: #c4c4c4;transform: translate(-8px,-50%); }
                .item-infos .info:last-child::after { display: none; }
                .item-infos .info > div { position: relative;padding-left: 22px; }
                .item-infos .info > div::before { position: absolute;top: 50%;left: 0;content: '';background-size: cover !important;transform: translate(0,-50%); }                
                .item-infos .info-dormitorios > div::before { width: 18px;height: 12px;background: url(/static/img/quartos.svg) no-repeat center center; }
                .item-infos .info-banheiros > div::before { width: 18px;height: 12px;background: url(/static/img/chuveito.svg) no-repeat center center; }
                .item-infos .info-area > div::before { width: 14px;height: 14px;background: url(/static/img/metragem.svg) no-repeat center center; }

                .item-endereco { position: relative;padding: 0 0 0 25px; }
                .item-endereco img { position: absolute;top: 50%;left: 0;width: 15px;transform: translate(0px,-50%); }
                
                .noticia-destaque:hover { text-decoration: none; }
                .noticia-destaque p { color: var(--main-color) !important; }
                .noticia-destaque .ler-mais span { position: relative;padding: 0 15px 0 0; }
                .noticia-destaque .ler-mais span::after { position: absolute;top: 50%;right: 0;content: '';width: 6px;height: 10px;background: url(/static/img/arrow-right.svg) no-repeat center center;background-size: cover;transform: translate(0,-51%); }

            `}
            </style>

        </div>
    );
    
}

Home.getInitialProps = async () => {
    
    const destaques = await getApiData('destaques','','4');
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    const noticias = await getApiData('ultimasnoticias','','4');
    
    return {destaques, dadosAnunciante, telefones, noticias}; 
    
}

export default Home; 
