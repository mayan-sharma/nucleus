import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import './resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
            }, 100);
        }

        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }

    }, [])

    const resizableBoxProps: ResizableBoxProps = 
        direction === 'vertical' ? {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            minConstraints: [Infinity, innerHeight * 0.2],
            maxConstraints: [Infinity, innerHeight * 0.9]
        } : {
            className: 'resize-horizontal',
            height: Infinity,
            width: window.innerWidth*0.6,
            resizeHandles: ['e'],
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.8, Infinity]
        }

    return (
        <ResizableBox {...resizableBoxProps}>
            {children}
        </ResizableBox>
    );
}

export default Resizable;