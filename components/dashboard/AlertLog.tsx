import React from 'react';
import { Terminal, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { AlertLog as AlertLogType } from '../../types';

export const AlertLog: React.FC<{ logs: AlertLogType[] }> = ({ logs }) => {
  return (
    <Card title="System Logs" icon={<Terminal className="w-5 h-5" />} className="h-full">
      <div className="space-y-3 overflow-y-auto max-h-64 pr-2">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 items-start border-l-2 border-slate-700 pl-3 py-1 hover:bg-white/5 transition-colors rounded-r">
            <div className="mt-0.5">
                {log.severity === 'high' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                {log.severity === 'medium' && <Info className="w-4 h-4 text-amber-500" />}
                {log.severity === 'low' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                        log.category === 'SOLAR' ? 'text-amber-400' :
                        log.category === 'WATER' ? 'text-blue-400' :
                        log.category === 'SECURITY' ? 'text-rose-400' :
                        'text-gray-400'
                    }`}>
                        {log.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600">{log.timestamp}</span>
                </div>
                <p className="text-sm text-gray-300 mt-0.5 leading-snug">{log.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};