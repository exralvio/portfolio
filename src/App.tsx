import { useState, useCallback, useEffect } from 'react'
import './App.css'

const LINKS = [
  { href: 'https://github.com/exralvio', label: 'GitHub', icon: 'github' },
  { href: 'https://www.linkedin.com/in/rizky-alvio-leegia/', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'mailto:exralvio&#64;gmail&#46;com', label: 'Email', icon: 'mail' },
]

const SKILLS = [
  { category: 'Backend', skills: ['PHP', 'Node.js', 'Python', 'Go', 'Laravel', 'Yii', 'Express', 'NestJS', 'Django', 'Flask', 'Echo'] },
  { category: 'Frontend', skills: ['HTML5', 'JavaScript', 'CSS3', 'jQuery', 'React', 'TypeScript', 'Vue', 'Next.js'] },
  { category: 'Databases', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'DynamoDB'] },
  { category: 'Tools', skills: ['Kafka', 'Docker', 'Git', 'AWS', 'GCP', 'CI/CD', 'RabbitMQ'] },
]

const EDUCATION = [
  { school: 'Widyatama University, Bandung', degree: 'B.S. in Information Technology', period: 'Apr 2012 – Apr 2016' },
  { school: 'SMKN 4, Bandung', degree: 'VHS: Software Engineer', period: 'Mar 2009 – Mar 2012' },
]

const COMPANY_PROJECTS = [
  {
    name: 'MDI HUB - Server Monitoring and API relay service for mobile app',
    description: 'Server monitoring and API relay service for mobile app.',
    period: '',
    images: ['/assets/images/portfolio/1_erp.jpg'],
    findOutMore: 'https://www.linkedin.com/company/mdi-ai-detection/',
    stacks: ['Python', 'FastAPI', 'ReactJS', 'MongoDB'],
    tools: ['Redis', 'Websocket', 'Firebase'],
    team: '1 Fullstack, 2 AI Engineer',
  },
  {
    name: 'MDI APP - Advance web app for CCTV Monitoring',
    description: 'AI Integrated web app for CCTV monitoring on-premise server.',
    period: '',
    images: ['/assets/images/portfolio/1_erp.jpg'],
    findOutMore: 'https://www.linkedin.com/company/mdi-ai-detection/',
    stacks: ['Python', 'Flask', 'ReactJS', 'MongoDB'],
    tools: ['Docker', 'Redis', 'Nginx', 'GStreamer', 'FFmpeg', 'OpenCV'],
    team: '1 Fullstack, 2 AI Engineer',
  },
  {
    name: 'Noovoleum Inventory - Tracking system for liquid used cooking oil',
    description: 'Dashboard for managing liquid used cooking oil inventory.',
    period: '',
    images: ['/assets/images/portfolio/1_erp.jpg'],
    findOutMore: 'https://noovoleum.com/',
    stacks: ['NestJS', 'ReactJS', 'MySQL'],
    tools: ['AWS EC2', 'AWS RDS'],
    team: '1 Frontend, 1 Backend',
  },
  {
    name: 'Noovoleum CRM - Dashboard and API for Noovoleum Mobile APP',
    description: 'Dashboard and RESTful APIs for Noovoleum Mobile APP.',
    period: '',
    images: ['/assets/images/portfolio/2_dashboard.jpg'],
    findOutMore: 'https://play.google.com/store/apps/details?id=com.noovoleum.ucollect&hl=en',
    stacks: ['Express', 'ReactJS', 'NodeJS', 'MongoDB'],
    tools: ['AWS EC2', 'Xendit'],
    team: '1 Frontend, 2 Backend, 1 QA',
  },
  {
    name: 'Kredivo Biller - consumable products service for a Fintech mobile app',
    description: 'Service for providing consumable products to users in a Fintech mobile app.',
    period: '',
    images: ['/assets/images/portfolio/3_kredivo.jpg'],
    findOutMore: 'https://play.google.com/store/apps/details?id=com.finaccel.android&hl=id',
    stacks: ['Python', 'Django', 'MySQL'],
    tools: ['SQS', 'Docker', 'AWS ECS'],
    team: '1 Lead, 3 Backend, 2 QA, 2 Mobile',
  },
  {
    name: 'Biller CRM - Internal dashboard for Kredivo Biller',
    description: 'Dashboard for managing biller products, services and 3rd party integrations.',
    period: '',
    images: ['/assets/images/portfolio/3_kredivo.jpg'],
    findOutMore: 'https://kredivo.id/',
    stacks: ['VueJS', 'NestJS', 'MySQL'],
    tools: ['AWS EC2'],
    team: '1 Lead, 1 Fullstack, 1 QA',
  },
  {
    name: 'Ralali Big Agent - Mobile app for side jobs marketplace',
    description: 'Mobile app for providing various kinds of side jobs to earn extra income, part of B2B marketplace.',
    period: '',
    images: ['/assets/images/portfolio/5_ralali.jpg'],
    findOutMore: 'https://play.google.com/store/apps/details?id=com.ralali.bigagent.android&hl=en',
    stacks: ['Go', 'Gin', 'MySQL'],
    tools: ['AWS ECS', 'AWS API Gateway'],
    team: '2 Backend, 1 Frontend, 2 Mobile, 2 QA, 1 UI/UX',
  },
  {
    name: 'Eagleye SaaS - CRM application for Retail field agent',
    description: 'CRM application for Retail field agent, part of advertising agency.',
    period: '',
    images: ['/assets/images/projects/project-5.png'],
    findOutMore: 'https://www.linkedin.com/company/powerswitch/',
    stacks: ['PHP', 'Laravel', 'MongoDB'],
    team: '3 Backend, 2 Frontend, 2 QA',
  },
  {
    name: 'Manis Mobile App - Reward system for retail platform',
    description: 'Provided various types of rewards to users based on their loyalty to the retail platform.',
    period: '',
    images: ['/assets/images/portfolio/7_manis.jpg'],
    findOutMore: 'https://www.facebook.com/ManisInstantRewardID/',
    stacks: ['PHP', 'Laravel', 'Python', 'FastAPI', 'DynamoDB'],
    team: '1 Backend, 1 QA',
  },
  {
    name: 'Oktagon Ecommerce Web App',
    description: 'Web app for ecommerce of Digital Goods.',
    period: '',
    images: ['/assets/images/portfolio/8_oktagon.jpg'],
    findOutMore: 'https://www.linkedin.com/company/oktagon/',
    stacks: ['AngularJS', 'PHP', 'Laravel', 'Azure SQL Server', 'MySQL'],
    team: '2 Backend, 1 Frontend, 1 QA',
  },
  {
    name: 'Gui.de',
    description: 'Web app for transforming web news into audio visual.',
    period: '',
    images: ['/assets/images/portfolio/9_guide.jpg'],
    findOutMore: 'https://www.linkedin.com/company/guide./',
    stacks: ['HTML5', 'JavaScript', 'UnderscoreJS'],
    team: '1 Fullstack, 1 QA',
  },
]

