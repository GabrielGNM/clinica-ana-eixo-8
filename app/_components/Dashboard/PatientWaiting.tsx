import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Clock } from "lucide-react";

type WaitingPatient = {
  id: number;
  name: string;
  professional: string;
  arrivalTime: string;
  waitTime: string;
};

const waitingPatients: WaitingPatient[] = [
  {
    id: 1,
    name: "Roberto Ferreira",
    professional: "Dr. Marcos Oliveira",
    arrivalTime: "09:45",
    waitTime: "15 min",
  },
  {
    id: 2,
    name: "Camila Rodrigues",
    professional: "Dra. Carla Santos",
    arrivalTime: "10:15",
    waitTime: "5 min",
  },
];

const PatientWaiting = () => {
  return (
    <Card className="rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Pacientes Aguardando</CardTitle>
      </CardHeader>
      <CardContent>
        {waitingPatients.length > 0 ? (
          <div className="space-y-4">
            {waitingPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex justify-between items-center border-b border-border pb-3 last:border-none last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">{patient.professional}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={14} className="text-muted-foreground" />
                    <span>{patient.waitTime}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary text-white hover:bg-primary/90 transition-colors"
                  >
                    Iniciar Atendimento
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-sm text-muted-foreground">
            Nenhum paciente aguardando no momento
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientWaiting;
