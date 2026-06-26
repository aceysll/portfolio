import React, { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    name: "Moodwave",
    tagline: "Type a mood. Get music that actually fits.",
    description: "AI-powered music discovery. Describe any mood, vibe, or artist and get 25 real tracks back, ranked by listener data from millions of people. Groq Llama 3.3 70B handles mood analysis, Last.fm powers tag-based discovery, and Spotify handles enrichment, playlist saving, and listening history personalization.",
    tags: ["AI", "Last.fm", "Spotify API", "Groq", "React", "Vercel Functions"],
    url: "https://moodwave-v3.vercel.app",
    status: "Live",
  },
  {
    id: 2,
    name: "Chopbot",
    tagline: "Upload a video. Chop, reorder, and download.",
    description: "Browser-based video reshuffler. Upload any video, pick a clip length, and Chopbot slices it into segments and shows you every clip with its timestamp. Reorder them manually, remove any you don't want, reshuffle randomly, then stitch and download. All processing runs client-side via FFmpeg.wasm. No uploads, no server.",
    tags: ["FFmpeg.wasm", "Video Processing", "React", "Client-side"],
    url: "https://chopbot.vercel.app",
    status: "Live",
  },
  {
    id: 3,
    name: "Tailr",
    tagline: "Paste your CV. Get a version built for the job.",
    description: "AI-powered CV tailoring. Upload or paste a CV, add the job description, and Tailr rewrites the bullets to match the role and generates a cover letter. The output is a polished, typeset PDF designed to stand out. Powered by Groq Llama 3.3 70B with pdf.js for document extraction.",
    tags: ["AI", "Groq", "pdf.js", "React", "Vercel Functions"],
    url: "https://usetailr.vercel.app",
    status: "Live",
  },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderTop: "1px solid #e4e4de",
          borderLeft: hovered || expanded ? "3px solid #c8a84b" : "3px solid transparent",
          background: hovered || expanded ? "#f2f1ee" : "transparent",
          transition: "background 0.3s ease, border-left 0.25s ease",
          cursor: "pointer",
        }}
      >
        <div onClick={() => setExpanded(p => !p)} style={{ padding: "36px 40px", display: "flex", gap: 40, alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0, width: 48, paddingTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb", letterSpacing: "0.08em" }}>
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: 20, background: "#e8f5ee", fontSize: 10, fontWeight: 600, color: "#1a7a40", letterSpacing: "0.06em" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2dab5f", display: "inline-block" }} />
                {project.status}
              </span>
            </div>
            <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 6, color: "#111" }}>
              {project.name}
            </div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 14, fontWeight: 500, lineHeight: 1.5 }}>
              {project.tagline}
            </div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.75, marginBottom: 18, maxWidth: 560 }}>
              {project.description}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{ padding: "3px 9px", borderRadius: 4, background: "transparent", fontSize: 11, color: "#999", fontWeight: 500, letterSpacing: "0.02em", border: "1px solid #ddddd8" }}>
                  {tag}
                </span>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 16, color: hovered || expanded ? "#111" : "#ccc", transition: "color 0.2s, transform 0.2s", display: "inline-block", transform: expanded ? "rotate(90deg)" : hovered ? "translate(2px,-2px)" : "none" }}>
                ↗
              </span>
            </div>
          </div>
        </div>

        <div style={{ overflow: "hidden", maxHeight: expanded ? 120 : 0, transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ padding: "0 40px 36px 128px", display: "flex", alignItems: "center", gap: 16, opacity: expanded ? 1 : 0, transition: "opacity 0.3s ease 0.15s" }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 8, background: "#111", color: "#f7f6f3", fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#333"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.transform = "none"; }}
            >
              Visit {project.name} ↗
            </a>
            <span style={{ fontSize: 12, color: "#bbb" }}>Opens in a new tab</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#f7f6f3", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; } @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }`}</style>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <header style={{ padding: "72px 40px 56px" }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>Ace — aceysll</div>
          </div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s" }}>
            <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px, 7vw, 58px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#111", marginBottom: 20 }}>
              Products built to<br />solve real problems.
            </h1>
          </div>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s" }}>
            <p style={{ fontSize: 15, color: "#777", lineHeight: 1.75, maxWidth: 440, fontWeight: 400 }}>
              A set of live, working tools. Each one started from a genuine need and was built until it was actually useful.
            </p>
          </div>
        </header>

        <main>
          <div style={{ padding: "0 40px 12px", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease 0.35s" }}>
            {projects.length} Projects
          </div>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <div style={{ borderTop: "1px solid #e4e4de" }} />
        </main>

        <footer style={{ padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#bbb" }}>More coming.</div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="https://x.com/aceysll" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#999", transition: "color 0.15s" }} onMouseEnter={e => e.target.style.color="#111"} onMouseLeave={e => e.target.style.color="#999"}>X / Twitter</a>
            <a href="mailto:dharnyel22@gmail.com" style={{ fontSize: 12, color: "#999", transition: "color 0.15s" }} onMouseEnter={e => e.target.style.color="#111"} onMouseLeave={e => e.target.style.color="#999"}>Email</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
