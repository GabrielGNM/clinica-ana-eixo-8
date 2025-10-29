
import type { ProfissionalDto } from '../types/api';
import client from './apiClient';

const API_PREFIX = 'api/Profissional';

export const getProfissionais = (): Promise<ProfissionalDto[]> => {
  return client<ProfissionalDto[]>(API_PREFIX, {});
};

export const createProfissional = (
  data: ProfissionalDto
): Promise<ProfissionalDto> => {
  return client<ProfissionalDto>(API_PREFIX, { data });
};

export const updateProfissional = (
  data: ProfissionalDto
): Promise<ProfissionalDto> => {
  return client<ProfissionalDto>(API_PREFIX, { data, method: 'PUT' });
};

export const getProfissionalById = (id: string): Promise<ProfissionalDto> => {
  return client<ProfissionalDto>(`${API_PREFIX}/${id}`, {});
};

export const deleteProfissional = (id: string): Promise<void> => {
  return client<void>(`${API_PREFIX}/${id}`, { method: 'DELETE' });
};
