from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

index_path = ROOT / "index.html"
readme_path = ROOT / "README.md"
agents_path = ROOT / "AGENTS.md"
vault_path = ROOT / "scripts" / "vault.sh"

required = [index_path, readme_path, agents_path, vault_path]
for path in required:
    if not path.exists():
        print(f"FAIL missing required file: {path}")
        sys.exit(1)

collections_dir = ROOT / "collections"
collections_dir.mkdir(exist_ok=True)

collection_file = collections_dir / "NIDUS_GEM-XX.container-request.md"
collection_file.write_text("""# NIDUS_GEM-XX · Container Request

Status: accepted as contained collection candidate
Container: Comet's Vault
Entry family: NIDUS_GEM
Entry type: visual system / symbolic collection / source-aware production line

## Registry state

canon_status: not canon-locked
local_status: pending structured import
source_status: pending source packet / pending audit

## Relationship

Comet's Vault remains the container, archive, QA surface, and source-boundary system.

NIDUS_GEM-XX enters as a contained collection candidate, not as the container itself.

## Boundaries

Do not:
- merge NIDUS_GEM-XX into the CO__LABS_Heliogaba_blum source card
- claim final canon
- treat it as a backend feature
- flatten it into a single visual card only

## Best home

- Collections Registry
- Creative Archive Dashboard
- Glassy Bokeh Lab
- Source Registry, as needed for future source packets
""", encoding="utf-8")

index = index_path.read_text(encoding="utf-8")

collections_section = """
      <section class="collections-registry" aria-labelledby="collections-registry-title">
        <div class="section-heading">
          <p class="eyebrow" data-en="Contained systems" data-es="Sistemas contenidos">Contained systems</p>
          <h2 id="collections-registry-title" data-en="Collections Registry" data-es="Registro de colecciones">Collections Registry</h2>
        </div>

        <article class="source-card collection-card" data-collection-id="NIDUS_GEM-XX" data-canon-status="not-canon-locked">
          <div class="source-card-header">
            <span class="card-icon" aria-hidden="true">NG</span>
            <span class="card-status" data-en="accepted candidate · pending structured import" data-es="candidato aceptado · importación estructurada pendiente">accepted candidate · pending structured import</span>
          </div>

          <h3>NIDUS_GEM-XX</h3>

          <dl class="source-details">
            <div>
              <dt data-en="Entry type" data-es="Tipo de entrada">Entry type</dt>
              <dd data-en="visual system / symbolic collection / source-aware production line" data-es="sistema visual / colección simbólica / línea de producción con fuentes">visual system / symbolic collection / source-aware production line</dd>
            </div>
            <div>
              <dt data-en="Container role" data-es="Rol del contenedor">Container role</dt>
              <dd data-en="Comet's Vault remains the container, archive, QA surface, and source-boundary system." data-es="Comet's Vault sigue siendo el contenedor, archivo, superficie QA y sistema de límites de fuente.">Comet's Vault remains the container, archive, QA surface, and source-boundary system.</dd>
            </div>
            <div>
              <dt data-en="Canon status" data-es="Estado de canon">Canon status</dt>
              <dd data-en="not canon-locked" data-es="canon no cerrado">not canon-locked</dd>
            </div>
            <div>
              <dt data-en="Local status" data-es="Estado local">Local status</dt>
              <dd data-en="pending structured import" data-es="importación estructurada pendiente">pending structured import</dd>
            </div>
            <div>
              <dt data-en="Boundary" data-es="Límite">Boundary</dt>
              <dd data-en="contained collection candidate; not merged into the CO__LABS source card" data-es="colección candidata contenida; no mezclada con la tarjeta fuente CO__LABS">contained collection candidate; not merged into the CO__LABS source card</dd>
            </div>
            <div>
              <dt data-en="Next action" data-es="Siguiente acción">Next action</dt>
              <dd data-en="prepare a structured NIDUS source packet before canon lock" data-es="preparar paquete fuente estructurado de NIDUS antes del cierre de canon">prepare a structured NIDUS source packet before canon lock</dd>
            </div>
          </dl>
        </article>
      </section>
"""

if "collections-registry-title" not in index:
    marker = "      <section class=\"handoff-section\""
    if marker not in index:
        print("FAIL could not find handoff section insertion point")
        sys.exit(1)
    index = index.replace(marker, collections_section + "\n" + marker)

index = index.replace("v0.2-full-static-project", "v0.2.2-nidus-gem-container-request")
index = index.replace("v0.2.1-source-registered", "v0.2.2-nidus-gem-container-request")
index = index.replace(">v0.2<", ">v0.2.2<")
index = index.replace("<title>Comet's Vault v0.2</title>", "<title>Comet's Vault v0.2.2</title>")

index_path.write_text(index, encoding="utf-8")

readme = readme_path.read_text(encoding="utf-8")
readme = readme.replace("# Comet's Vault v0.2.1-source-registered", "# Comet's Vault v0.2.2-nidus-gem-container-request")
readme = readme.replace("# Comet's Vault v0.2-full-static-project", "# Comet's Vault v0.2.2-nidus-gem-container-request")
readme = readme.replace("v0.2.1-source-registered", "v0.2.2-nidus-gem-container-request")
readme = readme.replace("v0.2-full-static-project", "v0.2.2-nidus-gem-container-request")

if "## v0.2.2 NIDUS_GEM Container Request" not in readme:
    readme += """

## v0.2.2 NIDUS_GEM Container Request

`NIDUS_GEM-XX` has been accepted as a contained collection candidate inside Comet's Vault.

Status:

- `accepted candidate · pending structured import`

Registry state:

- `canon_status`: `not canon-locked`
- `local_status`: `pending structured import`
- `source_status`: `pending source packet / pending audit`

Boundary:

- Comet's Vault remains the container.
- NIDUS_GEM-XX is a contained collection/system.
- NIDUS_GEM-XX is not merged into the `CO__LABS_Heliogaba_blum` source card.
- No final canon is declared.

Registry file:

- `collections/NIDUS_GEM-XX.container-request.md`
"""

readme_path.write_text(readme, encoding="utf-8")

agents = agents_path.read_text(encoding="utf-8")
if "`v0.2.2`" not in agents:
    agents += "\n- `v0.2.2`: NIDUS_GEM-XX accepted as contained collection candidate; not canon-locked.\n"
agents_path.write_text(agents, encoding="utf-8")

vault = vault_path.read_text(encoding="utf-8")
vault = vault.replace("v0.2.1-source-registered", "v0.2.2-nidus-gem-container-request")
vault = vault.replace("v0.2-full-static-project", "v0.2.2-nidus-gem-container-request")

if "collections-check" not in vault:
    vault = vault.replace(
        '    source-check)\n      source_check\n      ;;',
        '    source-check)\n      source_check\n      ;;\n    collections-check)\n      if [ -f "$PROJECT_ROOT/collections/NIDUS_GEM-XX.container-request.md" ]; then\n        echo "NIDUS_GEM-XX: accepted candidate · pending structured import"\n        echo "Canon status: not canon-locked"\n      else\n        echo "NIDUS_GEM-XX: not registered"\n        exit 1\n      fi\n      ;;'
    )
    vault = vault.replace(
        '  source-check',
        '  source-check\n  collections-check'
    )

vault_path.write_text(vault, encoding="utf-8")

print("Applied v0.2.2-nidus-gem-container-request.")
print("Created registry file: collections/NIDUS_GEM-XX.container-request.md")
