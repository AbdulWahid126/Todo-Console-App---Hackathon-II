<!--
Sync Impact Report:
Version: 1.0.0 → 1.0.0 (initial ratification)
Modified Principles: N/A (initial creation)
Added Sections: All sections (initial creation)
Removed Sections: None
Templates Status:
  ✅ plan-template.md - Reviewed, aligned with constitution checks
  ✅ spec-template.md - Reviewed, aligned with scope/requirements
  ✅ tasks-template.md - Reviewed, aligned with task categorization
  ✅ phr-template.prompt.md - Reviewed, compatible with constitution
Follow-up TODOs: None
-->

# Evolution of Todo Constitution

## Core Principles

### I. Spec-First Development (NON-NEGOTIABLE)

**MUST**: All code is generated exclusively by Claude Code based on comprehensive specifications. Manual coding is strictly prohibited and constitutes a violation of hackathon rules.

**MUST**: Every line of code references its originating Task ID and Spec section using inline comments:
- Python: `# [Task]: T-XXX, [From]: specs/[phase]/[section]`
- TypeScript/JavaScript: `// [Task]: T-XXX, [From]: specs/[phase]/[section]`

**MUST**: Follow the mandatory workflow sequence: Specify → Plan → Tasks → Implement. No implementation without corresponding task definition.

**Rationale**: Ensures complete traceability, prevents scope creep, maintains hackathon compliance, and enables iterative spec refinement until Claude Code produces correct output.

### II. Progressive Evolution Architecture

**MUST**: Complete phases sequentially without skipping:
1. Phase I: Console-based Python CLI (UV package manager)
2. Phase II: Full-stack web application (Next.js 16 + FastAPI + Neon PostgreSQL)
3. Phase III: AI-powered chatbot integration (OpenAI Agents SDK + MCP)
4. Phase IV: Local Kubernetes deployment (Minikube + Helm)
5. Phase V: Production cloud deployment (AKS/GKE/OKE + Kafka + Dapr)

**MUST**: Each phase builds upon the previous phase's codebase, preserving core functionality while adding new capabilities.

**MUST**: Maintain backward compatibility within a phase; document breaking changes between phases in ADRs.

**Rationale**: Demonstrates incremental architecture evolution, validates cloud-native patterns at each stage, and ensures each phase delivers working software.

### III. Clean Architecture & Stateless Services

**MUST**: Implement separation of concerns with distinct layers:
- Models/Entities (SQLModel with type hints)
- Services/Business Logic (framework-agnostic)
- API/Interface Layer (FastAPI, Next.js API routes)
- Infrastructure (Postgres, Kafka, Dapr)

**MUST**: Design services to be stateless; all application state persisted in database (Neon PostgreSQL).

**MUST**: Use dependency injection and interfaces for testability and modularity.

**Rationale**: Enables independent scaling, simplifies testing, supports migration from local to cloud environments, and aligns with microservices principles for Phase IV/V.

### IV. Security-First Implementation

**MUST**: Implement JWT-based authentication using Better Auth library with shared `BETTER_AUTH_SECRET` environment variable.

**MUST**: Protect all API endpoints with `Authorization: Bearer <token>` header validation; reject unauthenticated requests with HTTP 401.

**MUST**: Enforce user data isolation—users access only their own tasks via `user_id` filtering in database queries.

**MUST**: Use Pydantic models for input validation; sanitize all user inputs before database operations.

**MUST NOT**: Store passwords in plain text; Better Auth handles hashing. Never commit secrets to git; use `.env` files listed in `.gitignore`.

**Rationale**: Prevents unauthorized access, SQL injection, XSS attacks; complies with OWASP Top 10; protects multi-user data integrity.

### V. Test-Driven Development & Quality Gates

**MUST**: Achieve minimum 70% code coverage across all phases.

**MUST**: Include test files for every feature module:
- Unit tests: Individual functions/methods (pytest, vitest)
- Integration tests: API endpoints and database interactions
- Contract tests (Phase III+): MCP tool interfaces

