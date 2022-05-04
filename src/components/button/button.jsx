import React from 'react';
import './button.css';

function Button(props) {

    return <>

        <button 
        onClick={ () => props.click(props.label) }
        className={`button 
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}> 
        
            {props.label} 
            
        </button>
   
    </>

  }
  
  export default Button;
  