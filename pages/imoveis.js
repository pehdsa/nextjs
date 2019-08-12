import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from "next/link";
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';

import { getApiData, urlImgs, moneyFormatter } from '../utils/utils';

const Imoveis = (props) => {    

    const [ filtro, setFiltro ] = useState('filtro');
    
    useEffect(() => {        
        console.log(filtro);        
    }, [filtro]); 

    const [ imoveis, setImoveis ] = useState(props.imoveis);
    useEffect(() => {
        console.log(filtro);        
    }, [imoveis]); 


    function handleFilter(valor) {
        console.log(valor);
        //setFiltro(valor)
    }

    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>   
                    <meta name="metas-contato" />                             
                </Head>
                
                <ContentHeade title="Imóveis" />

                <div className="container">
                    
                    { imoveis.length > 0 ? (
                        <>
                        <header className="topo-lista d-flex justify-content-between align-items-center pt-5">
                            <div className="font-18 qtde pr-5">
                                <b className="pr-2">{ imoveis.length > 1 ? `${imoveis.length} imóveis` : `${imoveis.length} imóvel` }</b>
                            </div>
                            <div>
                                <select onChange={e => handleFilter(e)} data-teste={filtro} className="font-14 color-5f5 filtro">
                                    <option>FILTRAR</option>
                                    <option value="valor1">Opção 1</option>
                                    <option value="valor2">Opção 2</option>
                                </select>
                            </div>
                        </header>

                        <div className="row pt-2 pb-5">
                            
                            { imoveis.map(imovel => {
                                return (
                                    <div key={imovel.id} className="col-3 py-4">
                                        <Link href="/">
                                            <a className="d-flex flex-column shadow h-100 item-destaque">
                                                <div>
                                                    { imovel.imagem ? <img src={`${urlImgs}/${imovel.imagem}`} alt={imovel.tipo} /> : <img src="static/img/sm-foto.jpg" alt={imovel.tipo} /> }
                                                    
                                                </div>
                                                <div className="d-flex flex-grow-1 flex-column bg-white px-3 py-3">
                                                    
                                                    <div className="flex-grow-2">
                                                        <div className="font-11 line-height-100 color-secondary">{imovel.finalidade}{imovel.tipo && <small className="ml-1 font-italic opacity-50">({imovel.tipo})</small>}</div>
                                                        <div className="font-20 color-primary"><b>R$ {moneyFormatter(imovel.valor)}</b></div>
                                                        { imovel.valor_condominio && <div className="font-11 line-height-100 color-secondary">Condomínio: R$ {moneyFormatter(imovel.valor_condominio)}</div> }
                                                    </div>

                                                    <div className="d-flex item-infos flex-grow-1 align-items-center py-3">
                                                        <div className="d-flex">
                                                            { imovel.dormitorios != 0 && <div className="info info-dormitorios font-11 line-height-100 pr-3"><div>{imovel.dormitorios}</div></div> }
                                                            { imovel.banheiros != 0 && <div className="info info-banheiros font-11 line-height-100 pr-3"><div>{imovel.banheiros}</div></div> }
                                                            { imovel.area != 0 && <div className="info info-area font-11 line-height-100 pr-3"><div>{imovel.area} m<sup>2</sup></div></div> }
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="item-endereco font-12 line-height-130">
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
                        <div className="text-center py-5 my-5 font-32 opacity-50">Nenhum imóvel cadastrado</div>                        
                    ) }
                </div>
                
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
                    
                    .topo-lista .qtde { position: relative; }
                    .topo-lista .qtde::before { content: '';position: absolute;top: 50%;left: 0;width: 100%;height: 1px;background-color: var(--main-color);transform: translate(0,-50%); }
                    .topo-lista .qtde b { position: relative;background: var(--main-background);z-index: 10; }

                    .topo-lista .filtro { width: 200px; }

                `}
                </style>

            </Content>        
        </div>
    );
}

Imoveis.getInitialProps = async () => {   
    
    const imoveis = await getApiData('busca');
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    
    return {imoveis, dadosAnunciante, telefones}; 
    
}

export default Imoveis; 