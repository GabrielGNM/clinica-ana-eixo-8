import { Button } from "@/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className='text-center'>
        <h1 className='text-9xl font-bold text-clinic-teal mb-4'>404</h1>
        <p className='text-xl text-muted-foreground mb-8'>
          Oops! Página não encontrada
        </p>
        <Button asChild>
          <Link href='/' className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Voltar ao Início
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
