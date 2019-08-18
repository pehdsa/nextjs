import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';
import ImageGallery from 'react-image-gallery';
import NumberFormat from 'react-number-format';
import Skeleton from './components/Skeleton';

import { getApiData, urlImgs, urlSite, moneyFormatter, existsOrError, IsEmail, isMobile, notify, titleSite } from '../utils/utils';

const Imovel = (props) => {    
    
    const [ pageSkeleton, setPageSkeleton ] = useState(true);
    const [ imovel, setImovel ] = useState(props.imovel);    

    const refImovel = useRef(true);
    useEffect(() => {
        if (refImovel.current) {
            refImovel.current = false;
            setTimeout(() => {setPageSkeleton(false)}, 800);
            return;
        }
    },[imovel])

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

                <div className="container visualizacao px-4 px-sm-0">        
                    
                    <header className={`${ pageSkeleton ? 'd-flex ' : 'd-none '}justify-content-between align-items-center pt-5`}>
                        <Skeleton width={280} height={24} />                    
                    </header>

                    <header className={`${ pageSkeleton ? 'd-none ' : 'd-flex '}topo-visualizacao justify-content-between align-items-center pt-5`}>
                        { imovel.titulo && (
                            <div className="font-16 titulo pr-5">
                                <span className="pr-2">{ imovel.titulo }</span>
                            </div>                        
                        ) }                        
                    </header>

                    <div className="row py-5">
                        <div className="col-12 col-lg-7">

                            <div className="redes-sociais d-flex d-lg-none" style={{ transform: 'translate(-15px, -115%)' }}>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlSite}/imovel?id=${imovel.id}`} className="facebook mx-0" target="_blank" rel="nofollow">Facebook</a>   
                                <a href={`https://twitter.com/intent/tweet?text=${urlSite}/imovel?id=${imovel.id}`} className="instagram mx-1" target="_blank" rel="nofollow">Instagram</a>
                                <a href={`https://wa.me/?text=${urlSite}/imovel?id=${imovel.id}`} className="whatsapp mx-0" target="_blank" rel="nofollow">Whatsapp</a>
                            </div>
                            
                            { imovel.imagens ? <ImageGallery showFullscreenButton={false} items={images} /> : <div><img src="/static/img/sm-foto.jpg" /></div> }

                            <div className="pt-3 pb-4 d-block d-lg-none">                                

                                <Skeleton className={`${ pageSkeleton ? 'd-block ' : 'd-none '}`} width={150} height={20} />
                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}text-uppercase font-12 opacity-25 color-primary`}>{ `${imovel.finalidade} - ${imovel.tipo}` }</div>
                                
                                <Skeleton className={`${ pageSkeleton ? 'd-block ' : 'd-none '}my-2`} width={210} height={38} />
                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}font-32 color-primary`}><b>{ imovel.valor ? `R$ ${moneyFormatter(imovel.valor)}` : 'SEM VALOR' }</b></div>
                                
                                { pageSkeleton &&  <Skeleton className={`my-2`} width={180} height={38} /> }
                                
                                { (imovel.valor_condominio && !pageSkeleton ) && <div className="font-12 color-secondary">{ `Condomínio: R$ ${moneyFormatter(imovel.valor_condominio)}` }</div> }
                                { (imovel.valor_iptu && !pageSkeleton ) && <div className="font-12 color-secondary">IPTU: {imovel.valor_iptu}</div> }
                                
                                { (imovel.areatotal && imovel.areaconstruida && !pageSkeleton) && (
                                    <div className="font-12 color-secondary opacity-75 pt-2">
                                        Área Total: {imovel.areatotal} m<sup>2</sup> / Construída: {imovel.areaconstruida} m<sup>2</sup>                                        
                                    </div>  
                                )}

                            </div>

                            <div className="d-block d-lg-none">
                                <div className={`${ pageSkeleton ? 'd-block ' : 'd-none '}border-top border-bottom py-3`}>
                                    <Skeleton  width={`100%`} height={37} />
                                </div>

                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-flex '}border-top border-bottom py-3 flex-column flex-md-row`}>
                                    <div className="endereco d-flex align-items-center flex-grow-1 pr-4 font-14 line-height-130">
                                        <img src="/static/img/place.svg" alt="" />
                                        {`${imovel.endereco} - ${imovel.bairro} | ${imovel.cidade}/${imovel.uf}`}
                                    </div>
                                    { (imovel.latitude && imovel.longitude) && <button type="button" onClick={() => handleClickMap()} className="btn btn-secondary shadow-sm text-white font-13 px-4 py-2 m-0 mt-3 mt-md-0"><b>VER NO MAPA</b></button> }
                                </div>
                            </div>

                            <div className="d-block d-lg-none">
                            { imovel.caracteristicas && (
                                <>
                                <div className={`${ pageSkeleton ? 'd-block ' : 'd-none '}pt-4`}> 
                                    <Skeleton  width={`100%`} height={40} />
                                </div>

                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}pt-4 font-14`}> 
                                    <ul>
                                        { imovel.caracteristicas.map((item, index) => <li key={index}>{item}</li> ) }
                                    </ul>
                                </div>
                                </>
                            ) }  
                            </div>      

                            

                            { imovel.maisdescricao && (
                                <>
                                <div className={`${ pageSkeleton ? 'd-block ' : 'd-none '}pt-4`}>
                                    <div>
                                        <Skeleton width={`100%`} height={20} /> 
                                        <Skeleton className="mt-2" width={`100%`} height={63} /> 
                                    </div>
                                </div>

                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}descricao pt-4`}>
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">DESCRIÇÃO DO IMÓVEL</h2></div>
                                    <div className="font-14">{ imovel.maisdescricao }</div>
                                </div>
                                </>
                            )}

                            { imovel.observacoes && (
                                <>
                                <div className={`${ pageSkeleton ? 'd-block ' : 'd-none '}pt-4`}>
                                    <div>
                                        <Skeleton width={`100%`} height={20} /> 
                                        <Skeleton className="mt-2" width={`100%`} height={63} /> 
                                    </div>
                                </div>

                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}descricao pt-4`}>
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">OBSERVAÇÃO</h2></div>
                                    <div className="font-14">{ imovel.observacoes }</div>
                                </div>
                                </>
                            ) }

                            { imovel.infraestrutura && (
                                <>
                                <div className={`${ pageSkeleton ? 'd-block ' : 'd-none '}pt-4`}>
                                    <div>
                                        <Skeleton width={`100%`} height={20} /> 
                                        <Skeleton className="mt-2" width={`100%`} height={63} /> 
                                    </div>
                                </div>

                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}descricao pt-4`}>
                                    <div className="d-flex border-bottom mb-3"><h2 className="font-14 border-bottom py-2 color-active mb-0">TEM NAS PROXIMIDADES</h2></div>
                                    <div className="font-14">
                                        <ul>
                                            { imovel.infraestrutura.map((item, index) => <li key={index}>{item}</li> ) }
                                        </ul>
                                    </div>
                                </div>
                                </>
                            ) }

                        </div>
                        <div className="col-12 col-lg-5">
                            
                            <div className="pb-4 d-none d-lg-block">
                                <div className="redes-sociais d-flex">
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlSite}/imovel?id=${imovel.id}`} className="facebook mx-0" target="_blank" rel="nofollow">Facebook</a>   
                                    <a href={`https://twitter.com/intent/tweet?text=${urlSite}/imovel?id=${imovel.id}`} className="instagram mx-1" target="_blank" rel="nofollow">Instagram</a>
                                    <a href={`https://wa.me/?text=${urlSite}/imovel?id=${imovel.id}`} className="whatsapp mx-0" target="_blank" rel="nofollow">Whatsapp</a>
                                </div>

                                <Skeleton className={`${ pageSkeleton ? 'd-block ' : 'd-none '}`} width={150} height={20} />
                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}text-uppercase font-12 opacity-25 color-primary`}>{ `${imovel.finalidade} - ${imovel.tipo}` }</div>
                                
                                <Skeleton className={`${ pageSkeleton ? 'd-block ' : 'd-none '}my-2`} width={210} height={38} />
                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}font-32 color-primary`}><b>{ imovel.valor ? `R$ ${moneyFormatter(imovel.valor)}` : 'SEM VALOR' }</b></div>
                                
                                { pageSkeleton &&  <Skeleton className={`my-2`} width={180} height={38} /> }
                                
                                { (imovel.valor_condominio && !pageSkeleton ) && <div className="font-12 color-secondary">{ `Condomínio: R$ ${moneyFormatter(imovel.valor_condominio)}` }</div> }
                                { (imovel.valor_iptu && !pageSkeleton ) && <div className="font-12 color-secondary">IPTU: {imovel.valor_iptu}</div> }
                                
                                { (imovel.areatotal && imovel.areaconstruida && !pageSkeleton) && (
                                    <div className="font-12 color-secondary opacity-75 pt-2">
                                        Área Total: {imovel.areatotal} m<sup>2</sup> / Construída: {imovel.areaconstruida} m<sup>2</sup>                                        
                                    </div>  
                                )}

                            </div>
                            
                            <div className="d-none d-lg-block">
                                <div className={`${ pageSkeleton ? 'd-block ' : 'd-none '}border-top border-bottom py-3`}>
                                    <Skeleton  width={`100%`} height={37} />
                                </div>

                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-flex '}border-top border-bottom py-3`}>
                                    <div className="endereco d-flex align-items-center flex-grow-1 pr-4 font-14 line-height-130">
                                        <img src="/static/img/place.svg" alt="" />
                                        {`${imovel.endereco} - ${imovel.bairro} | ${imovel.cidade}/${imovel.uf}`}
                                    </div>
                                    { (imovel.latitude && imovel.longitude) && <button type="button" onClick={() => handleClickMap()} className="btn btn-secondary shadow-sm w-50 text-white font-13 px-0 py-2 m-0"><b>VER NO MAPA</b></button> }
                                </div>
                            </div>
                            
                            <div className="d-none d-lg-block">
                            { imovel.caracteristicas && (
                                <>
                                <div className={`${ pageSkeleton ? 'd-block ' : 'd-none '}pt-4`}> 
                                    <Skeleton  width={`100%`} height={40} />
                                </div>

                                <div className={`${ pageSkeleton ? 'd-none ' : 'd-block '}pt-4 font-14`}> 
                                    <ul>
                                        { imovel.caracteristicas.map((item, index) => <li key={index}>{item}</li> ) }
                                    </ul>
                                </div>
                                </>
                            ) }  
                            </div>                          

                            <div className="border p-4 p-md-5 mt-4">
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