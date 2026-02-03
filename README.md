# 📝 Spec-Driven Todo App (Phase I)

A **Spec-Driven Todo Application** built for **Panaversity Hackathon II**.  
This project demonstrates how modern AI-native development replaces manual coding with a **strict specification-first workflow** using **Spec-Kit Plus** and **Claude Code**.

> 🚫 No manual coding  
> ✅ 100% Spec-Driven Development  
> 🧠 AI-generated implementation via Claude Code  

---

## 🎯 Project Overview

This repository contains **Phase I** of the *Evolution of Todo* project.

**Phase I Goal:**  
Build a **Python in-memory console-based Todo application** using a strict **Spec-Driven Development (SDD)** lifecycle:


The developer acts as a **system architect**, while AI (Claude Code) acts as the **builder**.

---

## 🧠 Key Concepts Used

- Spec-Driven Development (SDD)
- Reusable Intelligence
- Agentic Dev Stack
- Claude Code
- Spec-Kit Plus
- Clean Architecture (Console App)

---

## ✨ Features (Phase I)

- ➕ Add Todo task  
- 📋 View all tasks  
- ✏️ Update task  
- ❌ Delete task  
- ✅ Mark task as complete / incomplete  
- 💾 In-memory storage (no database)

---

## 🧩 Tech Stack

| Layer | Technology |
|------|-----------|
| Language | Python 3.13+ |
| Development Model | Spec-Driven Development |
| AI Tool | Claude Code |
| Spec Management | Spec-Kit Plus |
| Storage | In-Memory (Python data structures) |

---

## 📂 Project Structure

├── speckit.constitution # WHY – Principles & constraints
├── speckit.specify # WHAT – Requirements & acceptance criteria
├── speckit.plan # HOW – Architecture & design
├── speckit.tasks # BREAKDOWN – Atomic tasks
├── src/ # AI-generated source code
│ ├── main.py
│ ├── models/
│ └── services/
├── README.md
└── CLAUDE.md # Claude Code entry instructions


---

## 🛠️ Development Workflow

This project **strictly forbids manual coding**.

1. Write/Update specifications
2. Validate architecture
3. Break work into atomic tasks
4. Generate implementation via Claude Code
5. Iterate by refining specs (not code)

> **Golden Rule:**  
> ❝No Task → No Code❞

---

## ▶️ How to Run (Local)

```bash
# Clone repository
git clone <your-repo-url>
cd <repo-name>

# Run the console app
python src/main.py

🏆 Hackathon Context

Hackathon: Panaversity Hackathon II

Phase: I — In-Memory Console App

Theme: Evolution of Todo (CLI → Cloud-Native AI Systems)

Methodology: Spec-Driven Development using AI Agents

📌 Notes

No database

No web UI

No authentication

No AI chatbot (introduced in later phases)

This repository focuses only on Phase I, forming the foundation for later phases.

🚀 Next Phases (Planned)

Phase II — Full-Stack Web App (Next.js + FastAPI)

Phase III — AI Chatbot (OpenAI Agents + MCP)

Phase IV — Kubernetes Deployment

Phase V — Cloud + Event-Driven Architecture

