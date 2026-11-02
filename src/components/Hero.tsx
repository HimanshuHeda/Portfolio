import Link from "next/link";
import { IoCloudDownloadOutline, IoMailOutline } from "react-icons/io5";
import { hero, metrics, personalInfo } from "@/data/portfolio-data";
import { publicFileExists } from "@/lib/assets";

export default function Hero() {
  const hasResume = publicFileExists(personalInfo.resumeUrl);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero-availability">
        <span className="hero-availability-dot" aria-hidden="true" />
        {hero.availability}
      </p>

      <h1 id="hero-title" className="hero-title">
        {hero.headlineLead} <span className="hero-title-accent">{hero.headlineRest}</span>
      </h1>

      <p className="hero-sub">{hero.subheadline}</p>

      <ul className="metrics-list" aria-label="Key results">
        {metrics.map((m) => (
          <li key={m.label} className="metric-item">
            <span className="metric-value">{m.value}</span>
            <span className="metric-label">{m.label}</span>
          </li>
        ))}
      </ul>

      <div className="hero-actions">
        {/* TODO(me): add public/assets/Resume/Himanshu_Heda_Resume.pdf (without the client name); the button stays hidden until it exists. */}
        {hasResume && (
          <a href={personalInfo.resumeUrl} download className="btn btn-primary">
            <IoCloudDownloadOutline aria-hidden="true" />
            Download resume
          </a>
        )}
        <Link href="/contact" className="btn btn-secondary">
          <IoMailOutline aria-hidden="true" />
          Contact me
        </Link>
      </div>
    </section>
  );
}
