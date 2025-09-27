import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// Define a type for the professional (adjust as needed)
interface Professional {
  id: number;
  name: string;
  specialty: string;
  registerNumber: string;
}

const ProfessionalList = ({
  onAddProfessional,
  onEditProfessional,
}: {
  onAddProfessional: () => void;
  onEditProfessional: (id: number) => void;
}) => {
  // Dummy data for now
  const [professionals, setProfessionals] = useState<Professional[]>([
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", registerNumber: "CRM-12345" },
    { id: 2, name: "Jane Smith", specialty: "Physical Therapist", registerNumber: "CREFITO-67890" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProfessionals = professionals.filter((professional) =>
    professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    professional.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    professional.registerNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={onAddProfessional}>Adicionar Profissional</Button>
        <Input
          type="search"
          placeholder="Buscar profissional..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>Lista de profissionais da clínica.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Especialidade</TableHead>
            <TableHead>Registro</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProfessionals.map((professional) => (
            <TableRow key={professional.id}>
              <TableCell>{professional.name}</TableCell>
              <TableCell>{professional.specialty}</TableCell>
              <TableCell>{professional.registerNumber}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEditProfessional(professional.id)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {filteredProfessionals.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Nenhum profissional encontrado.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfessionalList;