import React, { useState } from 'react';
import Head from 'next/head'
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';
import ImageGallery from 'react-image-gallery';
import NumberFormat from 'react-number-format';

import { getApiData, urlImgs, urlSite, moneyFormatter, existsOrError, IsEmail, isMobile, notify, titleSite } from '../utils/utils';

const Imovel = (props) => {    
    
    const [ imovel, setImovel ] = useState(props.imovel);    

    let images;
    if ( imovel.imagens ) {
        images = imovel.imagens.map(item => {
            return(
                {
                    original: `${urlImgs}/${item.imagem}`,
                    thumbnail: `${urlImgs}/${item.thumb}`,
                    originalTitle : `${item.titulo}`,                            
                }
            )
        });    
    }

    function handleClickMap() {
        window.open(`http://www.google.com/maps?q=${imovel.latitude},${imovel.longitude}`,'_blank')
    }

    const [ loading, setLoading ] = useState(false);

    const [ formulario, setFormulario ] = useState({ 
        nomecompleto: '',
        email: '',
        cidade: '',
        uf: '',
        telefone: '', 
        mensagem: '',
        imovel: imovel.id,
        finalidade: imovel.finalidade,
        lnk_anuncio: `${urlSite}/imovel?id=${imovel.id}`
    });

    const [ validate, setValidate ] = useState({ validateName: true,validateEmail: true,validateTel: true,validateCity: true,validateUf: true,validateMensage: true });

    async function handleSubmit() {        

        if (!existsOrError(formulario.nomecompleto) || !existsOrError(formulario.email) || !existsOrError(formulario.cidade) || !existsOrError(formulario.uf) || !existsOrError(formulario.telefone) || !existsOrError(formulario.mensagem)) {
            
            const camposinvalidos = {
                validateName: existsOrError(formulario.nomecompleto) ? true : false,
                validateEmail: existsOrError(formulario.email) ? true : false,
                validateCity: existsOrError(formulario.cidade) ? true : false, 
                validateUf: existsOrError(formulario.uf) ? true : false,  
                validateTel: existsOrError(formulario.telefone) ? true : false, 
                validateMensage: existsOrError(formulario.mensagem) ? true : false, 
            }

            setValidate({...validate, ...camposinvalidos});               
            notify('erro', 'Digite os campos obrigatórios'); 
            
        } else if (!IsEmail(formulario.email)) {
            
            setValidate({ validateName: true, validateEmail: false, validateTel: true, validateCity: true, validateUf: true, validateMensage: true });
            notify('erro', 'Digite um e-mail válido');
            
        } else if (!isMobile(formulario.telefone)) {

            setValidate({ validateName: true, validateEmail: true, validateTel: false, validateCity: true, validateUf: true, validateMensage: true });
            notify('erro', 'Digite um celular válido');

        } else {            

            setLoading(true); 

            setValidate({ validateName: true, validateEmail: true, validateTel: true, validateCity: true, validateUf: true, validateMensage: true });

            const response = await getApiData('enviarproposta','','','','',formulario);

            if (response.status == 'sucesso' ) {
                notify('sucesso', 'Mensagem enviada com sucesso');
                setFormulario({ ...formulario, nomecompleto: '',email: '',cidade: '',uf: '',telefone: '', mensagem: '' });
            } else {
                notify('erro', 'Ocorreu um erro inesperado, tente novamente mais tarde');
            }
            
            setLoading(false);

        }

    }

    function handleForm(valores) {
        setFormulario({ ...formulario, ...valores });
    }
    
    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>                       
                    
                    <meta property="og:url" content={`${urlSite}/imovel?id=${imovel.id}`} />
                    <meta property="og:title" content={`${imovel.titulo} | ${imovel.tipo} | ${imovel.finalidade}`} />
                    <meta property="og:description" content={imovel.maisdescricao} />
                    { imovel.imagens && (
                        <React.Fragment>
                            <meta property="og:image" content={`${urlImgs}/${imovel.imagens[0].imagem}`} />
                            <meta property="og:image:width" content="640" />
                            <meta property="og:image:height" content="480" />
                        </React.Fragment>
                    ) }
                    <title>{`${imovel.titulo} | ${imovel.tipo} | ${imovel.finalidade}`} | Imóvel | { titleSite }</title>
                </Head>
                
                <ContentHeade title="Imóvel" />

                <div className="container visualizacao">        


                    <header className="topo-visualizacao d-flex justify-content-between align-items-center pt-5">
                        <div className="font-16 titulo pr-5">
                            <span className="pr-2">{ imovel.titulo }</span>
                        </div>                        
                    </header>

                    <div className="row py-5">
                        <div className="col-7">
                            
                            { imovel.imagens ? <ImageGallery showFullscreenButton={false} items={images} /> : <div><img src="/static/img/sm-foto.jpg" /></div> }

                            { imovel.maisdescricao && (
                                <div className="descricao pt-4">
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">DESCRIÇÃO DO IMÓVEL</h2></div>
                                    <div className="font-14">{ imovel.maisdescricao }</div>
                                </div>
                            )}

                            { imovel.observacoes && (
                                <div className="descricao pt-4">
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">OBSERVAÇÃO</h2></div>
                                    <div className="font-14">{ imovel.observacoes }</div>
                                </div>
                            ) }

                            { imovel.infraestrutura && (
                                <div className="descricao pt-4">
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">TEM NAS PROXIMIDADES</h2></div>
                                    <div className="font-14">
                                        <ul>
                                            { imovel.infraestrutura.map(item => <li>{item}</li> ) }
                                        </ul>
                                    </div>
                                </div>
                            ) }

                        </div>
                        <div className="col-5">
                            
                            <div className="pb-4">
                                <div className="redes-sociais d-flex">
                                    <a href="https://www.facebook.com/infoimoveis/" className="facebook mx-0" target="_blank" rel="nofollow">Facebook</a>   
                                    <a href="https://www.instagram.com/infoimoveis/" className="instagram mx-1" target="_blank" rel="nofollow">Instagram</a>
                                    <a href="https://www.instagram.com/infoimoveis/" className="whatsapp mx-0" target="_blank" rel="nofollow">Whatsapp</a>
                                </div>

                                <div className="text-uppercase font-12 opacity-25 color-primary">{ `${imovel.finalidade} - ${imovel.tipo}` }</div>
                                <div className="font-32 color-primary"><b>{ `R$ ${moneyFormatter(imovel.valor)}` }</b></div>
                                { imovel.valor_condominio && <div className="font-12 color-secondary">{ `Condomínio: R$ ${moneyFormatter(imovel.valor_condominio)}` }</div> }
                                { imovel.valor_iptu && <div className="font-12 color-secondary">{ `IPTU: R$ ${moneyFormatter(imovel.valor_iptu)}` }</div> }
                                { (imovel.areatotal && imovel.areaconstruida) && (
                                    <div className="font-12 color-secondary opacity-75 pt-2">
                                        Área Total: {imovel.areatotal} m<sup>2</sup> / Construída: {imovel.areaconstruida} m<sup>2</sup>                                        
                                    </div>  
                                )}
                            </div>

                            <div className="d-flex border-top border-bottom py-3">
                                <div className="endereco d-flex align-items-center flex-grow-1 pr-4 font-14 line-height-130">
                                    <img src="/static/img/place.svg" alt="" />
                                    {`${imovel.endereco} - ${imovel.bairro} | ${imovel.cidade}/${imovel.uf}`}
                                </div>
                                { (imovel.latitude && imovel.longitude) && <button type="button" onClick={() => handleClickMap()} className="btn btn-secondary shadow-sm w-50 text-white font-13 px-0 py-2 m-0"><b>VER NO MAPA</b></button> }
                            </div>

                            <div className="py-4 font-14"> 
                                <ul>
                                    { imovel.caracteristicas.map(item => <li>{item}</li> ) }
                                </ul>
                            </div>

                            <div className="border p-5">
                                <h2 className="font-24 m-0 p-0 color-primary">Entre em Contato</h2> 
                                <p className="font-12 color-secondary opacity-75">Preencha o formulário abaixo</p>
                                
                                <form>                                                                                
                                    <div className="row mx-0 font-14">

                                        <div className="col-12 pb-2 mb-1 px-0">
                                            <input type="text" className={ !validate.validateName ? 'is-invalid' : '' } placeholder="NOME COMPLETO" value={formulario.nomecompleto} onChange={(e) => handleForm({ nomecompleto: e.target.value })} />
                                        </div>
                                        <div className="col-12 px-0 pb-2 mb-1">
                                            <input type="email" className={ !validate.validateEmail ? 'is-invalid' : '' } placeholder="E-MAIL" value={formulario.email} onChange={(e) => handleForm({email: e.target.value})} />
                                        </div>                                        
                                        <div className="col-2 px-0 pb-2 mb-1">                                            
                                            <input type="text" placeholder="UF" maxLength="2" className={ !validate.validateUf ? 'is-invalid text-uppercase' : 'text-uppercase'} value={formulario.uf} onChange={(e) => handleForm({uf: e.target.value})} /> 
                                        </div>
                                        <div className="col-10 px-0 pb-2 mb-1">
                                            <input type="text" className={ !validate.validateCity ? 'is-invalid' : '' } placeholder="CIDADE" value={formulario.cidade} onChange={(e) => handleForm({cidade: e.target.value})} />
                                        </div>
                                        <div className="col-12 px-0 pb-2 mb-1">
                                            <NumberFormat className={ !validate.validateTel ? 'is-invalid' : '' } placeholder="CELULAR" format="(##) #####-####" mask="_" value={formulario.telefone} onChange={(e) => handleForm({telefone: e.target.value})} />
                                        </div>
                                        <div className="col-12 px-0 pb-2 mb-1">
                                            <textarea className={ !validate.validateMensage ? 'is-invalid' : '' } placeholder="MENSAGEM" value={formulario.mensagem} onChange={(e) => handleForm({mensagem: e.target.value})}></textarea>
                                        </div>
                                        <div className="col-12 pt-4 px-0 d-flex justify-content-end">
                                            <button type="button" onClick={() => handleSubmit()} className="btn btn-primary font-14 py-2 px-5 shadow-sm" disabled={ loading ? true : false }>
                                                { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                                                ENTRAR
                                            </button>  
                                        </div>

                                    </div>                                        
                                </form>

                            </div>

                        </div>
                    </div>


                </div>
                
                <style jsx>
                {`              
                    
                    .visualizacao .topo-visualizacao .titulo { position: relative; }
                    .visualizacao .topo-visualizacao .titulo::before { content: '';position: absolute;top: 50%;left: 0;width: 100%;height: 1px;background-color: var(--main-color);transform: translate(0,-50%); }
                    .visualizacao .topo-visualizacao .titulo span { position: relative;background: var(--main-background);z-index: 10; }

                    .visualizacao .descricao h2 { border-color: var(--active-color) !important; }
                    .visualizacao ul { list-style: inside;column-count: 2;column-gap: 20px; }

                    .visualizacao .endereco { position: relative;padding-left: 25px; }
                    .visualizacao .endereco img { position: absolute;top: 50%;left: 0;width: 15px;transform: translate(0px,-50%); } 

                    .visualizacao .redes-sociais { position: absolute;top: 0;right: 0; }
                    .visualizacao .redes-sociais a { display: block;width: 30px;height: 30px;background-size: cover !important;text-indent: -9999px; }
                    .visualizacao .redes-sociais a.facebook { background: url(/static/img/facebook.svg) no-repeat center center; }
                    .visualizacao .redes-sociais a.instagram { background: url(/static/img/instagram.svg) no-repeat center center; }
                    .visualizacao .redes-sociais a.whatsapp { background: url(/static/img/whatsapp.svg) no-repeat center center; }

                    @import url('/static/css/gallery.css');

                `}
                </style>

            </Content>        
        </div>
    );
}

Imovel.getInitialProps = async ( origin ) => {           
    
    const { id } = origin.query;    
    
    const imovel = await getApiData('dadosimovel',id);
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    
    return {imovel, dadosAnunciante, telefones}; 
    
}

export default Imovel; 