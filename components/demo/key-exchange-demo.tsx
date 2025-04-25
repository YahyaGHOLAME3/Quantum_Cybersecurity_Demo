"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Shield, ShieldCheck, Shield as ShieldIcon, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { KeyVisualizer } from "@/components/demo/key-visualizer";
import { Separator } from "@/components/ui/separator";
import { AlgorithmCard } from "@/components/demo/algorithm-card";
import { Badge } from "@/components/ui/badge";

// Simulated API client
const API_BASE_URL = "http://localhost:8000";

async function generateKeypair(algorithm: string) {
  try {
    // In production, this would call the actual backend
    // For demo purposes, we'll simulate this
    return simulateKeypairGeneration(algorithm);
  } catch (error) {
    console.error("Error generating keypair:", error);
    throw error;
  }
}

async function exchangeKey(algorithm: string, publicKey: string) {
  try {
    // In production, this would call the actual backend
    // For demo purposes, we'll simulate this
    return simulateKeyExchange(algorithm, publicKey);
  } catch (error) {
    console.error("Error exchanging keys:", error);
    throw error;
  }
}

// Simulation functions (would be real API calls in production)
function simulateKeypairGeneration(algorithm: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const keySize = algorithm === "kyber" ? 1184 : 256;
      resolve({
        algorithm,
        keypair: {
          public_key: Array(keySize).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
          private_key: Array(algorithm === "kyber" ? keySize / 2 : keySize).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        },
        metrics: {
          generation_time: algorithm === "kyber" ? 0.1 : 0.5,
          key_size: keySize
        }
      });
    }, algorithm === "kyber" ? 500 : 1000);
  });
}

function simulateKeyExchange(algorithm: string, publicKey: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ciphertextSize = algorithm === "kyber" ? 1088 : 256;
      resolve({
        algorithm,
        shared_key: Array(32).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        ciphertext: Array(ciphertextSize).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        metrics: {
          exchange_time: algorithm === "kyber" ? 0.05 : 0.3,
          ciphertext_size: ciphertextSize
        }
      });
    }, algorithm === "kyber" ? 300 : 800);
  });
}

