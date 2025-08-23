import { useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { MoreHorizontal, Search, UserPlus } from "lucide-react";
import { Patient } from "@/app/_types";

const patients: Patient[] = [
  {
    id: "1",
    name: "Ana Silva",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    insurance: "Unimed",
    lastAppointment: "10/04/2025"
  },
  {
    id: "2",
    name: "Carlos Mendes",
    cpf: "987.654.321-00",
    phone: "(11) 91234-5678",
    insurance: "Amil",
    lastAppointment: "08/04/2025"
  },
  {
    id: "3",
    name: "Mariana Alves",
    cpf: "456.789.123-00",
    phone: "(11) 94567-8901",
    insurance: "Bradesco Saúde",
    lastAppointment: "05/04/2025"
  },
  {
    id: "4",
    name: "João Pedro",
    cpf: "654.321.987-00",
    phone: "(11) 97890-1234",
    insurance: "Particular",
    lastAppointment: "01/04/2025"
  },
  {
    id: "5",	
    name: "Beatriz Costa",
    cpf: "321.987.654-00",
    phone: "(11) 93456-7890",
    insurance: "Unimed",
    lastAppointment: "30/03/2025"
  },
];

type PatientListProps = {
  onAddPatient: () => void;
  onEditPatient: (patient: Patient) => void;
};

const PatientList = ({ onAddPatient, onEditPatient }: PatientListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cpf.includes(searchTerm) ||
      patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
          <Input
            placeholder="Buscar paciente..."
            className="pl-10 border-2 border-transparent focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 dark:bg-zinc-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={onAddPatient}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 dark:bg-primary-400 dark:hover:bg-primary-500"
        >
          <UserPlus className="h-4 w-4" />
          Novo Paciente
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-300 dark:border-gray-600 bg-zinc-50 dark:bg-zinc-900 shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-500 dark:text-gray-300">Nome</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-300">CPF</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-300">Telefone</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-300">Convênio</TableHead>
              <TableHead className="text-gray-500 dark:text-gray-300">Última Consulta</TableHead>
              <TableHead className="sr-only">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">{patient.name}</TableCell>
                  <TableCell>{patient.cpf}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.insurance}</TableCell>
                  <TableCell>{patient.lastAppointment}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditPatient(patient)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                        <DropdownMenuItem>Agendar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">
                          Inativar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center text-gray-500 dark:text-gray-400">
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
