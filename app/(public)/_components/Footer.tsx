import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const navigation = {
  main: [
    { name: "Recursos", href: "#features" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "Sobre", href: "#" },
    { name: "Contato", href: "#budget" },
  ],
  legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos", href: "#" },
    { name: "Conformidade com HIPAA", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} MedHora. Todos os direitos reservados.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          {navigation.legal.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base text-gray-400 hover:text-gray-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
