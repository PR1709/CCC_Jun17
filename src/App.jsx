import './App.css'

function App() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#hero">
          CCC Jun17
        </a>

        <nav aria-label="Primary" className="topnav">
          <a href="#hero">Hero</a>
          <a href="#testimonial">Testimonial</a>
          <a href="#mission">Mission</a>
          <a href="#about">About</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>

      <main className="page-shell">
        <section className="section hero-section" id="hero">
          <p className="section-label">Hero</p>
          <h1>Simple pages for clear messaging.</h1>
          <p className="lead">
            A clean, basic layout with a small navbar and the core sections kept in place.
          </p>
        </section>

        <section className="section" id="testimonial">
          <p className="section-label">Testimonial</p>
          <blockquote>
            "The layout is easy to scan and gets the point across without extra noise."
          </blockquote>
          <p className="quote-source">Alex, project lead</p>
        </section>

        <section className="section" id="mission">
          <p className="section-label">Mission</p>
          <h2>Keep the interface plain, useful, and easy to maintain.</h2>
          <p>
            The goal is to present the information clearly with simple sections, modest spacing,
            and no extra decoration.
          </p>
        </section>

        <section className="section" id="about">
          <p className="section-label">About</p>
          <h2>What this page includes</h2>
          <ul className="simple-list">
            <li>A minimal top navbar</li>
            <li>Four short content sections</li>
            <li>Basic spacing and borders</li>
          </ul>
        </section>

        <section className="section contact-section" id="contact">
          <div>
            <p className="section-label">Contact Us</p>
            <h2>Reach out for a simple, focused build.</h2>
          </div>
          <a className="contact-link" href="mailto:hello@example.com">
            hello@example.com
          </a>
        </section>
      </main>
    </>
  )
}

export default App
