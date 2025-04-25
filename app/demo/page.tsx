"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { KeyExchangeDemo } from "@/components/demo/key-exchange-demo";
import { EncryptionDemo } from "@/components/demo/encryption-demo";
import { ComparisonChart } from "@/components/demo/comparison-chart";
import { ParticleBackground } from "@/components/particle-background";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("exchange");
  const [demoState, setDemoState] = useState({
    kyberKeyPair: null,
    rsaKeyPair: null,
    kyberSharedKey: null,
    rsaSharedKey: null,
    metrics: {
      kyber: {
        keyGenTime: 0,
        exchangeTime: 0,
        keySize: 0,
        ciphertextSize: 0
      },
      rsa: {
        keyGenTime: 0,
        exchangeTime: 0,
        keySize: 0,
        ciphertextSize: 0
      }
    }
  });

  const updateDemoState = (newState: any) => {
    setDemoState({ ...demoState, ...newState });
  };

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="container relative z-10 min-h-screen flex flex-col justify-center py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Quantum-Safe Cryptography Demo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare CRYSTALS-Kyber post-quantum cryptography with traditional RSA encryption.
            Generate keys, exchange messages, and see the performance difference.
          </p>
        </motion.div>

        <Tabs defaultValue="exchange" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="exchange">Key Exchange</TabsTrigger>
              <TabsTrigger value="encryption">Encryption</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <TabsContent value="exchange" className="space-y-8">
              <KeyExchangeDemo demoState={demoState} updateDemoState={updateDemoState} />
            </TabsContent>

            <TabsContent value="encryption" className="space-y-8">
              <EncryptionDemo demoState={demoState} />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-8">
              <ComparisonChart demoState={demoState} />
            </TabsContent>
          </motion.div>
        </Tabs>

        <div className="flex justify-center mt-8">
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab(activeTab === "exchange" ? "encryption" : activeTab === "encryption" ? "comparison" : "exchange")}
            >
              {activeTab === "exchange" ? "Next: Encryption" : activeTab === "encryption" ? "Next: Comparison" : "Back to Start"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}