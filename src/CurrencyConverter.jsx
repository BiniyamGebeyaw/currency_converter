import { useMemo, useState } from 'react'
import { ArrowRightLeft, Coins, TrendingUp } from 'lucide-react'
import './currency-converter.css'

/**
 * Exchange rates expressed as "units of this currency per 1 USD".
 * Values are illustrative snapshots — NOT a one-to-one mapping.
 */
const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7
}

const CURRENCIES = Object.keys(RATES)

const CURRENCY_META = {
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' }
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')

  /**
   * Memoized converted-amount table.
   *
   * Dependency array intentionally EXCLUDES `toCurrency` so that changing
   * the "to" select never recalculates the from-currency conversions —
   * it just selects a different entry from the cached table.
   */
  const convertedAmounts = useMemo(() => {
    const amountInBase = amount / RATES[fromCurrency]
    const result = {}
    for (const code of CURRENCIES) {
      result[code] = amountInBase * RATES[code]
    }
    return result
  }, [amount, fromCurrency])

  const convertedAmount = convertedAmounts[toCurrency] ?? 0
  const formattedAmount = convertedAmount.toFixed(2)

  const handleAmountChange = (e) => {
    const next = e.target.value
    if (next === '') {
      setAmount(0)
      return
    }
    const parsed = Number(next)
    if (!Number.isNaN(parsed)) {
      setAmount(parsed)
    }
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="cc-wrapper">
      {/* Converter card */}
      <div className="cc-card">
        {/* Amount input */}
        <label htmlFor="cc-amount" className="cc-label">Amount</label>
        <input
          id="cc-amount"
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={amount === 0 ? '' : amount}
          placeholder="0.00"
          onChange={handleAmountChange}
          className="cc-amount-input"
        />

        {/* From / To selects */}
        <div className="cc-pair">
          <div className="cc-select-group">
            <label htmlFor="cc-from" className="cc-label">From</label>
            <div className="cc-select-wrapper">
              <span className="cc-select-flag">{CURRENCY_META[fromCurrency]?.flag}</span>
              <select
                id="cc-from"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="cc-select"
              >
                {CURRENCIES.map((code) => (
                  <option key={code} value={code}>
                    {code} — {CURRENCY_META[code]?.name}
                  </option>
                ))}
              </select>
              <span className="cc-select-caret">▾</span>
            </div>
          </div>

          {/* Swap button (desktop) */}
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap currencies"
            className="cc-swap-desktop"
          >
            <ArrowRightLeft size={20} />
          </button>

          <div className="cc-select-group">
            <label htmlFor="cc-to" className="cc-label">To</label>
            <div className="cc-select-wrapper">
              <span className="cc-select-flag">{CURRENCY_META[toCurrency]?.flag}</span>
              <select
                id="cc-to"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="cc-select"
              >
                {CURRENCIES.map((code) => (
                  <option key={code} value={code}>
                    {code} — {CURRENCY_META[code]?.name}
                  </option>
                ))}
              </select>
              <span className="cc-select-caret">▾</span>
            </div>
          </div>
        </div>

        {/* Swap (mobile) */}
        <button
          type="button"
          onClick={handleSwap}
          aria-label="Swap currencies"
          className="cc-swap-mobile"
        >
          <ArrowRightLeft size={16} /> Swap currencies
        </button>

        {/* Result display */}
        <div className="cc-result">
          <div className="cc-result-bg-icon">
            <TrendingUp size={128} strokeWidth={1.5} />
          </div>
          <div className="cc-result-content">
            <p className="cc-result-label">Converted amount</p>
            <p className="cc-result-value" aria-live="polite">
              {formattedAmount} {toCurrency}
            </p>
            <p className="cc-result-detail">
              {CURRENCY_META[fromCurrency]?.symbol}
              {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
              {fromCurrency} = {CURRENCY_META[toCurrency]?.symbol}
              {formattedAmount} {toCurrency}
            </p>
          </div>
        </div>
      </div>

      {/* Memoized reference table — all conversions from the "from" currency */}
      <div className="cc-glance">
        <div className="cc-glance-header">
          <Coins size={16} />
          <h2>{fromCurrency} at a glance</h2>
        </div>
        <div className="cc-glance-grid">
          {CURRENCIES.map((code) => {
            const value = convertedAmounts[code] ?? 0
            const isActive = code === toCurrency
            return (
              <div key={code} className={`cc-glance-item ${isActive ? 'cc-glance-item-active' : ''}`}>
                <div className="cc-glance-item-top">
                  <span className="cc-glance-code">{code}</span>
                  <span className="cc-glance-flag">{CURRENCY_META[code]?.flag}</span>
                </div>
                <p className="cc-glance-value">{value.toFixed(2)}</p>
              </div>
            )
          })}
        </div>
        <p className="cc-glance-note">
          This table is memoized on <code>amount</code> and the <em>from</em> currency —
          flipping the <em>to</em> select above will not recompute it.
        </p>
      </div>
    </div>
  )
}
