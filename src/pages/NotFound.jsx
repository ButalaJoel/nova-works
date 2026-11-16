import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'

export default function NotFound() {
  return (
    <Layout>
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">404</p>
          <h2>This page doesn't exist.</h2>
          <p className="section__intro">It may have moved, or the link has a typo.</p>
          <div className="hero__actions">
            <Link to="/" className="btn">Back to home</Link>
            <Link to="/#work" className="btn btn--ghost">See the work</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
