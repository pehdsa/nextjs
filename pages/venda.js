import Head from 'next/head'
import React from 'react';
import Content from './components/Content';
import ContentHeade from './components/ContentHeader';

import { getApiData } from '../utils/utils';

const Venda = (props) => {
    return (
        <div>
            <Content dadosAnunciante={props.dadosAnunciante} telefones={props.telefones}>
                <Head>   
                    <meta name="metas-contato" />                             
                </Head>
                
                <ContentHeade title="Venda" />

            </Content>        
        </div>
    );
}

Venda.getInitialProps = async () => {   
    
    const dadosAnunciante = await getApiData('dadosanunciante');
    const telefones = await getApiData('telefonesanunciante');
    
    return {dadosAnunciante, telefones}; 
    
}

export default Venda; 