const SIDE_PROJECTS = [
  {
    name: 'HKBP Kebayoran Baru',
    description: 'Church company profile with custom feature.',
    link: 'https://hkbpkebayoranbaru.com/',
    images: ['/assets/images/portfolio/10_hkbp.jpg'],
    findOutMore: 'https://hkbpkebayoranbaru.com/',
    stacks: ['ReactJS', 'TypeScript', 'NextJS', 'MySQL'],
    team: '1 Fullstack',
  },
  {
    name: 'Sewastudio ID',
    description: 'Platform hourly online booking for Dance studio.',
    link: 'https://sewastudio.id',
    images: ['/assets/images/portfolio/11_sewastudio.jpg'],
    findOutMore: 'https://sewastudio.id',
    stacks: ['PHP', 'Laravel', 'MySQL'],
    team: '1 Fullstack',
  },
  {
    name: 'KFT ID',
    description: 'Social platform for Photography Community in Telkom Company.',
    link: 'https://www.instagram.com/kftelkom/?hl=en',
    images: ['/assets/images/portfolio/12_kft.jpg'],
    findOutMore: 'https://www.instagram.com/kftelkom/?hl=en',
    stacks: ['PHP', 'Laravel', 'MongoDB'],
    team: '1 Fullstack',
  },
  {
    name: 'Telunjuk Crawler',
    description: 'An application for crawling product prices across various marketplaces.',
    link: 'https://www.linkedin.com/company/telunjuk-com',
    images: ['/assets/images/portfolio/13_telunjuk.jpg'],
    findOutMore: 'https://www.linkedin.com/company/telunjuk-com',
    stacks: ['Python', 'FastAPI', 'Kafka'],
    team: '3 Backend',
  },
  {
    name: 'Asuransi Bintang',
    description: 'Insurance company profile with custom design and pages.',
    link: 'https://www.asuransibintang.com',
    images: ['/assets/images/portfolio/14_asbin.jpg'],
    findOutMore: 'https://www.asuransibintang.com',
    stacks: ['PHP', 'Laravel', 'HTML5', 'CSS3', 'jQuery'],
    team: '1 Fullstack',
  },
  {
    name: 'XCDC Event',
    description: 'Online ticketing web application for music event.',
    link: 'https://xcdc.exralproduction.com',
    images: ['/assets/images/portfolio/15_xcdc.jpg'],
    findOutMore: 'https://xcdc.exralproduction.com',
    stacks: ['PHP', 'Laravel', 'AJAX'],
    team: '1 Fullstack',
  },
]

