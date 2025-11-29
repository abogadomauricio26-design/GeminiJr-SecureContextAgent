
import React, { useState } from 'react';
import { SearchIcon, LoaderIcon } from './icons';

interface QueryInterfaceProps {
  onQuerySubmit: (query: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const QueryInterface: React.FC<QueryInterfaceProps> = ({ onQuerySubmit, isLoading, disabled }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onQuerySubmit(query.trim());
    }
  };

  return (
    <div className="bg-brand-secondary p-4 rounded-lg border border-slate-700 shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="query-text" className="font-semibold text-brand-subtle">
          Realizar Consulta
        </label>
        <div className="relative">
          <input
            id="query-text"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={disabled ? "Añada eventos para activar la consulta" : "Ej: ¿Quién presentó la moción y cuándo?"}
            className="w-full p-3 pl-10 bg-slate-800 border border-slate-600 rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none transition duration-200 text-brand-text placeholder-slate-500 disabled:cursor-not-allowed disabled:bg-slate-800/50"
            disabled={isLoading || disabled}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || disabled || !query.trim()}
          className="flex items-center justify-center gap-2 w-full bg-brand-accent text-white font-bold py-2 px-4 rounded-md hover:bg-sky-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoaderIcon />
              Buscando...
            </>
          ) : (
            <>
              Obtener Respuesta
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default QueryInterface;
