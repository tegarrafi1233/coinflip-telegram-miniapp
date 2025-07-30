import React, { useEffect, useRef } from 'react';
import headsImg from '../assets/headcoin.png';
import tailsImg from '../assets/tailcoin.png';
import './AdvancedCoinFlip.css';

interface AdvancedCoinFlipProps {
  isFlipping: boolean;
  result: 'heads' | 'tails' | null;
  onFlipEnd?: () => void;
}

const AdvancedCoinFlip: React.FC<AdvancedCoinFlipProps> = ({ isFlipping, result, onFlipEnd }) => {
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFlipping && coinRef.current) {
      coinRef.current.addEventListener('animationend', handleAnimationEnd);
    }
    return () => {
      if (coinRef.current) {
        coinRef.current.removeEventListener('animationend', handleAnimationEnd);
      }
    };
    // eslint-disable-next-line
  }, [isFlipping]);

  const handleAnimationEnd = () => {
    if (onFlipEnd) onFlipEnd();
  };

  return (
    <div className="advanced-coin-flip-container">
      <div
        ref={coinRef}
        className={`advanced-coin3d ${isFlipping ? 'flipping' : ''} ${result ? result : ''}`}
        style={{
          animation: isFlipping
            ? `advancedCoinFlip3D 1.2s cubic-bezier(.4,2.3,.3,1)`
            : undefined,
        }}
      >
        {/* HEADS */}
        <div className="advanced-coin-face advanced-coin-heads">
          <img src={headsImg} alt="Heads" width={100} height={100} style={{ borderRadius: '50%' }} />
        </div>
        {/* TAILS */}
        <div className="advanced-coin-face advanced-coin-tails">
          <img src={tailsImg} alt="Tails" width={100} height={100} style={{ borderRadius: '50%' }} />
        </div>
        {/* Shadow */}
        <div className="advanced-coin-shadow" />
      </div>
    </div>
  );
};

export default AdvancedCoinFlip;