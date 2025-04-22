


export type MaskT = {
  phone: (value: string) => string
}

export type MaskTypeT = keyof MaskT


export const mask = {

  phone(value: string): string {
    return value
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/^(\d{2})/g, '($1) ')
      .replace(/(\d{5})(\d{1,4})$/g, '$1-$2')
  },
}