**MUST**: Enable strict type checking:
- Python: `mypy --strict` with full type hints
- TypeScript: `strict: true` in tsconfig.json

**MUST**: Pass linting without errors:
- Python: Ruff linter with default rules
- TypeScript: ESLint with recommended rules

**Rationale**: Prevents regressions, documents expected behavior, catches type errors before runtime, maintains code quality standards required by hackathon judges.

### VI. Monorepo Structure & Documentation Standards

**MUST**: Organize codebase with the following structure:
```
/
├── frontend/          # Next.js 16 app (Phase II+)
├── backend/           # FastAPI services (Phase II+)
├── specs/             # All specification documents
│   ├── constitution.md
│   ├── phase-i/
│   ├── phase-ii/
│   ├── phase-iii/
│   ├── phase-iv/
│   └── phase-v/
├── specs-history/     # Versioned spec iterations
├── helm/              # Kubernetes charts (Phase IV+)
├── CLAUDE.md          # Root-level agent instructions
├── README.md          # Setup and run instructions
└── .env.example       # Environment variable template
```

**MUST**: Maintain `CLAUDE.md` files at root and in each service folder (frontend/, backend/) with service-specific guidance.

**MUST**: Track all spec iterations in `specs-history/` folder with timestamp and version metadata.

**MUST**: Keep `README.md` current with setup instructions, run commands, and technology stack overview.

**Rationale**: Provides clear project navigation, enables multi-service development, supports spec refinement workflow, and helps judges evaluate submission.

### VII. Feature Parity Across Phases

**Basic Features (All Phases)**:
- Add Task with title (required field)
- Delete Task by ID
- Update Task title
- View All Tasks (list display)
- Mark Task Complete/Incomplete (boolean toggle)

**Intermediate Features (Phase V)**:
- Priority levels (High, Medium, Low)
- Tags/Categories (multi-tag support)
- Search tasks by title
- Filter by completion status, priority, tags
- Sort by creation date, priority, due date

**Advanced Features (Phase V)**:
- Recurring tasks (daily, weekly, monthly patterns)
- Due dates with date validation
- Time-based reminders (requires background job system)

**MUST**: Implement all Basic features in every phase; add Intermediate and Advanced only in Phase V as specified.

**MUST**: Ensure feature consistency—Add Task in CLI (Phase I) must have equivalent functionality in Web UI (Phase II) and Chatbot (Phase III).

**Rationale**: Demonstrates feature evolution, validates architecture supports same capabilities across different interfaces, ensures complete user experience at each phase.

## Technology Stack Constraints

### Approved Technologies by Phase

**Phase I (Console CLI)**:
- Python 3.13 or higher
- UV package manager (not pip)
- SQLite for local development only
- pytest for testing
- Ruff for linting

**Phase II (Web Application)**:
- Frontend: Next.js 16 with App Router, TypeScript 5.7+, Tailwind CSS 3.4+
- Backend: FastAPI 0.115+, SQLModel 0.0.22+, Python 3.13+
- Database: Neon PostgreSQL (managed cloud database)
- Auth: Better Auth library with JWT tokens
- Testing: vitest (frontend), pytest (backend)

**Phase III (AI Chatbot)**:
- OpenAI Agents SDK with gemini-2.0-flash-exp or grok-2-latest via OpenRouter
- Official MCP SDK (Model Context Protocol)
- OpenAI ChatKit for UI components
- Neon Postgres for conversation/message persistence

**Phase IV (Local Kubernetes)**:
- Docker for containerization
- Minikube for local K8s cluster
- Helm 3+ for package management
- kubectl-ai for intelligent cluster operations
- Kagent and Gordon for enhanced K8s management

**Phase V (Cloud Production)**:
- Cloud Platform: Azure AKS, Google GKE, or Oracle OKE (choose one)
- Messaging: Kafka via Strimzi operator or Redpanda
- Runtime: Dapr for Pub/Sub, State Management, Service Bindings, Secrets
- CI/CD: GitHub Actions with automated tests and deployments

