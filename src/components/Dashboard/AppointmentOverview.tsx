
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Appointment = {
  id: number;
  time: string;
  patientName: string;
  professional: string;
  status: "Agendado" | "Chegou" | "Em Atendimento" | "Finalizado" | "Faltou" | "Cancelado";
};

const appointments: Appointment[] = [
  {
    id: 1,
    time: "09:00",
    patientName: "Ana Silva",
    professional: "Dra. Carla Santos",
    status: "Agendado"
  },
  {
    id: 2,
    time: "10:00",
    patientName: "Roberto Ferreira",
    professional: "Dr. Marcos Oliveira",
    status: "Chegou"
  },
  {
    id: 3,
    time: "11:00",
    patientName: "Juliana Martins",
    professional: "Dra. Carla Santos",
    status: "Em Atendimento"
  },
  {
    id: 4,
    time: "13:30",
    patientName: "Pedro Costa",
    professional: "Dr. Marcos Oliveira",
    status: "Agendado"
  },
  {
    id: 5,
    time: "15:00",
    patientName: "Maria Souza",
    professional: "Dra. Carla Santos",
    status: "Agendado"
  }
];

const getStatusClass = (status: Appointment["status"]): string => {
  switch (status) {
    case "Agendado":
      return "status-agendado";
    case "Chegou":
      return "status-chegou";
    case "Em Atendimento":
      return "status-em-atendimento";
    case "Finalizado":
      return "status-finalizado";
    case "Faltou":
      return "status-faltou";
    case "Cancelado":
      return "status-cancelado";
    default:
      return "";
  }
};

const AppointmentOverview = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Próximos Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="text-center min-w-14">
                  <span className="font-bold text-clinic-blue">{appointment.time}</span>
                </div>
                <div>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-gray-500">{appointment.professional}</p>
                </div>
              </div>
              <div>
                <span className={cn("status-badge", getStatusClass(appointment.status))}>
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
