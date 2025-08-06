class Calculator {
  constructor() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = null;
    this.history = '';
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }

  clearAll() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = null;
    this.history = '';
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }

  clearEntry() {
    this.currentOperand = '0';
    this.updateDisplay();
  }

  deleteLast() {
    if (this.currentOperand.length > 1) {
      this.currentOperand = this.currentOperand.slice(0, -1);
    } else {
      this.currentOperand = '0';
    }
    this.updateDisplay();
  }

  inputNumber(number) {
    if (this.shouldResetDisplay) {
      this.currentOperand = '';
      this.shouldResetDisplay = false;
    }

    if (this.currentOperand === '0') {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
    this.updateDisplay();
  }

  inputDecimal() {
    if (this.shouldResetDisplay) {
      this.currentOperand = '0';
      this.shouldResetDisplay = false;
    }

    if (!this.currentOperand.includes('.')) {
      this.currentOperand += '.';
    }
    this.updateDisplay();
  }

  inputOperator(operator) {
    if (this.operation !== null && !this.shouldResetDisplay) {
      this.calculate();
    }

    this.previousOperand = this.currentOperand;
    this.operation = operator;
    this.shouldResetDisplay = true;
    
    // Update history display
    this.history = `${this.previousOperand} ${this.getOperatorSymbol(operator)}`;
    this.updateDisplay();
  }

  calculate() {
    if (this.operation === null || this.shouldResetDisplay) return;

    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    let result;

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert('Cannot divide by zero!');
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    // Update history with full calculation
    this.history = `${this.previousOperand} ${this.getOperatorSymbol(this.operation)} ${this.currentOperand} =`;
    
    this.currentOperand = this.formatNumber(result);
    this.operation = null;
    this.previousOperand = '';
    this.shouldResetDisplay = true;
    this.updateDisplay();
  }

  formatNumber(number) {
    const stringNumber = number.toString();
    if (stringNumber.length > 12) {
      return parseFloat(number.toPrecision(12)).toString();
    }
    return stringNumber;
  }

  getOperatorSymbol(operator) {
    const symbols = {
      '+': '+',
      '-': '-',
      '*': '×',
      '/': '÷'
    };
    return symbols[operator] || operator;
  }

  updateDisplay() {
    document.getElementById('current').textContent = this.currentOperand;
    document.getElementById('history').textContent = this.history;
  }
}

// Initialize calculator
const calculator = new Calculator();

// Global functions for HTML onclick events
function inputNumber(number) {
  calculator.inputNumber(number);
}

function inputOperator(operator) {
  calculator.inputOperator(operator);
}

function inputDecimal() {
  calculator.inputDecimal();
}

function calculate() {
  calculator.calculate();
}

function clearAll() {
  calculator.clearAll();
}

function clearEntry() {
  calculator.clearEntry();
}

function deleteLast() {
  calculator.deleteLast();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  
  // Numbers
  if (key >= '0' && key <= '9') {
    inputNumber(key);
  }
  
  // Operators
  switch (key) {
    case '+':
      inputOperator('+');
      break;
    case '-':
      inputOperator('-');
      break;
    case '*':
      inputOperator('*');
      break;
    case '/':
      event.preventDefault(); // Prevent browser search
      inputOperator('/');
      break;
    case '.':
      inputDecimal();
      break;
    case 'Enter':
    case '=':
      event.preventDefault();
      calculate();
      break;
    case 'Escape':
      clearAll();
      break;
    case 'Backspace':
      event.preventDefault();
      deleteLast();
      break;
  }
});

// Add visual feedback for button presses
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mousedown', () => {
    button.style.transform = 'translateY(1px) scale(0.98)';
  });
  
  button.addEventListener('mouseup', () => {
    button.style.transform = '';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});
