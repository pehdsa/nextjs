import React from 'react';

export default function Map(props) {   

    function handleClick() {
        window.open(`http://www.google.com/maps?q=${props.latitude},${props.longitude}`,'_blank')
    }

    return (
        <div>
            <div className="mapa d-flex justify-content-center align-items-center">                
                
                <button type="button" onClick={() => handleClick()} className="btn btn-secondary shadow-sm text-white font-14 px-5 py-2 m-0"><b>VER NO MAPA</b></button>

                <style jsx>
                {`
                    .mapa {
                        width: 100%;
                        height: var(--map-height);
                        background: url(/static/img/fundo-mapa.jpg) no-repeat center center;
                        background-size: cover !important;
                    }
                    .mapa > div { width: 100%;height: 100%; } 
                `}
                </style>

            </div>
        </div>
    );

}
