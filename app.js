const header = document.querySelector("[data-site-header]");
const languageButtons = document.querySelectorAll("[data-lang]");
const translatableElements = document.querySelectorAll("[data-en][data-es]");
const clusterButtons = document.querySelectorAll("[data-cluster]");
const clusterDetail = document.querySelector(".cluster-detail");
const clusterGlyph = document.querySelector("#cluster-glyph");
const clusterSuper = document.querySelector("#cluster-super");
const clusterTitle = document.querySelector("#cluster-title");
const clusterDescription = document.querySelector("#cluster-description");
const clusterItems = document.querySelector("#cluster-items");
const modeButtons = document.querySelectorAll("[data-mode]");
const currentModeTitle = document.querySelector("#current-mode-title");
const currentModeCopy = document.querySelector("#current-mode-copy");
const recommendedAction = document.querySelector("#recommended-action");
const exitButtons = document.querySelectorAll("[data-exit]");
const exitMessage = document.querySelector("#exit-message");
const provenanceRail = document.querySelector("[data-provenance-rail]");
const railScrim = document.querySelector(".rail-scrim");
const openRailButtons = document.querySelectorAll("[data-open-rail]");
const closeRailButtons = document.querySelectorAll("[data-close-rail]");

const clusters = {
  A: {
    es: {
      title: "Núcleo y gobernanza",
      description: "Arquitectura generativa, separación de niveles y memoria viva del sistema.",
      items: [
        "Sistema generativo de marca Iridiscenter",
        "Separación de niveles 0–3 con restricción de no difuminación",
        "Regla de atribución canónica de nivel",
        "Lógica de replicación fractal: tribus → marcas → productos",
        "Canvas maestro como acta fundacional y memoria viva"
      ]
    },
    en: {
      title: "Core & governance",
      description: "Generative architecture, level separation, and the system’s living memory.",
      items: [
        "Iridiscenter generative brand system",
        "Levels 0–3 separation with a non-blurring constraint",
        "Canonical level-attribution rule",
        "Fractal replication: tribes → brands → products",
        "Master canvas as founding record and living memory"
      ]
    }
  },
  B: {
    es: {
      title: "Identidad, símbolos y estética",
      description: "Un lenguaje visual de pertenencia, contribución y memoria simbólica.",
      items: [
        "Marco de las 12 tribus: color, cualidad y contribución",
        "Sistema de íconos planos: emblemas tribales y nacionales",
        "Integración del alfabeto hebreo",
        "Sistema de logo tipográfico Recraft v3",
        "Glassmorphism y cristal como lenguaje visual"
      ]
    },
    en: {
      title: "Identity, symbols & aesthetics",
      description: "A visual language for belonging, contribution, and symbolic memory.",
      items: [
        "12 Tribes framework: color, quality, and contribution",
        "Flat icon system: tribal and national emblems",
        "Hebrew alphabet integration",
        "Recraft v3 typographic logo system",
        "Glassmorphism and crystal as visual language"
      ]
    }
  },
  C: {
    es: {
      title: "Educación, RR. HH. y aprendizaje",
      description: "Modelos para aprender, formar y acompañar sin aumentar la carga cognitiva.",
      items: [
        "Tres saberes: conocer, hacer y ser",
        "Mapeo del ciclo de aprendizaje experiencial de Kolb",
        "SAMR para integración tecnológica",
        "Alineación Bloom, Anderson y Marzano",
        "Cruce entre RR. HH. y educación",
        "Reducción de carga cognitiva como principio"
      ]
    },
    en: {
      title: "Education, HR & learning systems",
      description: "Models for learning, formation, and support without adding cognitive load.",
      items: [
        "Three knowledges: knowing, doing, and being",
        "Kolb experiential learning cycle mapping",
        "SAMR for technology integration",
        "Bloom, Anderson, and Marzano alignment",
        "HR and education mashup",
        "Cognitive-load reduction as a principle"
      ]
    }
  },
  D: {
    es: {
      title: "Documentación y orientación",
      description: "Activos para comprender el sistema sin morir en el intento.",
      items: [
        "Artefacto de orientación de una página",
        "Infografía como herramienta Nivel 1",
        "Mapa de sistema tipo swimlane",
        "PPT como documento de ejecución gobernada",
        "Podcast como medio de orientación y calma"
      ]
    },
    en: {
      title: "Documentation & orientation assets",
      description: "Assets for understanding the system without getting lost inside it.",
      items: [
        "One-page orientation artifact",
        "Infographic as a Level 1 tool",
        "Swimlane system map",
        "PPT as a governed execution document",
        "Podcast as an orienting and calming medium"
      ]
    }
  },
  E: {
    es: {
      title: "Editorial, narrativa y espíritu",
      description: "Metáforas estructurales que sostienen sentido sin convertirse en decoración.",
      items: [
        "Libro de Ester como columna narrativa",
        "Ezequiel 37: huesos → estructura → aliento",
        "Prompts visuales de cosmología cristocéntrica",
        "Mapas de constelaciones emocionales"
      ]
    },
    en: {
      title: "Editorial, narrative & spiritual layer",
      description: "Structural metaphors that hold meaning without becoming decoration.",
      items: [
        "Book of Esther as narrative spine",
        "Ezekiel 37: bones → structure → breath",
        "Christ-centered cosmology prompts",
        "Emotional constellation maps"
      ]
    }
  },
  F: {
    es: {
      title: "Activos digitales y técnicos",
      description: "Superficies, herramientas y sistemas visuales aún en órbita.",
      items: [
        "Implementación HTML/CSS con estética glass",
        "Sistema de diseño configurable vía SDK",
        "Figma como herramienta de layout y swimlane",
        "Banners e íconos de Notion por tribu",
        "Biblioteca de prompts para vectores, logos y banners"
      ]
    },
    en: {
      title: "Digital & technical assets",
      description: "Surfaces, tools, and visual systems that remain in orbit.",
      items: [
        "HTML/CSS glass UI implementation",
        "Configurable design system via SDK",
        "Figma for layouts and swimlanes",
        "Notion banners and icons by tribe",
        "Prompt library for vectors, logos, and banners"
      ]
    }
  },
  G: {
    es: {
      title: "Procesos y gestión de proyectos",
      description: "Lógicas de activación y coordinación sin convertir la bóveda en burocracia.",
      items: [
        "Lógica paralela a PMBOK sin burocracia",
        "Activación por triggers: si / entonces / por tanto",
        "Instrucción de inicialización automática",
        "Pensamiento de procesos alineado con BCI"
      ]
    },
    en: {
      title: "Process & project management",
      description: "Activation and coordination logic without turning the vault into bureaucracy.",
      items: [
        "PMBOK-parallel logic without bureaucracy",
        "Trigger-based activation: if / then / therefore",
        "Automatic system-initialization instruction",
        "BCI-aligned process thinking"
      ]
    }
  }
};

