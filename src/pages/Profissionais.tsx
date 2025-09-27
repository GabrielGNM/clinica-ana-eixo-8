import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import ProfessionalList from "@/components/Professionals/ProfessionalList"; // You'll need to create this component
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

const Profissionais = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"new" | "edit">("new");

  const handleAddProfessional = () => {
    setDialogType("new");
    setIsDialogOpen(true);
  };

  const handleEditProfessional = (professionalId: number) => {
    setDialogType("edit");
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Profissionais</h1>
        <p className="text-muted-foreground">Gerencie os profissionais da clínica</p>
      </div>

      <ProfessionalList
        onAddProfessional={handleAddProfessional}
        onEditProfessional={handleEditProfessional}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "new" ? "Novo Profissional" : "Editar Profissional"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "new"
                ? "Preencha os dados para cadastrar um novo profissional"
                : "Modifique os dados do profissional"}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="contact">Contato e Endereço</TabsTrigger>
              <TabsTrigger value="professional">Dados Profissionais</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Nome do profissional" />
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

            <TabsContent value="professional" className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Input id="specialty" placeholder="Ex: Fisioterapeuta, Psicólogo" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="register_number">Número de Registro</Label>
                  <Input id="register_number" placeholder="Ex: CRM, CRP, CREFITO" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register_type">Tipo de Registro</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crm">CRM</SelectItem>
                      <SelectItem value="crp">CRP</SelectItem>
                      <SelectItem value="crefito">CREFITO</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="professional_notes">Observações</Label>
                <Textarea id="professional_notes" placeholder="Informações adicionais sobre o profissional" />
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

export default Profissionais;