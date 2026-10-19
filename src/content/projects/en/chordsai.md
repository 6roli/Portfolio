---
title: ChordsAI
summary: A chat assistant that explains chords and plays them in your browser, with a two-octave on-screen piano and optional look-up of a song's chords. Built with LangGraph and Groq.
status: live
featured: true
order: 15
areas: [ml, software]
theme: violet
technologies: [Python, LangGraph, Groq API, Tavily, Flask, Web Audio API, pytest, Render]
demoUrl: https://chordsai.onrender.com
demoLabel: Try ChordsAI
demoNote: Free server — if nobody has used it recently, the first answer can take up to a minute while it wakes up. Turn your volume down a little first.
usage:
  - "Ask about a chord or a note, e.g. “Play C major 7”, “Play the notes of Am” or “What is a sus4 chord?”, then press ▶ to hear it."
  - "Chord names on their own (“Am F C G”) are answered instantly, without the AI."
  - "Ask for the chords of a song (“Chords of Let It Be”): it searches the web and returns the chord names with the source link, as suggestions that may be inaccurate."
  - "Or just play the piano with the mouse, touch or your keyboard (A W S E D…)."
repoUrl: https://github.com/6roli/ChordsAI
repoIsPublic: true
needsReview: true
problem: null
data: >-
  Chord and note theory is computed in plain Python (20 chord qualities, equal temperament with A4 = 440 Hz). Song
  chords come from a Tavily web search; only chord names and the source link are shown, never lyrics.
method: >-
  Messages that are only chord or note names are answered directly by the music module, without a language model.
  Everything else goes to one LangGraph agent with three tools: play a chord, play a note and search a song's chords.
  The model never works out the notes itself — the tools return them from the tested music module. The server
  returns note data and the visitor's browser plays it with the Web Audio API.
results: >-
  A public demo rebuilt from a 2025 prototype that no longer ran: its model had been retired, every note played a
  semitone flat, plain chord names played a single note, its supervisor could not call its agents and sound came out
  of the server's own speakers. 155 automated tests run before every deployment; the original is kept under the tag
  v0-original.
limitations: >-
  Song chords found on the web may be wrong and are labelled as suggestions. Slash chords such as G/B are played
  without the bass note. Answers depend on free Groq and Tavily quotas, shared by all visitors; conversations are
  kept in memory and are lost when the free server sleeps or restarts.
architecture: >-
  Flask app on Render's free plan, deployed from GitHub after the tests pass. A LangGraph agent calls a Groq model
  chosen from those the account offers; Tavily is optional. Per-visitor (30 per hour) and daily (300) message limits
  keep the demo within free quotas. Keys live only in Render's secret settings.
---
