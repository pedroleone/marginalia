# Repository Guidelines

## Project Structure & Module Organization
This is a Rails application. Feature code lives in `app/`, with models in `app/models`, controllers in `app/controllers`, and front-end assets in `app/views` and `app/assets`. Reusable Ruby helpers belong in `lib/`. Database migrations live in `db/migrate`, while seeds and schema dumps stay in `db/`. Tests are organized under `test/` by layer (`test/controllers`, `test/models`, `test/system`). Static assets and uploads are served from `public/` and `storage/`, so keep large binaries out of Git.

## Build, Test, and Development Commands
- `bin/setup` initializes gems, database, and yarn-equivalents; rerun it on fresh clones.
- `bin/dev` uses Foreman with `Procfile.dev` to boot Rails and the Tailwind watcher together.
- `bin/rails db:prepare` ensures the development and test databases are migrated before running code or specs.
- `bin/rails test` executes the full Minitest suite; append `TEST=test/models/user_test.rb` for a single file.
- `bin/rubocop` and `bin/brakeman` run style and security checks before you push.

## Coding Style & Naming Conventions
Follow Ruby’s two-space indentation and Rails’ naming defaults: classes and modules as CamelCase (`app/models/UserProfile`), file names and methods as snake_case (`app/services/user_profile_sync.rb`). Prefer service objects or jobs in `app/services` or `app/jobs` when logic grows. Run `bin/rubocop` to enforce the Omakase style bundle, and keep generated schema changes in alphabetical order with `bin/rails db:migrate`.

## Testing Guidelines
The suite uses Rails’ default Minitest helpers. Place fast unit tests in `test/models` or `test/controllers`, integration flows in `test/system`, and shared fixtures in `test/fixtures`. Name files with the `_test.rb` suffix. Run `bin/rails test` before opening a PR; guard regressions by adding regression tests alongside bug fixes.

## Commit & Pull Request Guidelines
Commit messages are short, descriptive sentences in the imperative mood (e.g., `add and mount letter_opener gem`). Group related changes per commit and avoid `wip` in pushed history. Pull requests should state the problem, summarize the solution, link any tracking issue, and include screenshots or console output if UI or job behavior changes. Confirm CI or local test passes in the PR description.

## Security & Configuration Tips
Keep secrets in Rails credentials (`config/credentials.yml.enc`) and edit them via `bin/rails credentials:edit`. When adding environment variables, document them in the PR and prefer `.env.local` files ignored by Git. Run `bin/brakeman` when introducing new controllers or params to catch security regressions early.
