---
title: Car rental chatbot
summary: A multi-agent conversational assistant for a car rental service, built with LangGraph, with a supervisor agent that delegates to specialised agents and queries an SQL database.
status: repository
featured: true
order: 10
areas: [ml, software, architecture]
technologies: [Python, LangGraph, LangChain, Groq API, SQLite, Flask]
repoUrl: https://github.com/6roli/Car_Rental_Chatbot
repoIsPublic: true
needsReview: true
problem: null
data: >-
  A SQLite database of cars included in the repository (cars_schema.db), queried through LangChain SQL tools.
method: >-
  A LangGraph state graph with a supervisor that routes the conversation to specialised agents: SQL querying,
  booking, recommendation, input validation and display. Language model calls go through the Groq API, and a
  Flask web interface serves the chat locally.
results: null
limitations: null
architecture: >-
  Web interface (app.py) → LangGraph graph (graph.py, state.py) → supervisor → specialised agents → SQL tools over
  SQLite. API keys are read from a local .env file.
---
