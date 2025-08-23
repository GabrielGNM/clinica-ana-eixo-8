"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Calendar, Clock, UserCheck, Play, CheckCircle2, X } from "lucide-react";
import { getStatusBadge } from "@/app/_utils/getStatusBadge";

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

const Services = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"finalize" | "checkin" | "start" | "miss">("finalize");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAction = (appointment: Appointment, action: "checkin" | "start" | "finalize" | "miss") => {
    setSelectedAppointment(appointment);
    setDialogType(action);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = () => {
    try {
      setError(null); // Reset error on success
      console.log(`Action ${dialogType} for appointment ${selectedAppointment?.id}`);
      setIsDialogOpen(false);
    } catch {
      setError("Ocorreu um erro ao realizar a ação. Tente novamente.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight ">Atendimento</h1>
        <p className="text-muted-foreground">Gerenciamento dos atendimentos do dia</p>
      </div>

      <div className="grid gap-6 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="border rounded-lg overflow-hidden shadow-md">
          <div className="p-4 border-b flex items-center gap-2">
            <Calendar className="h-5 w-5 text-clinic-teal" />
            <h2 className="font-semibold">Atendimentos de Hoje</h2>
          </div>

          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Horário</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {appointment.time}
                    </div>
                  </TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.professional}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {appointment.status === "Agendado" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1 text-green-700 border-green-200 hover:bg-green-50"
                          onClick={() => handleAction(appointment, "checkin")}
                          aria-label="Realizar Check-in"
                        >
                          <UserCheck className="h-4 w-4" />
                          <span>Check-in</span>
                        </Button>
                      )}

                      {appointment.status === "Chegou" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1 text-purple-700 border-purple-200 hover:bg-purple-50"
                          onClick={() => handleAction(appointment, "start")}
                          aria-label="Iniciar Atendimento"
                        >
                          <Play className="h-4 w-4" />
                          <span>Iniciar</span>
                        </Button>
                      )}

                      {appointment.status === "Em Atendimento" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1 text-green-700 border-green-200 hover:bg-green-50"
                          onClick={() => handleAction(appointment, "finalize")}
                          aria-label="Finalizar Atendimento"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Finalizar</span>
                        </Button>
                      )}

                      {appointment.status === "Agendado" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1 text-red-700 border-red-200 hover:bg-red-50"
                          onClick={() => handleAction(appointment, "miss")}
                          aria-label="Marcar Falta"
                        >
                          <X className="h-4 w-4" />
                          <span>Faltou</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "finalize" && "Finalizar Atendimento"}
              {dialogType === "checkin" && "Realizar Check-in"}
              {dialogType === "start" && "Iniciar Atendimento"}
              {dialogType === "miss" && "Marcar Falta"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "finalize" && "Registre a evolução/notas da sessão e finalize o atendimento"}
              {dialogType === "checkin" && "Confirme a chegada do paciente"}
              {dialogType === "start" && "Iniciar a sessão com o paciente"}
              {dialogType === "miss" && "Confirme a falta do paciente"}
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="py-4">
              <div className="mb-4 text-gray-800">
                <p><strong>Paciente:</strong> {selectedAppointment.patientName}</p>
                <p><strong>Profissional:</strong> {selectedAppointment.professional}</p>
                <p><strong>Horário:</strong> {selectedAppointment.time}</p>
              </div>

              {dialogType === "finalize" && (
                <div className="space-y-4">
                  <div className="grid w-full gap-1.5">
                    <label htmlFor="session-notes" className="text-sm font-medium text-gray-700">Notas da Sessão:</label>
                    <Textarea id="session-notes" placeholder="Digite suas observações..." />
                  </div>
                  <div className="grid w-full gap-1.5">
                    <label htmlFor="next-steps" className="text-sm font-medium text-gray-700">Próximos Passos:</label>
                    <Textarea id="next-steps" placeholder="Descreva os próximos passos para o paciente..." />
                  </div>
                </div>
              )}

              {dialogType === "miss" && (
                <div className="space-y-4">
                  <div className="grid w-full gap-1.5">
                    <label htmlFor="absence-reason" className="text-sm font-medium text-gray-700">Motivo da Falta:</label>
                    <Select key="absence-reason" aria-label="Selecione o motivo da falta">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doente">Doente</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <DialogFooter>
            <Button onClick={handleDialogSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
              {dialogType === "finalize" && "Finalizar Atendimento"}
              {dialogType === "checkin" && "Realizar Check-in"}
              {dialogType === "start" && "Iniciar Atendimento"}
              {dialogType === "miss" && "Registrar Falta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
