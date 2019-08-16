import Link from './NavLink';

export default function Header(props) {    

    return (
        <header className="header">
            <div className="container d-flex align-items-center">
            
                <div className="logo">
                    <Link href="/"><a><img src="/static/img/logo.png" alt="Deborah Barros - Corretora de Imóvies" /></a></Link>
                </div>
                <div className="d-flex justify-content-end flex-grow-1">
                    <div>
                        
                        <nav className="text-right">
                            <Link href="/"><a>HOME</a></Link>                            
                            <Link href="/aluguel"><a>ALUGUEL</a></Link>
                            <Link href="/venda"><a>VENDA</a></Link>
                            <Link href="/banco-de-pedidos"><a>BANCO DE PEDIDOS</a></Link>
                            <Link href="/fale-conosco"><a>FALE CONSOCO</a></Link>
                        </nav>

                        <div className="header-dados d-flex justify-content-end pt-4 font-14">
                            <div className="px-4 text-right">
                                <div>{ props.telefones.map((tel, index) => (
                                    <span key={index} className={tel.app != 0 && 'whats'}>{ props.telefones.length != (index+1) ? `(${tel.ddd}) ${tel.numero} / ` : `(${tel.ddd}) ${tel.numero}`}</span>
                                )) }</div>
                                <div>
                                    {`CRECI: ${props.dadosAnunciante.creci}`}
                                </div>
                            </div>
                            <div className="px-4 text-right">
                                {`${props.dadosAnunciante.endereco}`}<br />
                                {`${props.dadosAnunciante.bairro} - ${props.dadosAnunciante.cidade}/${props.dadosAnunciante.uf}`}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <style jsx>
            {`                
                .header {                     
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: var(--header-height);
                    background-color: var(--header-background);
                    z-index: 10;
                }
                .header > div {
                    height: 100%;
                }
                .logo img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                }
                .header-dados > div {
                    border-right: 1px solid #DCDCDC;
                }
                .header-dados > div:last-child {
                    border: 0;
                    padding-right: 0 !important;
                }
            `}
            </style>
        </header>
    )
}