import React from 'react';

export default props => {       
    
    return (        
        
        <div className={`skeleton-root ${ props.className && props.className }`} style={{ width: props.width, height: props.height }}>        
            
            
            <style jsx>
                {`              
                    .skeleton-root { 
                        position: relative;
                        height: 1.2em;
                        background-color: #ebebeb;
                        overflow: hidden;
                    }
                    .skeleton-root::before {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 50%;
                        height: 100%;
                        content: '';
                        background-image:
                            linear-gradient(
                                90deg, 
                                rgba(255,255,255, 0) 0, 
                                rgba(255,255,255, .2) 25%, 
                                rgba(255,255,255, .3) 50%, 
                                rgba(255,255,255, .2) 75%, 
                                rgba(255,255,255, .0) 100%
                            ); 
                        animation: skeleton-animation 1.5s ease-out infinite;
                        
                    }                    

                    .skeleton-absolute { position: absolute !important;top: 0;left: 0;width: 100% !important;height: 100% !important; }

                    @keyframes skeleton-animation {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(250%); }
                    }
                      
                      

                `}
            </style>
                
        </div>
        
        
        
        
        
    );
    
}
