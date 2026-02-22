import { useState, useCallback, useEffect } from 'react'
import './App.css'

const LINKS = [
  { href: 'https://github.com', label: 'GitHub', icon: 'github' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'mailto:you@example.com', label: 'Email', icon: 'mail' },
]

const SKILLS = [
  { category: 'Frontend', skills: ['Bootstrap', 'React', 'TypeScript', 'Next.js'] },
  { category: 'Backend', skills: ['Python', 'Node.js', 'NestJS'] },
  { category: 'Tools', skills: ['Git', 'REST APIs', 'CSS / Sass'] },
]

const EDUCATION = [
  { school: 'University Name', degree: 'B.S. Computer Science', period: '2018 – 2022' },
]

const COMPANY_PROJECTS = [
  {
    name: 'Project Alpha',
    description: 'Brief description of your role and impact. Technologies used.',
    period: '2023 – Present',
    images: ['https://picsum.photos/seed/alpha1/800/500', 'https://picsum.photos/seed/alpha2/800/500'],
    findOutMore: 'https://example.com/alpha',
    stacks: ['React', 'TypeScript', 'Node.js'],
    tools: ['Figma', 'Git', 'Vercel'],
    team: '4 engineers',
  },
  {
    name: 'Project Beta',
    description: 'Another company project with outcomes and stack.',
    period: '2022 – 2023',
    images: ['https://picsum.photos/seed/beta1/800/500', 'https://picsum.photos/seed/beta2/800/500', 'https://picsum.photos/seed/beta3/800/500'],
    stacks: ['Python', 'PostgreSQL'],
    tools: ['Docker', 'AWS'],
    team: 'Solo',
  },
]

const SIDE_PROJECTS = [
  {
    name: 'Side Project One',
    description: 'What it does and why it matters. Link optional.',
    link: '#',
    images: ['https://picsum.photos/seed/side1/800/500'],
    findOutMore: 'https://github.com/example/side-one',
    stacks: ['Next.js', 'Tailwind'],
    tools: ['Vercel'],
    team: 'Solo',
  },
  {
    name: 'Side Project Two',
    description: 'Short description and tech used.',
    link: '#',
    images: ['https://picsum.photos/seed/side2a/800/500', 'https://picsum.photos/seed/side2b/800/500'],
    stacks: ['React', 'Node.js'],
    tools: ['Figma', 'Git'],
  },
]

