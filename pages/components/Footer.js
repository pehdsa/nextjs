import Link from 'next/link'
import styles from '../../styles/global'

export default function Footer() {
    return (
        <footer className="d-flex justify-content-center align-items-center">
            Powered by <b className="mx-1">Pedro Henrique</b>
            <style jsx>
            {`                
                footer { 
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: ${styles.footerHeight};
                    font-size: 12px;
                    z-index: 10;
                }
            `}
            </style>
        </footer>
    )
}