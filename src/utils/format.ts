export function formatarTelefone(telefone: string) {
  return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
}

export function formatarCPF(cpf: string) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}
