import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";
import { AlertTriangle, CreditCard, FileWarning } from "lucide-react";

type Alert = {
  id: number;
  type: "invoice" | "document" | "appointment";
  message: string;
  severity: "high" | "medium" | "low";
};

const alerts: Alert[] = [
  {
    id: 1,
    type: "invoice",
    message: "3 faturas vencidas precisam de atenção",
    severity: "high"
  },
  {
    id: 2,
    type: "document",
    message: "5 documentos pendentes de pacientes",
    severity: "medium"
  },
  {
    id: 3,
    type: "appointment",
    message: "2 confirmações de agendamento pendentes",
    severity: "low"
  }
];

const getAlertIcon = (type: Alert["type"]) => {
  const commonClasses = "h-5 w-5 shrink-0";
  switch (type) {
    case "invoice":
      return <CreditCard className={commonClasses} />;
    case "document":
      return <FileWarning className={commonClasses} />;
    case "appointment":
      return <AlertTriangle className={commonClasses} />;
    default:
      return <AlertTriangle className={commonClasses} />;
  }
};

const getSeverityClass = (severity: Alert["severity"]) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "low":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    default:
      return "bg-muted text-foreground";
  }
};

const Alerts = () => {
  return (
    <Card className="rounded-2xl shadow-sm border border-border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Alertas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-colors",
              getSeverityClass(alert.severity)
            )}
          >
            {getAlertIcon(alert.type)}
            <span className="text-sm font-medium">{alert.message}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Alerts;
