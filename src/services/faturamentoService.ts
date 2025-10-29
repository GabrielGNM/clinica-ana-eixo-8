import client from './apiClient';
import { FaturamentoDto, CriarFaturamentoDto, CriarFaturamentoAvulsoDto, EnumStatusFaturamento } from '@/types/api';

const API_PREFIX = 'api/Faturamento';

// GET /api/Faturamento - Buscar todos os faturamentos
export const getFaturamentos = (): Promise<FaturamentoDto[]> => {
    return client<FaturamentoDto[]>(API_PREFIX, {});
};

// GET /api/Faturamento/{id} - Buscar faturamento por ID
export const getFaturamentoById = (id: string): Promise<FaturamentoDto> => {
    return client<FaturamentoDto>(`${API_PREFIX}/${id}`, {});
};

// GET /api/Faturamento/profissional/{profissionalId} - Buscar por profissional
export const getFaturamentoPorProfissional = (profissionalId: string): Promise<FaturamentoDto[]> => {
    return client<FaturamentoDto[]>(`${API_PREFIX}/profissional/${profissionalId}`, {});
};

// GET /api/Faturamento/periodo?dataInicio={dataInicio}&dataFim={dataFim} - Buscar por período
export const getFaturamentoPorPeriodo = (dataInicio: string, dataFim: string): Promise<FaturamentoDto[]> => {
    return client<FaturamentoDto[]>(`${API_PREFIX}/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`, {});
};

// POST /api/Faturamento/avulso - Criar faturamento avulso
export const createFaturamento = (data: CriarFaturamentoAvulsoDto): Promise<FaturamentoDto> => {
    return client<FaturamentoDto>(`${API_PREFIX}/avulso`, {
        data: data,
        method: 'POST'
    });
};

// POST /api/Faturamento/gerar - Gerar faturamento por período
export const gerarFaturamento = (data: CriarFaturamentoDto): Promise<FaturamentoDto> => {
    return client<FaturamentoDto>(`${API_PREFIX}/gerar`, {
        data,
        method: 'POST'
    });
};

// PUT /api/Faturamento - Atualizar faturamento
export const updateFaturamento = (data: FaturamentoDto): Promise<FaturamentoDto> => {
    return client<FaturamentoDto>(API_PREFIX, {
        data: data,
        method: 'PUT'
    });
};

// PUT /api/Faturamento/{id}/emitir - Emitir faturamento
export const emitirFaturamento = (id: string): Promise<FaturamentoDto> => {
    return client<FaturamentoDto>(`${API_PREFIX}/${id}/emitir`, {
        method: 'PUT'
    });
};

// PUT /api/Faturamento/{id}/cancelar - Cancelar faturamento
export const cancelarFaturamento = (id: string): Promise<FaturamentoDto> => {
    return client<FaturamentoDto>(`${API_PREFIX}/${id}/cancelar`, {
        method: 'PUT'
    });
};

// DELETE /api/Faturamento/{id} - Deletar faturamento
export const deleteFaturamento = (id: string): Promise<boolean> => {
    return client<boolean>(`${API_PREFIX}/${id}`, { method: 'DELETE' });
};

// Função auxiliar para calcular estatísticas localmente
export const calcularEstatisticas = (faturamentos: FaturamentoDto[]) => {
    const totalFaturado = faturamentos.reduce((acc, item) => acc + item.valorTotal, 0);
    const totalPago = faturamentos
        .filter(item => item.status === EnumStatusFaturamento.Pago)
        .reduce((acc, item) => acc + item.valorTotal, 0);
    const totalPendente = faturamentos
        .filter(item => item.status === EnumStatusFaturamento.Rascunho)
        .reduce((acc, item) => acc + item.valorTotal, 0);
    const taxaRecebimento = totalFaturado > 0 ? Math.round((totalPago / totalFaturado) * 100) : 0;

    return {
        totalFaturado,
        totalPago,
        totalPendente,
        taxaRecebimento
    };
};