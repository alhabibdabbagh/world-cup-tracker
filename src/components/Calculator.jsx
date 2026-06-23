import { useState } from 'react'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(nextOperation)
    setWaitingForNewValue(true)
  }

  const performCalculation = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '×':
        return prev * current
      case '÷':
        return current === 0 ? 0 : prev / current
      default:
        return current
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, inputValue, operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const getButtonClasses = (btn) => {
    let classes = `calc-btn ${btn.className}`
    if (btn.fullWidth) classes += ' full-width'
    if (btn.span2) classes += ' span-2'
    return classes
  }

  const buttons = [
    // Row 1: C, ÷, ×, -, +
    { label: 'C', onClick: handleClear, className: 'calc-btn-clear', fullWidth: true },
    { label: '÷', onClick: () => handleOperation('÷'), className: 'calc-btn-operator' },
    { label: '×', onClick: () => handleOperation('×'), className: 'calc-btn-operator' },
    { label: '−', onClick: () => handleOperation('-'), className: 'calc-btn-operator' },
    { label: '+', onClick: () => handleOperation('+'), className: 'calc-btn-operator' },
    // Row 2: 7, 8, 9
    { label: '7', onClick: () => handleNumber(7), className: 'calc-btn-number' },
    { label: '8', onClick: () => handleNumber(8), className: 'calc-btn-number' },
    { label: '9', onClick: () => handleNumber(9), className: 'calc-btn-number' },
    // Row 3: 4, 5, 6
    { label: '4', onClick: () => handleNumber(4), className: 'calc-btn-number' },
    { label: '5', onClick: () => handleNumber(5), className: 'calc-btn-number' },
    { label: '6', onClick: () => handleNumber(6), className: 'calc-btn-number' },
    // Row 4: 1, 2, 3
    { label: '1', onClick: () => handleNumber(1), className: 'calc-btn-number' },
    { label: '2', onClick: () => handleNumber(2), className: 'calc-btn-number' },
    { label: '3', onClick: () => handleNumber(3), className: 'calc-btn-number' },
    // Row 5: 0 (span 2), .
    { label: '0', onClick: () => handleNumber(0), className: 'calc-btn-number', span2: true },
    { label: '.', onClick: handleDecimal, className: 'calc-btn-number' },
    // Row 6: =
    { label: '=', onClick: handleEquals, className: 'calc-btn-equals', fullWidth: true }
  ]

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-display">
          <div className="display-value">{display}</div>
        </div>
        <div className="calculator-buttons">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={getButtonClasses(btn)}
              onClick={btn.onClick}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calculator