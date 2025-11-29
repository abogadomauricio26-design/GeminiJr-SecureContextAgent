import { FilterResult, PiiPattern, SanitizedPart } from '../types';

// Expanded and more robust PII patterns, now including URLs
const piiPatterns: PiiPattern[] = [
    { name: 'Email', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g },
    { name: 'Phone', regex: /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g },
    { name: 'DNI/NIE', regex: /\b([XYZ]?\d{7,8}[A-Z])\b/gi },
    { name: 'Credit Card', regex: /\b(?:\d[ -]*?){13,16}\b/g },
    { name: 'URL', regex: /\bhttps?:\/\/[^\s/$.?#].[^\s]*\b/gi },
    { name: 'Nombre', regex: /\b(Mauricio|Viteri|Juan Pérez)\b/gi }
];

// Simulates an API call to sanitize text
export const applyPiiFilter = async (text: string): Promise<FilterResult> => {
    const allMatches: { name: string; content: string; start: number; end: number }[] = [];
    const detections: Record<string, number> = {};

    // 1. Find all matches and their indices from all patterns
    piiPatterns.forEach(pattern => {
        pattern.regex.lastIndex = 0; // Reset lastIndex for global regex in a loop
        let match;
        while ((match = pattern.regex.exec(text)) !== null) {
            allMatches.push({
                name: pattern.name,
                content: match[0],
                start: match.index,
                end: match.index + match[0].length,
            });
        }
    });

    // Sort matches by start index to process them in order
    allMatches.sort((a, b) => a.start - b.start);

    const sanitizedParts: SanitizedPart[] = [];
    let lastIndex = 0;

    // 2. Build the sanitizedParts array by slicing the original text
    allMatches.forEach(match => {
        // Add the text part before the current match
        if (match.start > lastIndex) {
            sanitizedParts.push({ type: 'text', content: text.substring(lastIndex, match.start) });
        }
        // Add the PII part itself
        sanitizedParts.push({ type: 'pii', name: match.name, content: match.content });
        lastIndex = match.end;

        // Count detections for the summary
        detections[match.name] = (detections[match.name] || 0) + 1;
    });

    // Add any remaining text after the last match
    if (lastIndex < text.length) {
        sanitizedParts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    const piiCount = allMatches.length;

    // 3. Generate a simple string version with placeholder tags for copy-pasting
    const sanitizedForCopy = sanitizedParts.map(part => {
        if (part.type === 'pii') {
            return `[${part.name.toUpperCase()}]`;
        }
        return part.content;
    }).join('');

    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
        original: text,
        sanitized: sanitizedForCopy,
        sanitizedParts,
        isPiiDetected: piiCount > 0,
        piiCount,
        detections,
    };
};