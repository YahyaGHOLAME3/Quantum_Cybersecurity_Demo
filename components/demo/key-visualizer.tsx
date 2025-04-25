"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function KeyVisualizer({ 
  algorithm, 
  hasKeys,
  hasSharedKey 
}: { 
  algorithm: "kyber" | "rsa";
  hasKeys: boolean;
  hasSharedKey: boolean;
}) {
  const algorithmColor = algorithm === "kyber" ? "chart-1" : "chart-3";
  
  return (
    <div className="h-36 bg-black/10 dark:bg-white/5 rounded-md relative overflow-hidden flex items-center justify-center">
      {!hasKeys ? (
        <div className="text-sm text-muted-foreground text-center p-4">
          Generate {algorithm.toUpperCase()} keys to visualize
        </div>
      ) : (
        <div className="absolute inset-0">
          <KeyVisualization algorithm={algorithm} hasSharedKey={hasSharedKey} />
        </div>
      )}
    </div>
  );
}

function KeyVisualization({ algorithm, hasSharedKey }: { algorithm: "kyber" | "rsa"; hasSharedKey: boolean }) {
  // Different visualizations for different algorithms
  if (algorithm === "kyber") {
    return <KyberVisualization hasSharedKey={hasSharedKey} />;
  } else {
    return <RsaVisualization hasSharedKey={hasSharedKey} />;
  }
}

function KyberVisualization({ hasSharedKey }: { hasSharedKey: boolean }) {
  const gridSize = 16;
  const cellSize = 100 / gridSize;
  
  // Generate a grid representing a lattice
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    return { row, col };
  });
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-32 h-32 relative">
        {cells.map(({ row, col }, i) => {
          const delay = (row * gridSize + col) * 0.0002;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7] }}
              transition={{ duration: 1, delay, repeat: Infinity, repeatType: "reverse" }}
              className={cn(
                "absolute rounded-full",
                hasSharedKey ? "bg-chart-1" : "bg-chart-1/70"
              )}
              style={{
                width: '3px',
                height: '3px',
                top: `${row * cellSize}%`,
                left: `${col * cellSize}%`,
              }}
            />
          );
        })}
        
        {hasSharedKey && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-chart-1/20 border border-chart-1/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-chart-1/30 border border-chart-1/50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-chart-1/80 border border-chart-1" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function RsaVisualization({ hasSharedKey }: { hasSharedKey: boolean }) {
  // Generate prime number visualization
  const primeDigits = Array.from({ length: 100 }, (_, i) => i);
  
  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="w-32 h-32 relative">
        {/* Prime factors visualization */}
        <div className="absolute inset-0 flex flex-wrap overflow-hidden opacity-60">
          {primeDigits.map((digit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, (i % 7 === 0 || i % 11 === 0 || i % 13 === 0) ? 0.9 : 0.2] }}
              transition={{ duration: 2, delay: i * 0.01, repeat: Infinity, repeatType: "reverse" }}
              className={cn(
                "text-[6px] font-mono",
                (i % 7 === 0 || i % 11 === 0 || i % 13 === 0) ? "text-chart-3" : "text-chart-3/50"
              )}
            >
              {digit}
            </motion.div>
          ))}
        </div>
        
        {hasSharedKey && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-chart-3/20 border border-chart-3/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-chart-3/30 border border-chart-3/50 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-chart-3/80 border border-chart-3 flex items-center justify-center">
                  <motion.span 
                    className="text-[8px] font-mono"
                    animate={{ opacity: [1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    p·q
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}