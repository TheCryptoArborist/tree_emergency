import { AlertTriangle, ClipboardList, CloudLightning, Map, ShieldCheck, TreePine } from "lucide-react";

const priorities = [
  {
    icon: AlertTriangle,
    title: "Recognize immediate danger",
    text: "Active utility contact, fire, a tree on an occupied structure, or blocked emergency access requires the appropriate emergency service or utility—not an online report."
  },
  {
    icon: ClipboardList,
    title: "Document non-emergency damage",
    text: "Photographs, approximate location, access conditions, and a clear description will support future triage and professional evaluation."
  },
  {
    icon: ShieldCheck,
    title: "Avoid preventable exposure",
    text: "Stay away from suspended limbs, split trunks, leaning trees, flooded root zones, and any tree or branch contacting electrical conductors."
  }
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <div className="topbar">For immediate danger to life, call 911. Treat all downed or contacted utility lines as energized.</div>

      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="Emergency Tree Board home">
            <div className="brand-mark"><TreePine size={24} aria-hidden="true" /></div>
            <div>
              <strong>Emergency Tree Board</strong>
              <span>Independent Gulf Coast tree-storm information</span>
            </div>
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#status">Status</a>
            <a href="#safety">Safety</a>
            <a href="#reporting">Reporting</a>
            <a href="#map">Future Map</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container">
          <span className="eyebrow">Tree-related storm readiness</span>
          <h1>Clear information before, during, and after severe weather.</h1>
          <p className="lead">
            The Emergency Tree Board is being developed as an independent public-information resource for tree hazards, storm preparedness, verified updates, and responsible community reporting across Mobile and the central Gulf Coast.
          </p>
          <div className="actions">
            <a className="button button-primary" href="#safety">Review tree safety guidance</a>
            <a className="button button-secondary" href="#reporting">Learn what to report</a>
          </div>
        </div>
      </section>

      <section className="section" id="status">
        <div className="container">
          <div className="card status">
            <div className="status-label">Development status</div>
            <h2>Foundation build in progress</h2>
            <p className="section-intro">
              The public reporting workflow, verification process, operating levels, and generalized map are not yet active. This page establishes the safety-first structure for the future platform.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="safety">
        <div className="container">
          <span className="eyebrow">Safety priorities</span>
          <h2>Know what requires immediate action.</h2>
          <p className="section-intro">
            Tree failures can create electrical, structural, traffic, access, and falling-object hazards. Do not approach a damaged tree merely to obtain a better photograph.
          </p>
          <div className="grid">
            {priorities.map(({ icon: Icon, title, text }) => (
              <article className="card" key={title}>
                <Icon size={26} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="reporting">
        <div className="container">
          <span className="eyebrow">Future reporting workflow</span>
          <h2>Reports will support awareness—not emergency dispatch.</h2>
          <p className="section-intro">
            The planned reporting system will collect public-safe information about storm-damaged trees and blocked access. Exact residential addresses will not be displayed publicly by default, and every submission will remain subject to verification.
          </p>
          <div className="grid">
            <article className="card"><CloudLightning size={26} aria-hidden="true" /><h3>Event context</h3><p>Storm name or weather event, approximate time, and observed conditions.</p></article>
            <article className="card"><TreePine size={26} aria-hidden="true" /><h3>Tree condition</h3><p>Whole-tree failure, broken limb, split trunk, severe lean, uprooting, or obstruction.</p></article>
            <article className="card"><Map size={26} aria-hidden="true" /><h3>Generalized location</h3><p>Public map placement designed to protect private residential information.</p></article>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="map">
        <div className="container">
          <span className="eyebrow">Coming soon</span>
          <h2>Generalized emergency tree map</h2>
          <p className="section-intro">
            Future map layers may include verified obstruction reports, major tree failures, public-access impacts, operational status, and resolved reports. The map will not replace official emergency, utility, or municipal systems.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="warning">
            <strong>Independent project notice:</strong> The Emergency Tree Board is not affiliated with or endorsed by any municipality, government agency, utility, nonprofit organization, emergency management office, or tree board. Information published here is educational and does not replace emergency response, utility coordination, municipal reporting, or an on-site arborist assessment.
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">Emergency Tree Board · Gulf Coast tree safety and situational awareness</div>
      </footer>
    </main>
  );
}
