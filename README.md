# Perfume Recommendation System

Perfume recommendation system that analyzes user prompts and suggests the most suitable fragrances based on machine learning algorithms and user preference analysis. The solution is built using Flask + React architecture with MySQL database backend.

## Demo
tba

## Data Pipeline

![mermaid-diagram-2025-05-31-145942](https://github.com/user-attachments/assets/810054c5-2803-48cc-8fd5-da4300872820)

## General Overview

The system provides personalized perfume recommendations by:
- Processing natural language prompts from users
- Implementing advanced machine learning algorithms
- Providing a modern, user-friendly interface

### Key Features
- Smart perfume matching algorithm
- User preference analysis
- Interactive web interface
- Personalized recommendations
- Comprehensive perfume database

## Technology Stack
- Backend: Python Flask
- Frontend: React.js
- Database: MySQL
- Machine Learning: scikit-learn, TensorFlow
- NLP: Sentence Transformers (BERT-based models)

## Natural Language Processing

The system leverages state-of-the-art Sentence Transformers for natural language understanding:

1. **Query Processing**
   - Utilizes BERT-based sentence transformers to convert user queries into meaningful vector representations
   - Captures semantic meaning of perfume descriptions and user preferences
   - Enables semantic similarity matching between queries and perfume descriptions

2. **Semantic Search**
   - Implements efficient similarity search using vector embeddings
   - Matches user queries with perfume descriptions in high-dimensional space
   - Provides contextually relevant recommendations based on semantic understanding

## Installation & Setup

### Prerequisites
- Python 3.8+
- React
- MySQL

### Backend Setup
1. Clone the repository
2. Install Python dependencies:
```bash
pip install -r requirements.txt
```
3. Start the Flask server:
```bash
python app.py
```

### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```
2. Install dependencies:
```bash
npm install
```
3. Start the React application:
```bash
npm start
```

### Database Setup
- Ensure you're connected to the AGH network
- Access the database at [PHPMyAdmin](https://mysql.agh.edu.pl/phpMyAdmin/index.php)

## Usage
Access the application at:
```bash
http://localhost:3000
```

## Important Links

- [UI Design](https://www.figma.com/design/E4UgTio2RsqJcN4NMeOLsu/perfuME?node-id=1-7&t=DuF0V1ii2eGjdNuY-1)
- [Database Access](https://mysql.agh.edu.pl/phpMyAdmin/index.php) (requires AGH network connection)
