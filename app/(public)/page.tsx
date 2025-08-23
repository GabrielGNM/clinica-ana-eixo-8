import Head from 'next/head';
import Link from 'next/link';

import Header from './_components/Header';
import Hero from './_components/Hero';
import Features from './_components/Features';
import Testimonials from './_components/Testimonials';
import Pricing from './_components/Pricing';
import Footer from './_components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>MedHora - Plataforma de Agendamento e Faturamento de Pacientes</title>
        <meta
          name="description"
          content="Otimize sua clínica com o MedHora - a plataforma tudo-em-um para agendamento, faturamento e gestão de pacientes."
        />
        <Link rel="icon" href="/" />
      </Head>

      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
