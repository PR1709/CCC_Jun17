import './App.css'

const highlights = [
  'MongoDB data modeling and CRUD workflows',
  'Express APIs with routing, middleware, and validation',
  'React UI builds with reusable components and hooks',
  'Node.js server setup, deployment basics, and project structure',
]

const curriculum = [
  {
    title: 'Frontend fundamentals',
    text: 'Build responsive screens with React, forms, and component patterns that are easy to maintain.',
  },
  {
    title: 'API development',
    text: 'Create REST endpoints with Express and connect them to the React app through clean data flows.',
  },
  {
    title: 'Database practice',
    text: 'Work with MongoDB collections, queries, and schema design for common training projects.',
  },
]

const schedule = [
  'Live demo sessions with step-by-step code walkthroughs',
  'Hands-on exercises at the end of each module',
  'Mini project to connect the full MERN stack',
]

function App() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">MERN Stack Training</p>
          <h1>Learn the full stack with one clear project path.</h1>
          <p className="lead">
            A basic training landing page for MongoDB, Express, React, and Node.js, with
            practical lessons, simple exercises, and a project-focused flow.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#curriculum">
              View curriculum
            </a>
            <a className="secondary-button" href="#contact">
              Ask about training
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Training summary">
          <p className="panel-label">Program snapshot</p>
          <ul>
            <li>8 week beginner-friendly course</li>
            <li>Frontend, backend, and database coverage</li>
            <li>One guided mini project plus practice tasks</li>
          </ul>
        </aside>
      </section>

      <section className="section-block" id="about">
        <div className="section-heading">
          <p className="eyebrow">Overview</p>
          <h2>What this training covers</h2>
        </div>
        <div className="info-grid">
          {highlights.map((item) => (
            <article className="info-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="curriculum">
        <div className="section-heading">
          <p className="eyebrow">Curriculum</p>
          <h2>Simple modules for each part of the stack</h2>
        </div>
        <div className="curriculum-grid">
          {curriculum.map((item) => (
            <article className="curriculum-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block split-block" id="format">
        <div className="section-heading compact">
          <p className="eyebrow">Format</p>
          <h2>Built for practical learning</h2>
          <p>
            The sessions stay simple: explain the idea, build the feature, then assign a small
            task so learners can repeat it on their own.
          </p>
        </div>

        <div className="schedule-card">
          <h3>Training flow</h3>
          <ul>
            {schedule.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-block cta-block" id="contact">
        <div>
          <p className="eyebrow">Get started</p>
          <h2>Ready to begin your MERN stack practice?</h2>
        </div>
        <a className="primary-button" href="mailto:training@example.com">
          Contact the trainer
        </a>
      </section>
    </main>
  )
}

export default App
