
import React, { useState, useCallback } from 'react';
import { type TimelineEvent } from './types';
import { processEvent, answerQuery } from './services/geminiService';
import Header from './components/Header';
import EventInputForm from './components/EventInputForm';
import Timeline from './components/Timeline';
import QueryInterface from './components/QueryInterface';
import QueryResultDisplay from './components/QueryResultDisplay';
import { SparklesIcon, ScaleIcon, HistoryIcon } from './components/icons';
import MLAlgorithmDisplay from './components/MLAlgorithmDisplay';
import DocumentAnalyzer from './components/DocumentAnalyzer';

type ActiveTab = 'timeline' | 'analysis';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('analysis');

  // Timeline State
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isProcessingEvent, setIsProcessingEvent] = useState(false);
  const [isAnsweringQuery, setIsAnsweringQuery] = useState(false);
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNewEvent = useCallback(async (text: string) => {
    setIsProcessingEvent(true);
    setError(null);
    try {
      const newEventData = await processEvent(text);
      const newEvent: TimelineEvent = {
        ...newEventData,
        id: new Date().toISOString(),
        originalText: text,
      };
      setEvents(prevEvents => [newEvent, ...prevEvents]);
    } catch (e) {
      console.error(e);
      setError('Failed to process the event. Please check your connection and API key.');
    } finally {
      setIsProcessingEvent(false);
    }
  }, []);

  const handleQuery = useCallback(async (query: string) => {
    if (events.length === 0) {
      setError("Please add at least one event to the history before querying.");
      return;
    }
    setIsAnsweringQuery(true);
    setError(null);
    setQueryResult(null);
    try {
      const result = await answerQuery(events, query);
      setQueryResult(result);
    } catch (e) {
      console.error(e);
      setError('Failed to answer the query. Please try again.');
    } finally {
      setIsAnsweringQuery(false);
    }
  }, [events]);

  return (
    <div className="min-h-screen bg-brand-primary text-brand-text font-sans">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 lg:px-6 mt-6 mb-4">
        <div className="flex gap-2 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'analysis' 
                ? 'border-brand-accent text-brand-accent bg-slate-800/30' 
                : 'border-transparent text-brand-subtle hover:text-white hover:bg-slate-800/20'
            }`}
          >
            <ScaleIcon />
            Análisis & Comparativa
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'timeline' 
                ? 'border-brand-accent text-brand-accent bg-slate-800/30' 
                : 'border-transparent text-brand-subtle hover:text-white hover:bg-slate-800/20'
            }`}
          >
            <HistoryIcon />
            Línea de Tiempo del Caso
          </button>
        </div>
      </div>

      <main className="container mx-auto p-4 lg:p-6 min-h-[80vh]">
        
        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 animate-in fade-in duration-300">
            {/* Left Column: Input and Timeline */}
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-brand-subtle flex items-center gap-2">
                <SparklesIcon />
                Paso 1: Construir Historial
              </h2>
              <EventInputForm onSubmit={handleNewEvent} isLoading={isProcessingEvent} />
              <Timeline events={events} />
            </div>

            {/* Right Column: Query and Results */}
            <div className="flex flex-col gap-6 mt-8 lg:mt-0">
              <h2 className="text-xl font-bold text-brand-subtle flex items-center gap-2">
                <SparklesIcon />
                Paso 2: Consultar Historial
              </h2>
              <MLAlgorithmDisplay />
              <QueryInterface onQuerySubmit={handleQuery} isLoading={isAnsweringQuery} disabled={events.length === 0} />
              {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">{error}</div>}
              <QueryResultDisplay result={queryResult} isLoading={isAnsweringQuery} />
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
           <div className="animate-in fade-in duration-300">
             <DocumentAnalyzer />
           </div>
        )}

      </main>
    </div>
  );
};

export default App;