const NAV_SECTIONS = [
  { id: 'company-projects', label: 'Company Projects' },
  { id: 'side-projects', label: 'Side Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
]

const EXPERIENCE = [
  {
    company: 'MDI AI Detection LLC',
    position: 'Senior Fullstack Engineer',
    tech: 'ReactJS, Python, Flask, MongoDB, Kafka, Docker, VPS',
    description: [
      'Developed a dynamic ReactJS dashboard and a feature-rich customer web application.',
      'Built and optimized scalable RESTful APIs using Django, ensuring seamless integration with frontend components.',
      'Implemented real-time event detection and push notifications via WebSocket for instant user updates.',
      'Integrated AI-driven models with live CCTV video streams, enabling automated real-time monitoring and analysis.',
    ],
    year: 'Jan 2025 – Jan 2026',
  },
  {
    company: 'Senja Solution',
    position: 'Senior Fullstack Engineer',
    tech: 'NestJS, NodeJS, ReactJS, MySQL, MongoDB, AWS EC2',
    description: [
      'Improved and developed RESTful APIs for both mobile and web dashboard applications using Node.js (Express) and ReactJS.',
      'Designed and built an end-to-end Inventory Management System for UCO, leveraging NestJS and ReactJS to streamline stock tracking and operations.',
      'Authored comprehensive technical documentation and detailed implementation plans to support scalable system maintenance.',
      'Led agile ceremonies, including daily stand-ups and sprint planning, to coordinate tasks and ensure timely project delivery.',
    ],
    year: 'Apr 2023 – Dec 2024',
  },
  {
    company: 'PT FinAccel Teknologi Indonesia (Kredivo)',
    position: 'Senior Backend Engineer',
    tech: 'ReactJS, NestJS, Python, Django, MySQL, AWS ECS, AWS S3, Java',
    description: [
      'Built and scaled microservices using Python (Django) to power BNPL systems across multiple verticals, including billers (credit, data, PLN, e-wallets) and travel (train & flight). Supporting over 7M+ users with high availability and performance.',
      'Integrated third-party partner to expand product offerings and improve interoperability across financial and travel ecosystems.',
      'Developed internal tools with ReactJS and NestJS, significantly improving workflow automation and team efficiency.',
      'Developed and integrated service-to-service communication with the Transaction microservice using Java.',
    ],
    year: 'Dec 2020 – Dec 2023',
  },
  {
    company: 'PT Ralali (Raja Laju Lintang)',
    position: 'Backend Engineer',
    tech: 'Go, MySQL, Kafka, AWS EC2',
    description: [
      'Developed high-performance RESTful APIs for an online side-job marketplace, ensuring secure and efficient data handling.',
      'Designed scalable microservices in Go, optimized for reliability, concurrency, and low-latency performance.',
    ],
    year: 'Nov 2018 – Nov 2020',
  },
  {
    company: 'PT Eagleye Citra Nusantara',
    position: 'Lead Fullstack Engineer',
    tech: 'NodeJS, MongoDB, Kafka, AWS EC2',
    description: [
      'Built and scaled a national-level SaaS platform for supermarket inventory management, enabling real-time stock and tracking.',
      'Led agile sprints and defined development roadmaps, ensuring efficient project execution and cross-team alignment.',
      'Scaled the platform to support 1,000+ merchants across Indonesia, improving operational efficiency and system reliability.',
    ],
    year: 'Sep 2017 – Oct 2018',
  },
  {
    company: 'PT Ebizu Prima Nusantara',
    position: 'Senior Backend Engineer',
    tech: 'Flask, DynamoDB, Laravel, MySQL, AWS Serverless',
    description: [
      'Migrated legacy PHP APIs to a serverless architecture, significantly reducing infrastructure costs and improving scalability.',
      'Provided technical leadership, offering support during weekly team meetings to ensure smooth project delivery.',
    ],
    year: 'Dec 2016 – Aug 2017',
  },
  {
    company: 'PT Walden Global Service',
    position: 'Lead Fullstack Engineer',
    tech: 'PHP, Laravel, AngularJS, NodeJS, MySQL, Postgres, AWS EC2, AWS S3, Docker',
    description: [
      'Led a small team and managed sprint planning while coordinating closely with clients to align goals and expectations.',
      'Designed, built, and launched web applications using various PHP and JavaScript frameworks.',
      'Successfully delivered 25+ web projects across diverse industries.',
    ],
    year: 'Dec 2012 – Nov 2016',
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
              src="/alvio-profile.jpg"
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
            <p className="intro__title">Fullstack Engineer</p>
            <p className="intro__bio">
              Experienced Engineer with a track record of building scalable APIs and dashboards. I ship with TypeScript, Node, Python, and Go, and have led teams and agile delivery across 10+ years.
            </p>
            <nav className="intro__links" aria-label="Social links">
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
        </aside>

        <main className="portfolio__main">
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

          <section className="section" id="experience" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="section__title">Experience</h2>
            <ul className="experience-list">
              {EXPERIENCE.map(({ company, position, tech, description, year }) => (
                <li key={`${company}-${year}`} className="experience-item">
                  <div className="experience-item__header">
                    <span className="experience-item__company">{company}</span>
                    <span className="experience-item__year">{year}</span>
                  </div>
                  <p className="experience-item__position">{position}</p>
                  {tech ? <p className="experience-item__tech">{tech}</p> : null}
                  <ul className="experience-item__description">
                    {description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </li>
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
