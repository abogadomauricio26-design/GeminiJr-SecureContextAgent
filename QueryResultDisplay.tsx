
import React from 'react';
import { LoaderIcon } from './icons';

interface QueryResultDisplayProps {
  result: string | null;
  isLoading: boolean;
}

const QueryResultDisplay: React.FC<QueryResultDisplayProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-brand-secondary border border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
        <LoaderIcon />
        <p className="mt-2 text-brand-subtle">Generando respuesta...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-brand-secondary border border-dashed border-slate-700 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-brand-subtle text-center">La respuesta a su consulta aparecerá aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-secondary border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-bold text-brand-accent mb-3">Respuesta de la IA</h3>
      <div className="prose prose-invert max-w-none text-brand-text whitespace-pre-wrap">
        {result}
      </div>
    </div>
  );
};

export default QueryResultDisplay;
