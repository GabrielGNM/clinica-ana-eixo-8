import AppointmentOverview from "@/app/_components/Dashboard/AppointmentOverview";
import PatientWaiting from "@/app/_components/Dashboard/PatientWaiting";
import Alerts from "@/app/_components/Dashboard/Alerts";
import { Card, CardContent } from "@/app/_components/ui/card";
import { CalendarDays, Activity, Users, ClipboardCheck } from "lucide-react";

const Index = () => {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="dark:bg-background dark:text-foreground">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Painel Inicial</h1>
        <p className="text-muted-foreground">Hoje é {today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-card-foreground">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Agendamentos Hoje</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800">
              <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-card-foreground">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Atendimentos Realizados</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-800">
              <ClipboardCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-card-foreground">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pacientes Ativos</p>
              <p className="text-2xl font-bold">142</p>
            </div>
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-800">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-card-foreground">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Ocupação</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-800">
              <Activity className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentOverview />
        </div>
        <div className="space-y-6">
          <PatientWaiting />
          <Alerts />
        </div>
      </div>
    </div>
  );
};

export default Index;
