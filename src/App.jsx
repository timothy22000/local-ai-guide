import React, { useState, useCallback } from 'react';
import {
  ChevronDown, ChevronRight, Cpu, Zap,
  AlertTriangle, ArrowRight,
  ExternalLink, TrendingUp, Clock, Settings, Sliders,
  Terminal, Download, Play, Wrench
} from 'lucide-react';

/* ─── Shared primitives ─── */

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="max-w-6xl mx-auto px-4 md:px-8">{children}</div>
  </section>
);

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mb-12">
    {eyebrow && <p className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.18em] mb-3">{eyebrow}</p>}
    <h2 className="text-3xl md:text-4xl font-bold font-display text-ink mb-4">{title}</h2>
    {subtitle && <p className="text-body text-xl max-w-2xl font-serif leading-relaxed">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "", highlight = false }) => (
  <div className={`rounded-xl p-6 ${highlight ? 'bg-accentsoft border border-accent/30' : 'bg-white border border-rule'} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const v = {
    default: "bg-track text-body",
    success: "bg-accentsoft text-accent border border-accent/30",
    warning: "bg-goldsoft text-gold border border-gold/30",
    danger: "bg-accentsoft text-accent border border-accent/30",
    info: "bg-navysoft text-navy border border-navy/30",
    purple: "bg-navysoft text-navy border border-navy/30",
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${v[variant]}`}>{children}</span>;
};

