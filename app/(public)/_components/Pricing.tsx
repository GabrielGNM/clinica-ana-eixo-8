"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { budgetSchema } from '@/app/_lib/zod';
import { Button } from '@/app/_components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Textarea } from '@/app/_components/ui/textarea';
import { InputMask } from '@react-input/mask';

type FormData = z.infer<typeof budgetSchema>;

export default function Pricing() {
  const form = useForm<FormData>({
    resolver: zodResolver(budgetSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Dados enviados:', data);
    // Aqui você pode adicionar a lógica para enviar o e-mail
  };

  return (
    <section id="budget" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Solicite um orçamento personalizado
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Preencha o formulário abaixo e entraremos em contato com um orçamento.
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Nos envie suas informações para que possamos personalizar a proposta de acordo com as necessidades da sua clínica.
          </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Seu Nome</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Seu nome completo"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary foc    us:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                
                {/* Nome da Clínica */}
                <FormField
                  control={form.control}
                  name="clinicName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="clinicName">Nome da Clínica</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          id="clinicName"
                          placeholder="Nome da clínica"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* E-mail */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Seu E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          id="email"
                          placeholder="exemplo@dominio.com"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                {/* Telefone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone" className='relative top-1'>Telefone para Contato</FormLabel>
                      <FormControl>
                        <InputMask
                          type="tel"
                          id="phone"
                          placeholder="(XX) XXXXX-XXXX"                          
                          mask="(__) _ ____-____" replacement={{ _: /\d/ }}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 mt-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>

              {/* Mensagem */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="message">Sua Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Escreva sua mensagem"
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary focus:outline-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              {/* Botão de Envio */}
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-white bg-primary hover:bg-primary"
                >
                  Enviar Solicitação
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
