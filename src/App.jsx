const projects = [
  {
    id: 1,
    name: "Moodwave",
    tagline: "Tell it your mood. Get music back.",
    description:
      "An AI-powered music discovery app that takes a mood or feeling as input and returns a curated set of tracks. Built with Groq's Llama 3.3 70B as the recommendation engine, a Cloudflare Worker as the CORS proxy, and Spotify's API for track enrichment.",
    tags: ["AI", "Music", "Spotify API", "Cloudflare Workers", "React"],
    url: "https://moodwave-v2.vercel.app",
    status: "Live",
  },
  {
    id: 2,
    name: "Chopbot",
    tagline: "Upload a video. Get a reshuffled version back.",
    description:
      "A browser-based video reshuffler. Upload any video, pick a clip length, and the app automatically chops it into equal segments, randomises their order, and stitches them into a new video for download. All processing happens client-side using FFmpeg.wasm, no server involved.",
    tags: ["FFmpeg.wasm", "Video Processing", "React", "Client-side"],
    url: "https://chopbot.vercel.app",
    status: "Live",
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        padding: "40px 40px 40px 40px",
        borderTop: "1px solid #e0e0da",
        transition: "background 0.2s",
        background: hovered ? "#f2f2ee" : "transparent",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Large faded number — the signature element */}
      <div style={{
        position: "absolute",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "clamp(80px, 14vw, 140px)",
        fontWeight: 600,
        color: "#e8e8e2",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-0.04em",
        transition: "color 0.2s",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Status pill */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        marginBottom: 16,
        padding: "3px 9px",
        borderRadius: 20,
        background: project.status === "Live" ? "#e8f5ee" : "#f0f0ea",
        fontSize: 11,
        fontWeight: 500,
        color: project.status === "Live" ? "#1a7a40" : "#666",
        letterSpacing: "0.04em",
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: project.status === "Live" ? "#2dab5f" : "#999",
          display: "inline-block",
        }} />
        {project.status}
      </div>

      {/* Project name */}
      <div style={{
        fontSize: "clamp(22px, 5vw, 32px)",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        marginBottom: 8,
        color: "#111",
        maxWidth: "70%",
      }}>
        {project.name}
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: 14,
        color: "#666",
        marginBottom: 16,
        fontWeight: 400,
        maxWidth: "60%",
        lineHeight: 1.5,
      }}>
        {project.tagline}
      </div>

      {/* Description */}
      <div style={{
        fontSize: 13,
        color: "#888",
        lineHeight: 1.7,
        maxWidth: 520,
        marginBottom: 20,
      }}>
        {project.description}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            padding: "3px 10px",
            borderRadius: 4,
            background: "#ebebе5",
            fontSize: 11,
            color: "#555",
            fontWeight: 500,
            letterSpacing: "0.02em",
            border: "1px solid #e0e0da",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div style={{
        position: "absolute",
        bottom: 40,
        right: 40,
        fontSize: 18,
        color: hovered ? "#111" : "#ccc",
        transition: "color 0.2s, transform 0.2s",
        transform: hovered ? "translate(3px, -3px)" : "none",
      }}>
        ↗
      </div>
    </a>
  );
}

import React from "react";

export default function App() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{
        padding: "60px 40px 48px",
        borderBottom: "1px solid #e0e0da",
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#999",
          marginBottom: 16,
        }}>
          Ace (aceysl) — Builder
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 6vw, 48px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#111",
          marginBottom: 16,
        }}>
          Things I've built.
        </h1>
        <p style={{
          fontSize: 15,
          color: "#888",
          lineHeight: 1.7,
          maxWidth: 480,
          fontWeight: 400,
        }}>
          A collection of projects built from a phone, in Termux, one problem at a time.
          Each one started as a real need and became a working tool.
        </p>
      </header>

      {/* Projects */}
      <main>
        <div style={{
          padding: "20px 40px 8px",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#bbb",
        }}>
          {projects.length} Projects
        </div>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        <div style={{ borderTop: "1px solid #e0e0da" }} />
      </main>

      {/* Footer */}
      <footer style={{
        padding: "32px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ fontSize: 12, color: "#bbb" }}>
          More coming.
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="https://x.com/aceysll" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, color: "#999", transition: "color 0.15s" }}
            onMouseEnter={e => e.target.style.color = "#111"}
            onMouseLeave={e => e.target.style.color = "#999"}>
            X / Twitter
          </a>
          <a href="mailto:aceysl22@gmail.com"
            style={{ fontSize: 12, color: "#999", transition: "color 0.15s" }}
            onMouseEnter={e => e.target.style.color = "#111"}
            onMouseLeave={e => e.target.style.color = "#999"}>
            Email
          </a>
        </div>
      </footer>

    </div>
  );
}