const modes = {
  editorial: {
    es: {
      title: "Bóveda editorial",
      copy: "Archivo, fronteras de fuente y handoff estructurado.",
      action: "Revisar fronteras antes de expandir contenido."
    },
    en: {
      title: "Editorial Vault",
      copy: "Archive, source boundaries, and structured handoff.",
      action: "Review source boundaries before expanding content."
    }
  },
  lab: {
    es: {
      title: "Laboratorio bokeh glass",
      copy: "Experimentos visuales, movimiento y estudios de interacción.",
      action: "Probar legibilidad, movimiento reducido y respuesta móvil."
    },
    en: {
      title: "Glassy Bokeh Lab",
      copy: "Visual experiments, motion, and interaction studies.",
      action: "Test legibility, reduced motion, and mobile response."
    }
  },
  dashboard: {
    es: {
      title: "Archivo creativo",
      copy: "Candidatos, módulos y preparación para revisión, sin promoción automática.",
      action: "Materializar el paquete RC1 antes de cambiar estados reportados."
    },
    en: {
      title: "Creative Archive",
      copy: "Candidates, modules, and review readiness—without automatic promotion.",
      action: "Materialize the RC1 package before changing reported states."
    }
  }
};

const exitMessages = {
  rest: {
    es: "La bóveda permanece intacta. No se solicitó ninguna mutación.",
    en: "The vault remains untouched. No mutation was requested."
  },
  activate: {
    es: "Vista previa: convocar un cometa requeriría selección explícita y un plan separado. No se ejecutó.",
    en: "Preview: summoning one comet would require explicit selection and a separate plan. Nothing ran."
  },
  production: {
    es: "Vista previa: un Production Set abriría un canvas Nivel 2 independiente. No se creó.",
    en: "Preview: a Production Set would open a separate Level 2 canvas. It was not created."
  }
};

let currentLanguage = "es";
let currentCluster = "A";
let currentMode = "editorial";
let currentExit = "rest";
let lastRailTrigger = null;

function renderCluster() {
  const content = clusters[currentCluster][currentLanguage];
  clusterGlyph.textContent = currentCluster;
  clusterSuper.textContent =
    currentLanguage === "es" ? `COMET CLUSTER ${currentCluster}` : `COMET CLUSTER ${currentCluster}`;
  clusterTitle.textContent = content.title;
  clusterDescription.textContent = content.description;
  clusterItems.replaceChildren(
    ...content.items.map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    })
  );
}

