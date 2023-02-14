import React, { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Receipt from './Components/Receipt';

export const Example = forwardRef(() => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <Receipt ref={componentRef} />
            <button onClick={handlePrint}>Print this out!</button>
        </div>
    );
})

