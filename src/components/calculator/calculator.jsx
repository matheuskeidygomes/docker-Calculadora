import React, {useState} from 'react';
import './calculator.css';

import Button from '../button/button';
import Display from '../display/display';

export default function Calculator() {


    const [ displayValue, setDisplayValue ] = useState('0');
    const [ cleanDisplay, setCleanDisplay ] = useState(false);
    const [ operation, setOperation ] = useState(null);
    const [ values, setValues ] = useState([0, 0]);
    const [ current, setCurrent ] = useState(0);


    function AddDigit(number) {

        // Validar se há '.' no display

        if ( number === '.' && displayValue.includes('.') ) return;

        // Retirar zero a esquerda e checar state cleanDisplay

        const clearScreen = displayValue === '0' || cleanDisplay;

        const currentValue = clearScreen ? '' : displayValue;

        const Value = currentValue + number; 

        const valueArray = [ ...values ];

        if ( number !== '.' ) {

            valueArray[current] = parseFloat(Value);
        }

        setDisplayValue(Value);
        setCleanDisplay(false);
        setValues(valueArray);

    }

    
    function Operation (op) {
    
        if ( values[0] === 0 ) return;

        if ( current === 0 ) {

            setOperation(op);
            setCurrent(1);
            setCleanDisplay(true);
        
        } else {

            const equals = op === '=';
            const newValues = [ ...values ];

            try {

                newValues[0] = eval(` ${newValues[0]} ${operation} ${newValues[1]} `);

            } catch(err) {

                newValues[0] = values[0];
            }
            
            newValues[1] = 0;

            setDisplayValue(newValues[0].toString());
            setOperation( equals ? null : op );
            setCurrent( equals ? 0 : 1);
            setCleanDisplay( !equals );
            setValues(newValues);

        }

    }

    
    function CleanDisplay() {

        // Zerar Display

        setDisplayValue('0');
        setCleanDisplay(false);
        setOperation(null);
        setValues([0, 0]);
        setCurrent(0);
    }


    return <>

        <div className="calculator">

            <Display value={displayValue} />

            <Button label="AC" click={() => CleanDisplay() } triple />

            <Button label="/" click={(op) => Operation(op) } operation />

            <Button label="7" click={(n) => AddDigit(n) }/>

            <Button label="8" click={(n) => AddDigit(n) }/>

            <Button label="9" click={(n) => AddDigit(n) }/>

            <Button label="*" click={(op) => Operation(op) } operation />

            <Button label="4" click={(n) => AddDigit(n) }/>

            <Button label="5" click={(n) => AddDigit(n) }/>

            <Button label="6" click={(n) => AddDigit(n) }/>

            <Button label="-" click={(op) => Operation(op) } operation />

            <Button label="1" click={(n) => AddDigit(n) }/>

            <Button label="2" click={(n) => AddDigit(n) }/>

            <Button label="3" click={(n) => AddDigit(n) }/>

            <Button label="+" click={(op) => Operation(op) } operation />

            <Button label="0" click={(n) => AddDigit(n) } double />

            <Button label="." click={(n) => AddDigit(n) }/>

            <Button label="=" click={(op) => Operation(op) } operation />
        
        </div>
   
    </>

}
  
