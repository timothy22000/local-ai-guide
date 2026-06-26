import React, { useState, useCallback } from 'react';
import {
  ChevronDown, ChevronRight, Cpu, HardDrive, Zap, DollarSign,
  AlertTriangle, Server, ArrowRight,
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
  { id: "gap", label: "SOTA Gap" },
  { id: "models", label: "Models" },
  { id: "hardware", label: "Hardware" },
  { id: "costs", label: "Costs" },
  { id: "tutorial", label: "Tutorial" },
  { id: "setup", label: "Setup" },
  { id: "your-setup", label: "Your Setup" },
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
  { id: "5090",     name: "RTX 5090",           vram: 32, arch: "Blackwell",  toks8b: 185, toks30b: 234, price: 3500, platform: "pc" },
  { id: "5080",     name: "RTX 5080",           vram: 16, arch: "Blackwell",  toks8b: 145, toks30b: 120, price: 1150, platform: "pc" },
  { id: "5070ti",   name: "RTX 5070 Ti",        vram: 16, arch: "Blackwell",  toks8b: 120, toks30b: 95,  price: 950,  platform: "pc" },
  { id: "5060ti",   name: "RTX 5060 Ti 16GB",   vram: 16, arch: "Blackwell",  toks8b: 90,  toks30b: 72,  price: 550,  platform: "pc" },
  { id: "4090",     name: "RTX 4090",           vram: 24, arch: "Ada",        toks8b: 128, toks30b: 105, price: 2350, platform: "pc" },
  { id: "4090u",    name: "RTX 4090 (used)",    vram: 24, arch: "Ada",        toks8b: 128, toks30b: 105, price: 2350, platform: "pc" },
  { id: "3090u",    name: "RTX 3090 (used)",    vram: 24, arch: "Ampere",     toks8b: 112, toks30b: 85,  price: 800,  platform: "pc" },
  { id: "4060ti",   name: "RTX 4060 Ti 16GB",   vram: 16, arch: "Ada",        toks8b: 72,  toks30b: 58,  price: 500,  platform: "pc" },
  { id: "3060",     name: "RTX 3060 12GB",      vram: 12, arch: "Ampere",     toks8b: 55,  toks30b: 0,   price: 200,  platform: "pc" },
  { id: "r9700",    name: "AMD R9700 AI PRO",   vram: 32, arch: "RDNA 4",     toks8b: 95,  toks30b: 78,  price: 1400, platform: "pc" },
  { id: "b580",     name: "Intel Arc B580",     vram: 12, arch: "Battlemage",  toks8b: 62,  toks30b: 0,   price: 250,  platform: "pc" },
  { id: "1070ti",   name: "GTX 1070 Ti",        vram: 8,  arch: "Pascal",     toks8b: 18,  toks30b: 0,   price: 100,  platform: "pc" },
  { id: "1080ti",   name: "GTX 1080 Ti",        vram: 11, arch: "Pascal",     toks8b: 25,  toks30b: 0,   price: 150,  platform: "pc" },
  { id: "m5max128", name: "M5 Max (128GB)",     vram: 128,arch: "M5",         toks8b: 230, toks30b: 145, price: 4000, platform: "mac" },
  { id: "m4max64",  name: "M4 Max (64GB)",      vram: 64, arch: "M4",         toks8b: 62,  toks30b: 48,  price: 3200, platform: "mac" },
  { id: "m4max128", name: "M4 Max (128GB)",     vram: 128,arch: "M4",         toks8b: 62,  toks30b: 48,  price: 5000, platform: "mac" },
  { id: "m3max64",  name: "M3 Max (64GB)",      vram: 64, arch: "M3",         toks8b: 50,  toks30b: 38,  price: 2800, platform: "mac" },
  { id: "m2max64",  name: "M2 Max (64GB)",      vram: 64, arch: "M2",         toks8b: 55,  toks30b: 42,  price: 2500, platform: "mac" },
  { id: "m2max32",  name: "M2 Max (32GB)",      vram: 32, arch: "M2",         toks8b: 55,  toks30b: 40,  price: 2000, platform: "mac" },
  { id: "m2pro32",  name: "M2 Pro (32GB)",      vram: 32, arch: "M2",         toks8b: 40,  toks30b: 28,  price: 1800, platform: "mac" },
  { id: "m1max64",  name: "M1 Max (64GB)",      vram: 64, arch: "M1",         toks8b: 35,  toks30b: 25,  price: 1500, platform: "mac" },
  { id: "none",     name: "No dedicated GPU",   vram: 0,  arch: "CPU",        toks8b: 2,   toks30b: 0,   price: 0,    platform: "any" },
];

