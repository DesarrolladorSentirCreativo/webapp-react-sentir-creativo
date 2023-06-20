export function calcularDigitoVerificador(rut: string): string {
  const rutLimpio: string = rut.replace(/[^0-9kK]/g, '')

  let suma: number = 0
  let multiplicador: number = 2

  for (let i: number = rutLimpio.length - 1; i >= 0; i--) {
    suma += parseInt(rutLimpio.charAt(i)) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }

  const digitoVerificadorCalculado: number = 11 - (suma % 11)

  return digitoVerificadorCalculado === 10
    ? 'K'
    : digitoVerificadorCalculado.toString()
}
