"use client";

import { useState } from "react";
import PatientList from "@/app/_components/List/Patients";
import PatientDialog from "@/app/_components/Dialog/Patient";
import { Patient } from "@/app/_types";

const Patients = () => {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    type: "new" | "edit";
  }>({
    isOpen: false,
    type: "new",
  });

  const handleAddPatient = () => {
    setDialogState({
      isOpen: true,
      type: "new",
    });
  };

  const handleEditPatient = (patient: Patient) => {
    console.log(patient);
    setDialogState({
      isOpen: true,
      type: "edit",
    });
  };

  const handleCloseDialog = () => {
    setDialogState(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
        <p className="text-muted-foreground">
          Gerencie os pacientes da clínica
        </p>
      </div>

      <PatientList
        onAddPatient={handleAddPatient}
        onEditPatient={handleEditPatient}
      />

      <PatientDialog
        isOpen={dialogState.isOpen}
        type={dialogState.type}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default Patients;
