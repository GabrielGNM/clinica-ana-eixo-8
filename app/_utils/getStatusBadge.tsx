import { Badge } from "@/app/_components/ui/badge";

type AppointmentStatus = "Agendado" | "Chegou" | "Em Atendimento" | "Finalizado" | "Faltou" | "Cancelado";

export const getStatusBadge = (status: AppointmentStatus) => {
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