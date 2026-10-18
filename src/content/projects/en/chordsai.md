---
title: ChordsAI
summary: An agent-based assistant that looks up the chords of a song and plays notes and chords, coordinated by a LangGraph supervisor.
status: repository
featured: false
order: 20
areas: [ml, software]
technologies: [Python, LangGraph, LangChain, Groq API]
repoUrl: https://github.com/6roli/ChordsAI
repoIsPublic: true
needsReview: true
problem: null
data: null
method: >-
  A supervisor agent decides, for each user message, whether to call a search agent (to look up the chords of a
  song) or a play agent (to play notes and chords), or to answer directly. Built as a LangGraph state graph with a
  language model accessed through the Groq API.
results: null
limitations: null
architecture: >-
  supervisor.py (routing) → searchAgent.py and playAgent.py as tools → shared tools.py and LLMconfig.py.
---