**MUST NOT**: Substitute technologies (e.g., React instead of Next.js, MySQL instead of PostgreSQL, Redis instead of Kafka).

**Rationale**: Technology choices align with hackathon theme (Agentic AI, Cloud-Native), ensure evaluator familiarity, and demonstrate modern full-stack capabilities.

### Database Schema Standards

**Required Tables**:
- `users`: Managed entirely by Better Auth (do not modify schema)
- `tasks`: User to-do items with required indexes on `user_id`, `completed`, `due_date`
- `conversations` (Phase III+): Chat session metadata with `user_id` foreign key
- `messages` (Phase III+): Individual chat messages with `conversation_id` foreign key

**MUST**: Use SQLModel for ORM with proper relationships:
```python
# Example (not literal implementation):
class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    title: str
    completed: bool = Field(default=False, index=True)
    # [Task]: T-XXX, [From]: specs/phase-ii/data-model
```

**MUST**: Create indexes on foreign keys and frequently queried columns (user_id, completed, due_date).

**MUST**: Use database migrations (Alembic) to track schema changes between phases.

**Rationale**: Optimizes query performance, maintains referential integrity, enables audit trails, and supports multi-user scenarios.

## API & Integration Contracts

### RESTful API Standards

**MUST**: Prefix all API routes with `/api` namespace (e.g., `/api/tasks`, `/api/auth/login`).

**MUST**: Use HTTP methods correctly:
- GET: Retrieve resources (no body, idempotent)
- POST: Create new resources (include body)
- PUT/PATCH: Update existing resources (include body)
- DELETE: Remove resources (idempotent)

**MUST**: Return proper HTTP status codes:
- 200 OK: Successful GET/PUT/PATCH
- 201 Created: Successful POST
- 204 No Content: Successful DELETE
- 400 Bad Request: Validation errors (include error details in response)
- 401 Unauthorized: Missing or invalid JWT token
- 403 Forbidden: Valid token but insufficient permissions
- 404 Not Found: Resource does not exist
- 500 Internal Server Error: Unhandled exceptions

**MUST**: Use JSON for all request and response bodies with consistent error format:
```json
{
  "error": "Task not found",
  "code": "TASK_NOT_FOUND",
  "details": {"task_id": 123}
}
```

**Rationale**: Enables predictable client-server communication, simplifies debugging, follows industry standards.

### MCP Tool Contracts (Phase III)

**MUST**: Implement the following MCP tools with exact names and parameters:
- `add_task(title: str, user_id: str) → Task`
- `list_tasks(user_id: str, completed: bool | None) → list[Task]`
- `complete_task(task_id: int, user_id: str) → Task`
- `delete_task(task_id: int, user_id: str) → bool`
- `update_task(task_id: int, title: str, user_id: str) → Task`

**MUST**: Validate `user_id` matches authenticated user; reject mismatched requests.

**MUST**: Return structured responses with clear success/failure indicators.

**Rationale**: Ensures chatbot can reliably control todo application, maintains security boundaries, enables natural language task management.

### Stateless Chat Architecture

**MUST**: Design chat endpoint (`/api/chat`) as stateless—each request includes full conversation context.

**MUST**: Persist conversation state in database:
- `conversations` table: Stores session metadata (user_id, created_at, title)
- `messages` table: Stores individual turns (conversation_id, role, content, timestamp)

**MUST**: Load conversation history from database and include in AI context for each request.

**Rationale**: Enables horizontal scaling, prevents state loss on pod restarts, supports conversation resume across sessions.

## Development Workflow

### Mandatory Workflow Sequence

**Phase 0 - Initialization**:
1. Run `/sp.constitution` to create/update this constitution
2. Validate `CLAUDE.md` exists and references constitution
3. Initialize git repository with `.gitignore` for `.env`, `node_modules/`, `__pycache__/`

**Phase 1 - Specification**:
1. Run `/sp.specify` with feature description
2. Review generated `specs/[feature]/spec.md`
3. Refine spec until acceptance criteria are clear and testable
4. Commit spec to `specs-history/` with timestamp

