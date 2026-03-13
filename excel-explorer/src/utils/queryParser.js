/**
 * SQL-like query parser and evaluator.
 *
 * Supports:
 *   column = value, column != value
 *   column < value, column > value, column <= value, column >= value
 *   column LIKE "pattern" (% wildcards)
 *   column IN ("a", "b", "c")
 *   column IS NULL, column IS NOT NULL
 *   AND, OR, NOT
 *   Parentheses for grouping
 *
 * Values: numbers (42, 3.14), strings ("hello"), identifiers (column names)
 */

// ─── Tokenizer ───────────────────────────────────────────────

const TOKEN_TYPES = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  IDENT: 'IDENT',
  OP: 'OP',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  COMMA: 'COMMA',
  EOF: 'EOF',
}

const KEYWORDS = new Set(['AND', 'OR', 'NOT', 'IN', 'LIKE', 'IS', 'NULL'])

function tokenize(input) {
  const tokens = []
  let i = 0

  while (i < input.length) {
    // Skip whitespace
    if (/\s/.test(input[i])) {
      i++
      continue
    }

    // String literal
    if (input[i] === '"' || input[i] === "'") {
      const quote = input[i]
      i++
      let str = ''
      while (i < input.length && input[i] !== quote) {
        if (input[i] === '\\' && i + 1 < input.length) {
          i++
          str += input[i]
        } else {
          str += input[i]
        }
        i++
      }
      if (i >= input.length) throw new Error('Unterminated string literal')
      i++ // closing quote
      tokens.push({ type: TOKEN_TYPES.STRING, value: str })
      continue
    }

    // Number
    if (/[0-9]/.test(input[i]) || (input[i] === '-' && i + 1 < input.length && /[0-9]/.test(input[i + 1]) && (tokens.length === 0 || tokens[tokens.length - 1].type === TOKEN_TYPES.OP || tokens[tokens.length - 1].type === TOKEN_TYPES.LPAREN || tokens[tokens.length - 1].type === TOKEN_TYPES.COMMA))) {
      let num = ''
      if (input[i] === '-') {
        num += '-'
        i++
      }
      while (i < input.length && /[0-9.]/.test(input[i])) {
        num += input[i]
        i++
      }
      tokens.push({ type: TOKEN_TYPES.NUMBER, value: parseFloat(num) })
      continue
    }

    // Two-char operators
    if (i + 1 < input.length) {
      const two = input[i] + input[i + 1]
      if (two === '<=' || two === '>=' || two === '!=') {
        tokens.push({ type: TOKEN_TYPES.OP, value: two })
        i += 2
        continue
      }
    }

    // Single-char operators
    if (input[i] === '=' || input[i] === '<' || input[i] === '>') {
      tokens.push({ type: TOKEN_TYPES.OP, value: input[i] })
      i++
      continue
    }

    // Parens
    if (input[i] === '(') {
      tokens.push({ type: TOKEN_TYPES.LPAREN, value: '(' })
      i++
      continue
    }
    if (input[i] === ')') {
      tokens.push({ type: TOKEN_TYPES.RPAREN, value: ')' })
      i++
      continue
    }

    // Comma
    if (input[i] === ',') {
      tokens.push({ type: TOKEN_TYPES.COMMA, value: ',' })
      i++
      continue
    }

    // Identifier or keyword
    if (/[a-zA-Z_]/.test(input[i])) {
      let ident = ''
      while (i < input.length && /[a-zA-Z0-9_ ]/.test(input[i])) {
        ident += input[i]
        i++
      }
      ident = ident.trimEnd()
      const upper = ident.toUpperCase()
      if (KEYWORDS.has(upper)) {
        tokens.push({ type: TOKEN_TYPES.IDENT, value: upper, isKeyword: true })
      } else {
        tokens.push({ type: TOKEN_TYPES.IDENT, value: ident, isKeyword: false })
      }
      continue
    }

    throw new Error(`Unexpected character: "${input[i]}" at position ${i}`)
  }

  tokens.push({ type: TOKEN_TYPES.EOF })
  return tokens
}

// ─── Parser (recursive descent) ──────────────────────────────

