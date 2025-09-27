
import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, UserCheck, Play, CheckCircle2, X } from "lucide-react";

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

const getStatusBadge = (status: Appointment["status"]) => {
  switch (status) {
    case "Agendado":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Agendado</Badge>;
    case "Chegou":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chegou</Badge>;
    case "Em Atendimento":
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Em Atendimento</Badge>;
    case "Finalizado":
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Finalizado</Badge>;
    case "Faltou":
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Faltou</Badge>;
    case "Cancelado":
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const Atendimento = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"finalize" | "checkin" | "start" | "miss">("finalize");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const handleAction = (appointment: Appointment, action: "checkin" | "start" | "finalize" | "miss") => {
    setSelectedAppointment(appointment);
    setDialogType(action);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Atendimento</h1>
        <p className="text-muted-foreground">Gerenciamento dos atendimentos do dia</p>
      </div>

      <div className="grid gap-6">
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="p-4 border-b flex items-center gap-2">
            <Calendar className="h-5 w-5 text-clinic-teal" />
            <h2 className="font-semibold">Atendimentos de Hoje</h2>
          </div>
          
          <Table>
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
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Finalizar</span>
                        </Button>
                      )}
                      
                      {(appointment.status === "Agendado") && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1 text-red-700 border-red-200 hover:bg-red-50"
                          onClick={() => handleAction(appointment, "miss")}
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
              <div className="mb-4">
                <p><strong>Paciente:</strong> {selectedAppointment.patientName}</p>
                <p><strong>Profissional:</strong> {selectedAppointment.professional}</p>
                <p><strong>Horário:</strong> {selectedAppointment.time}</p>
              </div>
              
              {dialogType === "finalize" && (
                <div className="space-y-4">
                  <div className="grid w-full gap-1.5">
                    <label htmlFor="session-notes" className="text-sm font-medium">
                      Evolução/Notas da Sessão
                    </label>
                    <Textarea
                      id="session-notes"
                      placeholder="Descreva os detalhes sobre o atendimento realizado..."
                      className="min-h-32"
                    />
                  </div>
                  
                  <div className="grid w-full gap-1.5">
                    <label htmlFor="next-steps" className="text-sm font-medium">
                      Próximos Passos
                    </label>
                    <Textarea
                      id="next-steps"
                      placeholder="Observações para próximas sessões, recomendações..."
                    />
                  </div>
                </div>
              )}
              
              {dialogType === "miss" && (
                <div className="space-y-4">
                  <div className="grid w-full gap-1.5">
                    <label htmlFor="miss-reason" className="text-sm font-medium">
                      Motivo da Falta
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-notification">Sem notificação prévia</SelectItem>
                        <SelectItem value="health">Problema de saúde</SelectItem>
                        <SelectItem value="transportation">Problemas de transporte</SelectItem>
                        <SelectItem value="other">Outro motivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid w-full gap-1.5">
                    <label htmlFor="miss-notes" className="text-sm font-medium">
                      Observações
                    </label>
                    <Textarea
                      id="miss-notes"
                      placeholder="Informações adicionais sobre a falta..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {dialogType === "finalize" && "Finalizar Atendimento"}
              {dialogType === "checkin" && "Confirmar Check-in"}
              {dialogType === "start" && "Iniciar Atendimento"}
              {dialogType === "miss" && "Confirmar Falta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Atendimento;
