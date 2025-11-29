
import React, { useState } from 'react';
import { analyzeLegalDocuments } from '../services/geminiService';
import { UploadIcon, FileTextIcon, ScaleIcon, LoaderIcon, XMarkIcon } from './icons';

interface FileInputProps {
  label: string;
  subLabel: string;
  file: File | null;
  text: string;
  onFileChange: (file: File | null) => void;
  onTextChange: (text: string) => void;
  colorClass: string;
}

const FileInputSection: React.FC<FileInputProps> = ({ 
  label, subLabel, file, text, onFileChange, onTextChange, colorClass 
}) => {
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className={`flex flex-col gap-3 p-4 rounded-lg border border-slate-700 bg-slate-900/50 ${colorClass}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-brand-text">{label}</h3>
          <p className="text-xs text-brand-subtle">{subLabel}</p>
        </div>
        {file && (
          <button 
            onClick={() => onFileChange(null)}
            className="text-red-400 hover:text-red-300 p-1"
            title="Remover archivo"
          >
            <XMarkIcon />
          </button>
        )}
      </div>

      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
        className={`border-2 border-dashed border-slate-700 rounded-md p-6 flex flex-col items-center justify-center transition-colors ${file ? 'bg-slate-800/80 border-green-500/50' : 'hover:bg-slate-800 hover:border-slate-500'}`}
      >
        {file ? (
          <div className="flex items-center gap-3 text-green-400">
            <FileTextIcon className="w-8 h-8" />
            <div className="text-sm overflow-hidden">
              <p className="font-semibold truncate max-w-[150px]">{file.name}</p>
              <p className="text-xs opacity-70">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
             <label className="cursor-pointer flex flex-col items-center gap-2 group">
                <UploadIcon className="w-8 h-8 text-brand-subtle group-hover:text-brand-accent" />
                <span className="text-sm text-brand-subtle group-hover:text-brand-text">
                  Arrastra un archivo (PDF/TXT) o <span className="underline decoration-brand-accent">haz clic</span>
                </span>
                <input 
                  type="file" 
                  accept=".pdf,.txt,.md,.csv,application/pdf,text/plain" 
                  className="hidden" 
                  onChange={handleFileInput}
                />
             </label>
          </div>
        )}
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="O escribe/pega el contenido aquí..."
          className="w-full h-24 p-3 bg-slate-800 border border-slate-600 rounded-md focus:ring-1 focus:ring-brand-accent focus:outline-none transition text-sm text-brand-text placeholder-slate-500 resize-none"
        />
      </div>
    </div>
  );
};

const DocumentAnalyzer: React.FC = () => {
  const [contextFile, setContextFile] = useState<File | null>(null);
  const [contextText, setContextText] = useState('');
  
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const [targetText, setTargetText] = useState('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!contextFile && !contextText && !targetFile && !targetText) {
      setError("Por favor ingrese al menos un documento o texto para analizar.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeLegalDocuments(contextFile, contextText, targetFile, targetText);
      setResult(response);
    } catch (e) {
      console.error(e);
      setError("Error en el análisis. Verifique que los archivos sean PDF o Texto y vuelva a intentarlo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-brand-secondary border border-slate-700 rounded-lg p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
          <ScaleIcon className="text-brand-accent w-8 h-8" />
          <div>
            <h2 className="text-xl font-bold text-white">Análisis Jurídico y Comparativo</h2>
            <p className="text-sm text-brand-subtle">Sube documentos para realizar un análisis de cumplimiento normativo o revisión legal.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input 1: Normative Context */}
          <FileInputSection 
            label="1. Contexto Normativo (Las Reglas)"
            subLabel="Adjunta leyes, doctrina, o contratos marco."
            file={contextFile}
            text={contextText}
            onFileChange={setContextFile}
            onTextChange={setContextText}
            colorClass="border-l-4 border-l-brand-accent"
          />

          {/* Input 2: Target Document */}
          <FileInputSection 
            label="2. Documento Objetivo (El Producto)"
            subLabel="Adjunta el contrato, escrito o hecho a analizar."
            file={targetFile}
            text={targetText}
            onFileChange={setTargetFile}
            onTextChange={setTargetText}
            colorClass="border-l-4 border-l-purple-500"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleAnalysis}
            disabled={isAnalyzing || (!contextFile && !contextText && !targetFile && !targetText)}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-accent to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isAnalyzing ? (
              <>
                <LoaderIcon />
                Analizando con Principios Generales del Derecho...
              </>
            ) : (
              <>
                <ScaleIcon />
                Realizar Análisis Jurídico
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 bg-red-900/50 border border-red-700 text-red-300 p-3 rounded text-center text-sm">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-brand-secondary border border-slate-700 rounded-lg p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <FileTextIcon className="text-green-400 w-6 h-6" />
            <h3 className="text-2xl font-bold text-white">Dictamen Legal Generado</h3>
          </div>
          <div className="prose prose-invert max-w-none prose-headings:text-sky-300 prose-strong:text-white prose-ul:text-brand-subtle">
             {/* Using a pre-wrap div allows standard markdown-like rendering if simple, 
                 or just text preservation. For a full markdown renderer we'd need a library, 
                 but whitespace-pre-wrap works well for formatted AI text. */}
            <div className="whitespace-pre-wrap font-serif text-slate-300 leading-relaxed">
              {result}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentAnalyzer;
