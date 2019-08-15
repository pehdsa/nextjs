import React from 'react';

export default props => {   
    

    return (
        
        <header className="content-header">
        
            <div className="d-flex align-items-center container py-4">

                <h1 className="font-28 text-white m-0">{props.title}</h1> 

            </div>
            
            <style jsx>
                {`                
                    .content-header {   
                        position: relative;                                             
                        background: url("/static/img/img-destaque-internas.jpg") no-repeat center center;
                        background-size: cover !important;
                        background-color: #ddd;
                    }
                    .content-header::before { 
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        content: '';
                        background: rgba(0,0,0,.5);
                        z-index: 1; 
                    }
                    .content-header.primary::before { display: none; }
                    
                    .content-header > .container { 
                        position: relative;
                        height: var(--content-secondary-header-height); 
                    }                    
                    .content-header > .container h1 { position: relative;z-index: 2; }                    

                `}
            </style>
                
        </header>
        
        
        
        
        
    );
    
}
