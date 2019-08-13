import React, { useState } from 'react';
import InputRange from 'react-input-range';
import Select from 'react-select';

import { moneyFormatter } from '../../utils/utils';

export default props => {
    
    const [value, setValue] = useState({min: 2, max: 10});   

    const finalidade = [        
        { value: 'comprar', label: 'Comprar' },
        { value: 'alugar', label: 'Alugar' }
    ];
    const tipoImovel = [        
        { value: 'opcao1', label: 'Opção 1' },
        { value: 'opcao2', label: 'Opção 2' }
    ];
    const uf = [        
        { value: 'opcao1', label: 'Opção 1' },
        { value: 'opcao2', label: 'Opção 2' }
    ];
    const cidade = [        
        { value: 'opcao1', label: 'Opção 1' },
        { value: 'opcao2', label: 'Opção 2' }
    ];
    const bairro = [        
        { value: 'opcao1', label: 'Opção 1' },
        { value: 'opcao2', label: 'Opção 2' }
    ];

    return (
        
        <header className={`${props.primary ? 'primary': ''} content-header`}>
        
            <div className={`${!props.primary ? 'd-flex align-items-center ' : ''}container py-4`}>
                
                { !props.primary && props.title ? 
                    <h1 className="font-28 text-white m-0">{props.title}</h1> 
                    : 
                    <div className="content-search bg-white shadow">
                        <form className="d-flex flex-column h-100">
                            
                            <h2 className="font-24 m-0 pb-3 color-primary">Encontre no Site</h2>
                        
                            <div className="flex-grow-1">
                                <div className="row">
                                    
                                    <div className="col-12 pb-2 mb-1">
                                        <Select className="select" name="" placeholder="FINALIDADE" options={finalidade} />
                                    </div>

                                    <div className="col-12 pb-2 mb-1">
                                        <Select className="select" name="" placeholder="TIPO DO IMÓVEL" options={tipoImovel} />
                                    </div>

                                    <div className="col-4 pb-2 mb-1 pr-md-0">
                                        <Select className="select" name="" placeholder="UF" options={uf} />
                                    </div>

                                    <div className="col-8 pb-2 mb-1 pl-md-0">
                                        <Select className="select" name="" placeholder="CIDADE" options={cidade} />
                                    </div>

                                    <div className="col-12 pb-2 mb-1">
                                        <Select className="select" name="" placeholder="BAIRRO" options={bairro} />                                        
                                    </div>

                                    <div className="col-12 pb-2 mb-1">
                                        <label className="d-block font-12 color-5f5 pb-2"><b>VALOR ENTRE R$ {moneyFormatter(value.min)} A R$ {moneyFormatter(value.max)}</b></label>
                                        <InputRange
                                            maxValue={20}
                                            minValue={0}
                                            value={value}
                                            onChange={value => setValue(value)} />                                    
                                    </div>                               

                                </div>
                            </div>
                            
                            <button className="btn btn-primary font-14 w-100 py-3">BUSCAR AGORA</button>                            

                        </form>
                    </div>
                }

                

            </div>
            
            <style jsx>
                {`                
                    .content-header {   
                        position: relative;                                             
                        background: url("/static/img/img-destaque-internas.jpg") no-repeat center center;
                        background-size: cover !important;
                        background-color: #ddd;
                    }
                    .content-header::before { 
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        content: '';
                        background: rgba(0,0,0,.5);
                        z-index: 1; 
                    }
                    
                    .content-header.primary {
                        background: url("/static/img/img-destaque-home.jpg") no-repeat center center;
                    }
                    .content-header.primary::before { display: none; }
                    
                    .content-header > .container { 
                        position: relative;
                        height: ${ props.primary ? 'var(--content-primary-header-height)' : 'var(--content-secondary-header-height)' }; 
                    }                    
                    .content-header > .container h1 { position: relative;z-index: 2; }                     

                    .content-search {
                        position: absolute;
                        bottom:0;
                        right: 0;
                        width: 350px;
                        height: 460px;                        
                        transform: translate(0,110px);
                        padding: 30px 35px;
                    }                     
                    

                `}
            </style>
                
        </header>
        
        
        
        
        
    );
    
}
