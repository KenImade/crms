import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/project-charter">
            📖 Start with the Docs
          </Link>
          <Link className="button button--outline button--lg" to="/docs/api-spec">
            🧩 API Spec
          </Link>
          <Link
            className="button button--outline button--lg"
            to="https://github.com/<your-username>/<your-repo-name>"
          >
            💻 View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description, to }: { title: string; description: string; to: string }) {
  return (
    <div className="col col--4">
      <div className="card">
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link className="button button--sm button--primary" to={to}>
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentation and design for the Church Request Management system"
    >
      <HomepageHeader />
      <main className="container">
        <section className="margin-vert--lg">
          <div className="row">
            <Feature
              title="🚀 Quick Start"
              description="Run the project locally, env vars, and developer workflow."
              to="/docs/quick-start"
            />
            <Feature
              title="📋 Requirements"
              description="PRD, roles & permissions, and approval workflow."
              to="/docs/prd"
            />
            <Feature
              title="🗂️ Data & API"
              description="Domain model, schema, and REST endpoints."
              to="/docs/domain-model"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
