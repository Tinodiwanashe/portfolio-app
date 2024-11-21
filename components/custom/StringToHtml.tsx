import { extractHTML } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

type Props = {
    content: string | undefined;
}

const StringToHtml = ({ content = "" }: Props) => {
    const containerRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const svgElement = extractHTML(content, "svg");
        if (svgElement && containerRef.current) {
            containerRef.current.innerHTML = '';
            const svg = containerRef.current.appendChild(svgElement);
            svg?.setAttribute('style', 'width: 30px; height: 30px;'); // Adjust the width and height as needed
        }
    }, [content]);
        
    return (
        <div ref={containerRef} />
    );
};

export default StringToHtml;
