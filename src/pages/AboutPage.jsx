import './FeaturePages.css';

export default function AboutPage() {
  return (
    <div className="page">
      <header className="page__header">
        <h1>About Project</h1>
        <p>Details about this project.</p>
      </header>

      <div className="about-panel">
        <span className="about-panel__badge">School Project</span>
        <h2>MediaLoom</h2>
        <p>
          A movie, book, TV series, and anime rating tracker. Users submit a title, a 1–5 rating,
          and a short note through a form; the list is stored in a PHP session and displayed
          sorted by rating, with a live average across everything logged.
        </p>

        <div className="about-panel__grid">
          <div>
            <h3>Frontend</h3>
            <p>React, React Router, Vite</p>
          </div>
          <div>
            <h3>Backend</h3>
            <p>PHP session storage</p>
          </div>
          <div>
            <h3>Styling</h3>
            <p>Plain CSS, no framework</p>
          </div>
        </div>
      </div>
    </div>
  );
}
