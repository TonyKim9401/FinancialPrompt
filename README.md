# Financial AI Prompt

### Structure:

#### Express.js(Backend) + React.js(Frontend)

### Functionality:

#### Sends a user-input prompt to the backend, processes it via OpenAI and FMP APIs, and displays the summary

### Deployment Considerations:

#### `.end` setup required, run backend and frontend servers separately

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📂 Proejct Introduction

#### The application UI image

<img src="https://github.com/user-attachments/assets/8d56bd1f-7d03-42e5-a822-40bd504bdc6f" width="50%" />

This project offers a seamless and interactive chat experience that can answer various financial-related questions with real-time AI responses and data fetching,
helping users gain valuable insights into companies' financials and key management comments

#### Requirements:

- Backend Integration
  - Use the OpenAI API to generate summaries and responses
  - Use the FMP API to fetch financial data and metrics
- Frontend Interface
  - Build a basic UI chat interface (preferably with React/Next.js) that allows users to input queries
  - The UI should interact with the backend and display the AI-generated summaries and financial data responses

## ⏲️ Development Period

- Feb.13th.2025 ~ Feb.18th.2025

## 🚀 Tech Stack & Testing Tools

### Backend

- Node.js: Backend runtime environment
- Express.js: Lightweight web framework
- dotenv: Environment variable management
- body-parser: Parses JSON and URL-encoded data
- CORS: Enables cross-origin resource sharing
- Axios: HTTP client for API requests
- Jest: JavaScript testing framework
- nodemon: Development tool for auto-reloading server during changes
- supertest: Testing library for HTTP assertions

### Frontend

- React.js: JavaScript library for building user interfaces
- React Icons: Library for adding icons to React components
- react-scripts: Set of scripts for React development
- web-vitals: Measures vital performance metrics for web apps
- Sass (sass): CSS preprocessor for more dynamic and manageable styles
- Jest: Testing framework for JavaScript
- @testing-library/react: Library for testing React components
- @testing-library/jest-dom: Custom matchers for Jest tests with DOM elements
- @testing-library/user-event: Simulates user events for testing UI interactions

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

### ⚙️ Environment Variables (.env)

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

#### OpenAI API: Generates text summaries and responses using ChatGPT

#### Financial Modeling Prep API: Fetches and analyzes financial data

## 🏃Getting started in the local environment

### Prerequisites

Before you begin, ensure you have the following installed:
`Node.js (Recommended version: v16 or higher)`
`npm (Node package manager, comes with Node.js)`

### Setting Up

Clone the project repository to your local machine:

```bash
git clone https://github.com/TonyKim9401/FinancialPrompt.git
```

### Backend

#### Navigate to the project directory

```bash
cd FinancialPrompt/backend
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

This repository includes a Postman collection for interacting with the FinChat API.
The Postman file has been attached; please use it for backend testing.

- see the [Postman Collection](./FinancialPrompt.postman_collection) file for details.

### Frontend

#### Navigate to the project directory

```bash
cd FinancialPrompt/frontend
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

#### Open application on browsers

`Mac environment`

```bash
open http://localhost:3000/contacts
```

`Window environment`

```bash
start http://localhost:3000/contacts
```

## 📌 API Endpoints

#### POST `/api/v1/finchat/openai/summarize`

- Description: Calls the OpenAI API to summarize user input
- Request Format

```bash
{
   "content": "What is Tesla's expected earnings next quarter?"
}
```

- Response Example

```bash
{
   "answer": "Based on the most recent data available from the financial modeling prep data (fmpData), Tesla's expected earnings for ..."
}
```

## 📑 Project Review

### Strengths:

- The core requirements were met
- The UI was kept simple and non-complex
- Non-relevant financial or company-related queries were blocked upfront for faster response times
- BDD was applied to ensure readability and consistency of test code
- Different AI models were utilized based on the complexity of the questions to reduce costs when using the ChatGPT API

### Highlights:

- The previous experience of using ChatGPT API for personal projects was very helpful
- First-time use of the React Icons library to componentize icons like GitHub, LinkedIn, and E-mail
- Realized the importance of test code beyond just testing purposes, as it can better reflect the nature and objectives of the application
- Gained more knowledge and experience with the ChatGPT API usage

### Additional Areas for Improvement:

- The project direction was initially unclear, which led to wasting over a day in indecision
- Couldn’t implement CI/CD due to time constraints. It would have been ideal to at least run Lint checks and test code validation, and possibly Dockerize the project with AWS CD
- Both React and Express experience were limited, leading to a lack of detail across the code
- The backend and frontend lacked clear hierarchical structure; better modularization of features could have made future maintenance and modifications easier
- Discovered a bit late that the answers from ChatGPT API can vary depending on the API settings
- The response time is slow; if ChatGPT Functions had been used, the frequency of external API calls could have been reduced, improving performance
- Implementing the streaming answer feature from ChatGPT could enhance the professionalism of the UI
- There are many additional features I would like to add, such as user registration, recent search history, and data visualization
- Due to limited experience with writing Read.me files, I referred to many external resources, but I wish it had been more user-friendly and intuitive for someone encountering the project for the first time
- Merged everything directly into the master branch without branching by feature, which was a mistake in terms of version control.

### Final Review:

- I found the topic to be interesting, and the requirements were clearly defined, making the goal very clear. However, I regret spending too much time overthinking the overall direction of the application while trying to structure and think through the more flexible aspects of the project. Once I clarified the direction, I was able to move forward with both the backend and frontend as planned. Although there were some challenges with utilizing ChatGPT, I was able to work around them and still achieve professional-level answers. I greatly enjoyed the opportunity to gain more experience using React and Express for this personal project.
