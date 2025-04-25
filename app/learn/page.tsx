"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ParticleBackground } from "@/components/particle-background";
import { Shield, ShieldAlert, Book, Cpu, DivideIcon as LucideIcon, Lightbulb, Code, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LearnPage() {
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
            Post-Quantum Cryptography Learning Center
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn about quantum computing's impact on cryptography and how post-quantum
            algorithms like CRYSTALS-Kyber protect against quantum threats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <ResourceCard
            title="What is PQC?"
            description="An introduction to post-quantum cryptography"
            icon={Book}
            href="/learn#what-is-pqc"
            color="chart-1"
          />
          <ResourceCard
            title="Quantum Computing"
            description="How quantum computers break modern encryption"
            icon={Cpu}
            href="/learn#quantum-computing"
            color="chart-2"
          />
          <ResourceCard
            title="CRYSTALS-Kyber"
            description="Understanding the NIST-selected algorithm"
            icon={Shield}
            href="/learn#crystals-kyber"
            color="chart-3"
          />
        </div>

        <div className="mx-auto max-w-4xl w-full mt-16">
          <Tabs defaultValue="what-is-pqc" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="what-is-pqc" id="what-is-pqc">What is PQC?</TabsTrigger>
              <TabsTrigger value="quantum-computing" id="quantum-computing">Quantum Computing</TabsTrigger>
              <TabsTrigger value="crystals-kyber" id="crystals-kyber">CRYSTALS-Kyber</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[600px] rounded-md border p-6">
              <TabsContent value="what-is-pqc" className="space-y-8 p-2">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">What is Post-Quantum Cryptography?</h2>
                  <p>
                    Post-Quantum Cryptography (PQC) refers to cryptographic algorithms designed to 
                    be secure against attacks from both classical and quantum computers. As quantum 
                    computing advances, many of our current cryptographic systems will become vulnerable.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">The Problem with Current Cryptography</h3>
                  <p>
                    Most public-key cryptography used today relies on mathematical problems that are 
                    difficult for classical computers to solve, but could be easily broken by quantum computers:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>
                      <strong>RSA</strong> relies on the difficulty of factoring large numbers
                    </li>
                    <li>
                      <strong>ECC (Elliptic Curve Cryptography)</strong> relies on the discrete logarithm problem
                    </li>
                    <li>
                      <strong>Diffie-Hellman</strong> key exchange relies on the computational Diffie-Hellman problem
                    </li>
                  </ul>
                  <p>
                    In 1994, Peter Shor developed a quantum algorithm that can efficiently solve these 
                    mathematical problems, making our current public-key infrastructure obsolete once 
                    sufficiently powerful quantum computers become available.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">Post-Quantum Approaches</h3>
                  <p>
                    Post-quantum cryptography is based on alternative mathematical problems that are believed 
                    to be difficult even for quantum computers to solve. The main approaches include:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card className="border border-chart-1/20 bg-chart-1/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Lattice-Based Cryptography</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        Based on the difficulty of finding the shortest vector in a high-dimensional lattice.
                        CRYSTALS-Kyber is a prominent example.
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-chart-2/20 bg-chart-2/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Hash-Based Cryptography</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        Security based on the properties of cryptographic hash functions.
                        Examples include SPHINCS+.
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-chart-3/20 bg-chart-3/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Code-Based Cryptography</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        Based on the difficulty of decoding random linear codes.
                        Classic McEliece is an example.
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-chart-4/20 bg-chart-4/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Multivariate Cryptography</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        Based on the difficulty of solving systems of multivariate polynomial equations.
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6">The NIST PQC Standardization Process</h3>
                  <p>
                    In 2016, the National Institute of Standards and Technology (NIST) initiated a process 
                    to evaluate and standardize post-quantum cryptographic algorithms. After multiple rounds 
                    of evaluation, in July 2022, NIST selected:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>
                      <strong>CRYSTALS-Kyber</strong> for general encryption and key establishment
                    </li>
                    <li>
                      <strong>CRYSTALS-Dilithium, FALCON, and SPHINCS+</strong> for digital signatures
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <Alert className="bg-primary/5 border border-primary/20">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <AlertTitle>Why It Matters Now</AlertTitle>
                      <AlertDescription>
                        Even though large-scale quantum computers don't exist yet, organizations should begin 
                        transitioning to post-quantum cryptography now because:
                        <ul className="list-disc pl-5 mt-2">
                          <li>The "harvest now, decrypt later" threat means sensitive data encrypted today could be decrypted in the future</li>
                          <li>Cryptographic transitions take years to complete in large systems</li>
                          <li>Standards and best practices are already being established</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quantum-computing" className="space-y-8 p-2">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Quantum Computing and Cryptography</h2>
                  <p>
                    Quantum computers leverage the principles of quantum mechanics to perform computations in fundamentally 
                    different ways than classical computers. Instead of using bits that are either 0 or 1, quantum 
                    computers use quantum bits or "qubits" that can exist in multiple states simultaneously thanks to 
                    superposition and entanglement.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">Quantum Threats to Cryptography</h3>
                  <p>
                    Two quantum algorithms pose significant threats to current cryptographic systems:
                  </p>
                  
                  <Card className="mt-4 border border-destructive/20 bg-destructive/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-destructive" />
                        Shor's Algorithm (1994)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        Peter Shor's algorithm efficiently solves integer factorization and discrete logarithm problems 
                        on a quantum computer. This directly breaks:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>RSA encryption</strong> - Based on the difficulty of factoring large numbers</li>
                        <li><strong>Elliptic Curve Cryptography</strong> - Based on the discrete logarithm problem in elliptic curve groups</li>
                        <li><strong>Diffie-Hellman key exchange</strong> - Based on the computational Diffie-Hellman problem</li>
                      </ul>
                      <p>
                        With a sufficiently powerful quantum computer, Shor's algorithm reduces the complexity of breaking 
                        these cryptosystems from exponential to polynomial time.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-4 border border-orange-500/20 bg-orange-500/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        Grover's Algorithm (1996)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        Lov Grover's search algorithm provides a quadratic speedup for searching unstructured databases. 
                        This affects:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Symmetric encryption</strong> - AES and other symmetric ciphers</li>
                        <li><strong>Hash functions</strong> - SHA-256 and other cryptographic hash functions</li>
                      </ul>
                      <p>
                        Grover's algorithm effectively halves the security level of symmetric cryptography. For example, 
                        AES-128 would offer only 64 bits of security against a quantum computer, while AES-256 would 
                        provide 128 bits of security.
                      </p>
                      <p>
                        The practical solution is to double key sizes (e.g., use AES-256 instead of AES-128).
                      </p>
                    </CardContent>
                  </Card>
                  
                  <h3 className="text-xl font-semibold mt-6">Current State of Quantum Computing</h3>
                  <p>
                    While quantum computers exist today, they are not yet powerful enough to break current cryptographic 
                    systems. Current quantum computers:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Have limited numbers of qubits (less than 1,000)</li>
                    <li>Suffer from high error rates ("noisy" qubits)</li>
                    <li>Have limited coherence times (how long qubits maintain their quantum state)</li>
                    <li>Are still primarily experimental and research-focused</li>
                  </ul>
                  
                  <p className="mt-4">
                    However, significant progress is being made in quantum computing, and experts estimate that 
                    cryptographically relevant quantum computers could become available within the next 10-15 years.
                  </p>
                  
                  <div className="mt-6">
                    <Alert className="bg-primary/5 border border-primary/20">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <AlertTitle>Quantum-Safe Timeline</AlertTitle>
                      <AlertDescription>
                        Organizations should consider the following timeline for transitioning to post-quantum cryptography:
                        <div className="mt-4 relative border-l-2 border-primary/30 pl-6 space-y-4">
                          <div>
                            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                            <p className="font-medium">Current - 2025</p>
                            <p className="text-sm text-muted-foreground">Awareness, inventory, and preparation phase</p>
                          </div>
                          <div>
                            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                            <p className="font-medium">2025 - 2030</p>
                            <p className="text-sm text-muted-foreground">Transition critical systems to hybrid or fully post-quantum solutions</p>
                          </div>
                          <div>
                            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px]"></div>
                            <p className="font-medium">2030 - 2035</p>
                            <p className="text-sm text-muted-foreground">Complete transition before cryptographically relevant quantum computers emerge</p>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crystals-kyber" className="space-y-8 p-2">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">CRYSTALS-Kyber</h2>
                  <p>
                    CRYSTALS-Kyber is a lattice-based key encapsulation mechanism (KEM) that was selected by NIST 
                    as the primary algorithm for general encryption and key establishment in the post-quantum era. 
                    Its name stands for "Cryptographic Suite for Algebraic Lattices."
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6">How Kyber Works</h3>
                  <p>
                    Kyber is based on the hardness of the Module Learning With Errors (MLWE) problem, a variant of 
                    the well-studied Learning With Errors (LWE) problem in lattice-based cryptography.
                  </p>
                  
                  <Card className="mt-4 border border-chart-1/20 bg-chart-1/5">
                    <CardHeader className="pb-2">
                      <CardTitle>Key Encapsulation Mechanism (KEM)</CardTitle>
                      <CardDescription>
                        Kyber implements a KEM rather than traditional encryption. A KEM is used to securely 
                        transport symmetric keys.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Generation</h4>
                        <div className="text-sm text-muted-foreground">
                          <p>The recipient generates:</p>
                          <ul className="list-disc pl-5 mt-1">
                            <li>A public key that can be shared</li>
                            <li>A private key that must be kept secret</li>
                          </ul>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Encapsulation</h4>
                        <div className="text-sm text-muted-foreground">
                          <p>The sender uses the recipient's public key to:</p>
                          <ul className="list-disc pl-5 mt-1">
                            <li>Generate a random shared secret</li>
                            <li>Create a ciphertext that encapsulates this secret</li>
                            <li>Send the ciphertext to the recipient</li>
                            <li>Use the shared secret for symmetric encryption</li>
                          </ul>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Decapsulation</h4>
                        <div className="text-sm text-muted-foreground">
                          <p>The recipient uses their private key to:</p>
                          <ul className="list-disc pl-5 mt-1">
                            <li>Recover the shared secret from the ciphertext</li>
                            <li>Use this shared secret for symmetric decryption</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <h3 className="text-xl font-semibold mt-6">Kyber Variants</h3>
                  <p>
                    Kyber comes in three variants with different security levels:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Kyber-512</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>AES-128 equivalent security</li>
                          <li>Public key: 800 bytes</li>
                          <li>Ciphertext: 768 bytes</li>
                          <li>Smallest and fastest variant</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-primary/30 bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Kyber-768</CardTitle>
                        <CardDescription className="text-xs">NIST's chosen security level</CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>AES-192 equivalent security</li>
                          <li>Public key: 1,184 bytes</li>
                          <li>Ciphertext: 1,088 bytes</li>
                          <li>Balanced security/performance</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Kyber-1024</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>AES-256 equivalent security</li>
                          <li>Public key: 1,568 bytes</li>
                          <li>Ciphertext: 1,568 bytes</li>
                          <li>Highest security, largest keys</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6">Advantages of Kyber</h3>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Strong security guarantees against both classical and quantum attacks</li>
                    <li>Excellent performance characteristics compared to other post-quantum algorithms</li>
                    <li>Relatively small key and ciphertext sizes for a post-quantum algorithm</li>
                    <li>Well-studied underlying mathematical problem (MLWE)</li>
                    <li>Clear specification and relatively simple implementation</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6">Implementation Status</h3>
                  <p>
                    Kyber is being actively implemented across the industry:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>OpenSSL is adding experimental support</li>
                    <li>TLS 1.3 has draft specifications for using Kyber</li>
                    <li>Multiple cryptographic libraries now support Kyber</li>
                    <li>Major cloud providers are beginning to implement post-quantum TLS using Kyber</li>
                  </ul>
                  
                  <div className="mt-6">
                    <Alert className="bg-card border border-card">
                      <Code className="h-4 w-4" />
                      <AlertTitle>Resources for Developers</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button variant="outline" asChild className="text-left justify-start">
                            <Link href="https://pq-crystals.org/kyber/" target="_blank" className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              <div>
                                <div className="font-medium">Official CRYSTALS Website</div>
                                <div className="text-xs text-muted-foreground">pq-crystals.org/kyber</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button variant="outline" asChild className="text-left justify-start">
                            <Link href="https://csrc.nist.gov/Projects/post-quantum-cryptography" target="_blank" className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              <div>
                                <div className="font-medium">NIST PQC Project</div>
                                <div className="text-xs text-muted-foreground">csrc.nist.gov</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button variant="outline" asChild className="text-left justify-start">
                            <Link href="https://github.com/pq-crystals/kyber" target="_blank" className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              <div>
                                <div className="font-medium">Kyber Reference Implementation</div>
                                <div className="text-xs text-muted-foreground">github.com/pq-crystals/kyber</div>
                              </div>
                            </Link>
                          </Button>
                          
                          <Button variant="outline" asChild className="text-left justify-start">
                            <Link href="https://nvlpubs.nist.gov/nistpubs/ir/2022/NIST.IR.8413.pdf" target="_blank" className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              <div>
                                <div className="font-medium">NIST Status Report</div>
                                <div className="text-xs text-muted-foreground">July 2022 Selection</div>
                              </div>
                            </Link>
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

function ResourceCard({ title, description, icon: Icon, href, color }: ResourceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={href}>
        <Card className={`h-full border border-${color}/30 bg-${color}/5 backdrop-blur-sm transition-all group-hover:border-${color}/50 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]`}>
          <CardHeader className="pb-2">
            <div className={`w-12 h-12 rounded-full bg-${color}/20 flex items-center justify-center mb-4`}>
              <Icon className={`h-6 w-6 text-${color}`} />
            </div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </motion.div>
  );
}

function AlertTriangle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}