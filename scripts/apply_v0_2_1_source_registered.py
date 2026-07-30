from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

FILES = {
    "index": ROOT / "index.html",
    "app": ROOT / "app.js",
    "readme": ROOT / "README.md",
    "agents": ROOT / "AGENTS.md",
    "vault": ROOT / "scripts" / "vault.sh",
}

for name, path in FILES.items():
    if not path.exists():
        print(f"FAIL missing {name}: {path}")
        sys.exit(1)

sources_dir = ROOT / "sources"
sources_dir.mkdir(exist_ok=True)

registry_file = sources_dir / "CO__LABS_Heliogaba_blum.processed-reference.md"
registry_file.write_text("""# CO__LABS_Heliogaba_blum · Processed Reference Registry

Status: processed as reference · pending local sync
Source type: handoff / workbook source
Scope: Comet Striker, interactive workbook, STABILO BOSS, screen + print workflow
Boundary: reference only; no full source content injection into the UI
Risk: medium-low

## Processed summary

This source has been processed from the ChatGPT-side uploaded reference and registered as metadata for Comet's Vault.

Use it to inform:
- Source Registry metadata
- workbook / handoff scope
- Comet Striker lineage
- STABILO BOSS visual/workbook context
- screen + print workflow notes

Do not use it to:
- paste the full source into the UI
- claim the local source file exists
- treat corrupted/redacted fragments as canon without review

## Local sync state

The full local source file is still expected at:

sources/CO__LABS_Heliogaba_blum.md

Until that exact file is present locally, the project state is:

processed as reference · pending local sync
""", encoding="utf-8")

# index.html
index = FILES["index"].read_text(encoding="utf-8")
index = index.replace(
    'class="source-card" data-source-imported="false"',
    'class="source-card" data-source-imported="false" data-source-state="processed"'
)
index = index.replace(
    '<span class="card-status" id="source-status">Pending local source import</span>',
    '<span class="card-status" id="source-status">processed as reference · pending local sync</span>'
)
index = index.replace(
    '<dd id="source-status-detail">pending local source import</dd>',
    '<dd id="source-status-detail">processed as reference · pending local sync</dd>'
)
index = index.replace(
    'data-en="unverified until the local file is imported and inspected" data-es="sin verificar hasta importar e inspeccionar el archivo local">unverified until the local file is imported and inspected</dd>',
    'data-en="medium-low; processed from uploaded reference, pending local file sync" data-es="medio-bajo; procesado desde referencia subida, pendiente de sincronización local">medium-low; processed from uploaded reference, pending local file sync</dd>'
)
index = index.replace(
    'data-en="Place the source file in sources/ before claiming imported status." data-es="Colocar el archivo fuente en sources/ antes de declarar estado importado.">Place the source file in sources/ before claiming imported status.</dd>',
    'data-en="Keep as processed reference now; sync the full source file later if needed." data-es="Mantener como referencia procesada ahora; sincronizar el archivo fuente completo después si hace falta.">Keep as processed reference now; sync the full source file later if needed.</dd>'
)
FILES["index"].write_text(index, encoding="utf-8")

# app.js
app = FILES["app"].read_text(encoding="utf-8")
app = app.replace(
"""  imported: {
    en: "imported as reference",
    es: "importado como referencia"
  },
  pending: {
    en: "pending local source import",
    es: "importación local de fuente pendiente"
  }""",
"""  imported: {
    en: "imported as reference",
    es: "importado como referencia"
  },
  processed: {
    en: "processed as reference · pending local sync",
    es: "procesado como referencia · sincronización local pendiente"
  },
  pending: {
    en: "pending local source import",
    es: "importación local de fuente pendiente"
  }"""
)
app = app.replace(
"""function getSourceState() {
  return sourceCard?.dataset.sourceImported === "true" ? "imported" : "pending";
}""",
"""function getSourceState() {
  if (sourceCard?.dataset.sourceState) {
    return sourceCard.dataset.sourceState;
  }

  return sourceCard?.dataset.sourceImported === "true" ? "imported" : "pending";
}"""
)
FILES["app"].write_text(app, encoding="utf-8")

# README.md
readme = FILES["readme"].read_text(encoding="utf-8")
readme = readme.replace("# Comet's Vault v0.2-full-static-project", "# Comet's Vault v0.2.1-source-registered")
readme = readme.replace("`v0.2-full-static-project`", "`v0.2.1-source-registered`")
readme = readme.replace("./scripts/vault.sh zip v0.2-full-static-project", "./scripts/vault.sh zip v0.2.1-source-registered")
readme = readme.replace("- `pending local source import`", "- `processed as reference · pending local sync`")
if "## v0.2.1 Source Registration" not in readme:
    readme += """

## v0.2.1 Source Registration

`CO__LABS_Heliogaba_blum.md` has been processed from the uploaded ChatGPT-side reference and registered as source metadata.

Status:

- `processed as reference · pending local sync`

Registered scope:

- Comet Striker
- interactive workbook
- STABILO BOSS
- screen workflow
- print workflow

Boundary:

- reference only
- no full source content injection into the UI
- local full-file sync remains optional and separate

Registry file:

- `sources/CO__LABS_Heliogaba_blum.processed-reference.md`
"""
FILES["readme"].write_text(readme, encoding="utf-8")

# AGENTS.md
agents = FILES["agents"].read_text(encoding="utf-8")
if "`v0.2.1`" not in agents:
    agents = agents.replace(
        "- `v0.2`: full static product prototype.",
        "- `v0.2`: full static product prototype.\n- `v0.2.1`: source processed as reference; pending local sync."
    )
FILES["agents"].write_text(agents, encoding="utf-8")

# scripts/vault.sh
vault = FILES["vault"].read_text(encoding="utf-8")
vault = vault.replace("v0.2-full-static-project", "v0.2.1-source-registered")
if 'PROCESSED_SOURCE=' not in vault:
    vault = vault.replace(
        'EXPECTED_SOURCE="$PROJECT_ROOT/sources/CO__LABS_Heliogaba_blum.md"',
        'EXPECTED_SOURCE="$PROJECT_ROOT/sources/CO__LABS_Heliogaba_blum.md"\nPROCESSED_SOURCE="$PROJECT_ROOT/sources/CO__LABS_Heliogaba_blum.processed-reference.md"'
    )
vault = vault.replace(
"""  if [ -f "$EXPECTED_SOURCE" ]; then
    echo "Expected source: imported as reference"
  else
    echo "Expected source: pending local source import"
  fi""",
"""  if [ -f "$EXPECTED_SOURCE" ]; then
    echo "Expected source: imported as reference"
  elif [ -f "$PROCESSED_SOURCE" ]; then
    echo "Expected source: processed as reference · pending local sync"
  else
    echo "Expected source: pending local source import"
  fi"""
)
vault = vault.replace(
"""  if [ -f "$EXPECTED_SOURCE" ]; then
    echo "Status: imported as reference"
  else
    echo "Status: pending local source import"
  fi""",
"""  if [ -f "$EXPECTED_SOURCE" ]; then
    echo "Status: imported as reference"
  elif [ -f "$PROCESSED_SOURCE" ]; then
    echo "Status: processed as reference · pending local sync"
  else
    echo "Status: pending local source import"
  fi"""
)
FILES["vault"].write_text(vault, encoding="utf-8")

print("Applied v0.2.1-source-registered patch.")
print(f"Created registry file: {registry_file.relative_to(ROOT)}")