const MODEL_DB = [
  { name: "Qwen 3.6 27B",       vramReq: 16, swe: 77.2, speed: "fast",  tier: "excellent", useCase: "Best local coder" },
  { name: "Qwen3-Coder-Next",   vramReq: 12, swe: 70.6, speed: "very fast", tier: "excellent", useCase: "Best efficiency (3B active)" },
  { name: "Devstral Small 2",   vramReq: 15, swe: 68,   speed: "fast",  tier: "great", useCase: "Multi-file agentic coding" },
  { name: "Gemma 4 26B MoE",    vramReq: 12, swe: 65,   speed: "fast",  tier: "great", useCase: "Multimodal + coding" },
  { name: "Llama 4 Maverick",   vramReq: 24, swe: 62,   speed: "medium",tier: "good",  useCase: "General purpose, 1M context" },
  { name: "Mistral Small 4",    vramReq: 12, swe: 60,   speed: "very fast", tier: "good", useCase: "Agentic, fast MoE" },
  { name: "gpt-oss 120B",       vramReq: 14, swe: 58,   speed: "fast",  tier: "good",  useCase: "OpenAI open-weight" },
  { name: "GLM-4.7 Flash",      vramReq: 10, swe: 55,   speed: "fastest",tier: "good", useCase: "Speed + tool calling" },
  { name: "Phi-5 Medium 14B",   vramReq: 8,  swe: 52,   speed: "fast",  tier: "decent",useCase: "Edge / low-VRAM" },
  { name: "Llama 3.1 8B",       vramReq: 6,  swe: 38,   speed: "fastest",tier: "entry",useCase: "Minimal hardware" },
  { name: "Mistral 7B",         vramReq: 5,  swe: 32,   speed: "fastest",tier: "entry",useCase: "Quick responses only" },
  { name: "Qwen 3.5 397B MoE",  vramReq: 24, swe: 77,   speed: "medium",tier: "excellent", useCase: "Frontier MoE (needs 24GB+)" },
  { name: "Llama 3.3 70B",      vramReq: 42, swe: 58,   speed: "slow",  tier: "good", useCase: "Needs 48GB+ or Mac 64GB" },
  { name: "Qwen 2.5 72B",       vramReq: 42, swe: 60,   speed: "slow",  tier: "good", useCase: "Needs 48GB+ or Mac 64GB" },
];

