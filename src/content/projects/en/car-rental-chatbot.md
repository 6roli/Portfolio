---
title: Car rental chatbot
summary: A multi-agent conversational assistant for a car rental service, built with LangGraph and Groq — search by city and dates, recommendations and a simulated booking. Live demo with a fictional fleet.
status: live
featured: true
order: 10
areas: [ml, software, architecture]
technologies: [Python, LangGraph, LangChain, Groq API, SQLite, Flask, pytest, Render]
demoUrl: https://car-rental-chatbot.onrender.com
repoUrl: https://github.com/6roli/Car_Rental_Chatbot
repoIsPublic: true
needsReview: true
problem: null
data: >-
  A synthetic fleet of rental cars in seven Spanish cities, generated each day with availability dates from today
  onwards and stored in an in-memory SQLite database. No real companies, prices or customers are involved.
method: >-
  Two LangGraph workflows. In the search workflow a language model only extracts structured criteria (city, dates,
  budget) from the visitor's message; Python validates them, runs a parameterised SQL query and formats the results,
  so the bot cannot invent cars. In the conversation workflow a supervisor agent routes each message to a
  recommendation agent (with optional web search for weather questions) or to a booking agent that runs a simulated
  booking. Models are served by Groq and chosen automatically from those the account offers.
results: >-
  A public demo where each visitor has an isolated conversation, with per-visitor and daily message limits to stay
  within free API quotas, clear messages when the quota is exhausted, and an automated test suite that runs before
  every deployment.
limitations: >-
  The fleet is fictional and bookings are simulated. The free server sleeps when idle, so the first answer can take
  about a minute. Answers depend on a hosted language model and its free daily quota; conversations are kept in
  memory and are lost when the server restarts.
architecture: >-
  Flask web app (chat page + JSON API) on Render's free plan, deployed from GitHub on every push after the tests
  pass. LangGraph agents call Groq models; the inventory is SQLite in memory. The API key lives only in Render's
  secret settings. The original 2024–2025 version is kept in the repository under the tag v0-original.
---
