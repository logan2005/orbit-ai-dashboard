import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, icon, action, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass-panel rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-black/50 transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white/5 hover:border-white/20 hover:scale-[1.02]' : ''} ${className}`}
    >
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            {icon && <span className="text-orbit-cyan">{icon}</span>}
            <h3 className="font-semibold text-lg tracking-wide text-gray-100 uppercase font-sans">
              {title}
            </h3>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 flex-1 relative">
        {children}
      </div>
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant: 'success' | 'warning' | 'danger' | 'neutral' }> = ({ children, variant }) => {
  const colors = {
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    neutral: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-mono font-bold border ${colors[variant]} uppercase tracking-wider`}>
      {children}
    </span>
  );
};