**Phase 2 - Planning**:
1. Run `/sp.plan` based on approved spec
2. Review generated `specs/[feature]/plan.md` for architecture decisions
3. Identify any ADR-worthy decisions using three-part test (Impact + Alternatives + Scope)
4. If ADR suggested, run `/sp.adr [decision-title]` after user approval

**Phase 3 - Task Breakdown**:
1. Run `/sp.tasks` based on plan and spec
2. Review generated `specs/[feature]/tasks.md`
3. Ensure tasks reference exact file paths and Task IDs
4. Validate dependency order and parallel opportunities

**Phase 4 - Implementation**:
1. Run `/sp.implement` to execute tasks sequentially
2. Claude Code generates all code with required comments
3. Run tests after each task completion
4. Commit after logical groups of tasks

**Phase 5 - Validation**:
1. Run full test suite (`pytest`, `npm test`)
2. Run linters (Ruff, ESLint)
3. Verify 70%+ code coverage
4. Manual demo of all acceptance criteria

**MUST NOT**: Skip phases or implement code without corresponding task.

**MUST**: Create Prompt History Record (PHR) after every user interaction using `/sp.phr` or automatic PHR creation.

**Rationale**: Ensures audit trail, prevents premature implementation, validates specifications are complete before coding, and demonstrates SDD methodology for judges.

### Prompt History Records (PHR)

**MUST**: Create PHR after every significant user prompt (implementation, planning, debugging, spec creation).

**PHR Routing** (all under `history/prompts/`):
- Constitution stage → `history/prompts/constitution/`
- Feature stages (spec, plan, tasks, red, green, refactor) → `history/prompts/[feature-name]/`
- General interactions → `history/prompts/general/`

**MUST**: Use PHR template at `.specify/templates/phr-template.prompt.md` and fill ALL placeholders:
- ID (auto-increment, handle collisions)
- TITLE, STAGE, DATE_ISO (YYYY-MM-DD)
- SURFACE="agent", MODEL (e.g., "claude-sonnet-4-5")
- FEATURE (or "none"), BRANCH, USER
- COMMAND (e.g., "/sp.specify")
- LABELS (topic tags), LINKS (spec/ticket/ADR/PR URLs or "null")
- FILES_YAML (created/modified files), TESTS_YAML (tests run/added)
- PROMPT_TEXT (full verbatim user input, not truncated)
- RESPONSE_TEXT (concise summary of assistant output)
- OUTCOME and EVALUATION fields

**MUST**: Use agent-native file tools (Write/Edit) when possible; fallback to `.specify/scripts/bash/create-phr.sh` only if needed.

**MUST**: Validate no unresolved placeholders (e.g., `{{THIS}}`), title/stage/dates match, file exists at expected path.

**MUST NOT**: Create PHR for `/sp.phr` command itself (prevents recursion).

**Rationale**: Provides learning dataset for AI improvement, enables workflow analysis, supports hackathon documentation requirements, and demonstrates systematic development approach.

### Architecture Decision Records (ADR)

**Significance Test** (ALL must be true):
- **Impact**: Long-term consequences for framework, data model, API design, security, or platform choice?
- **Alternatives**: Multiple viable options were considered with documented trade-offs?
- **Scope**: Cross-cutting decision that influences system design or multiple components?

**MUST**: When significance test passes during `/sp.plan` or `/sp.tasks`, suggest to user:
> 📋 Architectural decision detected: [brief-description]
> Document reasoning and tradeoffs? Run `/sp.adr [decision-title]`

**MUST**: Wait for user consent; never auto-create ADRs.

**SHOULD**: Group related decisions (e.g., "authentication stack", "deployment strategy") into single ADR when appropriate.

**Rationale**: Captures critical design rationale for future maintainers, demonstrates thoughtful architecture for judges, prevents decision re-litigation.

## Constraints & Non-Negotiables

### Hackathon Rule Compliance

**ABSOLUTE PROHIBITION**: Manual code writing by human participants. All code must be generated by Claude Code based on specifications. Violation results in disqualification.

