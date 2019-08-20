import React, { useState } from 'react';
import Head from 'next/head'
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';
import NumberFormat from 'react-number-format';

import { getApiData, existsOrError, IsEmail, isMobile, notify, titleSite } from '../utils/utils';

const FaleConosco = (props) => {

    const [ loading, setLoading ] = useState(false);

    const [ formulario, setFormulario ] = useState({ nomecompleto: '',email: '',cidade: '',uf: '',telefone: '', mensagem: '' });

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

            const response = await getApiData('faleconosco','','','','',formulario);

            if (response.status == 'sucesso' ) {
                notify('sucesso', 'Mensagem enviada com sucesso');
                setFormulario({ nomecompleto: '',email: '',cidade: '',uf: '',telefone: '', mensagem: '' });
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
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.dadosAnunciante.telefones}>
                <Head>   
                    <meta name="metas-contato" />
                    <title>Fale Conosco | { titleSite }</title>
                </Head>
                
                <ContentHeade title="Fale Conosco" tipoImoveis={props.infosBusca.tipoImoveis} uf={props.infosBusca.uf} />

                <div className="container py-5 font-14">
                    
                    <p>Caso necessite, entre em contato conosco preenchendo o formulário abaixo.</p>                

                    <div className="row py-4">

                        <div className="d-none d-xl-block col-4">
                            <img src="/static/img/foto-destaque-banco-de-pedidos.jpg" alt="" />
                        </div>
                        <div className="col-12 col-xl-8">
                            <form>
                                <div className="row mx-0">
                                    <div className="col-12 col-md-6 pl-0 pr-0 pr-md-4">                                        
                                        <h2 className="font-24 color-primary pb-4">Seus Dados</h2>                                        
                                        <div className="row mx-0">

                                            <div className="col-12 pb-2 mb-1 px-0">
                                                <input type="text" className={ !validate.validateName ? 'is-invalid' : '' } placeholder="NOME COMPLETO" value={formulario.nomecompleto} onChange={(e) => handleForm({ nomecompleto: e.target.value })} />
                                            </div>
                                            <div className="col-12 px-0 pb-2 mb-1">
                                                <input type="email" className={ !validate.validateEmail ? 'is-invalid' : '' } placeholder="E-MAIL" value={formulario.email} onChange={(e) => handleForm({email: e.target.value})} />
                                            </div>
                                            <div className="col-12 col-md-10 px-0 pb-2 mb-1">
                                                <input type="text" className={ !validate.validateCity ? 'is-invalid' : '' } placeholder="CIDADE" value={formulario.cidade} onChange={(e) => handleForm({cidade: e.target.value})} />
                                            </div>
                                            <div className="col-12 col-md-2 px-0 pb-2 mb-1">                                            
                                                <input type="text" placeholder="UF" maxLength="2" className={ !validate.validateUf ? 'is-invalid text-uppercase' : 'text-uppercase'} value={formulario.uf} onChange={(e) => handleForm({uf: e.target.value})} /> 
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
                                                    ENVIAR
                                                </button>  
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </Content>        
        </div>
    );
}

FaleConosco.getInitialProps = async () => {       
    const dadosAnunciante = await getApiData('dadosanunciante');
    const infosBusca = {
        tipoImoveis: await getApiData('tipoimoveis')
        ,uf: await getApiData('estados')
    }
    return {dadosAnunciante, infosBusca};     
}

export default FaleConosco; 