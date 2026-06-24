import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  consistencyBoard,
  events,
  galleryItems,
  pulseStats,
  routes,
  siteConfig,
} from './data/site.js';

function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <Link className="wordmark" to="/">
        ASCENT
      </Link>
      <nav>
        <Link to="/#runs">Runs</Link>
        <NavLink to="/routes">Routes</NavLink>
        <NavLink to="/pulse">Pulse</NavLink>
        <NavLink to="/join">Join</NavLink>
      </nav>
      <Link className="nav-cta" to="/join">
        Join Sunday
      </Link>
    </header>
  );
}

function assetPath(path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path) || path.startsWith('/')) return path;
  return `${import.meta.env.BASE_URL}${path}`;
}

function BottomCta() {
  return (
    <Link className="bottom-cta" to="/join">
      JOIN SUNDAY&apos;S RUN
    </Link>
  );
}

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
    });
  }, [location.pathname, location.hash]);

  return null;
}

function Hero() {
  const { nextRun, links } = siteConfig;

  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="grain" aria-hidden="true" />
      <div className="sun" aria-hidden="true" />
      <div className="hill hill-back" aria-hidden="true" />
      <div className="hill hill-front" aria-hidden="true" />
      <div className="campus-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-copy reveal">
        <p className="eyebrow">A student-led running community</p>
        <h1 id="home-title">ASCENT</h1>
        <p className="tagline">RUN. RISE. REPEAT.</p>
        <p className="hero-subcopy">
          Built around the hills of IISER TVM, for first-timers, walkers, joggers,
          race trainees, and the friends who show up before the day moves.
        </p>
        <div className="button-row">
          <Link className="button primary" to="/join">
            JOIN THE NEXT RUN
          </Link>
          <a className="button ghost" href={links.strava}>
            STRAVA CLUB ↗
          </a>
        </div>
      </div>
      <div className="ticker" aria-label="Next run details">
        <span>{nextRun.label}</span>
        <span>{nextRun.day}</span>
        <span>{nextRun.time}</span>
        <span>{nextRun.place}</span>
        <span>{nextRun.note}</span>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="paper-section split-section">
      <div>
        <p className="section-kicker">First run</p>
        <h2>
          YOU DO NOT
          <br />
          HAVE TO RUN
          <br />
          THE WHOLE WAY.
        </h2>
      </div>
      <div className="invitation-copy">
        <p>
          Walk. Jog. Run for one minute, walk for one minute. Turn around early.
          Stay for chai. ASCENT is for showing up, not proving anything.
        </p>
        <div className="reassurance-grid">
          <article>No experience needed</article>
          <article>No fixed distance</article>
          <article>All paces welcome</article>
        </div>
        <Link className="text-link" to="/join">
          YOUR FIRST RUN →
        </Link>
      </div>
    </section>
  );
}