export function KeyExchangeDemo({ demoState, updateDemoState }: { 
  demoState: any; 
  updateDemoState: (state: any) => void;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState({
    kyberKeyGen: false,
    rsaKeyGen: false,
    kyberExchange: false,
    rsaExchange: false
  });

  const handleGenerateKeys = async (algorithm: string) => {
    try {
      if (algorithm === "kyber") {
        setIsLoading(prev => ({ ...prev, kyberKeyGen: true }));
      } else {
        setIsLoading(prev => ({ ...prev, rsaKeyGen: true }));
      }

      const response: any = await generateKeypair(algorithm);
      
      if (algorithm === "kyber") {
        updateDemoState({ 
          kyberKeyPair: response.keypair,
          metrics: {
            ...demoState.metrics,
            kyber: {
              ...demoState.metrics.kyber,
              keyGenTime: response.metrics.generation_time,
              keySize: response.metrics.key_size
            }
          }
        });
        toast({
          title: "Kyber Key Generated",
          description: `Generated in ${response.metrics.generation_time.toFixed(3)}s`
        });
      } else {
        updateDemoState({ 
          rsaKeyPair: response.keypair,
          metrics: {
            ...demoState.metrics,
            rsa: {
              ...demoState.metrics.rsa,
              keyGenTime: response.metrics.generation_time,
              keySize: response.metrics.key_size
            }
          }
        });
        toast({
          title: "RSA Key Generated",
          description: `Generated in ${response.metrics.generation_time.toFixed(3)}s`
        });
      }
    } catch (error) {
      toast({
        title: "Error Generating Keys",
        description: "There was a problem generating the keys.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ 
        ...prev, 
        kyberKeyGen: algorithm === "kyber" ? false : prev.kyberKeyGen,
        rsaKeyGen: algorithm === "rsa" ? false : prev.rsaKeyGen
      }));
    }
  };

  const handleKeyExchange = async (algorithm: string) => {
    try {
      if (!demoState.kyberKeyPair && algorithm === "kyber") {
        toast({
          title: "No Kyber Key Available",
          description: "Please generate Kyber keys first.",
          variant: "destructive"
        });
        return;
      }

      if (!demoState.rsaKeyPair && algorithm === "rsa") {
        toast({
          title: "No RSA Key Available",
          description: "Please generate RSA keys first.",
          variant: "destructive"
        });
        return;
      }

      if (algorithm === "kyber") {
        setIsLoading(prev => ({ ...prev, kyberExchange: true }));
      } else {
        setIsLoading(prev => ({ ...prev, rsaExchange: true }));
      }

      const publicKey = algorithm === "kyber" 
        ? demoState.kyberKeyPair.public_key 
        : demoState.rsaKeyPair.public_key;

      const response: any = await exchangeKey(algorithm, publicKey);
      
      if (algorithm === "kyber") {
        updateDemoState({ 
          kyberSharedKey: response.shared_key,
          metrics: {
            ...demoState.metrics,
            kyber: {
              ...demoState.metrics.kyber,
              exchangeTime: response.metrics.exchange_time,
              ciphertextSize: response.metrics.ciphertext_size
            }
          }
        });
        toast({
          title: "Kyber Key Exchange Complete",
          description: `Completed in ${response.metrics.exchange_time.toFixed(3)}s`
        });
      } else {
        updateDemoState({ 
          rsaSharedKey: response.shared_key,
          metrics: {
            ...demoState.metrics,
            rsa: {
              ...demoState.metrics.rsa,
              exchangeTime: response.metrics.exchange_time,
              ciphertextSize: response.metrics.ciphertext_size
            }
          }
        });
        toast({
          title: "RSA Key Exchange Complete",
          description: `Completed in ${response.metrics.exchange_time.toFixed(3)}s`
        });
      }
    } catch (error) {
      toast({
        title: "Error Exchanging Keys",
        description: "There was a problem during key exchange.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ 
        ...prev, 
        kyberExchange: algorithm === "kyber" ? false : prev.kyberExchange,
        rsaExchange: algorithm === "rsa" ? false : prev.rsaExchange
      }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Alert className="bg-primary/5 border border-primary/20">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <AlertTitle>Key Exchange Demonstration</AlertTitle>
          <AlertDescription>
            This demo shows how CRYSTALS-Kyber post-quantum key exchange compares to traditional RSA.
            Generate keys for both algorithms and observe the performance differences.
          </AlertDescription>
        </Alert>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <AlgorithmCard
            title="CRYSTALS-Kyber-768"
            description="Post-Quantum Key Exchange"
            icon={<ShieldCheck className="h-8 w-8 text-chart-1" />}
            className="border-chart-1/30 bg-chart-1/5"
            headerBadge={
              <Badge variant="outline" className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                Quantum-Safe
              </Badge>
            }
          >
            <div className="space-y-4">
              <KeyVisualizer
                algorithm="kyber"
                hasKeys={!!demoState.kyberKeyPair}
                hasSharedKey={!!demoState.kyberSharedKey}
              />
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-chart-1/30 hover:border-chart-1/50"
                  onClick={() => handleGenerateKeys("kyber")}
                  disabled={isLoading.kyberKeyGen}
                >
                  {isLoading.kyberKeyGen ? "Generating..." : "Generate Kyber Keys"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-chart-1/30 hover:border-chart-1/50"
                  onClick={() => handleKeyExchange("kyber")}
                  disabled={!demoState.kyberKeyPair || isLoading.kyberExchange}
                >
                  {isLoading.kyberExchange ? "Exchanging..." : "Perform Key Exchange"}
                </Button>
              </div>
              
              {demoState.kyberKeyPair && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Key Generation:</span>
                    <span className="font-mono">{demoState.metrics.kyber.keyGenTime.toFixed(3)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Size:</span>
                    <span className="font-mono">{demoState.metrics.kyber.keySize} bytes</span>
                  </div>
                  {demoState.kyberSharedKey && (
                    <>
                      <div className="flex justify-between">
                        <span>Exchange Time:</span>
                        <span className="font-mono">{demoState.metrics.kyber.exchangeTime.toFixed(3)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ciphertext Size:</span>
                        <span className="font-mono">{demoState.metrics.kyber.ciphertextSize} bytes</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </AlgorithmCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AlgorithmCard
            title="RSA-2048"
            description="Traditional Key Exchange"
            icon={<Shield className="h-8 w-8 text-chart-3" />}
            className="border-chart-3/30 bg-chart-3/5"
            headerBadge={
              <Badge variant="outline" className="bg-chart-3/20 text-chart-3 border-chart-3/30">
                Classic
              </Badge>
            }
          >
            <div className="space-y-4">
              <KeyVisualizer
                algorithm="rsa"
                hasKeys={!!demoState.rsaKeyPair}
                hasSharedKey={!!demoState.rsaSharedKey}
              />
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-chart-3/30 hover:border-chart-3/50"
                  onClick={() => handleGenerateKeys("rsa")}
                  disabled={isLoading.rsaKeyGen}
                >
                  {isLoading.rsaKeyGen ? "Generating..." : "Generate RSA Keys"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full border-chart-3/30 hover:border-chart-3/50"
                  onClick={() => handleKeyExchange("rsa")}
                  disabled={!demoState.rsaKeyPair || isLoading.rsaExchange}
                >
                  {isLoading.rsaExchange ? "Exchanging..." : "Perform Key Exchange"}
                </Button>
              </div>
              
              {demoState.rsaKeyPair && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Key Generation:</span>
                    <span className="font-mono">{demoState.metrics.rsa.keyGenTime.toFixed(3)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Size:</span>
                    <span className="font-mono">{demoState.metrics.rsa.keySize} bytes</span>
                  </div>
                  {demoState.rsaSharedKey && (
                    <>
                      <div className="flex justify-between">
                        <span>Exchange Time:</span>
                        <span className="font-mono">{demoState.metrics.rsa.exchangeTime.toFixed(3)}s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ciphertext Size:</span>
                        <span className="font-mono">{demoState.metrics.rsa.ciphertextSize} bytes</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </AlgorithmCard>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Card className="border border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle>What Just Happened?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              You've just witnessed key exchange using two different algorithms:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>CRYSTALS-Kyber-768</strong> is a lattice-based post-quantum algorithm 
                that's resistant to attacks from quantum computers. It's been standardized by NIST 
                as part of their post-quantum cryptography initiative.
              </li>
              <li>
                <strong>RSA-2048</strong> is a traditional public-key algorithm widely used today, 
                but vulnerable to attacks from quantum computers using Shor's algorithm.
              </li>
            </ul>
            <p>
              Notice the different performance characteristics between these algorithms.
              Kyber typically generates keys faster and has more efficient key exchange,
              while still providing strong security guarantees against both classical
              and quantum attacks.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}