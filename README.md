# FinChat Assignment by Tony Kim
### Structure:
####    Express.js(Backend) + React.js(Frontend)
### Functionality: 
####    Sends a user-input prompt to the backend, processes it via OpenAI and FMP APIs, and displays the summary
### Deployment Considerations: 
####    `.end` setup required, run backend and frontend servers separately

## 📂 Proejct Introduction
This project offers a seamless and interactive chat experience that can answer various financial-related questions with real-time AI responses and data fetching, 
helping users gain valuable insights into companies' financials and key management comments

#### Requirements:
1. Backend Integration
   - Use the OpenAI API to generate summaries and responses
   - Use the FMP API to fetch financial data and metrics
2. Frontend Interface
   - Build a basic UI chat interface (preferably with React/Next.js) that allows users to input queries
   - The UI should interact with the backend and display the AI-generated summaries and financial data responses

## ⏲️ Development Period
- Feb.13th.2025 ~ Feb.18th.2025

## ⚙️ Development Environment

- Test tool : JUnit5
- Infra : Docker, AWS ECR, ECS, FARGATE
- VCS : Git / GitHub
- IDEA : VSCode

## 🚀 Tech Stack & Testing Tools
### Backend
- Node.js:     Backend runtime environment
- Express.js:  Lightweight web framework
- dotenv:      Environment variable management
- body-parser: Parses JSON and URL-encoded data
- CORS:        Enables cross-origin resource sharing
- Axios:       HTTP client for API requests
- Jest:        JavaScript testing framework
- nodemon:     Development tool for auto-reloading server during changes
- supertest:   Testing library for HTTP assertions

### Frontend
- React.js:       JavaScript library for building user interfaces
- React Icons:    Library for adding icons to React components
- react-scripts:  Set of scripts for React development
- web-vitals:     Measures vital performance metrics for web apps
- Sass (sass):    CSS preprocessor for more dynamic and manageable styles
- Jest:           Testing framework for JavaScript
- @testing-library/react:       Library for testing React components
- @testing-library/jest-dom:    Custom matchers for Jest tests with DOM elements
- @testing-library/user-event:  Simulates user events for testing UI interactions

## 📂 Project Structure
### Backend
```bash
backend/
│── node_modules/                   # Installed dependencies
│── src/
│   ├── controllers/                # Business logic for handling requests
│   │   ├── financialControllers.js
│   │   ├── openaiControllers.js
│   ├── routes/                     # Route definitions
│   │   ├── financialRoutes.js
│   │   ├── openaiRoutes.js
│   ├── services/                   # External API interaction & business logic
│   │   ├── fmpService.js           # Handles Financial Modeling Prep API calls
│   │   ├── openaiService.js        # Handles OpenAI API calls
│   ├── app.js                      # Express server configuration
│── tests/                          # Unit tests
│   ├── controllers/
│   │   ├── openaiControllers.test.js
│   ├── services/
│   │   ├── fmpService.test.js
│   │   ├── openaiService.test.js
│── .env                            # Environment variables
│── .gitignore                      # Git ignore file
│── package.json                    # Project dependencies and scripts
│── package-lock.json               # Lock file for dependency versions
```

### Frontend
```bash
frontend/
│── node_modules/                   # Installed dependencies
│── public/                         # Static assets like index.html, icons, etc.
│── src/
│   ├── components/                 # Reusable UI components
│   │   ├── Footer.js               
│   │   ├── Footer.scss             
│   │   ├── Footer.test.js          
│   ├── pages/prompt                # Pages for the prompt functionality
│   │   ├── input/                  # Components for input functionality
│   │   │  ├── InputPrompt.js       
│   │   │  ├── InputPrompt.scss     
│   │   │  ├── InputPrompt.test.js  
│   │   ├── output/                 # Components for output functionality
│   │   │  ├── OutputPrompt.js      
│   │   │  ├── OutputPrompt.scss    
│   │   │  ├── OutputPrompt.test.js 
│   ├── app.js                      # Main app component
│   ├── app.scss                    # Global styles
│   ├── app.test.js                 # Unit tests for the main app component
│── .env                            # Environment variables (e.g., backend API URL)
│── .gitignore                      # Git ignore file
│── package.json                    # Project dependencies and scripts
│── package-lock.json               # Lock file for dependency versions       
```

### 📌 Environment Variables (.env)
This project uses `.env` to manage API keys and configuration.
Before starting both backend & frontend, you need to create a `.env` file with the following format:

#### Backend
```bash
PORT= { 5000 }
FMP_API_KEY= { YOUR_FINANCIAL_MODELING_PREP_API_KEY }
FMP_URL= { FMP_URL }
CHATGPT_API_KEY= { YOUR_CHATGPT_API_KEY }
CHATGPT_URL= { CHAT_GPT_API_URL }
```

#### Frontend
```bash
REACT_APP_BACKEND_URL= { YOUR_LOCAL_BACKEND_URL }
```

## 📌 APIs & External Services
#### OpenAI API:  Generates text summaries and responses using ChatGPT
#### Financial Modeling Prep API:  Fetches and analyzes financial data

## 🏃Getting started in the local environment
### Prerequisites
Before you begin, ensure you have the following installed:
```Node.js (Recommended version: v16 or higher)```
```npm (Node package manager, comes with Node.js)```

### Setting Up
Clone the project repository to your local machine:
```bash
git clone https://github.com/TonyKim9401/finchatAssignments.git
```

### Backend
#### Navigate to the project directory
```bash
cd finchatAssignments/backend
```
#### Install dependencies
```bash
npm install
```
#### Run test code
```bash
npx jest
```
#### Run the local development server
```bash
npm run dev
```
#### Send test curl request to check backend is running
```bash
curl -X POST http://localhost:5010/api/v1/finchat/openai/summarize \
     -H "Content-Type: application/json" \
     -d "{\"content\": \"Summarize Spotify's latest conference call.\"}"
```

### Frontend
#### Navigate to the project directory
```bash
cd finchatAssignments/frontend
```
#### Install dependencies
```bash
npm install
```
#### Run the local development server
```bash
npm start
```
#### Run test code
```bash
npm test
```
#### Open your web browser and go to 
`Mac environment`
```bash
open http://localhost:3000/contacts
```
`Window environment`
```bash
start http://localhost:3000/contacts
```

## 📌 Feature offered

## 📑 Project Review

