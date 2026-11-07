import CurrencyConverter from './CurrencyConverter.jsx'

function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">💱</div>
            <div>
              <p className="brand-name">Forex Card</p>
              <p className="brand-sub">live currency converter</p>
            </div>
          </div>
          <span className="header-codes">USD · EUR · GBP · JPY · ETB · CNY · INR · SAR</span>
        </div>
      </header>

      <main className="main">
        <div className="main-inner">
          <div className="hero">
            <h1>
              Convert currencies,
              <span className="hero-accent">in a single glance.</span>
            </h1>
            <p className="hero-lead">
              Pick an amount, choose a pair of currencies, and see your converted
              value instantly — backed by a memoized rate table.
            </p>
          </div>

          <CurrencyConverter />
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <p>Rates are from open.er-api.com · for reference only.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
