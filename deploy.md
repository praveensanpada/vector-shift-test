# Azure VM Deployment Guide

This file explains how to deploy the VectorShift Pipeline Builder on a Microsoft Azure virtual machine using a free Azure subscription.

The easiest deployment for this assessment is:

```text
Azure VM
|
|-- backend running with FastAPI on port 8000
|-- frontend running with React on port 3000
```

This is good for demo and interview submission.

## 1. Create Azure Virtual Machine

Go to Azure Portal:

```text
https://portal.azure.com
```

Create one virtual machine.

Recommended free-tier-friendly settings:

```text
Image: Ubuntu Server 22.04 LTS
Size: B1s or free eligible small VM
Authentication: SSH key
Inbound ports: SSH 22
```

After VM is created, copy the public IP address.

Example:

```text
20.10.50.100
```

## 2. Open Required Ports

In Azure Portal:

```text
Virtual Machine
  -> Networking
  -> Add inbound port rule
```

Add these ports:

```text
22    SSH
3000  React frontend
8000  FastAPI backend
```

For demo only, you can allow source as `Any`.

For better security, allow only your IP address.

## 3. Connect To VM

From your local terminal:

```bash
ssh azureuser@YOUR_VM_PUBLIC_IP
```

Example:

```bash
ssh azureuser@20.10.50.100
```

## 4. Install Required Software

Run these commands on the VM:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl python3 python3-pip python3-venv
```

Install Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Check versions:

```bash
python3 --version
node --version
npm --version
```

## 5. Clone Your GitHub Repository

On the VM:

```bash
git clone https://github.com/praveensanpada/vector-shift-test.git
cd vector-shift-test
```

## 6. Setup Backend Environment

Go to backend folder:

```bash
cd backend
```

Create `.env`:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
nano .env
```

Use this:

```env
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
FRONTEND_ORIGINS=http://YOUR_VM_PUBLIC_IP:3000
```

Example:

```env
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
FRONTEND_ORIGINS=http://20.10.50.100:3000
```

Save file:

```text
CTRL + O
ENTER
CTRL + X
```

Run backend:

```bash
chmod +x setup_and_run.sh
./setup_and_run.sh
```

Backend should run on:

```text
http://YOUR_VM_PUBLIC_IP:8000
```

Test in browser:

```text
http://YOUR_VM_PUBLIC_IP:8000
```

You should see:

```json
{"Ping":"Pong"}
```

## 7. Setup Frontend Environment

Open a second SSH terminal.

Connect again:

```bash
ssh azureuser@YOUR_VM_PUBLIC_IP
```

Go to project frontend:

```bash
cd vector-shift-test/frontend
```

Create `.env`:

```bash
cp .env.example .env
```

Edit `.env`:

```bash
nano .env
```

Use this:

```env
REACT_APP_API_URL=http://YOUR_VM_PUBLIC_IP:8000
PORT=3000
HOST=0.0.0.0
```

Example:

```env
REACT_APP_API_URL=http://20.10.50.100:8000
PORT=3000
HOST=0.0.0.0
```

Run frontend:

```bash
chmod +x setup_and_run.sh
./setup_and_run.sh
```

Frontend should run on:

```text
http://YOUR_VM_PUBLIC_IP:3000
```

## 8. Important Change For React On Azure VM

React development server must bind to all network interfaces.

That is why frontend `.env` should include:

```env
HOST=0.0.0.0
PORT=3000
```

Without `HOST=0.0.0.0`, the app may run only inside the VM and not open from your browser.

## 9. Keep App Running After SSH Close

If you close SSH, the app stops.

For demo, use `tmux`.

Install:

```bash
sudo apt install -y tmux
```

Start backend session:

```bash
tmux new -s backend
cd vector-shift-test/backend
./setup_and_run.sh
```

Detach:

```text
CTRL + B
D
```

Start frontend session:

```bash
tmux new -s frontend
cd vector-shift-test/frontend
./setup_and_run.sh
```

Detach:

```text
CTRL + B
D
```

See running sessions:

```bash
tmux ls
```

Open backend session again:

```bash
tmux attach -t backend
```

Open frontend session again:

```bash
tmux attach -t frontend
```

## 10. Final URLs

Use these in your browser:

```text
Frontend:
http://YOUR_VM_PUBLIC_IP:3000

Backend:
http://YOUR_VM_PUBLIC_IP:8000
```

Example:

```text
Frontend:
http://20.10.50.100:3000

Backend:
http://20.10.50.100:8000
```

## 11. Common Problems

### Problem: Frontend does not open

Check Azure inbound rule for port `3000`.

Check frontend `.env`:

```env
HOST=0.0.0.0
PORT=3000
```

### Problem: Backend does not open

Check Azure inbound rule for port `8000`.

Check backend `.env`:

```env
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
```

### Problem: Frontend opens but submit fails

Check frontend `.env`:

```env
REACT_APP_API_URL=http://YOUR_VM_PUBLIC_IP:8000
```

Check backend `.env`:

```env
FRONTEND_ORIGINS=http://YOUR_VM_PUBLIC_IP:3000
```

Then restart both frontend and backend.

### Problem: Permission denied for script

Run:

```bash
chmod +x setup_and_run.sh
```

## 12. Simple Deployment Summary

Backend:

```bash
cd backend
cp .env.example .env
nano .env
./setup_and_run.sh
```

Frontend:

```bash
cd frontend
cp .env.example .env
nano .env
./setup_and_run.sh
```

Azure ports:

```text
22
3000
8000
```

## 13. Production Note

For an assessment demo, running React on port `3000` and FastAPI on port `8000` is fine.

For a real production deployment, a better setup would be:

```text
Nginx on port 80/443
React build served as static files
FastAPI behind reverse proxy
systemd service for backend
HTTPS with SSL certificate
```

But for this VectorShift assessment, the VM demo setup is enough and simple to explain.
