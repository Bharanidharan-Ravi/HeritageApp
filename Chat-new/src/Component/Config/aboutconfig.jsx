// src/config/about.config.js

export const aboutConfig = {
  theme: {
    background: "#F3EFE7",        // Aged parchment
    textureOpacity: 0.035,

    textPrimary: "#1E2326",       // Charcoal ink
    textSecondary: "#5F6B73",

    accent: "#C7A24B",            // Antiquity gold
    accentHover: "#D6B25E",

    darkCard: "#0E1A1F",          // Obsidian slate
    darkCardSoft: "#13232F",

    cardBg: "#FFFFFF",
    softCardBg: "#E8E4D9",

    border: "rgba(42,58,68,0.15)",
  },

  header: {
    badge: "Who We Are",
    titleLine1: "Bridging the gap between",
    titleLine2: "textbooks & the terrain.",
  },

  mission: {
    title: "History Beyond Textbooks",
    description:
      "Archaeo Trails was born from the realization that history cannot be fully understood from books alone. We transform cultural heritage into immersive, field-based experiences where landscapes, inscriptions, and ruins become living classrooms.",
  },

  vision: {
    label: "Our Vision",
    description:
      "To take heritage beyond academic walls and nurture a generation that values, preserves, and protects cultural memory.",
    quote: "Every story needs a seeker.",
  },

  features: [
    {
      id: "field",
      icon: "🏛",
      title: "Field Visits",
      description:
        "Guided archaeological site visits for schools and colleges with real-world exposure.",
      variant: "light",
    },
    {
      id: "workshop",
      icon: "🧱",
      title: "Workshops",
      description:
        "Hands-on training in epigraphy, ceramics, conservation, and archaeological methods.",
      variant: "dark",
    },
    {
      id: "seminar",
      icon: "📜",
      title: "Seminars",
      description:
        "Expert-led academic sessions exploring history, museology, and cultural studies.",
      variant: "soft",
    },
  ],
};
