import Link from "next/link";
import { AlertTriangle, ArrowLeft, Camera, MapPin, ShieldAlert } from "lucide-react";
import { reportCategories, urgencyLevels } from "@/lib/emergency-model";

export const metadata = {
  title: "Report a Tree Condition | Emergency Tree Board",
  description: "Preview the planned non-emergency storm-related tree reporting workflow for the Gulf Coast."
};

export default function ReportPage() {
  return (
    <main className="site-shell">
      <div className="topbar">For immediate danger to life, call 911. Treat all downed or contacted utility lines as energized.</div>

      <section className="section report-page">
        <div className="container report-container">
          <Link className="back-link" href="/"><ArrowLeft size={18} aria-hidden="true" /> Back to Emergency Tree Board</Link>

          <span className="eyebrow">Reporting workflow preview</span>
          <h1 className="report-title">Report a storm-related tree condition</h1>
          <p className="lead">
            This form is being prepared for non-emergency public reports. Submissions are not yet being accepted or dispatched.
          </p>

          <div className="warning report-warning">
            <ShieldAlert size={24} aria-hidden="true" />
            <div>
              <strong>Do not use this form for an active emergency.</strong>
              <p>Call 911 for immediate danger to life. Contact the responsible utility for trees or limbs touching electrical conductors. Do not approach a damaged tree to obtain photographs.</p>
            </div>
          </div>

          <form className="report-form" aria-describedby="form-status">
            <fieldset disabled>
              <legend>Condition details</legend>

              <label>
                Type of tree condition
                <select defaultValue="">
                  <option value="" disabled>Select a condition</option>
                  {reportCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.label}</option>
                  ))}
                </select>
              </label>

              <label>
                Level of concern
                <select defaultValue="">
                  <option value="" disabled>Select a level</option>
                  {urgencyLevels.filter((level) => level.id !== "emergency").map((level) => (
                    <option key={level.id} value={level.id}>{level.label}</option>
                  ))}
                </select>
              </label>

              <label>
                Approximate location
                <input type="text" placeholder="Nearest cross street, landmark, or general area" />
              </label>

              <label>
                What did you observe?
                <textarea rows={6} placeholder="Describe the failure, obstruction, access condition, and anything that can be observed safely." />
              </label>

              <div className="form-grid">
                <label>
                  Date observed
                  <input type="date" />
                </label>
                <label>
                  Approximate time
                  <input type="time" />
                </label>
              </div>

              <label>
                Photograph upload
                <input type="file" accept="image/*" multiple />
              </label>

              <label className="checkbox-row">
                <input type="checkbox" />
                <span>I confirm that I remained in a safe location and did not enter private property or approach electrical hazards to obtain this information.</span>
              </label>

              <button className="button button-primary" type="submit">Submit report</button>
            </fieldset>
          </form>

          <div id="form-status" className="card form-status">
            <AlertTriangle size={24} aria-hidden="true" />
            <div>
              <h2>Reporting is not active yet</h2>
              <p>The form is displayed as a workflow preview while database storage, moderation, mapping, and privacy controls are completed.</p>
            </div>
          </div>

          <div className="grid report-notes">
            <article className="card"><MapPin size={24} aria-hidden="true" /><h3>Location privacy</h3><p>Exact residential addresses will not be displayed publicly by default. Public map points will be generalized when necessary.</p></article>
            <article className="card"><Camera size={24} aria-hidden="true" /><h3>Safe documentation</h3><p>Photographs should only be taken from a safe, lawful location. Never cross barriers or approach suspended limbs, floodwater, unstable trees, or conductors.</p></article>
            <article className="card"><AlertTriangle size={24} aria-hidden="true" /><h3>Verification required</h3><p>A submission will not appear publicly until it passes screening and receives an appropriate verification status.</p></article>
          </div>
        </div>
      </section>
    </main>
  );
}
