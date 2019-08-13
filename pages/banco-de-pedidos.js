import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import InputRange from 'react-input-range';

import { getApiData, moneyFormatter, apiId, existsOrError } from '../utils/utils';

const BancoPedidos = (props) => { 

    const options = [        
        { value: 'comprar', label: 'Comprar' },
        { value: 'alugar', label: 'Alugar' }
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

    const [value, setValue] = useState({min: 2, max: 10});       

    const [ formulario, setFormulario ] = useState({});    

    function handleValor(valor) {
        setValue(valor);
        setFormulario({ ...formulario, ...valor });
    }

    function handleForm(valores) {
        setFormulario({ ...formulario, ...valores });
    }

    const [ validate, setValidate ] = useState({
        validateName: true,
        validateEmail: true,
        validateTel: true,
        validateCity: true
    });
    
    async function handleSubmit(email) {
        
        if (!formulario.nomecompleto || !formulario.email || formulario.cidade || formulario.telefone) {
            
            const camposinvalidos = {
                validateName: existsOrError(formulario.nomecompleto) ? true : false,
                validateEmail: existsOrError(formulario.email) ? true : false,
                validateCity: existsOrError(formulario.cidade) ? true : false, 
                validateTel: existsOrError(formulario.telefone) ? true : false, 
            }

            setValidate({...validate, ...camposinvalidos});
            
        } else {
            setValidate({ validateName: true, validateEmail: true, validateTel: true, validateCity: true });            

            console.log('oi');

            const response = await getApiData('proposta','','','','',formulario);

            console.log(response);
        }

    }
    

    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>   
                    <meta name="metas-contato" />                             
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
                                                <input type="text" className={ !validate.validateName ? 'is-invalid' : '' } placeholder="NOME COMPLETO" onKeyUp={(e) => handleForm({ nomecompleto: e.target.value })} />
                                            </div>
                                            <div className="col-12 px-0 pb-2 mb-1">
                                                <input type="email" className={ !validate.validateEmail ? 'is-invalid' : '' } placeholder="E-MAIL" onKeyUp={(e) => handleForm({email: e.target.value})} />
                                            </div>
                                            <div className="col-10 px-0 pb-2 mb-1">
                                                <input type="text" className={ !validate.validateCity ? 'is-invalid' : '' } placeholder="CIDADE" onKeyUp={(e) => handleForm({cidade: e.target.value})} />
                                            </div>
                                            <div className="col-2 px-0 pb-2 mb-1">                                            
                                                <input type="text" placeholder="UF" maxLength="2" className="text-uppercase" onKeyUp={(e) => handleForm({uf: e.target.value})} />
                                            </div>
                                            <div className="col-12 px-0 pb-2 mb-1">
                                                <NumberFormat className={ !validate.validateTel ? 'is-invalid' : '' } placeholder="TELEFONE" format="(##) #####-####" mask="_" onKeyUp={(e) => handleForm({telefone: e.target.value})} />                                            
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-6 pl-4 pr-0">
                                        <h2 className="font-24 color-primary pb-4">Dados do Imóvel</h2>
                                        
                                        <div className="row mx-0">
                                            
                                            <div className="col-12 pb-2 mb-1 px-0">
                                                <input type="text" placeholder="BAIRRO" onKeyUp={(e) => handleForm({bairroPedido: e.target.value})} />
                                            </div>

                                            <div className="col-2 pb-2 mb-1 px-0">
                                                <input type="text" placeholder="UF" onKeyUp={(e) => handleForm({ufPedido: e.target.value})} />
                                            </div>

                                            <div className="col-10 pb-2 mb-1 px-0">
                                                <input type="text" placeholder="CIDADE" onKeyUp={(e) => handleForm({cidadePedido: e.target.value})} />
                                            </div>

                                            <div className="col-6 pb-2 mb-1 px-0">
                                                <Select className="select" onChange={(e) => handleForm({ finalidade: e.value})} placeholder="FINALIDADE" options={options} />
                                            </div>

                                            <div className="col-6 pb-2 mb-1 px-0">
                                                <Select className="select" onChange={(e) => handleForm({ tipo: e.value})} placeholder="TIPO DO IMÓVEL" options={tipo} />
                                            </div>

                                            <div className="col-12 pb-2 mb-1 px-0">                                                
                                            <label className="d-block font-12 color-5f5 pb-2"><b>VALOR ENTRE R$ {moneyFormatter(value.min)} A R$ {moneyFormatter(value.max)}</b></label>
                                                <InputRange maxValue={20} minValue={0} value={value} onChange={value => handleValor(value)} />                                    
                                            </div> 

                                        </div>

                                    </div>
                                    <div className="col-12 px-0">
                                        <textarea placeholder="OBSERVAÇÕES" onKeyUp={(e) => handleForm({obs: e.target.value})}></textarea>
                                    </div>

                                    <div className="col-12 pt-4 px-0 d-flex justify-content-end">
                                        <button type="button" onClick={() => handleSubmit(apiId)} className="btn btn-primary font-14 py-2 px-5">ENVIAR</button>  
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