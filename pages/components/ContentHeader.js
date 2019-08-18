import React from 'react';

export default props => {   
    

    return (
        
        <header className="content-header">        
            <div className="d-flex align-items-center container py-4">
                <h1 className="w-100 font-24 font-md-28 text-white text-center text-md-left m-0">{props.title}</h1> 
            </div>                
        </header>
        
    );
    
}
