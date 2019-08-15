import React, { useState } from 'react';
import Head from 'next/head'
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';

import { getApiData, urlImgs, urlSite, titleSite } from '../utils/utils';

const Noticia = (props) => {    

    const [ noticia, setNoticia ] = useState(props.noticia);

    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>
                    
                    <meta property="og:url" content={`${urlSite}/imovel?id=${noticia.id}`} />
                    <meta property="og:title" content={ noticia.titulo } />
                    <meta property="og:description" content={ noticia.resumo } />
                    
                    { noticia.imagem && (
                        <React.Fragment>
                            <meta property="og:image" content={`${urlImgs}/${noticia.imagem}`} />
                            <meta property="og:image:width" content="640" />
                            <meta property="og:image:height" content="480" />
                        </React.Fragment>
                    ) }
                    
                    <title>{`${noticia.titulo}`} | Notícia | { titleSite }</title>
                </Head>
                
                <ContentHeade title="Notícia" />

                <div className="container noticia">        

                    <div className="pt-5 pb-4 border-bottom">
                        <div className="font-12 color-secondary opacity-75 pb-3">{ noticia.data }</div>
                        <h2 className="font-40 line-height-130 color-primary m-0 p-0">{ noticia.titulo }</h2>
                    </div>

                    <div className="d-table w-100 pt-4 pb-5 font-16 line-height-160 color-secondary opacity-75 texto">
                        
                        { noticia.imagem && ( 
                            <div className="float-left mr-3 mb-3">
                                <img src={`${urlImgs}/${noticia.imagem}`} /> 
                                <span className="d-block font-12 font-italic pt-1 text-center">{ noticia.fonte }</span>
                            </div> 
                        ) }

                        <div>
                            <div className="redes-sociais d-flex align-items-center justify-content-end py-2 mb-3">
                                <span className="font-11 font-italic mr-2">Compartilhar:</span>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlSite}/imovel?id=${noticia.id}`} className="facebook mx-0" target="_blank" rel="nofollow">Facebook</a>   
                                <a href={`https://twitter.com/intent/tweet?text=${urlSite}/imovel?id=${noticia.id}`} className="instagram mx-1" target="_blank" rel="nofollow">Instagram</a>
                                <a href={`https://wa.me/?text=${urlSite}/imovel?id=${noticia.id}`} className="whatsapp mx-0" target="_blank" rel="nofollow">Whatsapp</a>
                            </div>
                            { props.texto }
                        </div>

                    </div>

                </div>
                
                <style jsx>
                {`  
                    .noticia .redes-sociais a { display: block;width: 25px;height: 25px;background-size: cover !important;text-indent: -9999px;opacity: 1;transition: opacity .2s ease }
                    .noticia .redes-sociais a:hover { opacity: .9; }
                    .noticia .redes-sociais a.facebook { background: url(/static/img/facebook.svg) no-repeat center center; }
                    .noticia .redes-sociais a.instagram { background: url(/static/img/instagram.svg) no-repeat center center; }
                    .noticia .redes-sociais a.whatsapp { background: url(/static/img/whatsapp.svg) no-repeat center center; }
                    
                    .texto p:last-of-type {
                        margin-bottom: 0 !important;
                    }
                    .texto img { max-width: 450px; }

                `}
                </style>

            </Content>        
        </div>
    );
}

Noticia.getInitialProps = async ( origin ) => {           
    
    const { id } = origin.query;    
    
    const noticia = await getApiData('noticia',id);
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    
    const texto = <div dangerouslySetInnerHTML={{__html: noticia.texto}}></div>;

    return {texto, noticia, dadosAnunciante, telefones}; 
    
}

export default Noticia; 