**MUST**: Work individually—no team submissions allowed.

**MUST**: Complete phases in order—no skipping from Phase I to Phase III.

**MUST**: Use specified technology stack without substitutions.

**MUST**: Create demo video of maximum 90 seconds showing final phase functionality.

**Rationale**: Ensures fair competition, validates spec-driven development methodology, and meets hackathon evaluation criteria.

### Error Handling Standards

**MUST**: Wrap all external calls (database, API, file I/O) in try-except blocks (Python) or try-catch (TypeScript).

**MUST**: Log all errors with context (user_id, task_id, timestamp, error message) using structured logging.

**MUST**: Return user-friendly error messages in API responses; log detailed stack traces server-side.

**MUST**: Implement graceful degradation—chatbot should handle MCP tool failures without crashing (e.g., "Sorry, I couldn't add that task. Please try again.").

**Rationale**: Prevents application crashes, aids debugging, improves user experience, and demonstrates production-ready error handling.

### Performance & Scalability

**Phase II Requirements**:
- API response time: <200ms p95 for list/create/update/delete operations
- Database connection pooling enabled (SQLModel default)
- Frontend: Code splitting and lazy loading for routes

**Phase IV Requirements**:
- Horizontal Pod Autoscaler (HPA) configured for backend (min 2, max 10 replicas)
- Resource limits defined in Helm values (CPU: 500m, Memory: 512Mi)

**Phase V Requirements**:
- Kafka partitioning strategy for task events (partition by user_id)
- Dapr state store for distributed caching
- Load balancer with health checks (`/api/health` endpoint)

**MUST**: Include performance acceptance criteria in specs (e.g., "handles 100 concurrent users").

**Rationale**: Demonstrates understanding of production requirements, validates cloud-native architecture, and shows scalability awareness.

## Governance

### Constitution Authority

**MUST**: This constitution supersedes all other documentation in case of conflicts.

**Hierarchy**: Constitution > Specify > Plan > Tasks (for resolving contradictions).

**MUST**: All PRs and code reviews verify compliance with constitutional principles before merge.

**MUST**: Complexity (e.g., additional abstraction layers, new dependencies) must be justified in plan.md with reference to constitutional requirements.

### Amendment Procedure

**MINOR Amendment** (new principle, expanded guidance):
1. Propose amendment via `/sp.constitution` with updated text
2. Document rationale in Sync Impact Report
3. Increment version (e.g., 1.0.0 → 1.1.0)
4. Update dependent templates (plan, spec, tasks)
5. Commit with message: `docs: amend constitution to v1.1.0 ([brief change])`

**MAJOR Amendment** (remove/redefine principle, breaking change):
1. Justify backward incompatibility (e.g., technology stack change)
2. Create migration plan for existing code/specs
3. Increment major version (e.g., 1.1.0 → 2.0.0)
4. Update all dependent artifacts and document in ADR

**PATCH Amendment** (clarifications, typo fixes):
1. Make wording improvements without semantic changes
2. Increment patch version (e.g., 1.1.0 → 1.1.1)
3. Update `LAST_AMENDED_DATE` only

**MUST**: Include Sync Impact Report as HTML comment at top of constitution file after update.

### Compliance Review

**MUST**: Verify compliance at each phase completion:
- [ ] All code has Task ID and Spec section comments
- [ ] All specs exist in `/specs` folder with version in `specs-history/`
- [ ] Test coverage ≥70% (run `pytest --cov`, `npm run coverage`)
- [ ] Linting passes without errors (Ruff, ESLint)
- [ ] README.md includes setup and run instructions
- [ ] PHRs created for all significant prompts in `history/prompts/`
- [ ] ADRs exist for architecturally significant decisions in `history/adr/`
- [ ] `.env.example` includes all required environment variables
- [ ] No secrets committed to git (audit with `git log -p | grep -i secret`)

**MUST**: Run compliance check before phase demo and final submission.

**Version**: 1.0.0 | **Ratified**: 2025-12-27 | **Last Amended**: 2025-12-27