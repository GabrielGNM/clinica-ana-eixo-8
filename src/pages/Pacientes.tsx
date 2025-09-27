
import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import PatientList from "@/components/Patients/PatientList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Pacientes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"new" | "edit">("new");
  
  const handleAddPatient = () => {
    setDialogType("new");
    setIsDialogOpen(true);
  };
  
  const handleEditPatient = (patientId: number) => {
    setDialogType("edit");
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
        <p className="text-muted-foreground">Gerencie os pacientes da clínica</p>
      </div>

      <PatientList 
        onAddPatient={handleAddPatient}
        onEditPatient={handleEditPatient}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "new" ? "Novo Paciente" : "Editar Paciente"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "new" 
                ? "Preencha os dados para cadastrar um novo paciente" 
                : "Modifique os dados do paciente"}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="contact">Contato e Endereço</TabsTrigger>
              <TabsTrigger value="insurance">Convênio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Nome do paciente" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Feminino</SelectItem>
                      <SelectItem value="O">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="guardian">Responsável (se menor)</Label>
                <Input id="guardian" placeholder="Nome do responsável" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="medical_history">Histórico Médico Relevante</Label>
                <Textarea id="medical_history" placeholder="Informações importantes sobre condições médicas" />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="exemplo@email.com" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Rua, número, complemento" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" placeholder="Bairro" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="Cidade" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">Estado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="other">...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zipcode">CEP</Label>
                  <Input id="zipcode" placeholder="00000-000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emergency_contact">Contato de Emergência</Label>
                  <Input id="emergency_contact" placeholder="Nome e telefone" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insurance" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="insurance_type">Tipo de Atendimento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Particular</SelectItem>
                      <SelectItem value="insurance">Convênio</SelectItem>
                      <SelectItem value="mixed">Misto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="main_insurance">Convênio Principal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unimed">Unimed</SelectItem>
                      <SelectItem value="amil">Amil</SelectItem>
                      <SelectItem value="bradesco">Bradesco Saúde</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="insurance_id">Número da Carteirinha</Label>
                  <Input id="insurance_id" placeholder="Número da carteirinha" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="insurance_validity">Validade</Label>
                  <Input id="insurance_validity" type="date" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="insurance_notes">Observações sobre o Convênio</Label>
                <Textarea id="insurance_notes" placeholder="Informações adicionais sobre o convênio" />
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
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

export default Pacientes;
