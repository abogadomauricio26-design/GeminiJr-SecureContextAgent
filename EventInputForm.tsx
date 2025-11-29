
import React, { useState } from 'react';
import { PlusIcon, LoaderIcon } from './icons';

interface EventInputFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const EventInputForm: React.FC<EventInputFormProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <div className="bg-brand-secondary p-4 rounded-lg border border-slate-700 shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="event-text" className="font-semibold text-brand-subtle">
          Añadir Unidad de Acto
        </label>
        <textarea
          id="event-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe el evento del caso... (ej. 'El 15 de marzo de 2024, se presentó una moción para desestimar el caso por parte del demandado, la Corporación Acme.')"
          className="w-full h-32 p-3 bg-slate-800 border border-slate-600 rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none transition duration-200 resize-none text-brand-text placeholder-slate-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="flex items-center justify-center gap-2 w-full bg-brand-accent text-white font-bold py-2 px-4 rounded-md hover:bg-sky-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoaderIcon />
              Procesando...
            </>
          ) : (
            <>
              <PlusIcon />
              Añadir al Historial
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EventInputForm;
