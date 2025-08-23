import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";

type Appointment = {
  id: number;
  time: string;
  patientName: string;
  professional: string;
  status: "Agendado" | "Chegou" | "Em Atendimento" | "Finalizado" | "Faltou" | "Cancelado";
};

const appointments: Appointment[] = [
  { id: 1, time: "09:00", patientName: "Ana Silva", professional: "Dra. Carla Santos", status: "Agendado" },
  { id: 2, time: "10:00", patientName: "Roberto Ferreira", professional: "Dr. Marcos Oliveira", status: "Chegou" },
  { id: 3, time: "11:00", patientName: "Juliana Martins", professional: "Dra. Carla Santos", status: "Em Atendimento" },
  { id: 4, time: "13:30", patientName: "Pedro Costa", professional: "Dr. Marcos Oliveira", status: "Agendado" },
  { id: 5, time: "15:00", patientName: "Maria Souza", professional: "Dra. Carla Santos", status: "Agendado" }
];

const getStatusClass = (status: Appointment["status"]): string => {
  switch (status) {
    case "Agendado":
      return "bg-muted text-muted-foreground dark:bg-gray-800 dark:text-gray-300";
    case "Chegou":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "Em Atendimento":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "Finalizado":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "Faltou":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "Cancelado":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    default:
      return "";
  }
};

const AppointmentOverview = () => {
  return (
    <Card className="rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Próximos Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between border-b border-border pb-3 last:border-none last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="text-center min-w-14">
                  <span className="text-sm font-semibold text-primary">{appointment.time}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{appointment.patientName}</p>
                  <p className="text-xs text-muted-foreground">{appointment.professional}</p>
                </div>
              </div>
              <div>
                <span
                  className={cn(
                    "text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap transition-colors",
                    getStatusClass(appointment.status)
                  )}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentOverview;