function HardwareAnalyzer() {
  const [platform, setPlatform] = useState("");
  const [gpuId, setGpuId] = useState("");
  const [ram, setRam] = useState("");
  const [useCase, setUseCase] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");

  const gpu = GPU_DB.find(g => g.id === gpuId);
  const effectiveVram = gpu ? (gpu.platform === "mac" ? gpu.vram * 0.75 : gpu.vram) : 0;
  const compatibleModels = MODEL_DB
    .filter(m => m.vramReq <= effectiveVram)
    .sort((a, b) => b.swe - a.swe);

  const bestModel = compatibleModels[0];
  const spend = parseFloat(monthlySpend) || 0;
  const breakeven = gpu && spend > 0 ? Math.ceil(gpu.price / spend) : null;
  const filteredGpus = GPU_DB.filter(g => g.id !== "none" && (platform === "" || g.platform === platform || g.platform === "any"));
  const showResults = gpu && gpu.id !== "none";
  const showCpuWarning = gpu && gpu.id === "none";

  return (
    <Section id="your-setup">
      <SectionTitle
        eyebrow="Interactive Tool"
        title="Analyze Your Setup"
        subtitle="Enter your hardware to get personalized model recommendations, speed estimates, and cost savings calculations."
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

            {/* Monthly API spend */}
            <div>
              <label className="block text-sm text-muted mb-1.5">Current Monthly API Spend ($)</label>
              <input type="number" value={monthlySpend} onChange={e => setMonthlySpend(e.target.value)} placeholder="e.g. 50, 100, 200"
                className="w-full px-3 py-2.5 bg-white border border-rule rounded-lg text-ink text-sm focus:outline-none focus:border-accent placeholder:text-faint2" />
            </div>

            {gpu && (
              <div className="p-3 bg-paper2 rounded-lg border border-rule">
                <div className="flex justify-between text-sm"><span className="text-muted">Effective VRAM</span><span className="text-ink font-medium">{Math.floor(effectiveVram)}GB {gpu.platform === "mac" && "(75% of unified)"}</span></div>
                <div className="flex justify-between text-sm mt-1"><span className="text-muted">Compatible models</span><span className="text-accent font-medium">{compatibleModels.length}</span></div>
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
              <p className="text-muted text-sm mt-1">Running LLMs on CPU only gives 1-3 tokens/second, too slow to be practical. Even a budget GPU like the Intel Arc B580 ($249, 12GB) or a used RTX 3060 12GB ($200) will make local AI usable. For Mac users, Apple Silicon's unified memory acts as GPU memory.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {showResults && (
        <>
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
                    <Badge variant="info">{bestModel.speed}</Badge>
                    <Badge>{bestModel.useCase}</Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Compatible Models Table */}
          <Card className="mb-6">
            <h3 className="font-bold text-ink mb-4">All Compatible Models ({compatibleModels.length})</h3>
            {compatibleModels.length > 0 ? (
              <DataTable
                headers={["Model", "VRAM Needed", "SWE-bench", "Speed", "Quality", "Best For"]}
                rows={compatibleModels.map((m, i) => [
                  <span className={i === 0 ? "text-accent font-medium" : ""}>{m.name} {i === 0 && "⭐"}</span>,
                  `${m.vramReq}GB`,
                  <span className="text-accent">{m.swe}%</span>,
                  m.speed,
                  <Badge variant={m.tier === "excellent" ? "success" : m.tier === "great" ? "info" : m.tier === "good" ? "warning" : "default"}>{m.tier}</Badge>,
                  m.useCase,
                ])}
                compact
              />
            ) : (
              <p className="text-muted text-sm">No models fit your current VRAM. Consider upgrading your GPU.</p>
            )}
          </Card>

          {/* Cost Savings */}
          {breakeven && (
            <Card className="mb-6">
              <h3 className="font-bold text-ink mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-accent" /> Cost Savings Estimate</h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-accent">{breakeven} mo</p>
                  <p className="text-sm text-muted">GPU breakeven</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-ink">${spend * 12}</p>
                  <p className="text-sm text-muted">Yearly API spend</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-navy">${Math.max(0, (spend * 12) - gpu.price)}</p>
                  <p className="text-sm text-muted">Year 1 net savings</p>
                </div>
              </div>
            </Card>
          )}

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
              <p className="text-gold font-medium">💡 Upgrade Suggestion</p>
              <p className="text-body text-sm mt-1">
                With {Math.floor(effectiveVram)}GB effective VRAM, you're limited to smaller models. A used RTX 3090 ($600-1,050, 24GB) would unlock Qwen 3.6 27B (77.2% SWE-bench), the best local coder available. An RTX 5060 Ti 16GB (~$550) is the best new-purchase value.
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
              <p className="text-sm text-muted">You are running on CPU. A GPU fixes it, and you do not need an expensive one. A used RTX 3060 (12GB, around $200) makes local models usable. The Hardware section has the full breakdown.</p>
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
      </div>
    </Section>
  );
}

/* ─── Main App ─── */

export default function App() {
  const [modelTab, setModelTab] = useState("frontier");

  const frontierModels = [
    { name: "DeepSeek V4-Pro", params: "1.6T (49B active)", type: "MoE", vram: "32GB+", swe: 80.6, swePro: 58.6, lcb: 93.5, context: "1M", license: "MIT" },
    { name: "MiniMax M3", params: "~500B MoE", type: "MoE", vram: "32GB+", swe: 80.5, swePro: 59.0, lcb: 88, context: "1M", license: "Custom" },
    { name: "GLM-5.2", params: "~750B (40B active)", type: "MoE", vram: "24GB+", swe: 79, swePro: 62.1, lcb: 89, context: "128K", license: "MIT" },
    { name: "Kimi K2.6", params: "~1T (32B active)", type: "MoE", vram: "24GB+", swe: 78, swePro: 58.6, lcb: 88, context: "256K", license: "Modified MIT" },
    { name: "Qwen 3.5 397B", params: "397B (17B active)", type: "MoE", vram: "24GB+", swe: 77, swePro: 55, lcb: 83.6, context: "256K", license: "Apache 2.0" },
  ];

  const localModels = [
    { name: "Qwen 3.6 27B", params: "27B dense", type: "Dense", vram: "16GB", swe: 77.2, swePro: 48, lcb: 78, context: "256K", license: "Apache 2.0", pick: true },
    { name: "Qwen3-Coder-Next", params: "80B (3B active)", type: "MoE", vram: "16GB", swe: 70.6, swePro: 44.3, lcb: 76, context: "256K", license: "Apache 2.0", pick: true },
    { name: "Devstral Small 2", params: "24B", type: "Dense", vram: "16GB", swe: 68, swePro: 42, lcb: 72, context: "256K", license: "Apache 2.0" },
    { name: "Gemma 4 26B", params: "26B (3.8B active)", type: "MoE", vram: "16GB", swe: 65, swePro: 38, lcb: 77.1, context: "128K", license: "Apache 2.0" },
    { name: "Mistral Small 4", params: "119B (6.5B active)", type: "MoE", vram: "16GB", swe: 60, swePro: 33, lcb: 68, context: "256K", license: "Apache 2.0" },
    { name: "gpt-oss 120B", params: "117B (5.1B active)", type: "MoE", vram: "16GB", swe: 58, swePro: 32, lcb: 66, context: "128K", license: "Apache 2.0" },
    { name: "GLM-4.7 Flash", params: "30B (3B active)", type: "MoE", vram: "16GB", swe: 55, swePro: 30, lcb: 65, context: "128K", license: "Apache 2.0" },
    { name: "Phi-5 Medium", params: "14B", type: "Dense", vram: "12GB", swe: 52, swePro: 28, lcb: 62, context: "128K", license: "MIT" },
  ];

  const gpus = [
    { name: "RTX 5090", vram: "32GB GDDR7", speed8b: "185 t/s", speed30b: "234 t/s", max: "32B / 70B MoE†", msrp: "$1,999", street: "$3,500–4,200", value: 3, note: "shortage" },
    { name: "RTX 5080", vram: "16GB GDDR7", speed8b: "145 t/s", speed30b: "120 t/s", max: "14B dense", msrp: "$999", street: "$1,150–1,250", value: 4 },
    { name: "RTX 5060 Ti 16GB", vram: "16GB GDDR7", speed8b: "90 t/s", speed30b: "72 t/s", max: "14B dense", msrp: "$429", street: "~$550", value: 5 },
    { name: "RTX 3090 (used)", vram: "24GB GDDR6X", speed8b: "112 t/s", speed30b: "85 t/s", max: "27B dense / 30B MoE", msrp: "-", street: "$600–1,050", value: 5, rec: true },
    { name: "AMD R9700 AI PRO", vram: "32GB GDDR6", speed8b: "95 t/s", speed30b: "78 t/s", max: "32B dense", msrp: "$1,299", street: "$1,400–1,530", value: 4 },
    { name: "Intel Arc B580", vram: "12GB GDDR6", speed8b: "62 t/s", speed30b: "-", max: "13B", msrp: "$249", street: "~$250–299", value: 5 },
    { name: "M5 Max 128GB", vram: "128GB uni", speed8b: "230 t/s", speed30b: "145 t/s", max: "70B+ full", msrp: "$3,999+", street: "$3,999+", value: 4, note: "silent" },
    { name: "M2 Max 64GB", vram: "64GB uni", speed8b: "55 t/s", speed30b: "42 t/s", max: "32B / 70B Q4†", msrp: "-", street: "-", value: 5 },
  ];

  const cloudPricing = [
    { service: "Claude Opus 4.8", input: "$5.00", output: "$25.00", local: "DeepSeek V4 / Qwen 3.6", lCost: "~$0.02", be: "250K tokens", note: "↓67% from $15/$75" },
    { service: "Claude Sonnet 4.6", input: "$3.00", output: "$15.00", local: "Qwen 3.6 27B", lCost: "~$0.01", be: "500K tokens" },
    { service: "GPT-5.5", input: "$5.00", output: "$30.00", local: "DeepSeek V4-Pro", lCost: "~$0.02", be: "200K tokens" },
    { service: "Claude Haiku 4.5", input: "$1.00", output: "$5.00", local: "GLM-4.7 Flash", lCost: "~$0.005", be: "1M tokens" },
    { service: "DeepSeek V4-Flash", input: "$0.14", output: "$0.28", local: "Self-host V4-Flash", lCost: "$0.00", be: "Any", note: "50–100x cheaper" },
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
            Run AI Models Locally<br />
            <span className="text-accent italic">The Gap Has Never Been Smaller</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mb-8">
            Open-weight models now lag frontier AI by just 4 months. DeepSeek V4, Qwen 3.6, and Kimi K2.6
            hit 80%+ on SWE-bench, at just 1–5% of the cost.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById("models")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 bg-accent hover:bg-accentdark text-white font-semibold rounded-lg transition-colors flex items-center gap-2 border-none cursor-pointer">Explore Models <ArrowRight className="w-4 h-4" /></button>
            <button onClick={() => document.getElementById("your-setup")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 bg-white hover:bg-track text-ink font-semibold rounded-lg transition-colors border border-rule cursor-pointer">Analyze Your Setup</button>
          </div>
        </div>
      </header>

      {/* ── Stats bar ── */}
      <Section className="border-y border-rule !py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "~4 mo", label: "Open vs Frontier Gap", sub: "Epoch AI, May 2026" },
            { value: "80.6%", label: "Best Open SWE-bench", sub: "DeepSeek V4-Pro" },
            { value: "$0.14/M", label: "Cheapest API", sub: "DeepSeek V4-Flash" },
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
        <SectionTitle eyebrow="The Big Picture" title="Open vs Closed: How Close Are We?" subtitle="Visual comparison across key benchmarks. Green = best open-weight, blue = frontier closed." />
        <div className="grid md:grid-cols-2 gap-8">
          <Card highlight>
            <h3 className="font-bold mb-1">SWE-bench Verified</h3>
            <p className="text-xs text-faint mb-4">Real-world GitHub issue resolution</p>
            <div className="space-y-3">
              <GapBar label="DeepSeek V4-Pro (open)" open={80.6} closed={88.6} />
              <GapBar label="MiniMax M3 (open)" open={80.5} closed={88.6} />
              <GapBar label="Qwen 3.6 27B (local 16GB)" open={77.2} closed={88.6} />
              <GapBar label="Qwen3-Coder-Next (3B active)" open={70.6} closed={88.6} />
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
        <SectionTitle eyebrow="June 2026 Leaderboard" title="Best Open-Weight Models" subtitle="Benchmarks shifted from MMLU/HumanEval (saturated) to SWE-bench and LiveCodeBench." />
        <div className="flex gap-2 mb-8">
          {[["frontier","Frontier Open Models"],["local","Best for Local HW"]].map(([k,l]) => (
            <button key={k} onClick={() => setModelTab(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer ${modelTab === k ? 'bg-accent text-white' : 'bg-white text-muted hover:text-ink'}`}>{l}</button>
          ))}
        </div>
        <div className="space-y-4">
          {models.map((m, i) => (
            <Card key={i} highlight={m.pick || m.swe >= 80}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="lg:w-1/4">
                  <div className="flex items-center gap-2 flex-wrap"><h3 className="text-lg font-bold text-ink">{m.name}</h3>{m.pick && <Badge variant="success">Top Pick</Badge>}</div>
                  <div className="flex gap-1.5 mt-1 flex-wrap"><Badge>{m.params}</Badge><Badge variant={m.type==="MoE"?"info":"default"}>{m.type}</Badge><Badge variant="purple">{m.license}</Badge></div>
                </div>
                <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div><p className="text-xs text-faint uppercase">VRAM (Q4)</p><p className="text-sm font-medium text-ink">{m.vram}</p></div>
                  <div><p className="text-xs text-faint uppercase">Context</p><p className="text-sm font-medium text-ink">{m.context}</p></div>
                  <div><p className="text-xs text-faint uppercase">SWE-bench ✓</p><p className="text-sm font-medium text-accent">{m.swe}%</p></div>
                  <div><p className="text-xs text-faint uppercase">SWE Pro</p><p className="text-sm font-medium text-navy">{m.swePro}%</p></div>
                  <div><p className="text-xs text-faint uppercase">LiveCodeBench</p><p className="text-sm font-medium text-ink">{m.lcb}%</p></div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <ProgressBar value={m.swe} label="SWE-bench Verified (Opus 4.8 = 88.6%)" color={m.swe>=77?"emerald":m.swe>=65?"cyan":"amber"} />
                <ProgressBar value={m.lcb} label="LiveCodeBench" color={m.lcb>=85?"emerald":m.lcb>=70?"cyan":"amber"} />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 p-4 bg-goldsoft border border-gold/30 rounded-lg"><p className="text-gold font-medium">⚠️ Benchmark Caveat</p><p className="text-body text-sm mt-1">Many scores are vendor-reported. SWE-bench Verified has documented contamination. Independent evaluators (NIST CAISI, LM Arena) consistently show wider gaps. Treat single-benchmark claims as upper bounds.</p></div>
      </Section>

      {/* ── Hardware ── */}
      <Section id="hardware">
        <SectionTitle eyebrow="Hardware: June 2026" title="GPUs in a Memory Shortage" subtitle="GDDR7 prices surged ~90% in Q1 2026. Used RTX 3090 remains the value king." />
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card><HardDrive className="w-8 h-8 text-gold mb-4" /><h3 className="text-lg font-bold mb-2">16GB VRAM</h3><p className="text-muted text-sm mb-4">Run 3B-active MoE models (Qwen3-Coder-Next, Gemma 4) at 60–85 t/s.</p><p className="text-2xl font-bold text-ink">$429–999</p><p className="text-xs text-faint">RTX 5060 Ti – 5080</p></Card>
          <Card highlight><Zap className="w-8 h-8 text-accent mb-4" /><h3 className="text-lg font-bold mb-2">24–32GB VRAM</h3><p className="text-muted text-sm mb-4">Run 27B dense or large MoE. Used RTX 3090 is best VRAM-per-dollar.</p><p className="text-2xl font-bold text-ink">$600–4,200</p><p className="text-xs text-faint">RTX 3090 used – RTX 5090</p></Card>
          <Card><Server className="w-8 h-8 text-navy mb-4" /><h3 className="text-lg font-bold mb-2">64–128GB Unified</h3><p className="text-muted text-sm mb-4">Run full 70B+ silently. M5 Max Neural Accelerators: 230 t/s on 8B.</p><p className="text-2xl font-bold text-ink">$3,999+</p><p className="text-xs text-faint">Apple M-series</p></Card>
        </div>
        <Card>
          <h3 className="text-lg font-bold mb-4">GPU Comparison: Street Prices June 2026</h3>
          <DataTable headers={["GPU","VRAM","Speed (8B)","Speed (30B MoE)","Max Model (Q4)","MSRP","Street","Value"]} rows={gpus.map(g=>[<span className={g.rec?"text-accent font-medium":""}>{g.name}{g.rec&&" ⭐"}</span>,g.vram,g.speed8b,g.speed30b,g.max,g.msrp,g.street,<span>{"⭐".repeat(g.value)}</span>])} />
          <p className="text-xs text-faint mt-3">† = partial offload to system RAM, slower. Speeds measured with Q4_K_XL via llama.cpp.</p>
        </Card>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-accentsoft border border-accent/30 rounded-lg"><p className="text-accent font-medium">💡 Best Value: Used RTX 3090</p><p className="text-body text-sm mt-1">$600–1,050 for 24GB VRAM. Runs Qwen 3.6 27B and all 3B-active MoE models at full speed.</p></div>
          <div className="p-4 bg-goldsoft border border-gold/30 rounded-lg"><p className="text-gold font-medium">⚠️ 2026 DRAM Shortage</p><p className="text-body text-sm mt-1">RTX 5090 sells at $3,500–4,200 vs $1,999 MSRP. Memory is &gt;80% of its BOM. Consider used cards or waiting.</p></div>
        </div>
      </Section>

      {/* ── Costs ── */}
      <Section id="costs" className="bg-paper2">
        <SectionTitle eyebrow="Cost Analysis: June 2026" title="Local vs Cloud: Updated Math" subtitle="Claude cut Opus 67%. DeepSeek V4-Flash is 50–100x cheaper than frontier APIs." />
        <Card className="mb-8">
          <h3 className="font-bold mb-4">API Pricing Comparison</h3>
          <DataTable headers={["Service","Input/1M","Output/1M","Local Equivalent","Local Cost*","Breakeven"]} rows={cloudPricing.map(p=>[<span>{p.service}{p.note&&<span className="text-xs text-accent block">{p.note}</span>}</span>,p.input,p.output,p.local,<span className="text-accent">{p.lCost}</span>,p.be])} />
          <p className="text-xs text-faint mt-4">*Local cost = electricity only. Prompt caching = 90% off; Batch API = 50% off.</p>
        </Card>
        <div className="grid md:grid-cols-3 gap-6">
          <Card><DollarSign className="w-8 h-8 text-accent mb-4" /><h3 className="font-bold mb-2">Hybrid Strategy</h3><p className="text-sm text-muted mb-2">70% Haiku / 20% Sonnet / 10% Opus</p><p className="text-2xl font-bold text-accent">~50% savings</p><p className="text-sm text-muted">vs all-Sonnet</p></Card>
          <Card><DollarSign className="w-8 h-8 text-accent mb-4" /><h3 className="font-bold mb-2">GPU Breakeven</h3><p className="text-sm text-muted mb-2">Used RTX 3090 ($800) at &gt;$60/mo spend</p><p className="text-2xl font-bold text-accent">6–8 months</p><p className="text-sm text-muted">ROI period</p></Card>
          <Card><DollarSign className="w-8 h-8 text-navy mb-4" /><h3 className="font-bold mb-2">V4-Flash vs Opus</h3><p className="text-sm text-muted mb-2">$0.14/$0.28 vs $5/$25 per M tokens</p><p className="text-2xl font-bold text-navy">50–100x</p><p className="text-sm text-muted">cheaper output</p></Card>
        </div>
      </Section>

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
      </Section>

      {/* ── Your Setup (Interactive) ── */}
      <HardwareAnalyzer />

      {/* ── Footer ── */}
      <Section className="!py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">The Best Time to Go Local</h2>
          <p className="text-muted text-lg mb-8">Open models at 85–95% of frontier quality. MoE architectures that run 70B-class models on a laptop. Claude Code that connects natively to Ollama.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-accent hover:bg-accentdark text-white font-semibold rounded-lg transition-colors inline-flex items-center gap-2 no-underline">Download Ollama <ExternalLink className="w-4 h-4" /></a>
            <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white hover:bg-track text-ink font-semibold rounded-lg transition-colors border border-rule inline-flex items-center gap-2 no-underline">Try LM Studio <ExternalLink className="w-4 h-4" /></a>
          </div>
        </div>
      </Section>
      <footer className="border-t border-rule py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><Cpu className="w-5 h-5 text-accent" /><span className="font-bold text-ink">Local AI Guide</span><span className="text-faint text-sm">• June 2026</span></div>
          <p className="text-faint text-sm text-center md:text-right">Sources: Epoch AI, NIST CAISI, LM Arena, TrendForce, vendor benchmarks.</p>
        </div>
      </footer>
    </div>
  );
}
