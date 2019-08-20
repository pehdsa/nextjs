import React from 'react'; 
import Link from './NavLink';

export default function Header(props) {    
    
    return (
        <header className="d-flex align-items-center header">
            <div className="container d-flex flex-column flex-md-row align-items-center pt-1 pb-4 pt-md-0 pb-md-0">
            
                <div className="logo">
                    <Link href="/"><a><img src="/static/img/logo.png" alt="Deborah Barros - Corretora de Imóvies" /></a></Link>
                </div>

                <div className="d-flex justify-content-end flex-grow-1">
                    <div>
                        
                        <nav className="pt-0 pb-3 pt-md-2 pb-md-2 pt-xl-0 pb-xl-0 text-center text-md-right">
                            <Link href="/"><a>HOME</a></Link>                            
                            <Link href="/aluguel"><a>ALUGUEL</a></Link>
                            <Link href="/venda"><a>VENDA</a></Link>
                            <Link href="/banco-de-pedidos"><a>BANCO DE PEDIDOS</a></Link>
                            <Link href="/fale-conosco"><a>FALE CONSOCO</a></Link>
                        </nav>

                        <div className="header-dados d-flex flex-column flex-md-row justify-content-end pt-0 pt-xl-3 font-12 font-xl-14">
                            
                            <div className="px-0 px-md-3 px-xl-4 py-1 py-xl-0 text-center text-md-right">
                                <div>
                                    { props.telefones.map((tel, index) => (
                                        <span key={index} className={tel.app != 0 ? 'whats' : ''}>{ props.telefones.length != (index+1) ? `(${tel.ddd}) ${tel.numero} / ` : `(${tel.ddd}) ${tel.numero}`}</span>
                                    )) }
                                </div>
                                <div>
                                    {`CRECI: ${props.dadosAnunciante.creci}`}
                                </div>
                            </div>
                            
                            <div className="px-0 px-md-3 px-xl-4 py-1 py-xl-0 text-center text-md-right">
                                {`${props.dadosAnunciante.endereco}`}<br />
                                {`${props.dadosAnunciante.bairro} - ${props.dadosAnunciante.cidade}/${props.dadosAnunciante.uf}`}
                            </div>

                        </div>

                    </div>
                </div>
            </div>            
            
        </header>
    )
}