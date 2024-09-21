# MyCampus - Student Assignment Planner and Networking Platform

## Live Link
https://switch-csit-hackathon.vercel.app/
Dummy Crediantials:
email: raghav170101@gmail.com
password: Raghav@7042

## Overview

MyCampus is a comprehensive web application designed to help students manage their assignments and connect with peers. It features an AI-powered assignment planner and a student networking platform.

## Features

- Assignment Management
- Student Networking
- AI-powered PDF summarization
- Subject-specific assignment tracking

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js (Express.js)
- Database: MongoDB (assumed)
- Authentication: JWT (JSON Web Tokens)
- AI Integration: @xenova/transformers for text summarization

## Developmental Solutions: B4

- Example 1: Efficient Assignment Retrieval

    - Problem: Retrieving assignments for a specific subject efficiently, especially as the number of assignments grows.
    - Solution: Implement indexing and pagination.

```javascript
// In the API route
async function getAssignments(req, res) {
const { subjectId, page = 1, limit = 10 } = req.query;
const skip = (page - 1) * limit;

try {
 const assignments = await Assignment.find({ subjectId })
   .sort({ dueDate: 1 })
   .skip(skip)
   .limit(Number(limit));

 const total = await Assignment.countDocuments({ subjectId });

 res.json({
   assignments,
   currentPage: page,
   totalPages: Math.ceil(total / limit),
   totalAssignments: total
 });
} catch (error) {
 res.status(500).json({ message: "Error retrieving assignments", error: error.message });
}
}
```
- This solution has:
    - O(log n) time complexity for querying due to indexing
    - O(1) space complexity for each query result
    - Supports iterative development by allowing easy addition of more filter options
    - Efficiently handles large datasets through pagination


- Example 2: Optimized PDF Text Extraction and Summarization

    - Problem: Extracting text from PDFs and generating summaries efficiently, especially for large documents.
    - Solution: Implement chunked processing and caching

```javascript
// In the API route
import { createWorker } from 'tesseract.js';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function extractAndSummarize(pdfBuffer) {
  const cacheKey = `pdf:${crypto.createHash('md5').update(pdfBuffer).digest('hex')}`;
  
  // Check cache first
  const cachedResult = await redis.get(cacheKey);
  if (cachedResult) return JSON.parse(cachedResult);

  const worker = await createWorker();
  let fullText = '';
  const chunkSize = 1024 * 1024; // 1MB chunks

  for (let i = 0; i < pdfBuffer.length; i += chunkSize) {
    const chunk = pdfBuffer.slice(i, i + chunkSize);
    const { data: { text } } = await worker.recognize(chunk);
    fullText += text;
  }

  await worker.terminate();
  const summary = await aiSummarize(fullText);
  const result = { fullText, summary };
  
  // Cache the result
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 3600); // Cache for 1 hour

  return result;
}
```
- This solution has:
    - Has O(n) time complexity where n is the size of the PDF
    - Uses constant memory by processing in chunks
    - Implements caching to avoid redundant processing
    - Supports future expansion by separating text extraction and summarization



## API Routes

### Authentication

- `POST /users/register`: Register a new user
- `POST /users/login`: Login and receive JWT token

### Subjects

- `GET /users/subjects`: Get all subjects for the logged-in user
- `POST /users/subjects`: Add a new subject

### Assignments

- `GET /users/subjects/:id`: Get assignments for a specific subject
- `POST /users/addassignment`: Add a new assignment

### Student Networking

- `GET /users/all`: Get all users for networking

### AI Summarization

- `POST /users/summary`: Submit text for AI-powered summarization

## Frontend Routes

- `/`: Home page
- `/login`: Login page
- `/register`: Registration page
- `/subjects`: List of subjects
- `/subjects/:id`: Assignments for a specific subject
- `/networking`: Student networking page

## AI Integration

The application uses the @xenova/transformers library for AI-powered text summarization. Users can upload PDF files, which are then processed to extract text and generate summaries.

## Deployment

The application is configured for deployment on Vercel. Ensure all environment variables are properly set in the Vercel dashboard before deploying.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your features or fixes.

