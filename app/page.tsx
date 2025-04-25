"use client";

import { motion } from "framer-motion";
import { Shield, ShieldAlert, Lock, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ParticleBackground } from "@/components/particle-background";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="container relative z-10 min-h-screen flex flex-col justify-center py-10 md:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl w-full">
          {/* Hero Section */}
          <section className="py-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-block p-2 bg-primary/10 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Quantum-Safe Vault
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the next generation of cryptography that's designed to resist 
                quantum computing attacks.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/demo">
                  <Lock className="h-4 w-4" />
                  Try the Demo
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/learn">
                  <Info className="h-4 w-4" />
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </section>

          {/* Features Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-chart-1" />}
              title="Post-Quantum Cryptography"
              description="Experience CRYSTALS-Kyber-768, NIST's standardized algorithm designed to resist quantum attacks."
            />
            <FeatureCard
              icon={<Comparison className="h-10 w-10 text-chart-2" />}
              title="Side-by-Side Comparison"
              description="Compare post-quantum cryptography with traditional RSA encryption in real-time."
            />
            <FeatureCard
              icon={<Lock className="h-10 w-10 text-chart-3" />}
              title="Message Encryption"
              description="Encrypt and decrypt messages using AES-GCM with quantum-resistant key exchange."
            />
            <FeatureCard
              icon={<Performance className="h-10 w-10 text-chart-4" />}
              title="Performance Metrics"
              description="Visualize the speed and efficiency differences between cryptographic approaches."
            />
            <FeatureCard
              icon={<Educational className="h-10 w-10 text-chart-5" />}
              title="Educational Resources"
              description="Learn about quantum computing threats and how post-quantum cryptography works."
            />
            <FeatureCard
              icon={<Visualization className="h-10 w-10 text-primary" />}
              title="Interactive Visualization"
              description="See cryptographic principles in action through engaging visual demonstrations."
            />
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="py-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to explore quantum-resistant cryptography?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Experience the future of secure communications with our interactive
                  demonstration of post-quantum cryptography.
                </p>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/demo">
                    Start the Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm transition-all group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]">
        <CardHeader>
          <div className="mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Simple icon components
function Comparison() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-chart-2/20"></div>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.29 7 12 12 20.71 7"></polyline>
        <line x1="12" y1="22" x2="12" y2="12"></line>
      </svg>
    </div>
  );
}

function Performance() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-chart-4/20"></div>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
      </svg>
    </div>
  );
}

function Educational() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-chart-5/20"></div>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    </div>
  );
}

function Visualization() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-primary/20"></div>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    </div>
  );
}

function Info() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}