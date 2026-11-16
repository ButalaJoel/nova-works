// The Nova Works "N" mark, traced from the logo files so it stays sharp at any size.
// The three blocks read as rising bars: "built for brands on the rise".
export default function Mark({ className = '', animate = false, title = 'Nova Works' }) {
  return (
    <svg
      className={`mark ${animate ? 'mark--rise' : ''} ${className}`}
      viewBox="0 0 443 363"
      role="img"
      aria-label={title}
    >
      <polygon className="mark__a" points="0,275 119,222 119,363 0,363" />
      <polygon className="mark__b" points="133,164 240,128 315,223 315,363" />
      <polygon className="mark__c" points="320,63 443,0 443,363 320,363" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <Mark className="wordmark__mark" />
      <span className="wordmark__text">
        Nova <b>Works</b>
      </span>
    </span>
  )
}
