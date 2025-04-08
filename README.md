#🧠 Project Overview
A practice project focused on Software Design Principles and Domain-Driven Design (DDD). applying clean architecture principles, SOLID, and DDD concepts in a backend API structure.

##📁 Folder Structure (src/)
1. @core/
This is your domain layer – the heart of DDD.

###entities/
Contains business objects (like Student). Entities hold domain logic and are uniquely identified (by id in this case).

###repositories/
Interface definitions. You define what your data layer should do (e.g. StudentsRepository), but not how.

###2. application/
This is the use-case layer (application logic, orchestration).

###use-cases/
Business workflows live here. For example:

enroll-student.ts: Enrolls a new student.

get-student.ts: Fetches a student by ID.

Each use case handles a specific business rule and uses the repositories to interact with the domain layer.

###3. infra/
This is the infrastructure layer – it implements the contracts defined in the core.

###repositories/in-memory/
In-memory implementations of your repositories (good for testing or dev environments).

###4. main.ts
This looks like the entry point – here you’re testing your use cases manually by instantiating the InMemoryStudentsRepository and calling use cases.

##✅ What’s Being Practiced
Domain-Driven Design (DDD)
You're separating concerns cleanly into domain, application, and infrastructure.

###SOLID principles
Especially the Dependency Inversion Principle – application logic depends on abstractions, not concrete implementations.

###Clean Architecture
Very classic layered approach, which makes the code scalable and testable.

### DDD (Domain-driven Design)

Domain-Driven Design
Domain
Domain Experts

Conversation

Ubiquitous Language

User

Client

Supplier

Attendant

Barman

Aggregates

Value Objects

Domain Events

Subdomains (Bounded Contexts)

Entities

Use Cases

Let me know if you want
