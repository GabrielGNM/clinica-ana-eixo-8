
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Plus, UserPlus } from "lucide-react";

type Patient = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  insurance: string;
  lastAppointment: string;
};

const patients: Patient[] = [
  {
    id: 1,
    name: "Ana Silva",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    insurance: "Unimed",
    lastAppointment: "10/04/2025"
  },
  {
    id: 2,
    name: "Carlos Mendes",
    cpf: "987.654.321-00",
    phone: "(11) 91234-5678",
    insurance: "Amil",
    lastAppointment: "08/04/2025"
  },
  {
    id: 3,
    name: "Mariana Alves",
    cpf: "456.789.123-00",
    phone: "(11) 94567-8901",
    insurance: "Bradesco Saúde",
    lastAppointment: "05/04/2025"
  },
  {
    id: 4,
    name: "João Pedro",
    cpf: "654.321.987-00",
    phone: "(11) 97890-1234",
    insurance: "Particular",
    lastAppointment: "01/04/2025"
  },
  {
    id: 5,
    name: "Beatriz Costa",
    cpf: "321.987.654-00",
    phone: "(11) 93456-7890",
    insurance: "Unimed",
    lastAppointment: "30/03/2025"
  },
];

type PatientListProps = {
  onAddPatient: () => void;
  onEditPatient: (patientId: number) => void;
};

const PatientList = ({ onAddPatient, onEditPatient }: PatientListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPatients = patients.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.cpf.includes(searchTerm) ||
              patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Buscar paciente..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="w-full sm:w-auto" onClick={onAddPatient}>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Paciente
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Convênio Principal</TableHead>
              <TableHead>Última Consulta</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.cpf}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.insurance}</TableCell>
                  <TableCell>{patient.lastAppointment}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditPatient(patient.id)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                        <DropdownMenuItem>Agendar</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Inativar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Nenhum paciente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PatientList;
