"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, ShieldAlert, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export function ComparisonChart({ demoState }: { demoState: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const performanceData = [
    {
      name: "Key Generation",
      kyber: demoState.metrics.kyber.keyGenTime || 0.1,
      rsa: demoState.metrics.rsa.keyGenTime || 0.5,
    },
    {
      name: "Key Exchange",
      kyber: demoState.metrics.kyber.exchangeTime || 0.05,
      rsa: demoState.metrics.rsa.exchangeTime || 0.3,
    },
    {
      name: "Key Size",
      kyber: demoState.metrics.kyber.keySize ? demoState.metrics.kyber.keySize / 500 : 1184 / 500,
      rsa: demoState.metrics.rsa.keySize ? demoState.metrics.rsa.keySize / 500 : 256 / 500,
      unit: "bytes"
    },
    {
      name: "Ciphertext Size",
      kyber: demoState.metrics.kyber.ciphertextSize ? demoState.metrics.kyber.ciphertextSize / 500 : 1088 / 500,
      rsa: demoState.metrics.rsa.ciphertextSize ? demoState.metrics.rsa.ciphertextSize / 500 : 256 / 500,
      unit: "bytes"
    }
  ];

  const securityComparisonData = [
    {
      subject: "Classical Security",
      kyber: 8,
      rsa: 9,
      fullMark: 10
    },
    {
      subject: "Quantum Resistance",
      kyber: 9,
      rsa: 1,
      fullMark: 10
    },
    {
      subject: "Implementation Maturity",
      kyber: 6,
      rsa: 10,
      fullMark: 10
    },
    {
      subject: "Computational Efficiency",
      kyber: 8,
      rsa: 5,
      fullMark: 10
    },
    {
      subject: "Key Size Efficiency",
      kyber: 6,
      rsa: 7,
      fullMark: 10
    }
  ];

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

  const formatTimeTooltip = (value: number, name: string) => {
    if (name === "Key Size" || name === "Ciphertext Size") {
      return `${(value * 500).toFixed(0)} bytes`;
    }
    return `${value.toFixed(3)}s`;
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
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle>Security & Performance Comparison</AlertTitle>
          <AlertDescription>
            Compare the performance and security characteristics of CRYSTALS-Kyber and RSA algorithms
            based on your test results and industry standards.
          </AlertDescription>
        </Alert>
      </motion.div>

      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Card className="border border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>
              Comparing time and size metrics between algorithms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: isDark ? '#FFFFFF99' : '#00000099' }}
                  />
                  <YAxis 
                    tick={{ fill: isDark ? '#FFFFFF99' : '#00000099' }}
                    label={{ 
                      value: 'Time (s) / Normalized Size', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: isDark ? '#FFFFFF99' : '#00000099' }
                    }}
                  />
                  <Tooltip 
                    formatter={formatTimeTooltip}
                    contentStyle={{ 
                      backgroundColor: isDark ? '#1e1e1e' : '#fff',
                      borderColor: isDark ? '#333' : '#ddd',
                      color: isDark ? '#fff' : '#000'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="kyber" name="CRYSTALS-Kyber" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="rsa" name="RSA-2048" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium">Key Observations:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Kyber typically generates keys faster than RSA</li>
                <li>Key exchange is significantly faster with Kyber</li>
                <li>Kyber public keys are larger than RSA keys</li>
                <li>Kyber ciphertexts are larger than RSA ciphertexts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Card className="border border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Security Characteristics</CardTitle>
            <CardDescription>
              Comparing security profiles across different threat models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={securityComparisonData}>
                  <PolarGrid stroke={isDark ? "#FFFFFF22" : "#00000022"} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: isDark ? '#FFFFFF99' : '#00000099', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 10]} 
                    tick={{ fill: isDark ? '#FFFFFF99' : '#00000099' }}
                  />
                  <Radar
                    name="CRYSTALS-Kyber"
                    dataKey="kyber"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="RSA-2048"
                    dataKey="rsa"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.3}
                  />
                  <Legend />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDark ? '#1e1e1e' : '#fff',
                      borderColor: isDark ? '#333' : '#ddd',
                      color: isDark ? '#fff' : '#000'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Tabs defaultValue="quantum-threat">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quantum-threat">Quantum Threats</TabsTrigger>
            <TabsTrigger value="standards">NIST Standards</TabsTrigger>
          </TabsList>
          <TabsContent value="quantum-threat">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                  The Quantum Threat to Classical Cryptography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Quantum computers pose a significant threat to current public-key cryptography:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Shor's Algorithm</strong> - Quantum computers can use this algorithm to efficiently 
                    factor large integers and compute discrete logarithms, breaking RSA, DSA, and Elliptic Curve 
                    cryptography.
                  </li>
                  <li>
                    <strong>Grover's Algorithm</strong> - This quantum algorithm can speed up brute force attacks 
                    against symmetric cryptography, effectively halving the security level (e.g., AES-256 would 
                    provide only 128 bits of security).
                  </li>
                </ul>
                <p>
                  While powerful quantum computers capable of breaking RSA don't exist yet, the threat is real:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Harvest Now, Decrypt Later</strong> - Adversaries can collect encrypted data now 
                    to decrypt once quantum computers become available.
                  </li>
                  <li>
                    <strong>Long-term Secrets</strong> - Information that must remain secure for decades 
                    is already at risk.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="standards">
            <Card className="border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  NIST Post-Quantum Cryptography Standardization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The National Institute of Standards and Technology (NIST) began a process in 2016 to 
                  standardize quantum-resistant cryptographic algorithms:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>CRYSTALS-Kyber</strong> <Badge className="ml-2 bg-primary">Selected</Badge>
                    <p className="mt-1">
                      Selected as the primary algorithm for key establishment, Kyber is a lattice-based 
                      key encapsulation mechanism with excellent performance characteristics and strong 
                      security properties.
                    </p>
                  </li>
                  <li>
                    <strong>Digital Signatures</strong>
                    <p className="mt-1">
                      CRYSTALS-Dilithium, FALCON, and SPHINCS+ were selected for digital signature 
                      applications, providing different tradeoffs between key size, signature size, 
                      and performance.
                    </p>
                  </li>
                  <li>
                    <strong>Ongoing Work</strong>
                    <p className="mt-1">
                      NIST continues to evaluate additional algorithms for standardization in the future, 
                      including alternative approaches based on different mathematical problems.
                    </p>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Standardization is crucial for ensuring widespread adoption of secure post-quantum 
                  algorithms and giving organizations confidence to begin migration planning.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}