function EventCards() {
  return (
    <section id="runs" className="dark-section">
      <div className="section-heading">
        <p className="section-kicker">This week</p>
        <h2>THIS WEEK AT ASCENT</h2>
      </div>
      <div className="event-grid">
        {events.map((event) => (
          <article className="event-card" key={event.title}>
            <p className="event-time">{event.when}</p>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <a href="/join">{event.action}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function PulsePreview({ full = false }) {
  return (
    <section className={full ? 'paper-section pulse-page' : 'paper-section pulse-preview'}>
      <div className="section-heading">
        <p className="section-kicker">Club pulse</p>
        <h2>{full ? 'CURRENT-WEEK CLUB DATA' : 'MOVE TOGETHER, COUNT CONSISTENCY'}</h2>
        <p className="section-copy">
          Static placeholder data for version 1. Future Strava integration can plug into
          the same structure without changing the page layout.
        </p>
      </div>
      <div className="stat-grid">
        {pulseStats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      {/* Strava summary widget iframe inserted below */}
      <div className="strava-widget" style={{ marginTop: 20 }}>
        <iframe
          title="Strava club summary"
          allowTransparency="true"
          frameBorder="0"
          loading="lazy"
          scrolling="no"
          width="300"
          height="160"
          src="https://www.strava.com/clubs/1914011/latest-rides/f53869ca5487136ef85f7cca4a834d5a536aa15d?show_rides=false"
        ></iframe>
      </div>

      <div className="board">
        <div className="board-title">
          <p className="section-kicker">Consistency Board</p>
          <span>No pace pressure. Just progress.</span>
        </div>
        {consistencyBoard.map((runner, index) => (
          <div className="board-row" key={runner.name}>
            <span>{index + 1}</span>
            <strong>{runner.name}</strong>
            <em>{runner.days}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function RouteLibrary() {
  return (
    <main className="page">
      <PageHero
        kicker="Route library"
        title="BUILT ON HILLS. BUILT TOGETHER."
        copy="Routes are editable local data for now. Add GPX links, maps, photos, and safety notes as ASCENT grows."
      />
      <section className="paper-section route-grid" aria-label="Route library">
        {routes.map((route) => (
          <article className="route-card" key={route.name}>
            <div>
              <p className="route-distance">{route.distance}</p>
              <h2>{route.name}</h2>
            </div>
            <dl>
              <div>
                <dt>Climb</dt>
                <dd>{route.climb}</dd>
              </div>
              <div>
                <dt>Effort</dt>
                <dd>{route.effort}</dd>
              </div>
              <div>
                <dt>Surface</dt>
                <dd>{route.surface}</dd>
              </div>
              <div>
                <dt>Start</dt>
                <dd>{route.start}</dd>
              </div>
            </dl>
            <p>{route.notes}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function JoinPage() {
  return (
    <main className="page">
      <PageHero
        kicker="First-run guide"
        title="START WHERE YOU ARE."
        copy="You do not need a watch, a plan, or a fast pace. Bring shoes, water, and enough curiosity to reach the start."
      />
      <section className="paper-section join-layout">
        <article>
          <p className="section-kicker">Before Sunday</p>
          <h2>WHAT TO KNOW</h2>
          <ul className="clean-list">
            <li>Meet at 06:30 AM at the weekly start point shared in the group.</li>
            <li>Choose your distance on the day. Turning back early is normal.</li>
            <li>Walk breaks are welcome. So are complete beginners.</li>
            <li>Bring water, visible clothing, and a little patience for the hills.</li>
          </ul>
        </article>
        <aside className="join-card">
          <h2>JOIN ASCENT</h2>
          <p>Community links are placeholders. Replace them in src/data/site.js.</p>
          <a className="button primary" href={siteConfig.links.whatsapp}>
            WHATSAPP GROUP ↗
          </a>
          <a className="button ghost light" href={siteConfig.links.instagram}>
            INSTAGRAM ↗
          </a>
        </aside>
      </section>
      <section className="dark-section gallery-section">
        <div className="section-heading">
          <p className="section-kicker">Photo placeholders</p>
          <h2>REAL ASCENT PHOTOS GO HERE</h2>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <figure key={item.caption}>
              {item.image ? (
                <img src={assetPath(item.image)} alt={item.alt} />
              ) : (
                <div aria-hidden="true" />
              )}
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}

function PageHero({ kicker, title, copy }) {
  return (
    <section className="page-hero">
      <div className="sun small" aria-hidden="true" />
      <p className="section-kicker">{kicker}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <Invitation />
      <EventCards />
      <PulsePreview />
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Link className="wordmark" to="/">
        ASCENT
      </Link>
      <p>Run. Rise. Repeat. All paces welcome around IISER TVM / Vithura.</p>
    </footer>
  );
}

export default function App() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <ScrollToHash />
      <Header />
      {path === '/routes' ? <RouteLibrary /> : null}
      {path === '/pulse' ? (
        <main className="page">
          <PageHero
            kicker="Club pulse"
            title="NO SPEED TABLES. JUST SHOWING UP."
            copy="ASCENT celebrates consistency and collective distance first. Live Strava data can arrive later."
          />
          <PulsePreview full />
        </main>
      ) : null}
      {path === '/join' ? <JoinPage /> : null}
      {!['/routes', '/pulse', '/join'].includes(path) ? <Home /> : null}
      <Footer />
      <BottomCta />
    </>
  );
}
