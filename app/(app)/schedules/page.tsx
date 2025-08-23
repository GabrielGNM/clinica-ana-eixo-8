
import { Suspense } from "react";
import ClientSchedules from "./components/ClientSchedules";


export const dynamic = "force-dynamic";

export default function SchedulesPage() {
  return (
    <div className=" text-gray-900 dark:text-white min-h-screen">
      <Suspense fallback={<p>Carregando...</p>}>
        <ClientSchedules />
      </Suspense>
    </div>
  );
}
