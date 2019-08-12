import Link from 'next/link'
import styles from '../../styles/global'
import Map from './Map';

export default function Footer(props) {
    return (
        <footer>

            
                <Map latitude={props.dadosAnunciante.latitude} longitude={props.dadosAnunciante.longitude} />                
                
                <div className="container footer-container d-flex flex-column">                    
                    
                    <div className="topo d-flex flex-grow-1 align-items-center pt-4">
                        <div className="d-flex w-100">
                            <div className="logo-rodape pr-5">
                                <Link href="/"><a><img src="/static/img/logo.png" alt="Deborah Barros - Corretora de Imóvies" /></a></Link>
                            </div>
                            <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                <div>
                                    <nav className="text-right">
                                        <Link href="/"><a>Home</a></Link>                                        
                                        <Link href="/imoveis"><a>Imóveis</a></Link>
                                        <Link href="/banco-de-pedidos"><a>Banco de Pedidos</a></Link>
                                        <Link href="/fale-conosco"><a>Fale Conosco</a></Link>
                                    </nav>
                                </div>
                                <div className="redes-sociais font-14">
                                    <span className="mr-2">SIGA-NOS NAS REDES SOCIAIS:</span>
                                    <a href="https://www.instagram.com/infoimoveis/" className="instagram mx-0" target="_blank" rel="nofollow">Instagram</a>
                                    <a href="https://www.facebook.com/infoimoveis/" className="facebook mx-0" target="_blank" rel="nofollow">Facebook</a>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rodape font-14 d-flex justify-content-center align-items-center">
                        <b>© 2005-2019 INFOIMÓVEIS - Sua Referência em Imóveis - Todos os direitos reservados</b>
                    </div>

                </div>
            

            <style jsx>
            {`                
                footer { 
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: calc(var(--footer-height) + var(--map-height));
                    z-index: 10;
                }

                .logo-rodape img { width: 160px; }

                .footer-container { height: var(--footer-height); }
                .footer-container a { color: var(--secondary-color);margin: 0 7px; }
                .footer-container .rodape { height: 65px;border-top: 1px solid var(--main-color); }

                .redes-sociais a { display: inline-block;width: 20px;height: 20px;text-indent: -9999px;background-size: cover !important; }
                .redes-sociais a:hover { opacity: 0.8; }
                .redes-sociais a.instagram { background: url(/static/img/instagram.svg) no-repeat center center; }
                .redes-sociais a.facebook { background: url(/static/img/facebook.svg) no-repeat center center; }

            `}
            </style>
        </footer>
    )
}