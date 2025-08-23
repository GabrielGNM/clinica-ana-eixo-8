import Image from "next/image";

export default function Hero() {
  return (
    <section className='bg-white'>
      <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            <span className='block'>Gestão Moderna de Pacientes</span>
            <span className='block text-primary'>Simplificada</span>
          </h1>
          <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
            O MedHora simplifica o agendamento, faturamento e gestão de
            pacientes, para que você possa se concentrar no que realmente
            importa: o cuidado com os pacientes.
          </p>
          <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
            <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
              <a
                href='#demonstration'
                className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
              >
                Ver demonstração
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        id='demonstration'
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      >
        <div className='bg-emerald-50 rounded-lg shadow-xl overflow-hidden'>
          <Image
            className='w-full'
            src='https://picsum.photos/700/500'
            alt='Captura de tela do dashboard Agendae'
            width={700}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