const DataTable = ({ headers, rows, compact = false }) => (
  <div className="overflow-x-auto -mx-2">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-rule">
          {headers.map((h, i) => (
            <th key={i} className={`${compact ? 'py-2 px-3 text-xs' : 'py-3 px-4 text-sm'} font-semibold text-body whitespace-nowrap`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-rule hover:bg-white transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`${compact ? 'py-2 px-3 text-xs' : 'py-3 px-4 text-sm'} text-muted whitespace-nowrap`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CodeBlock = ({ children, title }) => (
  <div className="rounded-lg overflow-hidden bg-codebg border border-rule">
    {title && <div className="px-4 py-2 bg-codebar border-b border-rule text-xs font-mono text-faint">{title}</div>}
    <pre className="p-4 text-sm font-mono text-codeink overflow-x-auto leading-relaxed">{children}</pre>
  </div>
);

const ProgressBar = ({ value, max = 100, label, color = "emerald" }) => {
  const colors = { emerald: "bg-accent", cyan: "bg-navy", amber: "bg-gold", red: "bg-accent", purple: "bg-navy" };
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="text-body font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-track rounded-full overflow-hidden">
        <div className={`h-full ${colors[color]} rounded-full transition-all duration-700`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
};

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-rule rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-white transition-colors text-left">
        <span className="font-medium text-ink">{title}</span>
        {open ? <ChevronDown className="w-5 h-5 text-muted shrink-0" /> : <ChevronRight className="w-5 h-5 text-muted shrink-0" />}
      </button>
      {open && <div className="p-4 bg-paper2">{children}</div>}
    </div>
  );
};

const GapBar = ({ label, open, closed }) => (
  <div className="space-y-1.5">
    <p className="text-xs text-muted">{label}</p>
    <div className="flex items-center gap-2">
      <div className="flex-1 h-3 bg-track rounded-full overflow-hidden relative">
        <div className="h-full bg-navy/30 rounded-full absolute left-0 top-0" style={{ width: `${closed}%` }} />
        <div className="h-full bg-accent rounded-full absolute left-0 top-0" style={{ width: `${open}%` }} />
      </div>
      <span className="text-xs text-body w-28 text-right font-mono">{open}% / {closed}%</span>
    </div>
  </div>
);

/* ─── Navigation ─── */

const NAV_ITEMS = [
  { id: "tutorial", label: "Tutorial" },
  { id: "llamacpp", label: "llama.cpp" },
  { id: "setup", label: "Setup" },
  { id: "your-setup", label: "Your Setup" },
  { id: "gap", label: "Benchmarks" },
  { id: "models", label: "Models" },
];

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-6 h-6 text-accent" />
          <span className="font-bold text-lg text-ink">Local AI Guide</span>
          <Badge variant="success">June 2026</Badge>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="text-muted hover:text-ink transition-colors text-sm bg-transparent border-none cursor-pointer">
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-muted hover:text-ink bg-transparent border-none cursor-pointer">
          {mobileOpen ? <ChevronDown className="w-6 h-6" /> : <Sliders className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-codebg border-t border-rule px-4 py-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left py-2 px-3 rounded-lg text-muted hover:text-ink hover:bg-white transition-colors text-sm bg-transparent border-none cursor-pointer">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hardware Analyzer ─── */

const GPU_DB = [
  { id: "5090",     name: "RTX 5090",           vram: 32, arch: "Blackwell",   bw: 1792, platform: "pc" },
  { id: "5080",     name: "RTX 5080",           vram: 16, arch: "Blackwell",   bw: 960,  platform: "pc" },
  { id: "5070ti",   name: "RTX 5070 Ti",        vram: 16, arch: "Blackwell",   bw: 896,  platform: "pc" },
  { id: "5060ti",   name: "RTX 5060 Ti 16GB",   vram: 16, arch: "Blackwell",   bw: 448,  platform: "pc" },
  { id: "4090",     name: "RTX 4090",           vram: 24, arch: "Ada",         bw: 1008, platform: "pc" },
  { id: "4090u",    name: "RTX 4090 (used)",    vram: 24, arch: "Ada",         bw: 1008, platform: "pc" },
  { id: "3090u",    name: "RTX 3090 (used)",    vram: 24, arch: "Ampere",      bw: 936,  platform: "pc" },
  { id: "4060ti",   name: "RTX 4060 Ti 16GB",   vram: 16, arch: "Ada",         bw: 288,  platform: "pc" },
  { id: "3060",     name: "RTX 3060 12GB",      vram: 12, arch: "Ampere",      bw: 360,  platform: "pc" },
  { id: "r9700",    name: "AMD R9700 AI PRO",   vram: 32, arch: "RDNA 4",      bw: 640,  platform: "pc" },
  { id: "b580",     name: "Intel Arc B580",     vram: 12, arch: "Battlemage",  bw: 456,  platform: "pc" },
  { id: "1070ti",   name: "GTX 1070 Ti",        vram: 8,  arch: "Pascal",      bw: 256,  platform: "pc" },
  { id: "1080ti",   name: "GTX 1080 Ti",        vram: 11, arch: "Pascal",      bw: 484,  platform: "pc" },
  { id: "m5max128", name: "M5 Max (128GB)",     vram: 128,arch: "M5",          bw: 614,  platform: "mac" },
  { id: "m4max64",  name: "M4 Max (64GB)",      vram: 64, arch: "M4",          bw: 546,  platform: "mac" },
  { id: "m4max128", name: "M4 Max (128GB)",     vram: 128,arch: "M4",          bw: 546,  platform: "mac" },
  { id: "m3max64",  name: "M3 Max (64GB)",      vram: 64, arch: "M3",          bw: 400,  platform: "mac" },
  { id: "m2max64",  name: "M2 Max (64GB)",      vram: 64, arch: "M2",          bw: 400,  platform: "mac" },
  { id: "m2max32",  name: "M2 Max (32GB)",      vram: 32, arch: "M2",          bw: 400,  platform: "mac" },
  { id: "m2pro32",  name: "M2 Pro (32GB)",      vram: 32, arch: "M2",          bw: 200,  platform: "mac" },
  { id: "m1max64",  name: "M1 Max (64GB)",      vram: 64, arch: "M1",          bw: 400,  platform: "mac" },
  { id: "none",     name: "No dedicated GPU",   vram: 0,  arch: "CPU",         bw: 50,   platform: "any" },
];

const MODEL_DB = [
  { name: "Qwen 3.6 27B",      params: 27,   act: 27,   moe: false, swe: 77.2, useCase: "Best local coder" },
  { name: "Devstral Small 2",  params: 24,   act: 24,   moe: false, swe: 68,   useCase: "Agentic coding" },
  { name: "Nemotron 3 Nano",   params: 30,   act: 3,    moe: true,  swe: 38.8, useCase: "Fast, few active" },
  { name: "Qwen 3.5 9B",       params: 9,    act: 9,    moe: false, swe: 34,   useCase: "Runs on 12GB" },
  { name: "Qwen 3.5 4B",       params: 4,    act: 4,    moe: false, swe: 20,   useCase: "Edge / CPU-friendly" },
  { name: "Qwen3-Coder-Next",  params: 80,   act: 3,    moe: true,  swe: 71.3, useCase: "Big MoE, 3B active" },
  { name: "Devstral 2",        params: 123,  act: 123,  moe: false, swe: 72.2, useCase: "Dense 123B" },
  { name: "gpt-oss 120B",      params: 117,  act: 5.1,  moe: true,  swe: 58,   useCase: "OpenAI open weight" },
  { name: "Nemotron 3 Super",  params: 120,  act: 12,   moe: true,  swe: 60.5, useCase: "Mid MoE" },
  { name: "Qwen3.5 397B",      params: 397,  act: 17,   moe: true,  swe: 80.4, useCase: "Frontier MoE" },
  { name: "MiniMax M3",        params: 428,  act: 23,   moe: true,  swe: 80.5, useCase: "Frontier MoE" },
  { name: "GLM-5.2",           params: 744,  act: 40,   moe: true,  swe: 79,   useCase: "Frontier MoE" },
  { name: "Kimi K2.6",         params: 1100, act: 32,   moe: true,  swe: 80.2, useCase: "Frontier MoE" },
  { name: "DeepSeek V4-Pro",   params: 1600, act: 49,   moe: true,  swe: 80.6, useCase: "Frontier MoE" },
];

// Decoding is memory-bound: tok/s ~= bandwidth / bytes read per token.
// Dense reads all weights each token; MoE reads only active experts (+ ~20% always-on layers).
const BPP = { q4: 0.55, q8: 1.06, fp16: 2.0 };   // GB of weights per billion params
const RAM_BW = 80;                                // GB/s, typical DDR5 dual-channel (offload path)
const weightsGB = (m, q) => m.params * BPP[q];
const perTokenGB = (m, q) => { const w = weightsGB(m, q); return m.moe ? (m.act * BPP[q] + 0.2 * w) : w; };
const tierOf = (m, q, vram, ram) => { const w = weightsGB(m, q); return w <= vram ? "gpu" : (w <= vram + ram ? "offload" : "no"); };
function estTps(m, q, bw, vram) {
  if (!bw) return 0;
  const pt = perTokenGB(m, q), eff = m.moe ? 0.7 : 0.82, w = weightsGB(m, q);
  if (w <= vram) return Math.round((eff * bw) / pt);
  const f = Math.max(0, Math.min(1, vram / w));   // fraction of weights resident in VRAM
  const t = (pt * f) / bw + (pt * (1 - f)) / RAM_BW;
  return Math.max(1, Math.round(eff / t));
}

function HardwareAnalyzer() {
  const [platform, setPlatform] = useState("");
  const [gpuId, setGpuId] = useState("");
  const [ram, setRam] = useState("");
  const [useCase, setUseCase] = useState("");
  const [quant, setQuant] = useState("q4");

  const gpu = GPU_DB.find(g => g.id === gpuId);
  const effectiveVram = gpu ? (gpu.platform === "mac" ? gpu.vram * 0.75 : gpu.vram) : 0;
  const ramGB = parseFloat(ram) || 0;
  const ranked = MODEL_DB
    .map(m => ({ ...m, t: tierOf(m, quant, effectiveVram, ramGB), w: weightsGB(m, quant), tps: estTps(m, quant, gpu ? gpu.bw : 0, effectiveVram) }))
    .sort((a, b) => b.swe - a.swe);
  const runnable = ranked.filter(m => m.t !== "no");
  const counts = { gpu: ranked.filter(m => m.t === "gpu").length, offload: ranked.filter(m => m.t === "offload").length, no: ranked.filter(m => m.t === "no").length };
  const bestModel = ranked.find(m => m.t === "gpu");
  const filteredGpus = GPU_DB.filter(g => g.id !== "none" && (platform === "" || g.platform === platform || g.platform === "any"));
  const showResults = gpu && gpu.id !== "none";
  const showCpuWarning = gpu && gpu.id === "none";

  return (
    <Section id="your-setup" className="bg-paper2">
      <SectionTitle
        eyebrow="Interactive Tool"
        title="Analyze Your Setup"
        subtitle="See what runs fully on your GPU, what offloads to system RAM, and the estimated speed at each quantization level."
      />

      {/* Input Form */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <Card>
          <h3 className="font-bold text-ink mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-accent" /> Your Hardware</h3>
          <div className="space-y-4">
            {/* Platform */}
            <div>
              <label className="block text-sm text-muted mb-1.5">Platform</label>
              <div className="flex gap-2">
                {[["pc","Windows / Linux"],["mac","Mac (Apple Silicon)"]].map(([val, label]) => (
                  <button key={val} onClick={() => { setPlatform(val); setGpuId(""); }}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border cursor-pointer ${platform === val ? 'bg-accentsoft border-accent/50 text-accent' : 'bg-white border-rule text-muted hover:border-rule2'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* GPU */}
            <div>
              <label className="block text-sm text-muted mb-1.5">GPU / Chip</label>
              <select value={gpuId} onChange={e => setGpuId(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-rule rounded-lg text-ink text-sm focus:outline-none focus:border-accent cursor-pointer appearance-none">
                <option value="">Select your GPU…</option>
                {filteredGpus.map(g => (
                  <option key={g.id} value={g.id}>{g.name} - {g.vram}GB</option>
                ))}
                <option value="none">No dedicated GPU / CPU only</option>
              </select>
            </div>

            {/* RAM */}
            <div>
              <label className="block text-sm text-muted mb-1.5">System RAM (GB)</label>
              <input type="number" value={ram} onChange={e => setRam(e.target.value)} placeholder="e.g. 32, 64, 128"
                className="w-full px-3 py-2.5 bg-white border border-rule rounded-lg text-ink text-sm focus:outline-none focus:border-accent placeholder:text-faint2" />
              <p className="text-xs text-faint mt-1">Used for CPU/RAM offload when a model is too big for VRAM.</p>
            </div>

            {/* Quantization */}
            <div>
              <label className="block text-sm text-muted mb-1.5">Quantization</label>
              <div className="flex gap-2">
                {[["q4","Q4"],["q8","Q8"],["fp16","FP16"]].map(([val, label]) => (
                  <button key={val} onClick={() => setQuant(val)}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border cursor-pointer ${quant === val ? 'bg-accentsoft border-accent/50 text-accent' : 'bg-white border-rule text-muted hover:border-rule2'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-ink mb-4 flex items-center gap-2"><Sliders className="w-5 h-5 text-navy" /> Your Usage</h3>
          <div className="space-y-4">
            {/* Use case */}
            <div>
              <label className="block text-sm text-muted mb-1.5">Primary Use Case</label>
              <div className="grid grid-cols-2 gap-2">
                {[["coding","Coding"],["general","General Chat"],["research","Research"],["claude-code","Claude Code"]].map(([val, label]) => (
                  <button key={val} onClick={() => setUseCase(val)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all border cursor-pointer ${useCase === val ? 'bg-navysoft border-navy/50 text-navy' : 'bg-white border-rule text-muted hover:border-rule2'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {gpu && (
              <div className="p-3 bg-paper2 rounded-lg border border-rule">
                <div className="flex justify-between text-sm"><span className="text-muted">Effective VRAM</span><span className="text-ink font-medium">{Math.floor(effectiveVram)}GB {gpu.platform === "mac" && "(75% of unified)"}</span></div>
                <div className="flex justify-between text-sm mt-1"><span className="text-muted">Memory bandwidth</span><span className="text-ink font-medium">{gpu.bw} GB/s</span></div>
                <div className="flex justify-between text-sm mt-1"><span className="text-muted">Fully on GPU ({quant.toUpperCase()})</span><span className="text-accent font-medium">{counts.gpu} of {ranked.length}</span></div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* CPU warning */}
      {showCpuWarning && (
        <Card className="mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-gold shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-ink">A GPU is strongly recommended</h3>
              <p className="text-muted text-sm mt-1">Running LLMs on CPU only gives 1-3 tokens/second, too slow to be practical. Even a budget GPU like the Intel Arc B580 (12GB) or a used RTX 3060 (12GB) will make local AI usable. For Mac users, Apple Silicon's unified memory acts as GPU memory.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {showResults && (
        <>
          {/* Compatibility summary */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-lg bg-accentsoft border border-accent/30"><p className="text-3xl font-bold font-display text-accent">{counts.gpu}</p><p className="text-xs text-body mt-1 font-sans uppercase tracking-wide">Run on GPU</p></div>
            <div className="p-4 rounded-lg bg-goldsoft border border-gold/30"><p className="text-3xl font-bold font-display text-gold">{counts.offload}</p><p className="text-xs text-body mt-1 font-sans uppercase tracking-wide">CPU offloaded</p></div>
            <div className="p-4 rounded-lg bg-paper2 border border-rule"><p className="text-3xl font-bold font-display text-muted">{counts.no}</p><p className="text-xs text-body mt-1 font-sans uppercase tracking-wide">Won't run</p></div>
          </div>

          {/* Best Model Recommendation */}
          <Card highlight className="mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accentsoft flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-accent font-sans font-semibold uppercase tracking-wider mb-1">Top Recommendation for Your {gpu.name}</p>
                <h3 className="text-2xl font-bold text-ink">{bestModel ? bestModel.name : "No compatible models"}</h3>
                {bestModel && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Badge variant="success">{bestModel.swe}% SWE-bench</Badge>
                    <Badge variant="info">~{bestModel.tps} tok/s</Badge>
                    <Badge>{bestModel.useCase}</Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Models Table */}
          <Card className="mb-6">
            <h3 className="font-bold text-ink mb-4">What runs on your {gpu.name} ({quant.toUpperCase()})</h3>
            {runnable.length > 0 ? (
              <DataTable
                headers={["Model", "Weights", "SWE-bench", "Est. tok/s", "Status", "Best For"]}
                rows={runnable.map((m) => [
                  <span className={bestModel && m.name === bestModel.name ? "text-accent font-medium" : ""}>{m.name}{bestModel && m.name === bestModel.name && " ⭐"}</span>,
                  `${m.w < 100 ? m.w.toFixed(1) : Math.round(m.w)}GB`,
                  <span className="text-accent">{m.swe}%</span>,
                  <span className="text-navy font-medium">~{m.tps}</span>,
                  m.t === "gpu" ? <Badge variant="success">GPU</Badge> : <Badge variant="warning">Offload</Badge>,
                  m.useCase,
                ])}
                compact
              />
            ) : (
              <p className="text-muted text-sm">Nothing fits, even with RAM offload. Add your system RAM above, or pick a smaller quant.</p>
            )}
          </Card>

          {/* How the estimate works */}
          <div className="mb-6 p-4 bg-navysoft border border-navy/30 rounded-lg">
            <p className="text-navy font-medium">How the tok/s estimate works</p>
            <p className="text-body text-sm mt-1">Decoding is memory-bound: each token reads the model weights from memory once, so tokens per second is roughly memory bandwidth divided by the bytes read per token. Dense models read every weight; a mixture-of-experts model reads only its active experts, which is why an 80B model with 3B active runs far faster than its size suggests. These are rough ceilings. Quantization and RAM offload are modeled here (offload assumes ~80 GB/s DDR5 and is much slower). KV cache from long context and your exact RAM speed are not, so for a precise number try <a href="https://runthisllm.com" target="_blank" rel="noopener noreferrer" className="text-accent underline">runthisllm.com</a>.</p>
          </div>

          {/* Quick Setup */}
          <Card>
            <h3 className="font-bold text-ink mb-4 flex items-center gap-2"><Terminal className="w-5 h-5 text-accent" /> Quick Start for Your {gpu.name}</h3>
            <CodeBlock title="Terminal">{`# Install Ollama
${gpu.platform === "mac" ? "brew install ollama" : "curl -fsSL https://ollama.com/install.sh | sh"}

# Pull your best model
ollama pull ${bestModel ? bestModel.name.toLowerCase().replace(/ /g, "-").replace("qwen-3.6-27b","qwen3.6:27b").replace("qwen3-coder-next","qwen3-coder-next").replace("glm-4.7-flash","glm-4.7-flash").replace("devstral-small-2","devstral-small-2").replace("gemma-4-26b-moe","gemma4:26b").replace("phi-5-medium-14b","phi-5:14b").replace("mistral-7b","mistral:7b").replace("llama-3.1-8b","llama3.1:8b") : "qwen3.6:27b"}

# Run it
ollama run ${bestModel ? bestModel.name.toLowerCase().replace(/ /g, "-").replace("qwen-3.6-27b","qwen3.6:27b").replace("qwen3-coder-next","qwen3-coder-next").replace("glm-4.7-flash","glm-4.7-flash").replace("devstral-small-2","devstral-small-2").replace("gemma-4-26b-moe","gemma4:26b").replace("phi-5-medium-14b","phi-5:14b").replace("mistral-7b","mistral:7b").replace("llama-3.1-8b","llama3.1:8b") : "qwen3.6:27b"}`}</CodeBlock>
            {(useCase === "claude-code" || useCase === "coding") && (
              <div className="mt-4">
                <p className="text-xs text-faint mb-2">Claude Code integration:</p>
                <CodeBlock title="~/.zshrc">{`export ANTHROPIC_BASE_URL="http://localhost:11434"
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_API_KEY=""
export ANTHROPIC_DEFAULT_SONNET_MODEL="${bestModel ? bestModel.name.toLowerCase().replace(/ /g, "-").replace("qwen-3.6-27b","qwen3.6:27b").replace("qwen3-coder-next","qwen3-coder-next") : "qwen3.6:27b"}"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="${bestModel ? bestModel.name.toLowerCase().replace(/ /g, "-").replace("qwen-3.6-27b","qwen3.6:27b").replace("qwen3-coder-next","qwen3-coder-next") : "qwen3.6:27b"}"
export ANTHROPIC_DEFAULT_OPUS_MODEL="${bestModel ? bestModel.name.toLowerCase().replace(/ /g, "-").replace("qwen-3.6-27b","qwen3.6:27b").replace("qwen3-coder-next","qwen3-coder-next") : "qwen3.6:27b"}"`}</CodeBlock>
              </div>
            )}
          </Card>

          {/* Upgrade suggestion */}
          {effectiveVram < 16 && (
            <div className="mt-6 p-4 bg-goldsoft border border-gold/30 rounded-lg">
              <p className="text-gold font-medium">Upgrade suggestion</p>
              <p className="text-body text-sm mt-1">
                With {Math.floor(effectiveVram)}GB effective VRAM, you're limited to smaller models. A 24GB card like a used RTX 3090 would unlock Qwen 3.6 27B (77.2% SWE-bench), the best local coder available. A 16GB card is the practical sweet spot for a new buy.
              </p>
            </div>
          )}
        </>
      )}
    </Section>
  );
}

/* ─── Tutorial ─── */

const StepNum = ({ n, color = "emerald" }) => {
  const bg = { emerald: "bg-accent", cyan: "bg-navy", amber: "bg-gold" };
  return <div className={`w-8 h-8 rounded-full ${bg[color]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{n}</div>;
};

function TutorialSection() {
  const [os, setOs] = useState("mac");

  const install = {
    mac: `# Homebrew
brew install ollama

# Or download the app from ollama.com/download`,
    windows: `# Download the installer from ollama.com/download
# Run OllamaSetup.exe and click through the prompts`,
    linux: `curl -fsSL https://ollama.com/install.sh | sh`,
  };

  const serveNote = {
    mac: "The Mac app launches Ollama in the background after install. Look for the llama icon in your menu bar.",
    windows: "The installer registers Ollama as a startup service, so it is already listening.",
    linux: "The install script sets up a systemd service. If you skipped that, run ollama serve in its own terminal window.",
  };

  const llamacppInstall = {
    mac: `# Homebrew (includes Metal GPU support)
brew install llama.cpp`,
    windows: `# Grab the prebuilt CUDA build from the releases page:
#   https://github.com/ggml-org/llama.cpp/releases
# (pick llama-<ver>-bin-win-cuda-x64.zip), or build with CMake like Linux.`,
    linux: `# Build with CUDA (NVIDIA). Drop -DGGML_CUDA=ON for a CPU-only build.
git clone --depth 1 https://github.com/ggml-org/llama.cpp
cd llama.cpp
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j`,
  };

  const envNote = os === "windows"
    ? "On Windows, set these in System Environment Variables or your PowerShell profile rather than ~/.zshrc."
    : "Add these to ~/.zshrc (or ~/.bashrc), then reload the shell.";

  return (
    <Section id="tutorial" className="bg-paper2">
      <SectionTitle
        eyebrow="Step by Step"
        title="Set Up Local AI From Scratch"
        subtitle="From nothing installed to a model answering prompts, then handed off to Claude Code. Budget about 15 minutes, most of it spent waiting on the model download."
      />

      {/* OS selector */}
      <div className="flex gap-2 mb-8">
        {[["mac", "macOS"], ["windows", "Windows"], ["linux", "Linux"]].map(([k, l]) => (
          <button key={k} onClick={() => setOs(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${os === k ? 'bg-accent text-white' : 'bg-white text-muted hover:text-ink'}`}>{l}</button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <Card>
          <div className="flex items-center gap-3 mb-4"><StepNum n="1" /><h3 className="font-bold text-ink flex items-center gap-2"><Download className="w-4 h-4 text-accent" /> Install Ollama</h3></div>
          <p className="text-sm text-muted mb-3">Ollama pulls models and serves them on your machine over a local HTTP API. Everything else in this guide talks to it.</p>
          <CodeBlock title="Terminal">{install[os]}</CodeBlock>
          <p className="text-sm text-muted mt-3 mb-2">Confirm it installed:</p>
          <CodeBlock title="Terminal">{`ollama --version`}</CodeBlock>
        </Card>

        {/* Step 2 */}
        <Card>
          <div className="flex items-center gap-3 mb-4"><StepNum n="2" /><h3 className="font-bold text-ink">Make sure the server is running</h3></div>
          <p className="text-sm text-muted mb-3">{serveNote[os]}</p>
          <CodeBlock title="Terminal">{`curl http://localhost:11434
# Ollama is running`}</CodeBlock>
          <p className="text-sm text-faint mt-3">No curl handy? Open http://localhost:11434 in a browser instead. Same answer.</p>
        </Card>

        {/* Step 3 */}
        <Card>
          <div className="flex items-center gap-3 mb-4"><StepNum n="3" /><h3 className="font-bold text-ink">Pull a model that fits your hardware</h3></div>
          <p className="text-sm text-muted mb-3">Match the model to your VRAM: more memory buys a stronger model. If you are not sure what fits, the <button onClick={() => document.getElementById("your-setup")?.scrollIntoView({ behavior: "smooth" })} className="text-accent underline bg-transparent border-none cursor-pointer p-0 font-inherit">Analyze Your Setup</button> tool below picks one for you.</p>
          <CodeBlock title="Terminal">{`# 16GB VRAM or more: the best local coder
ollama pull qwen3.6:27b

# 8-12GB VRAM: smaller, still useful
ollama pull llama3.1:8b

# The first pull downloads several GB. Go get a coffee.`}</CodeBlock>
        </Card>

        {/* Step 4 */}
        <Card>
          <div className="flex items-center gap-3 mb-4"><StepNum n="4" /><h3 className="font-bold text-ink flex items-center gap-2"><Play className="w-4 h-4 text-accent" /> Run it and check it answers</h3></div>
          <p className="text-sm text-muted mb-3">Start a chat in the terminal. The first run finishes the download, then drops you at a prompt.</p>
          <CodeBlock title="Terminal">{`ollama run qwen3.6:27b

>>> Write a two-line reminder to back up my laptop tonight.`}</CodeBlock>
          <p className="text-sm text-muted mt-3">Get a sensible reply and the model works. Type <span className="font-mono text-body">/bye</span> to leave the chat.</p>
        </Card>

        {/* Step 5 */}
        <Card>
          <div className="flex items-center gap-3 mb-4"><StepNum n="5" color="amber" /><h3 className="font-bold text-ink">Raise the context window</h3></div>
          <p className="text-sm text-muted mb-3">Ollama caps context near 4K tokens by default. Long sessions hit that ceiling and the model quietly forgets earlier turns. Bake in a bigger window with a Modelfile so you never trip over it.</p>
          <CodeBlock title="Modelfile">{`FROM qwen3.6:27b
PARAMETER num_ctx 131072`}</CodeBlock>
          <p className="text-sm text-muted mt-3 mb-2">Build the larger variant:</p>
          <CodeBlock title="Terminal">{`ollama create qwen3.6-big -f Modelfile`}</CodeBlock>
        </Card>

        {/* Step 6 */}
        <Card highlight>
          <div className="flex items-center gap-3 mb-4"><StepNum n="6" color="cyan" /><h3 className="font-bold text-ink flex items-center gap-2"><Terminal className="w-4 h-4 text-navy" /> Hand it to Claude Code</h3></div>
          <p className="text-sm text-muted mb-3">Ollama v0.14 and later speak the Anthropic Messages API directly, so Claude Code can reach it with no proxy in between. {envNote}</p>
          <CodeBlock title={os === "windows" ? "PowerShell profile" : "~/.zshrc"}>{`export ANTHROPIC_BASE_URL="http://localhost:11434"
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_API_KEY=""

# Route every tier to your local model
export ANTHROPIC_DEFAULT_SONNET_MODEL="qwen3.6-big"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="qwen3.6-big"
export ANTHROPIC_DEFAULT_OPUS_MODEL="qwen3.6-big"`}</CodeBlock>
          <p className="text-sm text-muted mt-3 mb-2">Reload, then start Claude Code against the local model:</p>
          <CodeBlock title="Terminal">{`source ~/.zshrc
claude --model qwen3.6-big`}</CodeBlock>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <div className="flex items-center gap-3 mb-4"><Wrench className="w-5 h-5 text-gold" /><h3 className="font-bold text-ink">When something goes wrong</h3></div>
          <div className="space-y-3">
            <Accordion title="Replies crawl at 1-3 tokens per second">
              <p className="text-sm text-muted">You are running on CPU. A GPU fixes it, and you do not need an expensive one. Even a used midrange card like an RTX 3060 (12GB) makes local models usable.</p>
            </Accordion>
            <Accordion title="The model will not load, or the process gets killed">
              <p className="text-sm text-muted">The model needs more memory than your GPU has. Drop to a smaller model or a Q4 build, or check the analyzer for one that fits your card.</p>
            </Accordion>
            <Accordion title="Claude Code answers but loses track mid-task">
              <p className="text-sm text-muted">The context window is too small. Do Step 5 and point Claude Code at the qwen3.6-big build instead of the stock tag.</p>
            </Accordion>
            <Accordion title="Error: address already in use (port 11434)">
              <p className="text-sm text-muted">Ollama is already running in the background. Skip ollama serve and carry on.</p>
            </Accordion>
            <Accordion title="Error: model not found">
              <p className="text-sm text-muted">Tags drift between releases. Run ollama list to see what you actually pulled, and check ollama.com/library for the current name.</p>
            </Accordion>
          </div>
        </Card>

        {/* Advanced: llama.cpp */}
        <div id="llamacpp" className="pt-8 mt-2 border-t border-rule">
          <p className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.18em] mb-3 mt-6">Advanced</p>
          <h3 className="text-2xl font-bold font-display text-ink mb-2">Faster path: llama.cpp</h3>
          <p className="text-body font-serif leading-relaxed mb-6">Ollama is built on llama.cpp and is the easiest start. Running llama.cpp directly gives you control over GPU offload, context size, and KV-cache precision, and it is faster on big models and partial CPU/RAM offload. Recent builds speak the Anthropic Messages API, so Claude Code still points straight at it.</p>
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-4"><StepNum n="A" /><h3 className="font-bold text-ink flex items-center gap-2"><Download className="w-4 h-4 text-accent" /> Install llama.cpp</h3></div>
              <CodeBlock title="Terminal">{llamacppInstall[os]}</CodeBlock>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-4"><StepNum n="B" /><h3 className="font-bold text-ink">Pull a GGUF and start the server</h3></div>
              <p className="text-sm text-muted mb-3">llama-server downloads the model from Hugging Face and serves it on port 8080. Find GGUF builds from unsloth, bartowski, or ggml-org.</p>
              <CodeBlock title="Terminal">{`# Downloads the GGUF from Hugging Face, then serves it on :8080
llama-server -hf <user>/<model>-GGUF:Q4_K_M -ngl 99 -c 32768 --jinja --port 8080`}</CodeBlock>
              <p className="text-sm text-muted mt-3"><span className="font-mono text-body">-ngl 99</span> puts all layers on the GPU (lower it for partial CPU/RAM offload). <span className="font-mono text-body">-c 32768</span> sets the context window directly, no 4K surprise. <span className="font-mono text-body">--jinja</span> is required for tool use. Add <span className="font-mono text-body">--flash-attn</span> and <span className="font-mono text-body">--cache-type-k q8_0</span> to shrink the KV cache and fit more context.</p>
            </Card>

            <Card highlight>
              <div className="flex items-center gap-3 mb-4"><StepNum n="C" color="cyan" /><h3 className="font-bold text-ink flex items-center gap-2"><Terminal className="w-4 h-4 text-navy" /> Point Claude Code at it</h3></div>
              <p className="text-sm text-muted mb-3">No proxy needed. llama.cpp serves the Anthropic Messages API, and the <span className="font-mono text-body">--jinja</span> flag above is what makes the agent loop work.</p>
              <CodeBlock title={os === "windows" ? "PowerShell profile" : "~/.zshrc"}>{`export ANTHROPIC_BASE_URL="http://localhost:8080"
export ANTHROPIC_AUTH_TOKEN="llamacpp"

claude`}</CodeBlock>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Main App ─── */

export default function App() {
  const [modelTab, setModelTab] = useState("frontier");

  const frontierModels = [
    { name: "DeepSeek V4-Pro", params: "1.6T (49B active)", type: "MoE", vram: "~800GB", hw: "Cloud / cluster", swe: 80.6, context: "1M", license: "MIT" },
    { name: "MiniMax M3", params: "428B (23B active)", type: "MoE", vram: "~230GB", hw: "Multi-GPU server", swe: 80.5, context: "1M", license: "Custom" },
    { name: "Kimi K2.6", params: "~1.1T (32B active)", type: "MoE", vram: "~560GB", hw: "Cluster", swe: 80.2, context: "256K", license: "Modified MIT" },
    { name: "Qwen3.5 397B", params: "397B (17B active)", type: "MoE", vram: "~210GB", hw: "Multi-GPU server", swe: 80.4, context: "256K", license: "Apache 2.0" },
    { name: "GLM-5.2", params: "744B (40B active)", type: "MoE", vram: "~372GB", hw: "4x H200", swe: 79, context: "1M", license: "MIT" },
  ];

  const localModels = [
    { name: "Qwen 3.6 27B", params: "27B dense", type: "Dense", vram: "~17GB", hw: "24GB GPU", swe: 77.2, context: "256K", license: "Apache 2.0", pick: true },
    { name: "Devstral Small 2", params: "24B dense", type: "Dense", vram: "~13GB", hw: "16GB GPU", swe: 68, context: "256K", license: "Apache 2.0" },
    { name: "Nemotron 3 Nano", params: "30B (3B active)", type: "MoE", vram: "~18GB", hw: "16-24GB GPU", swe: 38.8, context: "128K", license: "NVIDIA Open" },
    { name: "Qwen 3.5 9B", params: "9B dense", type: "Dense", vram: "~7GB", hw: "12GB GPU", swe: 34, context: "128K", license: "Apache 2.0" },
    { name: "Qwen3-Coder-Next", params: "80B (3B active)", type: "MoE", vram: "~46GB", hw: "48GB+ / 64GB Mac", swe: 71.3, context: "256K", license: "Apache 2.0" },
    { name: "Devstral 2", params: "123B dense", type: "Dense", vram: "~62GB", hw: "96GB card", swe: 72.2, context: "256K", license: "Apache 2.0" },
    { name: "gpt-oss 120B", params: "117B (5.1B active)", type: "MoE", vram: "~64GB", hw: "80GB GPU / 64GB unified", swe: 58, context: "128K", license: "Apache 2.0" },
    { name: "Nemotron 3 Super", params: "120B (12B active)", type: "MoE", vram: "~60GB", hw: "96GB card", swe: 60.5, context: "128K", license: "NVIDIA Open" },
  ];

  const models = modelTab === "frontier" ? frontierModels : localModels;

  return (
    <div className="min-h-screen bg-paper text-ink font-serif">
      <Nav />

      {/* ── Hero ── */}
      <header className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
          <Badge variant="success">Updated June 26, 2026</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display mt-4 mb-6 leading-tight tracking-tight">
            Run AI models locally
          </h1>
          <p className="text-xl text-muted max-w-2xl mb-8">
            A practical guide to running open-weight models on your own machine: install Ollama, point Claude Code at it, and check what your hardware can actually run. The benchmark numbers are further down.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById("tutorial")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 bg-accent hover:bg-accentdark text-white font-semibold rounded-lg transition-colors flex items-center gap-2 border-none cursor-pointer">Start the setup <ArrowRight className="w-4 h-4" /></button>
            <button onClick={() => document.getElementById("your-setup")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 bg-white hover:bg-track text-ink font-semibold rounded-lg transition-colors border border-rule cursor-pointer">Check what I can run</button>
          </div>
        </div>
      </header>

      {/* ── Tutorial (Step by Step) ── */}
      <TutorialSection />

      {/* ── Setup Guide ── */}
      <Section id="setup">
        <SectionTitle eyebrow="Getting Started: Ollama v0.24" title="Setup Guide with Claude Code" subtitle="Ollama v0.14+ speaks the Anthropic Messages API natively. No proxy needed." />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">1</div><h3 className="font-bold">Install Ollama</h3></div>
              <CodeBlock title="Terminal">{`# macOS\nbrew install ollama\n\n# Linux\ncurl -fsSL https://ollama.com/install.sh | sh\n\nollama serve`}</CodeBlock>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">2</div><h3 className="font-bold">Pull Models</h3></div>
              <CodeBlock title="Terminal">{`# Best local coder (77% SWE-bench)\nollama pull qwen3.6:27b\n\n# Best efficiency (3B active, 70% SWE)\nollama pull qwen3-coder-next\n\n# Fast tool-calling\nollama pull glm-4.7-flash\n\n# Multimodal\nollama pull gemma4:26b`}</CodeBlock>
            </Card>
          </div>
          <div className="space-y-6">
            <Card highlight>
              <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm">3</div><h3 className="font-bold">Claude Code (Native)</h3></div>
              <CodeBlock title="~/.zshrc">{`export ANTHROPIC_BASE_URL="http://localhost:11434"\nexport ANTHROPIC_AUTH_TOKEN="ollama"\nexport ANTHROPIC_API_KEY=""\n\n# Route ALL tiers locally\nexport ANTHROPIC_DEFAULT_SONNET_MODEL="qwen3.6:27b"\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL="qwen3.6:27b"\nexport ANTHROPIC_DEFAULT_OPUS_MODEL="qwen3.6:27b"`}</CodeBlock>
              <CodeBlock title="Terminal">{`source ~/.zshrc\nclaude --model qwen3.6:27b`}</CodeBlock>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white font-bold text-sm">!</div><h3 className="font-bold">Fix Context Window</h3></div>
              <p className="text-sm text-muted mb-3">Ollama defaults to 4K context, which silently breaks long agentic sessions.</p>
              <CodeBlock title="Modelfile.qwen3.6-claude">{`FROM qwen3.6:27b\nPARAMETER num_ctx 131072`}</CodeBlock>
              <CodeBlock title="Terminal">{`ollama create qwen3.6-claude -f Modelfile\nclaude --model qwen3.6-claude`}</CodeBlock>
            </Card>
          </div>
        </div>
        <div className="mt-8 p-4 bg-paper2 border border-rule rounded-lg">
          <p className="text-ink font-medium">Ollama vs llama.cpp</p>
          <p className="text-body text-sm mt-1">Ollama is the easy on-ramp, and it is built on llama.cpp. For large models, multi-GPU rigs, or maximum throughput, run llama.cpp directly (steps in the Tutorial above). Ollama's defaults, like the 4K context above, are tuned for a simple first run, not speed.</p>
        </div>
      </Section>

      {/* ── Your Setup (Interactive) ── */}
      <HardwareAnalyzer />

      {/* ── Stats bar ── */}
      <Section className="border-y border-rule !py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "~4 mo", label: "Open vs Frontier Gap", sub: "Epoch AI, May 2026" },
            { value: "80.6%", label: "Best Open SWE-bench", sub: "DeepSeek V4-Pro" },
            { value: "62.1%", label: "Best Open SWE-bench Pro", sub: "GLM-5.2" },
            { value: "77.2%", label: "Best Local Coder", sub: "Qwen 3.6 27B" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold font-display text-accent">{s.value}</p>
              <p className="text-sm text-body mt-1">{s.label}</p>
              <p className="text-xs text-faint">{s.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SOTA Gap ── */}
      <Section id="gap">
        <SectionTitle eyebrow="Benchmarks" title="Open vs closed on coding benchmarks" subtitle="Best open-weight (red) against the top closed model (navy) on two coding benchmarks." />
        <div className="grid md:grid-cols-2 gap-8">
          <Card highlight>
            <h3 className="font-bold mb-1">SWE-bench Verified</h3>
            <p className="text-xs text-faint mb-4">Real-world GitHub issue resolution</p>
            <div className="space-y-3">
              <GapBar label="DeepSeek V4-Pro (open)" open={80.6} closed={88.6} />
              <GapBar label="MiniMax M3 (open)" open={80.5} closed={88.6} />
              <GapBar label="Qwen 3.6 27B (local 16GB)" open={77.2} closed={88.6} />
              <GapBar label="Qwen3-Coder-Next (3B active)" open={71.3} closed={88.6} />
            </div>
            <p className="text-xs text-faint mt-3">Closed ref: Claude Opus 4.8 = 88.6%</p>
          </Card>
          <Card highlight>
            <h3 className="font-bold mb-1">SWE-bench Pro (Harder)</h3>
            <p className="text-xs text-faint mb-4">Independent, contamination-resistant</p>
            <div className="space-y-3">
              <GapBar label="GLM-5.2 (open)" open={62.1} closed={69.2} />
              <GapBar label="MiniMax M3 (open)" open={59.0} closed={69.2} />
              <GapBar label="Kimi K2.6 (open)" open={58.6} closed={69.2} />
              <GapBar label="DeepSeek V4-Pro (open)" open={58.6} closed={69.2} />
            </div>
            <p className="text-xs text-faint mt-3">Closed ref: Claude Opus 4.8 = 69.2%</p>
          </Card>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card><Clock className="w-6 h-6 text-navy mb-3" /><h3 className="font-bold text-ink mb-1">4-Month Lag</h3><p className="text-sm text-muted">Per Epoch AI (May 2026), open-weight models trail the frontier by ~4 months, the smallest gap ever measured.</p></Card>
          <Card><TrendingUp className="w-6 h-6 text-accent mb-3" /><h3 className="font-bold text-ink mb-1">85–95% as Good</h3><p className="text-sm text-muted">For most coding and reasoning tasks, at 1–5% of the cost of frontier APIs.</p></Card>
          <Card><AlertTriangle className="w-6 h-6 text-gold mb-3" /><h3 className="font-bold text-ink mb-1">Real Gap Remains</h3><p className="text-sm text-muted">On independent evals (NIST CAISI, LM Arena), agentic, abstract reasoning, and cyber tasks still strongly favor proprietary models.</p></Card>
        </div>
      </Section>

      {/* ── Models ── */}
      <Section id="models" className="bg-paper2">
        <SectionTitle eyebrow="June 2026" title="Open-weight model leaderboard" subtitle="SWE-bench Verified scores and the real memory each model needs. VRAM is set by total parameters, not active ones." />
        <div className="flex gap-2 mb-6">
          {[["frontier","Frontier (server-class)"],["local","Runs on one machine"]].map(([k,l]) => (
            <button key={k} onClick={() => setModelTab(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${modelTab === k ? 'bg-accent text-white' : 'bg-white text-muted hover:text-ink'}`}>{l}</button>
          ))}
        </div>
        <div className="mb-8 p-4 bg-navysoft border border-navy/30 rounded-lg">
          <p className="text-navy font-medium">How to read the VRAM column</p>
          <p className="text-body text-sm mt-1">Memory is set by total parameters, not active ones. A mixture-of-experts model only computes with a few experts per token (the "active" figure), but every expert's weights still have to sit in memory. Rule of thumb at 4-bit: about 0.5 to 0.6 GB per billion total parameters, plus KV cache that grows with context. So a 1.6T model needs roughly 800GB no matter that only 49B are active.</p>
        </div>
        <div className="space-y-4">
          {models.map((m, i) => (
            <Card key={i} highlight={m.pick || m.swe >= 80}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="lg:w-1/4">
                  <div className="flex items-center gap-2 flex-wrap"><h3 className="text-lg font-bold text-ink">{m.name}</h3>{m.pick && <Badge variant="success">Top Pick</Badge>}</div>
                  <div className="flex gap-1.5 mt-1 flex-wrap"><Badge>{m.params}</Badge><Badge variant={m.type==="MoE"?"info":"default"}>{m.type}</Badge><Badge variant="purple">{m.license}</Badge></div>
                </div>
                <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div><p className="text-xs text-faint uppercase">VRAM (Q4)</p><p className="text-sm font-medium text-ink">{m.vram}</p></div>
                  <div><p className="text-xs text-faint uppercase">Runs on</p><p className="text-sm font-medium text-ink">{m.hw}</p></div>
                  <div><p className="text-xs text-faint uppercase">SWE-bench ✓</p><p className="text-sm font-medium text-accent">{m.swe}%</p></div>
                  <div><p className="text-xs text-faint uppercase">Context</p><p className="text-sm font-medium text-ink">{m.context}</p></div>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar value={m.swe} label="SWE-bench Verified (Opus 4.8 = 88.6%)" color={m.swe>=77?"emerald":m.swe>=60?"cyan":"amber"} />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 p-4 bg-goldsoft border border-gold/30 rounded-lg"><p className="text-gold font-medium">Benchmark caveat</p><p className="text-body text-sm mt-1">Many scores are vendor-reported. SWE-bench Verified has documented contamination. Independent evaluators (NIST CAISI, LM Arena) consistently show wider gaps. Treat single-benchmark claims as upper bounds. Specs and SWE-bench scores verified June 2026 against model cards and public leaderboards; VRAM is computed from total parameters at 4-bit.</p></div>
      </Section>

      {/* ── Footer ── */}
      <Section className="!py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Get the tools</h2>
          <p className="text-muted text-lg mb-8">Ollama is the quickest way to start, and it powers the setup above. LM Studio adds a GUI. For large models or multi-GPU, run llama.cpp or vLLM directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-accent hover:bg-accentdark text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2 no-underline">Download Ollama <ExternalLink className="w-4 h-4" /></a>
            <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white hover:bg-track text-ink font-semibold rounded-lg transition-colors border border-rule inline-flex items-center gap-2 no-underline">Try LM Studio <ExternalLink className="w-4 h-4" /></a>
          </div>
        </div>
      </Section>
      <footer className="border-t border-rule py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><Cpu className="w-5 h-5 text-accent" /><span className="font-bold text-ink">Local AI Guide</span><span className="text-faint text-sm">• June 2026</span></div>
          <p className="text-faint text-sm text-center md:text-right">Sources: model cards, llm-stats, Artificial Analysis, Epoch AI, NIST CAISI, LM Arena. Specs verified June 2026.</p>
        </div>
      </footer>
    </div>
  );
}
