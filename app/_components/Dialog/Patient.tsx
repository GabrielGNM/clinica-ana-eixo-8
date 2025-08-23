"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";

type PatientDialogProps = {
  isOpen: boolean;
  type: "new" | "edit";
  onClose: () => void;
};

export default function PatientDialog({
  isOpen,
  type,
  onClose,
}: PatientDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[650px] md:min-w-2/3'>
        <DialogHeader>
          <DialogTitle>
            {type === "new" ? "Novo Paciente" : "Editar Paciente"}
          </DialogTitle>
          <DialogDescription>
            {type === "new"
              ? "Preencha os dados para cadastrar um novo paciente"
              : "Modifique os dados do paciente"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue='personal'>
          <TabsList className='grid grid-cols-3 gap-2 mb-6 w-full bg-transparent rounded-xl'>
            <TabsTrigger
              value='personal'
              className='rounded-lg text-sm font-medium transition-all
                data-[state=active]:bg-emerald-500 data-[state=active]:text-white
                dark:data-[state=active]:bg-emerald-400'
            >
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger
              value='contact'
              className='rounded-lg text-sm font-medium transition-all
                data-[state=active]:bg-emerald-500 data-[state=active]:text-white
                dark:data-[state=active]:bg-emerald-400'
            >
              Contato e Endereço
            </TabsTrigger>
            <TabsTrigger
              value='insurance'
              className='rounded-lg text-sm font-medium transition-all
                data-[state=active]:bg-emerald-500 data-[state=active]:text-white
                dark:data-[state=active]:bg-emerald-400'
            >
              Convênio
            </TabsTrigger>
          </TabsList>

          {/* Personal Data */}
          <TabsContent value='personal' className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Nome Completo</Label>
                <Input id='name' placeholder='Nome do paciente' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='cpf'>CPF</Label>
                <Input id='cpf' placeholder='000.000.000-00' />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='birthdate'>Data de Nascimento</Label>
                <Input id='birthdate' type='date' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='gender'>Gênero</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='M'>Masculino</SelectItem>
                    <SelectItem value='F'>Feminino</SelectItem>
                    <SelectItem value='O'>Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='guardian'>Responsável (se menor)</Label>
              <Input id='guardian' placeholder='Nome do responsável' />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='medical_history'>
                Histórico Médico Relevante
              </Label>
              <Textarea
                id='medical_history'
                placeholder='Informações importantes sobre condições médicas'
              />
            </div>
          </TabsContent>

          {/* Contact and Address */}
          <TabsContent value='contact' className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='phone'>Telefone</Label>
                <Input id='phone' placeholder='(00) 00000-0000' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>E-mail</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='exemplo@email.com'
                />
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='address'>Endereço</Label>
              <Input id='address' placeholder='Rua, número, complemento' />
            </div>

            <div className='grid grid-cols-3 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='neighborhood'>Bairro</Label>
                <Input id='neighborhood' placeholder='Bairro' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='city'>Cidade</Label>
                <Input id='city' placeholder='Cidade' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='state'>Estado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='UF' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='SP'>SP</SelectItem>
                    <SelectItem value='RJ'>RJ</SelectItem>
                    <SelectItem value='MG'>MG</SelectItem>
                    <SelectItem value='other'>...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='zipcode'>CEP</Label>
                <Input id='zipcode' placeholder='00000-000' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='emergency_contact'>Contato de Emergência</Label>
                <Input id='emergency_contact' placeholder='Nome e telefone' />
              </div>
            </div>
          </TabsContent>

          {/* Insurance */}
          <TabsContent value='insurance' className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='insurance_type'>Tipo de Atendimento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='private'>Particular</SelectItem>
                    <SelectItem value='insurance'>Convênio</SelectItem>
                    <SelectItem value='mixed'>Misto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='main_insurance'>Convênio Principal</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='unimed'>Unimed</SelectItem>
                    <SelectItem value='amil'>Amil</SelectItem>
                    <SelectItem value='bradesco'>Bradesco Saúde</SelectItem>
                    <SelectItem value='other'>Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='insurance_id'>Número da Carteirinha</Label>
                <Input id='insurance_id' placeholder='Número da carteirinha' />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='insurance_validity'>Validade</Label>
                <Input id='insurance_validity' type='date' />
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='insurance_notes'>
                Observações sobre o Convênio
              </Label>
              <Textarea
                id='insurance_notes'
                placeholder='Informações adicionais sobre o convênio'
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </DialogClose>

          <Button type='submit'>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
