"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, ShieldCheck, LockKeyhole, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CryptoJS from 'crypto-js';

export function EncryptionDemo({ demoState }: { demoState: any }) {
  const { toast } = useToast();
  const [algorithm, setAlgorithm] = useState<"kyber" | "rsa">("kyber");
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [isLoading, setIsLoading] = useState({
    encrypting: false,
    decrypting: false
  });

  const hasRequiredKeys = algorithm === "kyber" 
    ? !!demoState.kyberSharedKey 
    : !!demoState.rsaSharedKey;

  const encryptMessage = (message: string, key: string) => {
    // Generate a random IV
    const iv = CryptoJS.lib.WordArray.random(16);
    
    // Convert the key to the correct format
    const keyBytes = CryptoJS.enc.Hex.parse(key);
    
    // Encrypt the message using AES-GCM
    const encrypted = CryptoJS.AES.encrypt(message, keyBytes, {
      iv: iv,
      mode: CryptoJS.mode.GCM,
      padding: CryptoJS.pad.NoPadding
    });
    
    // Combine IV and ciphertext
    const combined = iv.concat(encrypted.ciphertext);
    
    // Return as base64 string
    return CryptoJS.enc.Base64.stringify(combined);
  };

  const decryptMessage = (encryptedData: string, key: string) => {
    try {
      // Convert from base64
      const combined = CryptoJS.enc.Base64.parse(encryptedData);
      
      // Extract IV and ciphertext
      const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4));
      const ciphertext = CryptoJS.lib.WordArray.create(combined.words.slice(4));
      
      // Convert the key to the correct format
      const keyBytes = CryptoJS.enc.Hex.parse(key);
      
      // Decrypt
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        keyBytes,
        {
          iv: iv,
          mode: CryptoJS.mode.GCM,
          padding: CryptoJS.pad.NoPadding
        }
      );
      
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw new Error("Decryption failed");
    }
  };

  const handleEncrypt = async () => {
    if (!hasRequiredKeys) {
      toast({
        title: "No Shared Key Available",
        description: `Please generate and exchange ${algorithm.toUpperCase()} keys first.`,
        variant: "destructive"
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a message to encrypt.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, encrypting: true }));

    try {
      const key = algorithm === "kyber" ? demoState.kyberSharedKey : demoState.rsaSharedKey;
      const encrypted = encryptMessage(message, key);
      setEncryptedMessage(encrypted);
      
      toast({
        title: "Message Encrypted",
        description: `Successfully encrypted using ${algorithm.toUpperCase()}-negotiated key.`
      });
    } catch (error) {
      toast({
        title: "Encryption Failed",
        description: "There was a problem encrypting your message.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, encrypting: false }));
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedMessage) {
      toast({
        title: "No Encrypted Message",
        description: "Please encrypt a message first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(prev => ({ ...prev, decrypting: true }));

    try {
      const key = algorithm === "kyber" ? demoState.kyberSharedKey : demoState.rsaSharedKey;
      const decrypted = decryptMessage(encryptedMessage, key);
      setDecryptedMessage(decrypted);
      
      toast({
        title: "Message Decrypted",
        description: `Successfully decrypted using ${algorithm.toUpperCase()}-negotiated key.`
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: "There was a problem decrypting your message.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, decrypting: false }));
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
          <AlertTitle>Message Encryption</AlertTitle>
          <AlertDescription>
            Encrypt and decrypt messages using the shared keys established during key exchange.
            Choose between Kyber and RSA for the encryption process.
          </AlertDescription>
        </Alert>
      </motion.div>

      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Card className="border border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Encrypt & Decrypt Messages</CardTitle>
              <CardDescription>
                Using {algorithm === "kyber" ? "CRYSTALS-Kyber" : "RSA"} negotiated keys
              </CardDescription>
            </div>
            <Tabs
              value={algorithm}
              onValueChange={(value) => setAlgorithm(value as "kyber" | "rsa")}
              className="w-[250px]"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="kyber" className="relative">
                  Kyber
                  <Badge className="absolute -top-2 -right-2 bg-chart-1 text-[8px]">
                    PQ
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="rsa">RSA</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-6">
            {!hasRequiredKeys ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>No Shared Key Available</AlertTitle>
                <AlertDescription>
                  You need to generate and exchange {algorithm.toUpperCase()} keys first.
                  Please go back to the Key Exchange tab.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Enter a message to encrypt
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Type your secret message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[100px] font-mono text-sm"
                    disabled={isLoading.encrypting}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleEncrypt}
                      disabled={!message.trim() || isLoading.encrypting}
                      className={cn(
                        "gap-2",
                        algorithm === "kyber" ? "bg-chart-1 hover:bg-chart-1/90" : "bg-chart-3 hover:bg-chart-3/90"
                      )}
                    >
                      <LockKeyhole className="h-4 w-4" />
                      {isLoading.encrypting ? "Encrypting..." : "Encrypt Message"}
                    </Button>
                  </div>
                </div>

                {encryptedMessage && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Encrypted Message
                    </label>
                    <div className="p-3 bg-black/20 dark:bg-white/5 rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap break-all">
                      {encryptedMessage}
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handleDecrypt}
                        disabled={isLoading.decrypting}
                        variant="outline"
                        className="gap-2"
                      >
                        <Key className="h-4 w-4" />
                        {isLoading.decrypting ? "Decrypting..." : "Decrypt Message"}
                      </Button>
                    </div>
                  </div>
                )}

                {decryptedMessage && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Decrypted Message
                    </label>
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
                      {decryptedMessage}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mx-auto max-w-3xl">
        <Card className="border border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle>How AES Encryption Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              For the actual encryption of messages, both the Kyber and RSA key exchange methods 
              establish a shared secret key that's then used with a symmetric encryption algorithm, 
              typically AES-GCM (Advanced Encryption Standard in Galois/Counter Mode).
            </p>
            <div className="rounded-md bg-black/20 dark:bg-white/5 p-4 font-mono text-xs">
              <div className="space-y-2">
                <div><span className="text-chart-1">1.</span> Client and server establish a shared key through Kyber or RSA</div>
                <div><span className="text-chart-1">2.</span> The shared key is used to initialize AES-GCM encryption</div>
                <div><span className="text-chart-1">3.</span> A random initialization vector (IV) is generated</div>
                <div><span className="text-chart-1">4.</span> Message is encrypted with AES-GCM using the key and IV</div>
                <div><span className="text-chart-1">5.</span> Receiver uses the same key and IV to decrypt the message</div>
              </div>
            </div>
            <p>
              This hybrid approach combines the benefits of asymmetric cryptography (for secure key exchange) 
              with the performance advantages of symmetric encryption (for actual data encryption).
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}