import Link from "next/link";
import { Home } from "lucide-react";

export default function Header() {
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-6'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <Home className='h-8 w-8 text-primary' />
              <h1 className='ml-2 text-3xl font-extrabold tracking-tight text-primary drop-shadow-sm'>
                Med<span className='text-gray-900'>Hora</span>
              </h1>
            </Link>
          </div>
          <nav className='hidden md:flex space-x-10'>
            <Link
              href='#features'
              className='text-base font-medium text-gray-500 hover:text-gray-900'
            >
              Funcionalidades
            </Link>
            <Link
              href='#testimonials'
              className='text-base font-medium text-gray-500 hover:text-gray-900'
            >
              Depoimentos
            </Link>
          </nav>
          <div className='flex items-center'>
            <Link
              href='/login'
              className='text-base font-medium text-gray-500 hover:text-gray-900 mr-6'
            >
              Entrar
            </Link>
            <Link
              href='#budget'
              className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary'
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
