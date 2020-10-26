export function roundValue(value, decimals) {
  /* Avoid JavaScript rounding problem using exponential notation */

  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}