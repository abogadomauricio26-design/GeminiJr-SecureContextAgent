import React from 'react';
import { type TimelineEvent } from '../types';
import TimelineItem from './TimelineItem';
import { HistoryIcon, DownloadIcon } from './icons';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {

  const handleDownloadJson = () => {
    if (events.length === 0) return;

    const jsonString = JSON.stringify(events, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historial-del-caso.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-brand-subtle flex items-center gap-2">
          <HistoryIcon />
          Historial del Caso
        </h3>
        <button
          onClick={handleDownloadJson}
          disabled={events.length === 0}
          className="flex items-center gap-2 text-sm bg-slate-700/50 text-brand-subtle px-3 py-1.5 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <DownloadIcon />
          Descargar JSON
        </button>
      </div>
      {events.length === 0 ? (
        <div className="text-center py-10 px-4 bg-brand-secondary border border-slate-700 rounded-lg">
          <p className="text-brand-subtle">El historial del caso está vacío.</p>
          <p className="text-sm text-slate-500">Añada una "Unidad de Acto" para comenzar.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <TimelineItem key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;