import React from 'react';
import { BrainCircuitIcon, DatabaseIcon, GitBranchIcon, TargetIcon, LightbulbIcon, CheckCircleIcon } from './icons';

const MLAlgorithmDisplay: React.FC = () => {
  const steps = [
    { icon: <DatabaseIcon />, title: "Ingesta de Datos", description: "Carga del historial completo del caso." },
    { icon: <GitBranchIcon />, title: "Análisis Vectorial", description: "Convierte eventos y consultas a modelos semánticos." },
    { icon: <TargetIcon />, title: "Búsqueda de Relevancia", description: "Identifica los datos más pertinentes a la consulta actual." },
    { icon: <LightbulbIcon />, title: "Síntesis Estratégica", description: "Genera inferencias, conexiones y respuestas tácticas." },
    { icon: <CheckCircleIcon />, title: "Control de Calidad", description: "Verifica la coherencia de la respuesta con los hechos." }
  ];

  return (
    <div className="bg-brand-secondary/50 border border-sky-800/50 p-4 rounded-lg">
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuitIcon className="text-brand-accent w-7 h-7 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-white">Algoritmo: ML_StrategicAnalysis_v1.0</h4>
          <p className="text-sm text-brand-subtle">Última versión de Machine Learning aplicada.</p>
        </div>
      </div>
      <div className="space-y-3 pl-2 border-l-2 border-slate-700/50 ml-3.5">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 relative">
            <div className="absolute -left-[16px] top-1.5 bg-brand-secondary p-0.5 rounded-full">
              {React.cloneElement(step.icon, { className: "w-5 h-5 text-sky-400" })}
            </div>
            <div>
              <h5 className="font-semibold text-brand-text text-sm">{step.title}</h5>
              <p className="text-xs text-brand-subtle">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MLAlgorithmDisplay;