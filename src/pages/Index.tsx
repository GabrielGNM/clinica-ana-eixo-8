
import Layout from "@/components/Layout/Layout";
import AppointmentOverview from "@/components/Dashboard/AppointmentOverview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Activity, Users, ClipboardCheck } from "lucide-react";

const Index = () => {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Painel Inicial</h1>
        <p className="text-muted-foreground">Hoje é {today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Agendamentos Hoje</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="p-2 rounded-full bg-blue-100">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Atendimentos Realizados</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <ClipboardCheck className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pacientes Ativos</p>
              <p className="text-2xl font-bold">142</p>
            </div>
            <div className="p-2 rounded-full bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progresso do Dia</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
            <div className="p-2 rounded-full bg-amber-100">
              <Activity className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AppointmentOverview />
      </div>
    </Layout>
  );
};

export default Index;
