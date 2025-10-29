import { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DollarSign,
    TrendingUp,
    Calendar,
    Users,
    FileText,
    AlertCircle,
    CheckCircle,
    Clock,
    XCircle,
    Plus,
    BarChart3,
    PieChart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getFaturamentos, calcularEstatisticas } from "@/services/faturamentoService";
import { FaturamentoDto, EnumStatusFaturamento } from "@/types/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import "@/styles/animations.css";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const Dashboard = () => {
    const [faturamentos, setFaturamentos] = useState<FaturamentoDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [periodo, setPeriodo] = useState<'hoje' | 'semana' | 'mes' | 'ano'>('mes');
    const { toast } = useToast();
    const navigate = useNavigate();

    const COLORS = {
        primary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#06b6d4',
        purple: '#8b5cf6',
        pink: '#ec4899',
        indigo: '#6366f1'
    };

    const PIE_COLORS = [COLORS.primary, COLORS.success, COLORS.warning, COLORS.danger];

    const fetchFaturamentos = async () => {
        try {
            setLoading(true);
            const data = await getFaturamentos();
            setFaturamentos(data);
        } catch (error) {
            console.error('Erro ao carregar faturamentos:', error);
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao carregar dados do dashboard.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaturamentos();
    }, []);

    const getFaturamentosPorPeriodo = () => {
        const agora = new Date();
        let dataInicio: Date;

        switch (periodo) {
            case 'hoje':
                dataInicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
                break;
            case 'semana':
                dataInicio = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'mes':
                dataInicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
                break;
            case 'ano':
                dataInicio = new Date(agora.getFullYear(), 0, 1);
                break;
            default:
                dataInicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
        }

        return faturamentos.filter(fat => {
            const dataFaturamento = new Date(fat.dataFaturamento);
            return dataFaturamento >= dataInicio;
        });
    };

    const faturamentosFiltrados = getFaturamentosPorPeriodo();
    const estatisticas = calcularEstatisticas(faturamentosFiltrados);

    const getDadosEvolucao = () => {
        const dados = faturamentosFiltrados.reduce((acc, fat) => {
            const data = format(new Date(fat.dataFaturamento), 'dd/MM', { locale: ptBR });
            if (!acc[data]) {
                acc[data] = { data, total: 0, pago: 0, pendente: 0 };
            }
            acc[data].total += fat.valorTotal;
            if (fat.status === EnumStatusFaturamento.Pago) {
                acc[data].pago += fat.valorTotal;
            } else if (fat.status === EnumStatusFaturamento.Rascunho) {
                acc[data].pendente += fat.valorTotal;
            }
            return acc;
        }, {} as Record<string, { data: string; total: number; pago: number; pendente: number }>);

        return Object.values(dados).sort((a, b) => {
            const dateA = new Date(a.data.split('/').reverse().join('-'));
            const dateB = new Date(b.data.split('/').reverse().join('-'));
            return dateA.getTime() - dateB.getTime();
        });
    };

    const getDadosStatus = () => {
        const statusCounts = getStatusCounts();
        return [
            { name: 'Pago', value: statusCounts.pago, color: COLORS.success },
            { name: 'Emitido', value: statusCounts.emitido, color: COLORS.info },
            { name: 'Rascunho', value: statusCounts.rascunho, color: COLORS.warning },
            { name: 'Cancelado', value: statusCounts.cancelado, color: COLORS.danger }
        ].filter(item => item.value > 0);
    };

    const getDadosValores = () => {
        return faturamentosFiltrados
            .sort((a, b) => new Date(b.dataFaturamento).getTime() - new Date(a.dataFaturamento).getTime())
            .slice(0, 10)
            .map(fat => ({
                data: format(new Date(fat.dataFaturamento), 'dd/MM', { locale: ptBR }),
                valor: fat.valorTotal,
                status: getStatusInfo(fat.status).label,
                atendimentos: fat.totalAtendimentos
            }));
    };

    const getStatusInfo = (status: EnumStatusFaturamento) => {
        switch (status) {
            case EnumStatusFaturamento.Rascunho:
                return { label: 'Rascunho', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
            case EnumStatusFaturamento.Emitido:
                return { label: 'Emitido', color: 'bg-blue-100 text-blue-800', icon: FileText };
            case EnumStatusFaturamento.Pago:
                return { label: 'Pago', color: 'bg-green-100 text-green-800', icon: CheckCircle };
            case EnumStatusFaturamento.Cancelado:
                return { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle };
            default:
                return { label: 'Desconhecido', color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const getStatusCounts = () => {
        const counts = {
            rascunho: 0,
            emitido: 0,
            pago: 0,
            cancelado: 0
        };

        faturamentosFiltrados.forEach(fat => {
            switch (fat.status) {
                case EnumStatusFaturamento.Rascunho:
                    counts.rascunho++;
                    break;
                case EnumStatusFaturamento.Emitido:
                    counts.emitido++;
                    break;
                case EnumStatusFaturamento.Pago:
                    counts.pago++;
                    break;
                case EnumStatusFaturamento.Cancelado:
                    counts.cancelado++;
                    break;
            }
        });

        return counts;
    };

    const statusCounts = getStatusCounts();

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Carregando dashboard...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Visão geral dos faturamentos e métricas financeiras
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => navigate('/faturamento/novo')} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Novo Faturamento
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/faturamento')}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Ver Todos
                        </Button>
                    </div>
                </div>

                <Tabs value={periodo} onValueChange={(value) => setPeriodo(value as any)}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="hoje">Hoje</TabsTrigger>
                        <TabsTrigger value="semana">7 dias</TabsTrigger>
                        <TabsTrigger value="mes">Mês</TabsTrigger>
                        <TabsTrigger value="ano">Ano</TabsTrigger>
                    </TabsList>

                    <TabsContent value={periodo} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="card-hover animate-fade-in-up delay-100">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Faturado</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold animate-count-up">{formatCurrency(estatisticas.totalFaturado)}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {faturamentosFiltrados.length} faturamentos
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="card-hover animate-fade-in-up delay-200">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600 animate-count-up">
                                        {formatCurrency(estatisticas.totalPago)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {estatisticas.taxaRecebimento}% recebido
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="card-hover animate-fade-in-up delay-300">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pendente</CardTitle>
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-yellow-600 animate-count-up">
                                        {formatCurrency(estatisticas.totalPendente)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Aguardando pagamento
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="card-hover animate-fade-in-up delay-400">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Taxa de Recebimento</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold animate-count-up">{estatisticas.taxaRecebimento}%</div>
                                    <p className="text-xs text-muted-foreground">
                                        Eficiência de cobrança
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Card className="card-hover animate-slide-in-left delay-500">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChart className="h-5 w-5" />
                                        Status dos Faturamentos
                                    </CardTitle>
                                    <CardDescription>
                                        Distribuição por status no período selecionado
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RechartsPieChart>
                                                <Pie
                                                    data={getDadosStatus()}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    animationBegin={0}
                                                    animationDuration={1000}
                                                >
                                                    {getDadosStatus().map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => [value, 'Faturamentos']} />
                                            </RechartsPieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="card-hover animate-slide-in-right delay-600">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5" />
                                        Faturamentos por Valor
                                    </CardTitle>
                                    <CardDescription>
                                        Top 10 faturamentos por valor
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={getDadosValores()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} maxBarSize={60}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="data" />
                                                <YAxis />
                                                <Tooltip
                                                    formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                                                    labelFormatter={(label) => `Data: ${label}`}
                                                />
                                                <Bar
                                                    dataKey="valor"
                                                    fill={COLORS.primary}
                                                    animationBegin={0}
                                                    animationDuration={1200}
                                                    radius={[4, 4, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="card-hover animate-fade-in-up delay-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Evolução do Faturamento
                                </CardTitle>
                                <CardDescription>
                                    Comparação entre total faturado, pago e pendente ao longo do tempo
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={getDadosEvolucao()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="data" />
                                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                                            <Tooltip
                                                formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                                                labelFormatter={(label) => `Data: ${label}`}
                                            />
                                            <Legend />
                                            <Area
                                                type="monotone"
                                                dataKey="total"
                                                stackId="1"
                                                stroke={COLORS.primary}
                                                fill={COLORS.primary}
                                                fillOpacity={0.6}
                                                animationBegin={0}
                                                animationDuration={1500}
                                                name="Total Faturado"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="pago"
                                                stackId="2"
                                                stroke={COLORS.success}
                                                fill={COLORS.success}
                                                fillOpacity={0.8}
                                                animationBegin={200}
                                                animationDuration={1500}
                                                name="Pago"
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="pendente"
                                                stackId="3"
                                                stroke={COLORS.warning}
                                                fill={COLORS.warning}
                                                fillOpacity={0.8}
                                                animationBegin={400}
                                                animationDuration={1500}
                                                name="Pendente"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="card-hover animate-fade-in-up delay-800">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Faturamentos Recentes
                                </CardTitle>
                                <CardDescription>
                                    Últimos faturamentos criados
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {faturamentosFiltrados
                                        .sort((a, b) => new Date(b.dataFaturamento).getTime() - new Date(a.dataFaturamento).getTime())
                                        .slice(0, 5)
                                        .map((faturamento, index) => {
                                            const statusInfo = getStatusInfo(faturamento.status);
                                            const Icon = statusInfo.icon;

                                            return (
                                                <div
                                                    key={faturamento.id}
                                                    className="flex items-center justify-between p-3 border rounded-lg animate-in slide-in-from-left duration-500"
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="h-4 w-4" />
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                {format(new Date(faturamento.dataFaturamento), 'dd/MM/yyyy', { locale: ptBR })}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {faturamento.totalAtendimentos} atendimento(s)
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium">
                                                            {formatCurrency(faturamento.valorTotal)}
                                                        </p>
                                                        <Badge className={statusInfo.color}>
                                                            {statusInfo.label}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {faturamentosFiltrados.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            Nenhum faturamento encontrado para o período selecionado.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default Dashboard;
