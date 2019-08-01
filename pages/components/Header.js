import Link from './NavLink';
import styles from '../../styles/global'

export default function Header() {
    return (
        <header className="d-flex justify-content-center align-items-center">
            <nav>
                <Link href="/"><a className="mx-2">HOME</a></Link>
                <Link href="/contato"><a className="mx-2">CONTATO</a></Link>
            </nav>
            <style jsx>
            {`                
                header {                     
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: ${styles.headerHeight};
                    background-color: ${styles.headerBackground};
                    z-index: 10;
                }
                s
            `}
            </style>
        </header>
    )
}