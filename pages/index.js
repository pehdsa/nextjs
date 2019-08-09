import React from 'react';
import Head from 'next/head'
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';

import { getApiData, urlImgs, moneyFormatter } from '../utils/utils';

const Home = (props) => {      

    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>   
                    <meta name="metas-home" />                             
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
                                <div className="d-flex flex-column shadow h-100">
                                    <div>
                                        <img src={`${urlImgs}/${dest.imagem}`} alt={dest.tipo} />
                                    </div>
                                    <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                        
                                        <div className="flex-grow-1">
                                            <div className="font-11 line-height-100 color-secondary">{dest.finalidade}{dest.tipo && <small className="ml-1 font-italic opacity-50">({dest.tipo})</small>}</div>
                                            <div className="font-20 color-primary"><b>R$ {moneyFormatter(dest.valor)}</b></div>
                                            { dest.valor_condominio && <div className="font-11 line-height-100 color-secondary">Condomínio: R$ {moneyFormatter(dest.valor_condominio)}</div> }
                                        </div>

                                        <div className="d-flex item-infos flex-grow-2 align-items-center py-2">
                                            <div className="row">
                                                { dest.dormitorios != 0 && <div className="col-4 info info-dormitorios font-12 line-height-100"><div>{dest.dormitorios}</div></div>}
                                            </div>
                                        </div>
                                        
                                        <div className="item-endereco font-12 line-heigth-110">
                                            <img src="/static/img/place.svg" alt="" />
                                            {`${dest.endereco} - ${dest.bairro} | ${dest.cidade}/${dest.uf}`}
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                        )) }

                    </div>
                </div>
                
            </Content>   


            <style jsx>
            {`              
                .item-infos img { display: inline-block; width: 18px !important; }        
                .item-infos .info > div { position: relative;padding-left: 22px; }
                .item-infos .info > div::before { position: absolute;top: 50%;left: 0;content: '';background-size: cover !important;transform: translate(0,-50%); }                
                .item-infos .info-dormitorios > div::before { width: 18px;height: 12px;background: url(/static/img/quartos.svg) no-repeat center center; }

                .item-endereco { position: relative;padding: 0 0 0 30px; }
                .item-endereco img { position: absolute;top: 50%;left: 0;width: 15px;transform: translate(5px,-50%); }

            `}
            </style>

        </div>
    );
    
}

Home.getInitialProps = async () => {
    
    const destaques = await getApiData('destaques','','4');    
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    
    return {destaques, dadosAnunciante, telefones}; 
    
}

export default Home; 
