import React from 'react';

interface HighlightedTextProps {
    text: string;
    className?: string;
}

/**
 * Parse the text with support for:
 * 1. Manual line breaks using both \n and ^
 * 2. Highlighting text between asterisks *like this*
 */
const HighlightedText: React.FC<HighlightedTextProps> = ({ text, className }) => {
    const contentText = String(text || '');
    if (!contentText) return null;

    const processedText = contentText.replace(/\^/g, '\n');
    const lines = processedText.split('\n');

    return (
        <span className={className}>
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {/* Parse brand color syntax: *word* */}
                    {line.split(/(\*.*?\*)/g).map((part, partIndex) => {
                        if (part.startsWith('*') && part.endsWith('*')) {
                            // Extract content between asterisks
                            const content = part.slice(1, -1);
                            return (
                                <span key={partIndex} className="text-[#007f94]">
                                    {content}
                                </span>
                            );
                        }
                        return part;
                    })}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </span>
    );
};

export default HighlightedText;
