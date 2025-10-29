
export enum EnumTipoAtendimento {
    Visita,
    Anamnese,
    AtendimentoExterno,
    SessaoTerapia,
    Reuniao,
}

export interface AgendamentoDto {
  id?: string;
  dataHora: string;
  tipoAtendimento: EnumTipoAtendimento;
  status?: string;
  observacoes?: string;
  pacienteId: string;
  profissionalId: string;
}

export interface PacienteDto {
  id?: string;
  nomeCompleto?: string;
  dataNascimento?: string;
  telefone?: string;
  email?: string;
}

export interface ProfissionalDto {
  id?: string;
  nomeCompleto?: string;
  especialidade?: string;
  registroConselho?: string;
  userId?: string;
}

export interface UserDto {
  email?: string;
  password?: string;
}

export interface TokenResponseDto {
  accessToken?: string;
}

export interface SendEmailResetPasswordDto {
  email?: string;
}

export interface ResetPasswordDto {
  password?: string;
}