const NAV_SECTIONS = [
  { id: 'experience', label: 'Experience' },
  { id: 'company-projects', label: 'Company Projects' },
  { id: 'side-projects', label: 'Side Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const EXPERIENCE = [
  {
    company: 'Company Name',
    position: 'Senior Software Engineer',
    description: [
      'Brief description of your responsibilities and impact.',
      'Key achievements and technologies used.',
      'Another notable contribution or outcome.',
    ],
    year: '2022 – Present',
  },
  {
    company: 'Previous Company',
    position: 'Software Engineer',
    description: [
      'What you built and how you contributed.',
      'Tech stack and outcomes.',
    ],
    year: '2020 – 2022',
  },
]

/** Ensures at least 2 image slots (duplicate if 1, placeholders if 0), max 3. */
function getProjectDisplayImages(images: string[] | undefined): (string | null)[] {
  if (!images?.length) return [null, null]
  if (images.length === 1) return [images[0], images[0]]
  return images.slice(0, 3)
}

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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('theme') as 'light' | 'dark' | null
      if (stored === 'light' || stored === 'dark') return stored
    }
    return 'dark'
  })

  const closeLightbox = useCallback(() => setLightboxImage(null), [])

  useEffect(() => {
    if (!lightboxImage) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxImage, closeLightbox])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="portfolio">
      <nav className="page-nav" aria-label="Jump to section">
        <ul className="page-nav__list">
          {NAV_SECTIONS.map(({ id, label }) => (
            <li key={id} className="page-nav__item">
              <a href={`#${id}`} className="page-nav__link">
                {label}
              </a>
            </li>
          ))}
          <li className="page-nav__item page-nav__item--toggle">
            <button
              type="button"
              className="page-nav__theme-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="page-nav__theme-icon" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg className="page-nav__theme-icon" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>
      <div className="portfolio__layout">
        <aside className="portfolio__aside">
          <header className="intro">
            <img
              src="/photo.jpg"
              alt=""
              className="intro__photo"
              width={120}
              height={120}
              onError={(e) => {
                e.currentTarget.src = 'https://picsum.photos/seed/portfolio-avatar/200/200'
                e.currentTarget.onerror = null
              }}
            />
            <h1 className="intro__name">Alvio Leegia</h1>
            <p className="intro__title">Senior Fullstack Engineer</p>
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
            <div className="skills-categories">
              {SKILLS.map(({ category, skills }) => (
                <div key={category} className="skills-category">
                  <h3 className="skills-category__name">{category}</h3>
                  <ul className="skills-list">
                    {skills.map((skill) => (
                      <li key={skill} className="skills-list__item">{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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

          <section className="section section--contact" id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="section__title">Contact</h2>
            <p className="contact-text">
              Open to new opportunities and conversations.
              <br />
              <a href="mailto:you@example.com" className="contact-email">you@example.com</a>
            </p>
          </section>
        </aside>

        <main className="portfolio__main">
          <section className="section" id="experience" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="section__title">Experience</h2>
            <ul className="experience-list">
              {EXPERIENCE.map(({ company, position, description, year }) => (
                <li key={`${company}-${year}`} className="experience-item">
                  <div className="experience-item__header">
                    <span className="experience-item__company">{company}</span>
                    <span className="experience-item__year">{year}</span>
                  </div>
                  <p className="experience-item__position">{position}</p>
                  <ul className="experience-item__description">
                    {description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="section" id="company-projects" aria-labelledby="company-heading">
            <h2 id="company-heading" className="section__title">Company Projects</h2>
            <ul className="project-list">
              {COMPANY_PROJECTS.map(({ name, description, period, images, findOutMore, stacks, tools, team }) => (
                <li key={name} className="project-card">
                  <div className="project-card__header">
                    <h3 className="project-card__name">{name}</h3>
                    <span className="project-card__period">{period}</span>
                  </div>
                  {(() => {
                    const displayImages = getProjectDisplayImages(images)
                    return (
                      <div className={`project-card__images project-card__images--${displayImages.length}`}>
                        {displayImages.map((src, i) =>
                          src ? (
                            <img
                              key={i}
                              src={src}
                              alt=""
                              className="project-card__img project-card__img--clickable"
                              loading="lazy"
                              onClick={() => setLightboxImage(src)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxImage(src) } }}
                              aria-label="View image larger"
                            />
                          ) : (
                            <div key={i} className="project-card__img project-card__img--placeholder" aria-hidden />
                          )
                        )}
                      </div>
                    )
                  })()}
                  <p className="project-card__description">{description}</p>
                  {(stacks?.length || tools?.length || team) ? (
                    <div className="project-card__meta">
                      {stacks?.length ? (
                        <div className="project-card__meta-row">
                          <span className="project-card__meta-label">Stacks</span>
                          <span className="project-card__meta-value">{stacks.join(', ')}</span>
                        </div>
                      ) : null}
                      {tools?.length ? (
                        <div className="project-card__meta-row">
                          <span className="project-card__meta-label">Tools</span>
                          <span className="project-card__meta-value">{tools.join(', ')}</span>
                        </div>
                      ) : null}
                      {team ? (
                        <div className="project-card__meta-row">
                          <span className="project-card__meta-label">Team</span>
                          <span className="project-card__meta-value">{team}</span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {findOutMore ? (
                    <a href={findOutMore} className="project-card__find-out-more" target="_blank" rel="noopener noreferrer">
                      <svg className="project-card__find-out-more-icon" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Find out more
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="section" id="side-projects" aria-labelledby="side-heading">
            <h2 id="side-heading" className="section__title">Side Projects</h2>
            <ul className="project-list">
              {SIDE_PROJECTS.map(({ name, description, link, images, findOutMore, stacks, tools, team }) => (
                <li key={name} className="project-card">
                  <h3 className="project-card__name">
                    <a href={link} className="project-card__link" target="_blank" rel="noopener noreferrer">{name}</a>
                  </h3>
                  {(() => {
                    const displayImages = getProjectDisplayImages(images)
                    return (
                      <div className={`project-card__images project-card__images--${displayImages.length}`}>
                        {displayImages.map((src, i) =>
                          src ? (
                            <img
                              key={i}
                              src={src}
                              alt=""
                              className="project-card__img project-card__img--clickable"
                              loading="lazy"
                              onClick={() => setLightboxImage(src)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxImage(src) } }}
                              aria-label="View image larger"
                            />
                          ) : (
                            <div key={i} className="project-card__img project-card__img--placeholder" aria-hidden />
                          )
                        )}
                      </div>
                    )
                  })()}
                  <p className="project-card__description">{description}</p>
                  {(stacks?.length || tools?.length || team) ? (
                    <div className="project-card__meta">
                      {stacks?.length ? (
                        <div className="project-card__meta-row">
                          <span className="project-card__meta-label">Stacks</span>
                          <span className="project-card__meta-value">{stacks.join(', ')}</span>
                        </div>
                      ) : null}
                      {tools?.length ? (
                        <div className="project-card__meta-row">
                          <span className="project-card__meta-label">Tools</span>
                          <span className="project-card__meta-value">{tools.join(', ')}</span>
                        </div>
                      ) : null}
                      {team ? (
                        <div className="project-card__meta-row">
                          <span className="project-card__meta-label">Team</span>
                          <span className="project-card__meta-value">{team}</span>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {findOutMore ? (
                    <a href={findOutMore} className="project-card__find-out-more" target="_blank" rel="noopener noreferrer">
                      <svg className="project-card__find-out-more-icon" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Find out more
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>

      {lightboxImage ? (
        <div
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="lightbox__img"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
      ) : null}

      <footer className="footer">
        <p>© {new Date().getFullYear()} ALV Projects</p>
      </footer>
    </div>
  )
}

export default App
