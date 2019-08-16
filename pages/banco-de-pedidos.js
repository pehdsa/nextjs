import React, { useState } from 'react';
import Head from 'next/head'
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';
import NumberFormat from 'react-number-format';
import Select from 'react-select';


import { getApiData, existsOrError, IsEmail, isMobile, notify, titleSite } from '../utils/utils';

const BancoPedidos = (props) => { 

    const options = [        
        { value: 'comprar', label: 'Venda' },
        { value: 'alugar', label: 'Aluguel' }
    ];    
    const tipo = [
        { value: 'Apartamento', label: 'Apartamento' },
        { value: 'Casa-Térrea', label: 'Casa-Térrea' },
        { value: 'Sobrado', label: 'Sobrado' },
        { value: 'Terreno', label: 'Terreno' },
        { value: 'Comercial', label: 'Comercial' },
        { value: 'Chácara', label: 'Chácara' },
        { value: 'Fazenda', label: 'Fazenda' },
    ];

    const [ loading, setLoading ] = useState(false);

    const [ formulario, setFormulario ] = useState({ nomecompleto: '',email: '',cidade: '',uf: '',telefone: '',bairroPedido: '',ufPedido: '',cidadePedido: '',finalidade: '',tipo: '',min: '',max: '',obs: '' });
    
    function handleForm(valores) {
        setFormulario({ ...formulario, ...valores });
    }

    const [ validate, setValidate ] = useState({ validateName: true,validateEmail: true,validateTel: true,validateCity: true,validateUf: true });

    async function handleSubmit() {        

        if (!existsOrError(formulario.nomecompleto) || !existsOrError(formulario.email) || !existsOrError(formulario.cidade) || !existsOrError(formulario.uf) || !existsOrError(formulario.telefone)) {
            
            const camposinvalidos = {
                validateName: existsOrError(formulario.nomecompleto) ? true : false,
                validateEmail: existsOrError(formulario.email) ? true : false,
                validateCity: existsOrError(formulario.cidade) ? true : false, 
                validateUf: existsOrError(formulario.uf) ? true : false,  
                validateTel: existsOrError(formulario.telefone) ? true : false, 
            }

            setValidate({...validate, ...camposinvalidos});   
            
            notify('erro', 'Digite os campos obrigatórios'); 
            
        } else if (!IsEmail(formulario.email)) {
            
            setValidate({ validateName: true, validateEmail: false, validateTel: true, validateCity: true, validateUf: true });

            notify('erro', 'Digite um e-mail válido');
            
        } else if (!isMobile(formulario.telefone)) {

            setValidate({ validateName: true, validateEmail: true, validateTel: false, validateCity: true, validateUf: true });

            notify('erro', 'Digite um celular válido');

        } else {            

            setLoading(true); 

            setValidate({ validateName: true, validateEmail: true, validateTel: true, validateCity: true, validateUf: true });

            const response = await getApiData('bancodepedidos','','','','',formulario);

            if (response.status == 'sucesso' ) {
                notify('sucesso', 'Pedido enviado com sucesso');
            } else {
                notify('erro', 'Ocorreu um erro inesperado, tente novamente mais tarde');
            }

            setFormulario({ nomecompleto: '',email: '',cidade: '',uf: '',telefone: '',bairroPedido: '',ufPedido: '',cidadePedido: '',finalidade: '',tipo: '',min: '',max: '' })
            setLoading(false);

        }

    }
    
    

    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>   
                    <meta name="metas-contato" /> 
                    <title>Banco de Pedidos | { titleSite }</title>
                </Head>
                
                <ContentHeade title="Banco de Pedidos" />

                <div className="container py-5 font-14">
                    <p>Preencha o formulário abaixo e solicite o imóvel que tanto deseja, descreva as principais características, que iremos procurar para você!</p>
                    <p>Utilizando o Banco de Pedidos, iremos procurar junto aos nossos parceiros o imóvel que está procurando, com isto você aumentará as chances de encontrar o imóvel que tanto deseja.</p>
                    <p>Não perca a oportunidade de utilizar esta ferramenta e se aproximar do imóvel do seus sonhos.</p>


                    <div className="row py-4">

                        <div className="col-4">
                            <img src="/static/img/foto-destaque-banco-de-pedidos.jpg" alt="" />
                        </div>
                        <div className="col-8">
                            <form>
                                <div className="row mx-0">
                                    <div className="col-6 pl-0 pr-4">
                                        
                                        <h2 className="font-24 color-primary pb-4">Seus Dados</h2>
                                        
                                        <div className="row mx-0">
                                            <div className="col-12 pb-2 mb-1 px-0">
                                                <input type="text" className={ !validate.validateName ? 'is-invalid' : '' } placeholder="NOME COMPLETO" value={formulario.nomecompleto} onChange={(e) => handleForm({ nomecompleto: e.target.value })} />
                                            </div>
                                            <div className="col-12 px-0 pb-2 mb-1">
                                                <input type="email" className={ !validate.validateEmail ? 'is-invalid' : '' } placeholder="E-MAIL" value={formulario.email} onChange={(e) => handleForm({email: e.target.value})} />
                                            </div>
                                            <div className="col-10 px-0 pb-2 mb-1">
                                                <input type="text" className={ !validate.validateCity ? 'is-invalid' : '' } placeholder="CIDADE" value={formulario.cidade} onChange={(e) => handleForm({cidade: e.target.value})} />
                                            </div>
                                            <div className="col-2 px-0 pb-2 mb-1">                                            
                                                <input type="text" placeholder="UF" maxLength="2" className={ !validate.validateUf ? 'is-invalid text-uppercase' : 'text-uppercase'} value={formulario.uf} onChange={(e) => handleForm({uf: e.target.value})} /> 
                                            </div>
                                            <div className="col-12 px-0 pb-2 mb-1">
                                                <NumberFormat className={ !validate.validateTel ? 'is-invalid' : '' } placeholder="CELULAR" format="(##) #####-####" mask="_" value={formulario.telefone} onChange={(e) => handleForm({telefone: e.target.value})} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-6 pl-4 pr-0">
                                        <h2 className="font-24 color-primary pb-4">Dados do Imóvel</h2>
                                        
                                        <div className="row mx-0">
                                            
                                            <div className="col-12 pb-2 mb-1 px-0">
                                                <input type="text" placeholder="BAIRRO" value={formulario.bairroPedido} onChange={(e) => handleForm({bairroPedido: e.target.value})} />
                                            </div>

                                            <div className="col-2 pb-2 mb-1 px-0">
                                                <input type="text" placeholder="UF" className="text-uppercase" maxLength="2" value={formulario.ufPedido} onChange={(e) => handleForm({ufPedido: e.target.value})} />
                                            </div>

                                            <div className="col-10 pb-2 mb-1 px-0">
                                                <input type="text" placeholder="CIDADE" value={formulario.cidadePedido} onChange={(e) => handleForm({cidadePedido: e.target.value})} />
                                            </div>

                                            <div className="col-6 pb-2 mb-1 px-0">
                                                <Select className="select" defaultValue={formulario.finalidade} onChange={(e) => handleForm({ finalidade: e.value})} placeholder="FINALIDADE" options={options} />
                                            </div>

                                            <div className="col-6 pb-2 mb-1 px-0">
                                                <Select className="select" defaultValue={formulario.tipo} onChange={(e) => handleForm({ tipo: e.value})} placeholder="TIPO DO IMÓVEL" options={tipo} />
                                            </div>
                                            
                                            <div className="col-6 pb-2 mb-1 px-0">
                                                <NumberFormat placeholder="VALOR MÍNIMO" thousandSeparator={true} prefix={'R$ '} value={formulario.min} onChange={(e) => handleForm({ min: e.target.value })} />
                                            </div>

                                            <div className="col-6 pb-2 mb-1 px-0">
                                                <NumberFormat placeholder="VALOR MÁXIMO" thousandSeparator={true} prefix={'R$ '} value={formulario.max} onChange={(e) => handleForm({ max: e.target.value })} />
                                            </div>
                                            

                                        </div>

                                    </div>
                                    <div className="col-12 px-0">
                                        <textarea placeholder="OBSERVAÇÕES" value={formulario.obs} onChange={(e) => handleForm({obs: e.target.value})}></textarea>
                                    </div>

                                    <div className="col-12 pt-4 px-0 d-flex justify-content-end">
                                        <button type="button" onClick={() => handleSubmit()} className="btn btn-primary font-14 py-2 px-5 shadow-sm" disabled={ loading ? true : false }>
                                            { loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> }
                                            ENVIAR
                                        </button>  
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>

                    

                </div>

                <style jsx>
                {`              
                    

                `}
                </style>

            </Content>        
        </div>
    );
}

BancoPedidos.getInitialProps = async () => {   
    
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    
    return {dadosAnunciante, telefones}; 
    
}

export default BancoPedidos; 