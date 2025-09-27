
import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import CalendarView from "@/components/Scheduler/CalendarView";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";

const Agendamento = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"new" | "edit">("new");
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const handleAppointmentClick = (appointmentId: number | null, day: number, hour: number) => {
    if (appointmentId) {
      setDialogType("edit");
    } else {
      setDialogType("new");
    }
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agendamento</h1>
          <p className="text-muted-foreground">Gerencie os agendamentos da clínica</p>
        </div>
        <Button onClick={() => {
          setDialogType("new");
          setIsDialogOpen(true);
        }}>
          Novo Agendamento
        </Button>
      </div>

      <CalendarView onAppointmentClick={handleAppointmentClick} />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "new" ? "Novo Agendamento" : "Editar Agendamento"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "new" 
                ? "Preencha os dados para criar um novo agendamento" 
                : "Modifique os dados do agendamento existente"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="patient" className="text-sm font-medium">
                Paciente
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ana Silva</SelectItem>
                  <SelectItem value="2">Carlos Mendes</SelectItem>
                  <SelectItem value="3">Mariana Alves</SelectItem>
                  <SelectItem value="4">João Pedro</SelectItem>
                  <SelectItem value="5">Beatriz Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="professional" className="text-sm font-medium">
                Profissional
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Dra. Carla Santos</SelectItem>
                  <SelectItem value="2">Dr. Marcos Oliveira</SelectItem>
                  <SelectItem value="3">Dra. Renata Lima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">
                  Data
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      locale={ptBR}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">
                  Horário
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 8).map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">
                  Duração
                </label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hora</SelectItem>
                    <SelectItem value="1.5">1 hora e 30 minutos</SelectItem>
                    <SelectItem value="2">2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <label className="text-sm font-medium">
                  Tipo de Sessão/Convênio
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Particular</SelectItem>
                    <SelectItem value="unimed">Unimed</SelectItem>
                    <SelectItem value="amil">Amil</SelectItem>
                    <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <label className="text-sm font-medium">
                Observações
              </label>
              <Textarea placeholder="Adicione informações importantes sobre o agendamento" />
            </div>
          </div>
          
          <DialogFooter>
            {dialogType === "edit" && (
              <Button variant="outline" className="mr-auto">
                Cancelar Agendamento
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Agendamento;
