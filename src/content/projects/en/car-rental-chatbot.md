---
title: Car rental chatbot
summary: A multi-agent conversational assistant for a car rental service, built with LangGraph and Groq — search by city and dates, recommendations and a simulated booking. Live demo with a fictional fleet.
status: live
featured: true
order: 10
areas: [ml, software, architecture]
theme: ember
technologies: [Python, LangGraph, LangChain, Groq API, SQLite, Flask, pytest, Render]
image:
  src: /images/projects/car-rental-chatbot.jpg
  alt: Chat bubbles from the car rental chatbot. A visitor asks which car is best for a couple on a budget; the bot recommends the Ford Puma at 36.77 euros per day; the visitor asks to book it with made-up details.
  credit: Messages copied verbatim from a conversation with the live demo, 18 October 2026.
demoUrl: https://car-rental-chatbot.onrender.com
demoLabel: Try Chatbot
demoNote: Free server — if nobody has used it recently, the first answer can take up to a minute while it wakes up.
transcript:
  caption: Real conversation recorded from the live demo on 18 October 2026 (unedited). The fleet and the booking are fictional.
  messages:
    - from: bot
      text: "Hi! Tell me where and when you need a car, for example: 'Barcelona from next Friday to Sunday' or 'a cheap car in Sevilla in December'."
    - from: user
      text: "Sevilla from 6 to 8 November, under 50 euros a day"
    - from: bot
      text: "Searching Sevilla, Fri 06 Nov 2026 to Sun 08 Nov 2026, up to €50/day: found 3 cars (cheapest first):\n• #2960 Ford Puma (2018), Gray, €36.77/day, available 2026-11-07 in Sevilla\n• #2187 Renault Megane (2016), White, €37.12/day, available 2026-11-06 in Sevilla\n• #2483 Toyota C-HR (2019), Black, €41.04/day, available 2026-11-08 in Sevilla\n\nAsk me for a recommendation (e.g. 'which is best for a family?') or say which one you want to book. Send 'reset' to search again."
    - from: user
      text: "Which one is best for a couple on a budget?"
    - from: bot
      text: "- #2960 Ford Puma – €36.77 per day. It’s the lowest‑priced option and comfortably sized for a couple."
    - from: user
      text: "Let's book it. Name: Ana Demo, email ana@example.com"
    - from: bot
      text: "Thanks, Ana! (Remember to use only made‑up personal details.)  \n\n- Car: #2960 Ford Puma, €36.77/day, available 2026‑11‑07 in Sevilla  \n- Contact: ana@example.com  \n\nYour simulated booking is confirmed. No real reservation has been made."
architectureImage:
  src: /images/projects/car-rental-architecture.svg
  alt: Block diagram. The browser talks to a Flask app on Render with one session per visitor. A search workflow extracts criteria with a language model, then checks them and queries SQLite in Python. A conversation workflow routes messages through a supervisor to a recommendation or a simulated booking agent. Models run on Groq.
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

## How it's built

### Code

The full source is on [GitHub](https://github.com/6roli/Car_Rental_Chatbot). The original 2024–2025 version is kept
unchanged under the tag [`v0-original`](https://github.com/6roli/Car_Rental_Chatbot/tree/v0-original).

| File | Responsibility |
|---|---|
| `car_rental/agents.py` | The two LangGraph workflows, prompts and structured outputs |
| `car_rental/inventory.py` | Fictional fleet in SQLite and the parameterised search |
| `car_rental/models.py` | Picks the Groq models the account can use (Groq retires models regularly) |
| `car_rental/sessions.py` | One session per visitor, message limits |
| `car_rental/web.py` | Flask app: chat page, `/chat` API, friendly errors, security headers |
| `tests/` | 26 pytest tests, run by Render before every deployment |

The search workflow, as defined in `agents.py`: the language model only extracts criteria; the rest is plain Python.

```python
graph = StateGraph(SearchState)
graph.add_node("extract_criteria", extract_criteria)
graph.add_node("check_criteria", check_criteria)
graph.add_node("search_inventory", search_inventory)
graph.add_edge(START, "extract_criteria")
graph.add_edge("extract_criteria", "check_criteria")
graph.add_conditional_edges(
    "check_criteria", lambda state: "invalid" if state["problems"] else "valid", {"invalid": END, "valid": "search_inventory"}
)
graph.add_edge("search_inventory", END)
```

The query is built with SQL parameters, so text from the visitor or the model never becomes SQL:

```python
query = "SELECT * FROM cars WHERE location = ? AND date_available BETWEEN ? AND ?"
params: list[object] = [location, start.isoformat(), end.isoformat()]
if max_price is not None:
    query += " AND price_per_day <= ?"
    params.append(max_price)
query += " ORDER BY price_per_day LIMIT ?"
```

### Technologies

| Technology | Role |
|---|---|
| Python 3.13 | Language of the whole application |
| LangGraph | Agents and the flow of messages between them, with memory per conversation |
| LangChain + langchain-groq | Interface to the language models, structured outputs and tools |
| Groq (gpt-oss-120b, gpt-oss-20b) | Hosted open-weight language models, free tier |
| SQLite | In-memory database for the fictional fleet |
| Flask + gunicorn | Web page and JSON API |
| pytest | Automated tests that gate each deployment |
| Render (free plan) | Hosting, redeployed from GitHub on every push |
