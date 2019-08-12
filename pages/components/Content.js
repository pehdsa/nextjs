import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styles from '../../styles/global'
import NextProgressBar from 'nextjs-progressbar';

const Content = (props) => {    

    return (
        <div className="root">
            <NextProgressBar color={styles.btnPrimaryColor} startPosition={0.3} stopDelayMs={100} height={2} />

            <Head>                
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                <title>Deborah Barros - Corretora de Imóvies</title>
            </Head>
            
            <Header dadosAnunciante={props.dadosAnunciante} telefones={props.telefones} />            
            
            <main>{props.children}</main>
            
            <Footer dadosAnunciante={props.dadosAnunciante} />
            
            <style jsx global> 
            {`

                @import url('https://fonts.googleapis.com/css?family=Roboto:500,700&display=swap');

                :root {
                    
                    --main-background: ${styles.mainBackground};
                    --main-color: ${styles.mainColor};
                    
                    --primary-color: ${styles.primaryColor};
                    --secondary-color: ${styles.secondaryColor};

                    --btn-primary-color: ${styles.btnPrimaryColor};
                    --btn-primary-color-hover: ${styles.btnPrimaryColorHover};
                    --btn-secondary-color: ${styles.btnSecondaryColor};
                    --btn-secondary-color-hover: ${styles.btnSecondaryColorHover};
                    

                    --active-color: ${styles.activeColor};
                    
                    --header-height: ${styles.headerHeight};
                    --header-background: ${styles.headerBackground};
                    
                    --content-primary-header-height: ${styles.contentPrimaryHeaderHeight}; 
                    --content-secondary-header-height: ${styles.contentSecondaryHeaderHeight};
                    
                    --map-height: ${styles.mapHeight};
                    
                    --footer-height: ${styles.footerHeight};
                    --footer-background: ${styles.footerBackground};
                    
                    --shadow: ${styles.shadow};
                    --shadow-hover: ${styles.shadowHover};

                    --shadow-sm: ${styles.shadowSM};

                }

                
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    outline: 0;
                }
                body { 
                    font-family: 'Roboto', sans-serif;
                    font-size: 16px;
                    font-weight: 500;
                    background-color: var(--main-background);
                    color: var(--main-color);
                    -webkit-font-smoothing: antialiased !important;
                    overflow-y: scroll;
                }
                
                .esconde { position: fixed;top: -9999px;left:0;text-ident: -99999px; }

                .navlink { font-weight: bold;color: var(--primary-color);margin: 0 25px; }
                .navlink:last-child { margin-right: 0 !important; }
                .navlink:hover { color: var(--primary-color); }
                .navlink.active { color: var(--active-color) !important; }
                
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 { font-weight: bold; }

                .font-10 { font-size:.5675rem !important; }
                .font-11 { font-size:.6875rem !important; }
                .font-12 { font-size:.7825rem !important; }
                .font-13 { font-size:.8125rem !important; } 
                .font-14 { font-size:.875rem !important; }
                .font-16 { font-size:1rem !important; }
                .font-18 { font-size:1.125rem !important; }
                .font-20 { font-size:1.25rem !important; }
                .font-24 { font-size:1.5rem !important; }
                .font-28 { font-size:1.75rem !important; }
                .font-32 { font-size:2rem !important; }
                .font-40 { font-size:2.5rem !important; }
                
                .line-height-100 { line-height:100% !important; }
                .line-height-110 { line-height:110% !important; }
                .line-height-120 { line-height:120% !important; }
                .line-height-130 { line-height:130% !important; }
                .line-height-140 { line-height:140% !important; }
                .line-height-150 { line-height:150% !important; }
                .line-height-160 { line-height:160% !important; }
                .line-height-170 { line-height:170% !important; }
                .line-height-180 { line-height:180% !important; }
                
                .scale-100 { transform:scale(1.0) }
                .scale-110 { transform:scale(1.1) }
                .scale-120 { transform:scale(1.2) }
                .scale-130 { transform:scale(1.3) }
                .scale-140 { transform:scale(1.4) }
                .scale-150 { transform:scale(1.5) }
                .scale-160 { transform:scale(1.6) }
                .scale-170 { transform:scale(1.7) }
                .scale-180 { transform:scale(1.8) }

                .color-primary { color: var(--primary-color) !important; }
                .color-secondary { color: var(--secondary-color) !important; }
                .color-181 { color: #181818 !important; }
                .color-5f5 { color: #5f5f5f !important; }

                select {
                    -webkit-appearance: none;
	                -moz-appearance: none;
	                appearance: none;
	                cursor:pointer;
	                background-image:url("/static/img/arrow-down.svg");
                    background-repeat:no-repeat;
                    background-position:right .8rem center; 
                    background-size:.7rem;
                    padding: .575rem 0;
                    padding-right: 1.5rem;     
                    border: 0;               
                    border-bottom: 1px solid #DCDCDC;
                    display: block;
                    width: 100%;
                }               
                
                .btn { border-radius: 3px !important; }
                .btn-primary { background-color: var(--btn-primary-color) !important;border-color: var(--btn-primary-color) !important; }
                .btn-primary:hover { background-color: var(--btn-primary-color-hover) !important;border-color: var(--btn-primary-color-hover) !important; }
                .btn-secondary { background-color: var(--btn-secondary-color) !important;border-color: var(--btn-secondary-color) !important; }
                .btn-secondary:hover { background-color: var(--btn-secondary-color-hover) !important;border-color: var(--btn-secondary-color-hover) !important; }

                .shadow { box-shadow: var(--shadow) !important; }
                a.shadow { transition: box-shadow .3s ease; }
                a.shadow:hover { box-shadow: var(--shadow-hover) !important; }

                .shadow-sm { box-shadow: var(--shadow-sm) !important; }

                img { display: block;width: 100%;height: auto; }

                .opacity-50 { opacity: .5 }
                .opacity-25 { opacity: .25 }

                .flex-grow-2 {
                    -ms-flex-positive: 2!important;
                    flex-grow: 2!important;
                }

            `}
            </style>

            <style jsx>
            {`                                
                .root { position: relative;min-height: 100vh; }
                
                main {
                    position: relative;
                    min-height: 100vh;
                    padding-top: var(--header-height);
                    padding-bottom: calc(var(--footer-height) + var(--map-height) + 10px);
                    z-index: 5;
                }

            `}
            </style>
        </div>
    )
}



export default Content;