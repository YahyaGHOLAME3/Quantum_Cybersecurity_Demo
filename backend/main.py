from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import time
import json
import random
import os
from fastapi.responses import JSONResponse

# In a production environment, you would use real cryptographic libraries
# such as pqcrypto for Kyber implementation

app = FastAPI(title="Quantum-Safe Vault Backend API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class KeyExchangeRequest(BaseModel):
    algorithm: str
    public_key: Optional[str] = None
    message_size: Optional[int] = 1024

class EncryptionRequest(BaseModel):
    algorithm: str
    message: str
    key: str

@app.get("/")
async def root():
    return {"message": "Quantum-Safe Vault API is running"}

@app.post("/api/generate-keypair")
async def generate_keypair(request: KeyExchangeRequest):
    start_time = time.time()

    # Simulate key generation time differences
    if request.algorithm == "kyber":
        # Simulate Kyber key generation (faster)
        time.sleep(0.1)
        key_size = 1184  # Kyber-768 public key size
        keypair = {
            "public_key": generate_random_key(key_size),
            "private_key": generate_random_key(key_size // 2)
        }
    elif request.algorithm == "rsa":
        # Simulate RSA key generation (slower)
        time.sleep(0.5)
        key_size = 256  # RSA-2048 key size in bytes
        keypair = {
            "public_key": generate_random_key(key_size),
            "private_key": generate_random_key(key_size)
        }
    else:
        raise HTTPException(status_code=400, detail="Unsupported algorithm")

    end_time = time.time()

    return {
        "algorithm": request.algorithm,
        "keypair": keypair,
        "metrics": {
            "generation_time": end_time - start_time,
            "key_size": key_size
        }
    }

@app.post("/api/exchange-key")
async def exchange_key(request: KeyExchangeRequest):
    start_time = time.time()

    if not request.public_key:
        raise HTTPException(status_code=400, detail="Public key is required")

    # Simulate key exchange process
    if request.algorithm == "kyber":
        # Simulate Kyber encapsulation (faster)
        time.sleep(0.05)
        shared_key = generate_random_key(32)  # 256-bit shared key
        ciphertext = generate_random_key(1088)  # Kyber-768 ciphertext size
    elif request.algorithm == "rsa":
        # Simulate RSA key exchange (slower)
        time.sleep(0.3)
        shared_key = generate_random_key(32)  # 256-bit shared key
        ciphertext = generate_random_key(256)  # RSA-2048 ciphertext size
    else:
        raise HTTPException(status_code=400, detail="Unsupported algorithm")

    end_time = time.time()

    return {
        "algorithm": request.algorithm,
        "shared_key": shared_key,
        "ciphertext": ciphertext,
        "metrics": {
            "exchange_time": end_time - start_time,
            "ciphertext_size": len(ciphertext)
        }
    }

@app.post("/api/encrypt")
async def encrypt_message(request: EncryptionRequest):
    start_time = time.time()

    # Simulate encryption process
    # In a real application, you would use proper encryption libraries
    encrypted_message = f"ENCRYPTED[{request.message}]"

    end_time = time.time()

    return {
        "algorithm": request.algorithm,
        "encrypted_message": encrypted_message,
        "metrics": {
            "encryption_time": end_time - start_time,
            "message_size": len(request.message),
            "encrypted_size": len(encrypted_message)
        }
    }

@app.post("/api/decrypt")
async def decrypt_message(request: EncryptionRequest):
    start_time = time.time()

    # Simulate decryption process
    # This is just a mock - in a real app you would use actual decryption
    if request.message.startswith("ENCRYPTED[") and request.message.endswith("]"):
        decrypted_message = request.message[10:-1]
    else:
        decrypted_message = "Decryption failed"

    end_time = time.time()

    return {
        "algorithm": request.algorithm,
        "decrypted_message": decrypted_message,
        "metrics": {
            "decryption_time": end_time - start_time
        }
    }

@app.get("/api/security-comparison")
async def security_comparison():
    return {
        "kyber": {
            "security_level": "Level 3 (AES-192 equivalent)",
            "quantum_resistance": "High",
            "key_size": 1184,
            "ciphertext_size": 1088,
            "performance_factor": 5.2,
            "nist_status": "Standardized"
        },
        "rsa": {
            "security_level": "128-bit",
            "quantum_resistance": "None",
            "key_size": 256,
            "ciphertext_size": 256,
            "performance_factor": 1.0,
            "nist_status": "Legacy"
        }
    }

def generate_random_key(size: int) -> str:
    """Generate a random key of given size in bytes, returning as hex string"""
    return ''.join(random.choice('0123456789abcdef') for _ in range(size * 2))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
