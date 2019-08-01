import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styles from '../../styles/global'

export default function Layout(props) {
    return (
        <div className="root">
            <Head>                
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
            </Head>
            <Header />            
            <main className="d-flex justify-content-center align-items-center">{props.children}</main>
            <Footer />
            
            <style jsx global>
            {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body { 
                    font-family: 'Arial', sans-serif;
                    font-size: 14px;
                    background-color: ${styles.mainBackground};
                }
                h1 { color: #c4c4c4;text-shadow: 1px 1px 1px #ebebeb; }

                .navlink { color: ${styles.headerColor};margin: 0 10px; }
                .navlink:hover { color: ${styles.headerColor}; }
                .navlink.active { color: #df6b29; }
            `}
            </style>

            <style jsx>
            {`                                
                .root { height: 100vh; }
                
                main {
                    position: relative;
                    height: 100vh;
                    padding-top: calc(${styles.headerHeight} + 10px);
                    padding-bottom: calc(${styles.footerHeight} + 10px);
                    z-index: 5;
                }

            `}
            </style>
        </div>
    )
}