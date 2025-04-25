# Quantum-Safe Vault

A production-ready web application demonstrating post-quantum cryptography with a comparison to traditional cryptographic methods.

## Features

- Interactive demonstration of CRYSTALS-Kyber-768 key exchange
- Side-by-side comparison with RSA-2048 showing performance metrics
- Real-time AES-GCM encryption/decryption using negotiated keys
- Educational resources explaining quantum threats and post-quantum cryptography
- Beautiful dark mode interface with quantum-inspired visuals

## Project Structure

```
quantum-safe-vault/
├── app/                 # Next.js pages and routing
├── backend/             # FastAPI backend
├── components/          # React components
├── lib/                 # Utility functions
├── public/              # Static assets
├── render.yaml          # Render.com deployment configuration
└── README.md            # Project documentation
```

## Technology Stack

### Frontend
- Next.js 13 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- shadcn/ui for UI components
- Recharts for data visualization

### Backend
- FastAPI (Python)
- CRYSTALS-Kyber implementation
- AES-GCM encryption

### Deployment
- Render.com configuration included

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/quantum-safe-vault.git
cd quantum-safe-vault
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Running the application

1. Start the backend
```bash
cd backend
uvicorn main:app --reload
```

2. In a new terminal, start the frontend
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Development

### Project Structure Details

- `/app`: Next.js application routes and pages
- `/backend`: FastAPI backend services
- `/components`: Reusable React components
- `/components/demo`: Components specific to the cryptography demonstration
- `/lib`: Utility functions and shared code

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

This project includes a `render.yaml` file for easy deployment to Render.com:

1. Push your code to GitHub
2. Create a new Render.com blueprint
3. Point it to your GitHub repository
4. Render will automatically deploy both the frontend and backend

## Educational Resources

The application includes comprehensive educational materials about:
- Post-quantum cryptography basics
- The quantum threat to current cryptographic systems
- How CRYSTALS-Kyber works
- NIST's post-quantum cryptography standardization process

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- NIST for the Post-Quantum Cryptography standardization process
- The CRYSTALS-Kyber team for their groundbreaking work
- shadcn/ui for the beautiful component library# Quantum_Cybersecurity_Demo
