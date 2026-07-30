#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
EXPECTED_SOURCE="$PROJECT_ROOT/sources/CO__LABS_Heliogaba_blum.md"
PROCESSED_SOURCE="$PROJECT_ROOT/sources/CO__LABS_Heliogaba_blum.processed-reference.md"
NIDUS_COLLECTION="$PROJECT_ROOT/collections/NIDUS_GEM-XX.container-request.md"
IDEA_NEBULA="$PROJECT_ROOT/docs/intake/idea-nebula.md"
DOMAIN_ADAPTER="$PROJECT_ROOT/docs/dry-run-delta/domain_adapter.yaml"

print_help() {
  cat <<EOF
Comet Vault Nebulas helper

Usage:
  ./scripts/vault.sh help
  ./scripts/vault.sh status
  ./scripts/vault.sh qa
  ./scripts/vault.sh open
  ./scripts/vault.sh source-check
  ./scripts/vault.sh collections-check
  ./scripts/vault.sh skills-check
  ./scripts/vault.sh zip <version-label>

Examples:
  ./scripts/vault.sh zip v0.3.0-rc1-proposal
EOF
}

present_line() {
  local path="$1"
  if [ -e "$PROJECT_ROOT/$path" ]; then
    printf "  present  %s\n" "$path"
  else
    printf "  missing  %s\n" "$path"
  fi
}

source_state() {
  if [ -f "$EXPECTED_SOURCE" ]; then
    echo "imported as reference"
  elif [ -f "$PROCESSED_SOURCE" ]; then
    echo "processed as reference · pending local sync"
  else
    echo "pending local source import"
  fi
}

status() {
  echo "Project: $PROJECT_NAME"
  echo "Path: $PROJECT_ROOT"
  echo
  echo "Main files:"
  present_line "index.html"
  present_line "styles.css"
  present_line "README.md"
  present_line "AGENTS.md"
  present_line "app.js"
  present_line "docs/intake/idea-nebula.md"
  present_line "docs/dry-run-delta/domain_adapter.yaml"
  present_line "scripts/vault.sh"
  echo
  if [ -d "$PROJECT_ROOT/sources" ]; then
    echo "Source folder: present"
  else
    echo "Source folder: missing"
  fi
  echo "Expected source: $(source_state)"
  echo
  if [ -d "$PROJECT_ROOT/collections" ]; then
    echo "Collections folder: present"
  else
    echo "Collections folder: missing"
  fi
  if [ -f "$NIDUS_COLLECTION" ]; then
    echo "NIDUS_GEM-XX: accepted candidate · pending structured import"
  else
    echo "NIDUS_GEM-XX: not registered"
  fi
  echo
  if [ -d "$PROJECT_ROOT/.agents/skills" ]; then
    echo "Skills folder: present"
  else
    echo "Skills folder: missing"
  fi
}

qa() {
  local fail=0

  for file in index.html styles.css app.js README.md AGENTS.md; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
      echo "PASS required file: $file"
    else
      echo "FAIL missing required file: $file"
      fail=1
    fi
  done

  if [ -f "$PROJECT_ROOT/package.json" ]; then
    echo "FAIL package.json should not exist for this static build"
    fail=1
  else
    echo "PASS no package.json"
  fi

  if [ -d "$PROJECT_ROOT/node_modules" ]; then
    echo "FAIL node_modules should not exist for this static build"
    fail=1
  else
    echo "PASS no node_modules"
  fi

  if grep -q 'id="idea-nebula"' "$PROJECT_ROOT/index.html"; then
    echo "PASS idea nebula section"
  else
    echo "FAIL missing idea nebula section"
    fail=1
  fi

  if grep -q "data-provenance-rail" "$PROJECT_ROOT/index.html"; then
    echo "PASS provenance rail"
  else
    echo "FAIL missing provenance rail"
    fail=1
  fi

  if grep -q "Nothing here is active" "$PROJECT_ROOT/index.html"; then
    echo "PASS non-activation boundary"
  else
    echo "FAIL missing non-activation boundary"
    fail=1
  fi

  if [ -f "$IDEA_NEBULA" ]; then
    echo "PASS idea-nebula source"
  else
    echo "FAIL missing idea-nebula source"
    fail=1
  fi

  if [ -f "$DOMAIN_ADAPTER" ]; then
    echo "PASS separate dry-run adapter"
  else
    echo "FAIL missing dry-run adapter"
    fail=1
  fi

  if command -v node >/dev/null 2>&1; then
    node --check "$PROJECT_ROOT/app.js"
    echo "PASS JavaScript syntax"
  fi

  if [ "$fail" -eq 0 ]; then
    echo "QA: PASS"
  else
    echo "QA: FAIL"
    exit 1
  fi
}

open_project() {
  if command -v open >/dev/null 2>&1; then
    open "$PROJECT_ROOT/index.html"
  else
    echo "Open manually: $PROJECT_ROOT/index.html"
  fi
}

source_check() {
  echo "Expected source: sources/CO__LABS_Heliogaba_blum.md"
  echo "Status: $(source_state)"
}

collections_check() {
  if [ -f "$NIDUS_COLLECTION" ]; then
    echo "NIDUS_GEM-XX: accepted candidate · pending structured import"
    echo "Canon status: not canon-locked"
    echo "Registry file: collections/NIDUS_GEM-XX.container-request.md"
  else
    echo "NIDUS_GEM-XX: not registered"
    exit 1
  fi
}

skills_check() {
  local fail=0
  local skills=(
    ".agents/skills/comet-vault-source-registry/SKILL.md"
    ".agents/skills/comet-vault-ui-handoff/SKILL.md"
    ".agents/skills/selah-vault-gate/SKILL.md"
  )

  for skill in "${skills[@]}"; do
    if [ -f "$PROJECT_ROOT/$skill" ]; then
      echo "$skill"
    else
      echo "missing: $skill"
      fail=1
    fi
  done

  if [ "$fail" -ne 0 ]; then
    exit 1
  fi
}

make_zip() {
  local version="${1:-v0.3.0-rc1-proposal}"
  local zip_path="$PROJECT_ROOT/../comet-vault-ui-handoff-${version}.zip"

  rm -f "$zip_path"

  (
    cd "$PROJECT_ROOT/.."
    zip -r "$zip_path" "$PROJECT_NAME"
  )

  echo "Created: $zip_path"
}

command="${1:-help}"

case "$command" in
  help)
    print_help
    ;;
  status)
    status
    ;;
  qa)
    qa
    ;;
  open)
    open_project
    ;;
  source-check)
    source_check
    ;;
  collections-check)
    collections_check
    ;;
  skills-check)
    skills_check
    ;;
  zip)
    make_zip "${2:-v0.3.0-rc1-proposal}"
    ;;
  *)
    echo "Unknown command: $command"
    echo
    print_help
    exit 1
    ;;
esac
