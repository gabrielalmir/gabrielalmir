#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# Python 3.12 and uv are prerequisites; the environment stays local to this repo.
uv venv --python 3.12 .tools/semgrep-venv
uv pip install --python .tools/semgrep-venv/bin/python 'semgrep==1.182.1'
