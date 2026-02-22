import './App.css'

const LINKS = [
  { href: 'https://github.com', label: 'GitHub', icon: 'github' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'mailto:you@example.com', label: 'Email', icon: 'mail' },
]

const SKILLS = [
  'TypeScript',
  'React',
  'Node.js',
  'CSS / Sass',
  'REST APIs',
  'Git',
]

const EDUCATION = [
  { school: 'University Name', degree: 'B.S. Computer Science', period: '2018 – 2022' },
]

const COMPANY_PROJECTS = [
  {
    name: 'Project Alpha',
    description: 'Brief description of your role and impact. Technologies used.',
    period: '2023 – Present',
  },
  {
    name: 'Project Beta',
    description: 'Another company project with outcomes and stack.',
    period: '2022 – 2023',
  },
]

const SIDE_PROJECTS = [
  {
    name: 'Side Project One',
    description: 'What it does and why it matters. Link optional.',
    link: '#',
  },
  {
    name: 'Side Project Two',
    description: 'Short description and tech used.',
    link: '#',
  },
]

function Icon({ name }: { name: string }) {
  const size = 20
  switch (name) {
    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'mail':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    default:
      return null
  }
}

function App() {
  return (
    <div className="portfolio">
      <div className="portfolio__layout">
        <aside className="portfolio__aside">
          <header className="intro">
            <img src="/photo.jpg" alt="" className="intro__photo" width={120} height={120} />
            <h1 className="intro__name">Your Name</h1>
            <p className="intro__title">Software Engineer · Product Builder</p>
            <nav className="intro__links" aria-label="Social and contact links">
              {LINKS.map(({ href, label, icon }) => (
                <a key={label} href={href} className="intro__link" target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon name={icon} />
                </a>
              ))}
            </nav>
          </header>

          <section className="section" id="skills" aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="section__title">Skills</h2>
            <ul className="skills-list">
              {SKILLS.map((skill) => (
                <li key={skill} className="skills-list__item">{skill}</li>
              ))}
            </ul>
          </section>

          <section className="section" id="education" aria-labelledby="education-heading">
            <h2 id="education-heading" className="section__title">Education</h2>
            <ul className="education-list">
              {EDUCATION.map(({ school, degree, period }) => (
                <li key={school} className="education-item">
                  <div className="education-item__main">
                    <span className="education-item__school">{school}</span>
                    <span className="education-item__period">{period}</span>
                  </div>
                  <p className="education-item__degree">{degree}</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="portfolio__main">
          <section className="section" id="company-projects" aria-labelledby="company-heading">
            <h2 id="company-heading" className="section__title">Company Projects</h2>
            <ul className="project-list">
              {COMPANY_PROJECTS.map(({ name, description, period }) => (
                <li key={name} className="project-card">
                  <div className="project-card__header">
                    <h3 className="project-card__name">{name}</h3>
                    <span className="project-card__period">{period}</span>
                  </div>
                  <p className="project-card__description">{description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section" id="side-projects" aria-labelledby="side-heading">
            <h2 id="side-heading" className="section__title">Side Projects</h2>
            <ul className="project-list">
              {SIDE_PROJECTS.map(({ name, description, link }) => (
                <li key={name} className="project-card">
                  <h3 className="project-card__name">
                    <a href={link} className="project-card__link" target="_blank" rel="noopener noreferrer">{name}</a>
                  </h3>
                  <p className="project-card__description">{description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section section--contact" id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="section__title">Contact</h2>
            <p className="contact-text">
              Open to new opportunities and conversations.
              <br />
              <a href="mailto:you@example.com" className="contact-email">you@example.com</a>
            </p>
          </section>
        </main>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Your Name</p>
      </footer>
    </div>
  )
}

export default App
