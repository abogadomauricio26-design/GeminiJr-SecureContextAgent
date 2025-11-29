
import React from 'react';
import { type TimelineEvent } from '../types';
import { CalendarIcon, TagIcon, UsersIcon } from './icons';

interface TimelineItemProps {
  event: TimelineEvent;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => {
  return (
    <div className="bg-brand-secondary border border-slate-700 rounded-lg p-4 transition-shadow hover:shadow-xl hover:border-slate-600">
      <p className="text-brand-text mb-3 font-medium">"{event.summary}"</p>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-brand-subtle">
        <div className="flex items-center gap-1.5">
          <CalendarIcon />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TagIcon />
          <span className="bg-sky-900/50 text-sky-300 px-2 py-0.5 rounded-full">{event.eventType}</span>
        </div>
      </div>
       {event.partiesInvolved.length > 0 && (
        <div className="mt-3 flex items-start gap-1.5 text-sm text-brand-subtle">
          <UsersIcon className="mt-0.5 flex-shrink-0"/>
          <div className="flex flex-wrap gap-1.5">
            <span className="font-semibold">Partes:</span>
            {event.partiesInvolved.map((party, index) => (
              <span key={index} className="bg-slate-700 px-2 py-0.5 rounded-full text-slate-300">
                {party}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
