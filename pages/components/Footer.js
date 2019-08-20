import Link from 'next/link'
import Map from './Map';

export default function Footer(props) {

    return (
        <footer>            
                
                <Map latitude={props.dadosAnunciante.latitude} longitude={props.dadosAnunciante.longitude} />                
                
                <div className="container footer-container d-flex flex-column">                    
                    
                    <div className="topo d-flex flex-grow-1 align-items-center pt-0 pt-xl-4">
                        
                        <div className="d-flex flex-column flex-xl-row align-items-center w-100">
                            
                            <div className="logo-rodape pr-0 pr-xl-5">
                                <Link href="/"><a><img src="/static/img/logo.png" alt="Deborah Barros - Corretora de Imóvies" /></a></Link>
                            </div>
                            
                            <div className="d-flex align-items-center justify-content-between flex-grow-1">
                                <div className="d-none d-xl-block">
                                    <nav className="text-right">
                                        <Link href="/"><a>Home</a></Link>                                        
                                        <Link href="/aluguel"><a>Aluguel</a></Link>
                                        <Link href="/venda"><a>Venda</a></Link>
                                        <Link href="/banco-de-pedidos"><a>Banco de Pedidos</a></Link>
                                        <Link href="/fale-conosco"><a>Fale Conosco</a></Link>
                                    </nav>
                                </div>
                                <div className="redes-sociais font-13 font-md-14 pt-3 pt-xl-0">
                                    <span className="mr-2">SIGA-NOS NAS REDES SOCIAIS:</span>
                                    <a href="https://www.instagram.com/infoimoveis/" className="instagram mx-0" target="_blank" rel="nofollow">Instagram</a>
                                    <a href="https://www.facebook.com/infoimoveis/" className="facebook mx-0" target="_blank" rel="nofollow">Facebook</a>                                    
                                </div>
                            </div>

                        </div>

                    </div>
                    
                    <div className="rodape font-11 font-xl-14 d-flex justify-content-center align-items-center text-center">
                        <b>© 2005-2019 INFOIMÓVEIS - Sua Referência em Imóveis - Todos os direitos reservados</b>
                    </div>

                </div>
            
            
        </footer>
    )
}