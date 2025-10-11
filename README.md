# Marginalia

Marginalia is a private reading companion built with Ruby on Rails. It pairs a marketing site with an authenticated workspace where readers can log books, jot marginal notes, and pick up where they left off. The application demonstrates modern Rails 8 conventions, including Solid Queue-ready configuration, Turbo/Stimulus defaults, Tailwind CSS with DaisyUI, and email-based authentication.

## Features

- Email/password authentication with secure session management and permanent cookies
- Password reset flow using Action Mailer and tokenized links
- Reader dashboard populated with sample data to illustrate the journaling experience
- Marketing landing page highlighting product value, built with Tailwind CSS and DaisyUI
- PWA manifest scaffold and icons for installable app support
- Kamal deployment configuration, Dockerfile, and volume mappings for container-based hosting

## Tech Stack

- Ruby 3.4.4 and Rails 8 (Ruby on Rails 8 defaults with Propshaft and import maps)
- SQLite for development, test, and production (backed by Docker volume in deployment)
- Tailwind CSS 4 with DaisyUI theming
- Turbo, Stimulus, and Action Mailbox/Action Text ready via default Rails installation
- Solid Queue configuration baked in (disabled locally unless opted-in)

## Getting Started

### Prerequisites

- Ruby 3.4.4 (manage via asdf, rbenv, or your preferred version manager)
- Bundler (`gem install bundler` if you do not already have it)
- Node.js is not required; Tailwind is bundled through `bin/rails tailwindcss`
- Foreman (optional) for `bin/dev` if you prefer global installation

### Initial Setup

```bash
bin/setup        # Installs gems, prepares the database, and installs front-end tooling
bin/rails db:prepare
```

You will need the Rails master key if you intend to work with production credentials:

```bash
export RAILS_MASTER_KEY=... # or place it in config/master.key
```

### Running the Application

```bash
bin/dev
```

`bin/dev` starts the Rails server and Tailwind watcher together. Visit `http://localhost:3000` to explore the marketing site. Register a new account via the “Start Your Journal” link to experience the signed-in dashboard.

### Managing Users

- Sign up through the UI at `/signup`.
- The dashboard (`/home`) is private and requires authentication.
- Password reset links (`/passwords/new`) trigger `PasswordsMailer` and rely on the async queue; use `bin/rails jobs:work` or `bin/rails solid_queue:supervisor` if you want to process emails locally.

## Testing & Quality

- `bin/rails test` – runs the full Minitest suite (controller and integration coverage for authentication).
- `bin/rubocop` – enforces the default Omakase Ruby style (optional but recommended before committing).
- `bin/brakeman` – static security analysis for Rails applications.

Tests parallelize by default. Use `PARALLEL_WORKERS=1 bin/rails test` if you run into thread-safety issues locally.

## Deployment

### Docker

Marginalia ships with a production Dockerfile and Kamal configuration.

```bash
docker build -t marginalia .
docker run -d -p 80:80 \
  -e RAILS_ENV=production \
  -e RAILS_MASTER_KEY=... \
  --name marginalia \
  marginalia
```

### Kamal

`config/deploy.yml` configures a Kamal deployment targeting a single web server:

- Service name: `marginalia`
- Image registry: `your-user/marginalia` (adjust to your Docker registry namespace)
- Persistent storage volume: `marginalia_storage:/rails/storage`
- Solid Queue in-process execution is enabled via `SOLID_QUEUE_IN_PUMA`

Deploy with:

```bash
bin/kamal setup   # once per environment
bin/kamal deploy
```

Ensure secrets (e.g., `KAMAL_REGISTRY_PASSWORD`, `RAILS_MASTER_KEY`) are available in `.kamal/secrets`.

## Configuration & Environment Variables

- `RAILS_MASTER_KEY` – required to decrypt credentials in production or staging environments.
- `SOLID_QUEUE_IN_PUMA` – enabled by default in Kamal config to run jobs in-process.
- Customize database hosts, concurrency, and logging via the commented examples in `config/deploy.yml`.

## Project Structure Highlights

- `app/controllers/concerns/authentication.rb` – authentication helpers for session management.
- `app/views/pages/index.html.erb` – marketing home page (public).
- `app/views/pages/home.html.erb` – signed-in dashboard with sample data.
- `test/controllers/sessions_controller_test.rb` – regression coverage for log in/out flows.
- `app/views/pwa/manifest.json.erb` – installable web app metadata.

Refer to `AGENTS.md` for details about the Codex CLI harness used in this repository.

## Troubleshooting

- Re-run `bin/setup` if bundle installs or database migrations fall out of sync.
- Tailwind classes missing? Ensure the watcher is running via `bin/dev` or `bin/rails tailwindcss:build`.
- Email previews: use `bin/rails server` and visit `/rails/mailers/passwords_mailer/reset`.
- Session issues: clear `tmp/` and restart the server; in the test suite, cookies are managed automatically.

## Contributing

1. Fork the repository and create a feature branch.
2. Run `bin/rails test` and optional `bin/rubocop`.
3. Open a pull request summarizing the change, attaching screenshots when UI updates are involved.

Marginalia is a personal project, but thoughtful contributions and critiques are welcome.
