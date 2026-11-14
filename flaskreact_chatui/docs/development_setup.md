# Development Environment Setup Guide

## 1. Overview

This document describes how to set up and run the local development environment for the Flask and React application.

### Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend development |
| Flask | Backend web framework |
| Node.js | JavaScript runtime |
| npm | Frontend package management |
| React | Frontend UI development |
| TypeScript | Static typing for JavaScript |
| Vite | Frontend development server |

### Project Structure

```text
flaskreact_chatui/
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
│
├── docs/
│   └── development_setup.md
│
├── .venv/
├── .gitignore
└── requirements.txt
```

---

## 2. Prerequisites

Install the following software before starting development.

### 2.1 Python

Python is used to develop and run the Flask backend.

Check the installed version:

```bash
python3 --version
```

### 2.2 Node.js

Node.js is required to run the React development environment and npm commands.

Check the installed version:

```bash
node -v
```

### 2.3 npm

npm is used to install and manage frontend dependencies.

Check the installed version:

```bash
npm -v
```

---

## 3. Backend Environment Setup

### 3.1 Create a Python Virtual Environment

Move to the project root directory:

```bash
cd flaskreact_chatui
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

After activation, `(.venv)` should appear at the beginning of the terminal prompt.

**Purpose:**

A virtual environment isolates Python packages for this project and prevents conflicts with packages installed in other Python environments.

### 3.2 Install Python Dependencies

Upgrade pip:

```bash
python -m pip install --upgrade pip
```

Install the required packages:

```bash
python -m pip install -r requirements.txt
```

**Purpose:**

`requirements.txt` manages the Python dependencies required by the backend application.

### 3.3 Verify Flask Installation

Check whether Flask is installed:

```bash
python -m pip show flask
```

If Flask information is displayed, the installation was successful.

---

## 4. Frontend Environment Setup

### 4.1 Move to the Frontend Directory

```bash
cd frontend
```

### 4.2 Install npm Dependencies

Install the packages defined in `package.json`:

```bash
npm install
```

**Purpose:**

npm installs the dependencies required to run and develop the React application.

`package-lock.json` manages the dependency versions to help maintain a consistent environment.

### 4.3 Verify Frontend Setup

Check the installed dependencies:

```bash
npm list --depth=0
```

---

## 5. Start the Backend Server

Open a terminal and move to the project root directory:

```bash
cd flaskreact_chatui
```

Activate the Python virtual environment:

```bash
source .venv/bin/activate
```

Start the Flask application:

```bash
python app.py
```

**Note:**

The startup command depends on the actual Flask entry point. If the application uses a different entry-point file, replace `app.py` with the appropriate filename.

---

## 6. Start the Frontend Server

Open another terminal window.

Move to the frontend directory:

```bash
cd flaskreact_chatui/frontend
```

Start the Vite development server:

```bash
npm run dev
```

Vite starts the local frontend development server.

The terminal displays the local URL after startup.

---

## 7. Access URLs

Use the following URLs to access the local development environment.

| Service | URL | Purpose |
|---|---|---|
| React + Vite | http://localhost:5173/ | Frontend application |
| Flask | http://127.0.0.1:5000/ | Backend application |

**Note:**

The URLs above assume the default Vite and Flask ports. The actual URLs may differ depending on the application configuration.

---

## 8. Troubleshooting

### 8.1 Flask Module Not Found

**Error:**

```text
ModuleNotFoundError: No module named 'flask'
```

**Solution:**

Activate the Python virtual environment:

```bash
source .venv/bin/activate
```

Install the dependencies again:

```bash
python -m pip install -r requirements.txt
```

### 8.2 npm Command Not Found

**Error:**

```text
command not found: npm
```

**Solution:**

Check whether Node.js and npm are installed:

```bash
node -v
npm -v
```

If they are not installed, install Node.js and configure the environment variables if necessary.

### 8.3 Frontend Dependencies Not Found

**Error:**

```text
Cannot find module
```

**Solution:**

Move to the frontend directory and reinstall dependencies:

```bash
cd frontend
npm install
```

### 8.4 Port Already in Use

**Error:**

```text
Address already in use
```

**Solution:**

Another process may already be using the required port.

Stop the existing development server or configure the application to use another port.

### 8.5 Frontend Cannot Connect to Backend

**Possible causes:**

- Flask is not running.
- The API endpoint is incorrect.
- The frontend and backend CORS settings are not configured correctly.

**Solution:**

1. Confirm that the Flask server is running.
2. Check the API endpoint configured in the frontend.
3. Verify the CORS configuration if the frontend and backend use different origins.

---

## 9. Development Workflow

The following steps should be performed whenever starting local development.

### Backend

```bash
cd flaskreact_chatui
source .venv/bin/activate
python app.py
```

### Frontend

Open another terminal:

```bash
cd flaskreact_chatui/frontend
npm run dev
```

Access the frontend application:

```text
http://localhost:5173/
```

Keep both development servers running while developing the application.

---

## 10. Git Management

The following files and directories should not be committed to Git:

- `.venv/`
- `node_modules/`
- `.env`
- `dist/`
- `__pycache__/`

These files are excluded through `.gitignore`.

Python and frontend dependencies should be managed using:

- `requirements.txt`
- `package.json`
- `package-lock.json`