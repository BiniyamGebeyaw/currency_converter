# Forex Card — Currency Converter (JavaScript)

A standalone **JavaScript** (`.jsx`) React app that satisfies the currency-converter lab.

No TypeScript. No Tailwind. Just Vite + React + plain CSS.

## Currencies & rates

Illustrative snapshots, not for trading:

```js
const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 156.7,
}
```

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually <http://localhost:5173>).

## Project layout

```
forex-card-js/
├── index.html                  # HTML entry
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # React root
    ├── App.jsx                  # page layout, renders <CurrencyConverter/>
    ├── index.css                # page-level styles
    ├── CurrencyConverter.jsx    # ← the converter (lab deliverable)
    └── currency-converter.css   # converter styles
```

## How each user story is satisfied

| Requirement | Where |
|---|---|
| Input element for the amount | `<input id="cc-amount" type="number">` |
| Input accepts numbers | `type="number"` + `inputMode="decimal"` + `step="any"` |
| Two selects for from / to | `<select id="cc-from">`, `<select id="cc-to">` |
| USD, EUR, GBP, JPY with non-1:1 rates | `RATES` constant above |
| Memoize so changing "to" doesn't recalc | `useMemo(..., [amount, fromCurrency])` — `toCurrency` excluded from deps |
| Show converted amount as `XX.XX CCC` | `{formattedAmount} {toCurrency}` |
| Round to two decimal places | `Number.prototype.toFixed(2)` |
