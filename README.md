# geo-rag-chatbot

A document-based Q&A chatbot that retrieves relevant HTML content using vector search and generates accurate answers using OpenAI's `gpt-4o-mini`.

## 🔍 Features

- Extracts text from structured `.html` files (e.g. GEO_Limits)
- Splits content into semantic chunks
- Embeds chunks using OpenAI embeddings (`text-embedding-ada-002`)
- Stores embeddings in Pinecone vector DB
- Retrieves top-matching chunks for any question
- Generates natural language answers with OpenAI GPT
- Fully modular TypeScript code

## 🚀 Setup

### 1. Clone this repository

```bash
git clone https://github.com/hlin863/geo-rag-chatbot.git
cd geo-rag-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your `.env` file

```
OPENAI_API_KEY=your-openai-api-key
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=us-east1-gcp
PINECONE_INDEX=geo-limits-index
PINECONE_NAMESPACE=default
```

## 📁 Project Structure
```
src/
├── embedding/         # Embedding + vector DB
├── ingestion/         # HTML loaders & chunking
├── scripts/           # Example run scripts
```

## 📘 Example Usage
```bash
npx ts-node src/scripts/storeGeoEmbeddings.ts
npx ts-node src/scripts/askGeoBot.ts
```

Example question:
<b>What are the maximum limits of lithology types per plot?</b>

Example answer:
<b>The maximum limits of lithology types per plot are 10 lithology types per %Litho track...</b>