function parse(tokens) {
  let pos = 0

  function peek() {
    return tokens[pos]
  }

  function advance() {
    return tokens[pos++]
  }

  function expect(type, value) {
    const tok = advance()
    if (tok.type !== type || (value !== undefined && tok.value !== value)) {
      throw new Error(`Expected ${value || type} but got "${tok.value}"`)
    }
    return tok
  }

  // expression → orExpr
  function expression() {
    return orExpr()
  }

  // orExpr → andExpr (OR andExpr)*
  function orExpr() {
    let left = andExpr()
    while (peek().type === TOKEN_TYPES.IDENT && peek().value === 'OR') {
      advance()
      const right = andExpr()
      left = { type: 'OR', left, right }
    }
    return left
  }

  // andExpr → notExpr (AND notExpr)*
  function andExpr() {
    let left = notExpr()
    while (peek().type === TOKEN_TYPES.IDENT && peek().value === 'AND') {
      advance()
      const right = notExpr()
      left = { type: 'AND', left, right }
    }
    return left
  }

  // notExpr → NOT notExpr | primary
  function notExpr() {
    if (peek().type === TOKEN_TYPES.IDENT && peek().value === 'NOT') {
      advance()
      const expr = notExpr()
      return { type: 'NOT', expr }
    }
    return primary()
  }

  // primary → '(' expression ')' | comparison
  function primary() {
    if (peek().type === TOKEN_TYPES.LPAREN) {
      advance()
      const expr = expression()
      expect(TOKEN_TYPES.RPAREN)
      return expr
    }
    return comparison()
  }

  // comparison → ident (OP value | IN (...) | LIKE string | IS [NOT] NULL)
  function comparison() {
    const colToken = advance()
    if (colToken.type !== TOKEN_TYPES.IDENT || colToken.isKeyword) {
      throw new Error(`Expected column name but got "${colToken.value}"`)
    }
    const column = colToken.value

    const next = peek()

    // IS NULL / IS NOT NULL
    if (next.type === TOKEN_TYPES.IDENT && next.value === 'IS') {
      advance()
      let notNull = false
      if (peek().type === TOKEN_TYPES.IDENT && peek().value === 'NOT') {
        advance()
        notNull = true
      }
      expect(TOKEN_TYPES.IDENT, 'NULL')
      return { type: notNull ? 'IS_NOT_NULL' : 'IS_NULL', column }
    }

    // IN (...)
    if (next.type === TOKEN_TYPES.IDENT && next.value === 'IN') {
      advance()
      expect(TOKEN_TYPES.LPAREN)
      const values = []
      while (peek().type !== TOKEN_TYPES.RPAREN) {
        const val = advance()
        if (val.type === TOKEN_TYPES.STRING || val.type === TOKEN_TYPES.NUMBER) {
          values.push(val.value)
        } else {
          throw new Error(`Expected value in IN list but got "${val.value}"`)
        }
        if (peek().type === TOKEN_TYPES.COMMA) advance()
      }
      expect(TOKEN_TYPES.RPAREN)
      return { type: 'IN', column, values }
    }

    // LIKE "pattern"
    if (next.type === TOKEN_TYPES.IDENT && next.value === 'LIKE') {
      advance()
      const pat = advance()
      if (pat.type !== TOKEN_TYPES.STRING) {
        throw new Error(`Expected string pattern after LIKE but got "${pat.value}"`)
      }
      return { type: 'LIKE', column, pattern: pat.value }
    }

    // Comparison operators
    if (next.type === TOKEN_TYPES.OP) {
      const op = advance().value
      const val = advance()
      if (val.type !== TOKEN_TYPES.STRING && val.type !== TOKEN_TYPES.NUMBER) {
        throw new Error(`Expected value after "${op}" but got "${val.value}"`)
      }
      return { type: 'COMPARE', column, op, value: val.value }
    }

    throw new Error(`Expected operator after "${column}" but got "${next.value}"`)
  }

  const ast = expression()
  if (peek().type !== TOKEN_TYPES.EOF) {
    throw new Error(`Unexpected token: "${peek().value}"`)
  }
  return ast
}

// ─── Evaluator ───────────────────────────────────────────────

function evaluate(ast, row) {
  switch (ast.type) {
    case 'AND':
      return evaluate(ast.left, row) && evaluate(ast.right, row)
    case 'OR':
      return evaluate(ast.left, row) || evaluate(ast.right, row)
    case 'NOT':
      return !evaluate(ast.expr, row)
    case 'IS_NULL': {
      const val = row[ast.column]
      return val === null || val === undefined || val === ''
    }
    case 'IS_NOT_NULL': {
      const val = row[ast.column]
      return val !== null && val !== undefined && val !== ''
    }
    case 'IN': {
      const val = row[ast.column]
      return ast.values.some((v) => {
        if (typeof v === 'number') return Number(val) === v
        return String(val).toLowerCase() === String(v).toLowerCase()
      })
    }
    case 'LIKE': {
      const val = row[ast.column]
      if (val === null || val === undefined) return false
      const regex = new RegExp(
        '^' + ast.pattern.replace(/%/g, '.*').replace(/_/g, '.') + '$',
        'i'
      )
      return regex.test(String(val))
    }
    case 'COMPARE': {
      const cellVal = row[ast.column]
      if (cellVal === null || cellVal === undefined) return false
      const { op, value } = ast
      // Numeric comparison if value is a number
      if (typeof value === 'number') {
        const num = Number(cellVal)
        if (isNaN(num)) return false
        switch (op) {
          case '=': return num === value
          case '!=': return num !== value
          case '<': return num < value
          case '>': return num > value
          case '<=': return num <= value
          case '>=': return num >= value
        }
      }
      // String comparison
      const strCell = String(cellVal).toLowerCase()
      const strVal = String(value).toLowerCase()
      switch (op) {
        case '=': return strCell === strVal
        case '!=': return strCell !== strVal
        case '<': return strCell < strVal
        case '>': return strCell > strVal
        case '<=': return strCell <= strVal
        case '>=': return strCell >= strVal
      }
      return false
    }
    default:
      throw new Error(`Unknown AST node type: ${ast.type}`)
  }
}

// ─── Public API ──────────────────────────────────────────────

/**
 * Parse and evaluate a query string against a row.
 * Returns true if row matches.
 */
export function evaluateQuery(queryString, row) {
  const tokens = tokenize(queryString)
  const ast = parse(tokens)
  return evaluate(ast, row)
}

/**
 * Validate a query string — returns { valid: true } or { valid: false, error: string }
 */
export function validateQuery(queryString) {
  try {
    const tokens = tokenize(queryString)
    parse(tokens)
    return { valid: true }
  } catch (err) {
    return { valid: false, error: err.message }
  }
}
