<!--
Sync Impact Report:
Version change: N/A → 1.0.0
Added sections: All principles and sections for Todo In-Memory Python Console App
Templates requiring updates: N/A (new constitution)
-->
# Todo In-Memory Python Console App Constitution

## Core Principles

### Development Rules (NON-NEGOTIABLE)
No manual coding by humans - all code must be generated via Claude Code only; No code generation without approved Tasks from the Spec-Kit Plus lifecycle; All logic must trace back to specs through the Constitution > Specify > Plan > Tasks hierarchy.

### Architecture Constraints
Python 3.13+ required for all development; In-memory data storage only - no database, no files, no external services; Single-process console application architecture; No persistence beyond runtime memory.

### Code Quality Principles
Clean architecture with clear separation of concerns; All components must be testable with unit and integration tests; Readable CLI output with clear user feedback; Follow Python best practices and PEP 8 standards.

### Spec-Driven Enforcement
Constitution > Specify > Plan > Tasks hierarchy must be strictly followed; Agents must stop if any spec is missing or incomplete; All features must originate from approved specifications; No implementation without corresponding task documentation.

### Agent Behavior Rules
No assumptions beyond what's specified in the documents; No feature creep - implement only what's in the spec; No skipping lifecycle steps - follow Spec-Kit Plus process exactly; Strict adherence to project constraints and requirements.

### Python Console Application Focus
Console-first design with intuitive command-line interface; Interactive user experience with clear prompts and responses; Error handling with user-friendly messages; Support for basic CRUD operations on todo items.

## Architecture Constraints
Python 3.13+ is the required runtime environment; In-memory data storage only - no persistent storage mechanisms; Single-process execution model; Console-based user interface only; No external dependencies beyond standard Python libraries; All data exists only during application runtime.

## Development Workflow
All code generation must follow the Spec-Kit Plus lifecycle: Constitution → Specify → Plan → Tasks; Each feature must have complete specification before implementation; Code changes require approved tasks from the task list; Testing must be included with all implementations; No manual code modifications outside of Claude Code generation.

## Governance
This constitution supersedes all other development practices for this project; Amendments require explicit documentation and approval process; All development must verify compliance with these principles; Agents must halt work if specifications are incomplete or missing; Code generation must be traceable back to approved specifications.

**Version**: 1.0.0 | **Ratified**: 2026-01-02 | **Last Amended**: 2026-01-02