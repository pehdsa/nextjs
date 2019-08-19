import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styles from '../../styles/global'
import NextProgressBar from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

import { titleSite } from '../../utils/utils';

const Content = (props) => {    

    return (
        <div className="root">
            <NextProgressBar color={styles.btnPrimaryColor} startPosition={0.3} stopDelayMs={100} height={2} />

            <Head>                
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />                
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>                
                <meta property="og:site_name" content={titleSite} />
            </Head>
            
            <Header dadosAnunciante={props.dadosAnunciante} telefones={props.telefones} />            
            
            <main>{props.children}</main>
            
            <Footer dadosAnunciante={props.dadosAnunciante} />

            <ToastContainer />
            
            <style jsx global> 
            {`

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

                @import url('static/css/styles.css'); 

            `}
            </style>

            
        </div>
    )
}



export default Content;