function setCluster(cluster) {
  if (!clusters[cluster]) return;

  currentCluster = cluster;
  clusterButtons.forEach((button) => {
    const isActive = button.dataset.cluster === cluster;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  clusterDetail.classList.add("is-changing");
  window.setTimeout(() => {
    renderCluster();
    clusterDetail.classList.remove("is-changing");
  }, 170);
}

function renderMode() {
  const content = modes[currentMode][currentLanguage];
  currentModeTitle.textContent = content.title;
  currentModeCopy.textContent = content.copy;
  recommendedAction.textContent = content.action;
}

function setMode(mode) {
  if (!modes[mode]) return;

  currentMode = mode;
  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderMode();
}

function renderExitMessage() {
  exitMessage.textContent = exitMessages[currentExit][currentLanguage];
}

function setExit(exit) {
  if (!exitMessages[exit]) return;
  currentExit = exit;
  exitButtons.forEach((button) => {
    button.classList.toggle("is-recommended", button.dataset.exit === exit);
  });
  renderExitMessage();
}

function setLanguage(language) {
  if (!["en", "es"].includes(language)) return;
  currentLanguage = language;
  document.documentElement.lang = language;

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderCluster();
  renderMode();
  renderExitMessage();
}

function openRail(trigger) {
  lastRailTrigger = trigger;
  provenanceRail.classList.add("is-open");
  railScrim.classList.add("is-open");
  provenanceRail.removeAttribute("inert");
  provenanceRail.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-rail-open");
  provenanceRail.querySelector("[data-close-rail]")?.focus();
}

function closeRail() {
  provenanceRail.classList.remove("is-open");
  railScrim.classList.remove("is-open");
  provenanceRail.setAttribute("inert", "");
  provenanceRail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-rail-open");
  lastRailTrigger?.focus();
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 44);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

clusterButtons.forEach((button) => {
  button.addEventListener("click", () => setCluster(button.dataset.cluster));
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

exitButtons.forEach((button) => {
  button.addEventListener("click", () => setExit(button.dataset.exit));
});

openRailButtons.forEach((button) => {
  button.addEventListener("click", () => openRail(button));
});

closeRailButtons.forEach((button) => {
  button.addEventListener("click", closeRail);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && provenanceRail.classList.contains("is-open")) {
    closeRail();
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });

function initializeNebula() {
  const canvas = document.querySelector("#nebula-canvas");
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: 0.5, y: 0.5 };
  const palette = [
    [137, 200, 220],
    [234, 214, 149],
    [196, 139, 122],
    [255, 255, 255]
  ];
  let width = 0;
  let height = 0;
  let particles = [];
  let animationFrame = 0;

  function seedParticles() {
    const count = Math.min(84, Math.max(46, Math.round(width / 18)));
    particles = Array.from({ length: count }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.pow(Math.random(), 0.68) * Math.min(width, height) * 0.48;
      const color = palette[index % palette.length];
      return {
        baseX: width * 0.5 + Math.cos(angle) * distance * (width / Math.max(height, 1)),
        baseY: height * 0.48 + Math.sin(angle) * distance,
        radius: 0.45 + Math.random() * 2.1,
        alpha: 0.16 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        speed: 0.00018 + Math.random() * 0.00034,
        drift: 3 + Math.random() * 13,
        color
      };
    });
  }

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    seedParticles();
  }

  function drawOrbitalField(time) {
    context.clearRect(0, 0, width, height);

    const centerX = width * (0.5 + (pointer.x - 0.5) * 0.025);
    const centerY = height * (0.46 + (pointer.y - 0.5) * 0.02);
    const maxRadius = Math.min(width, height);

    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * 0.32);
    glow.addColorStop(0, "rgba(137, 200, 220, 0.18)");
    glow.addColorStop(0.24, "rgba(74, 124, 158, 0.09)");
    glow.addColorStop(1, "rgba(7, 17, 31, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(centerX, centerY);
    [0.16, 0.25, 0.36].forEach((scale, index) => {
      context.beginPath();
      context.ellipse(
        0,
        0,
        maxRadius * scale * 1.55,
        maxRadius * scale * 0.53,
        (index - 1) * 0.45 + time * 0.000015 * (index + 1),
        0,
        Math.PI * 2
      );
      context.strokeStyle = `rgba(180, 218, 229, ${0.08 - index * 0.015})`;
      context.lineWidth = 0.7;
      context.stroke();
    });
    context.restore();

    particles.forEach((particle, index) => {
      const phase = particle.phase + time * particle.speed;
      const offsetX = Math.cos(phase) * particle.drift + (pointer.x - 0.5) * (index % 7);
      const offsetY = Math.sin(phase * 0.86) * particle.drift + (pointer.y - 0.5) * (index % 5);
      const x = particle.baseX + offsetX;
      const y = particle.baseY + offsetY;
      const [red, green, blue] = particle.color;
      const shimmer = reducedMotion ? 1 : 0.72 + Math.sin(phase * 3) * 0.28;

      context.beginPath();
      context.arc(x, y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${particle.alpha * shimmer})`;
      context.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.45)`;
      context.shadowBlur = particle.radius * 6;
      context.fill();
      context.shadowBlur = 0;

      if (index % 9 === 0) {
        context.beginPath();
        context.moveTo(x - particle.radius * 4, y);
        context.lineTo(x + particle.radius * 4, y);
        context.moveTo(x, y - particle.radius * 4);
        context.lineTo(x, y + particle.radius * 4);
        context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${particle.alpha * 0.22})`;
        context.lineWidth = 0.6;
        context.stroke();
      }
    });
  }

  function animate(time) {
    drawOrbitalField(time);
    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  canvas.addEventListener(
    "pointermove",
    (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.y = (event.clientY - rect.top) / Math.max(rect.height, 1);
    },
    { passive: true }
  );

  window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeCanvas();
  animate(0);

  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(animationFrame);
  });
}

setLanguage(currentLanguage);
setCluster(currentCluster);
setMode(currentMode);
setExit(currentExit);
updateHeader();
initializeNebula();
