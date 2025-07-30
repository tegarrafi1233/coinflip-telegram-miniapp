import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          return 100;
        }
        return old + Math.random() * 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark-bg z-50">
      <video
        src="/loading.mp4"
        autoPlay
        loop
        muted
        style={{ width: 180, height: 180, marginBottom: 32, borderRadius: 16, objectFit: 'cover', background: '#18182a' }}
      />
      <div className="w-64 h-4 bg-dark-card rounded-full overflow-hidden border border-dark-border">
        <div
          className="h-full bg-gradient-to-r from-coin-gold to-coin-bronze transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-white/80 text-sm">{Math.round(progress)}%</div>
    </div>
  );
};

export default LoadingScreen;