
export enum EnumTipoAtendimento {
    Visita,
    Anamnese,
    AtendimentoExterno,
    SessaoTerapia,
    Reuniao,
}

export enum Role {
  Gerencia = "Gerencia",
  Profissional = "Profissional",
}

export interface AgendamentoDto {
  id?: string;
  dataHora?: string;
  tipoAtendimento?: EnumTipoAtendimento;
  status?: string;
  observacoes?: string;
  pacienteId?: string;
  profissionalId?: string;
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

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface UserDto {
  email?: string;
  password?: string;
  role?: Role;
}

export interface TokenResponseDto {
  accessToken?: string;
  user?: User;
}

export interface SendEmailResetPasswordDto {
  email?: string;
}

export interface ResetPasswordDto {
  password?: string;
}
