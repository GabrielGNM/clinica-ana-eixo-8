import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "O Agendae transformou nossa clínica. Reduzimos faltas em 30% e erros de cobrança agora são coisa do passado.",
    attribution: 'Dra. Sarah Johnson, Clínica de Família',
  },
  {
    id: 2,
    quote: "O agendamento de pacientes é tão intuitivo que até nossos funcionários menos familiarizados com tecnologia aprenderam rapidamente.",
    attribution: 'Michael Chen, Administrador da Clínica',
  },
  {
    id: 3,
    quote: "Conseguimos expandir nossa clínica em 40% sem contratar mais equipe administrativa, graças à eficiência do Agendae.",
    attribution: 'Dr. Robert Williams, Clínica Odontológica',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-teal-500 font-semibold tracking-wide uppercase">Depoimentos</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Confiado por profissionais da saúde
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div className="flex items-center justify-center">
                    <Quote className="h-12 w-12 text-teal-600" />
                  </div>
                  <blockquote className="mt-8">
                    <div className="relative text-lg font-medium text-gray-700">
                      <p className="relative">&quot;{testimonial.quote}&quot;</p>
                    </div>
                    <footer className="mt-4">
                      <p className="text-base font-semibold text-primary-600">
                        {testimonial.attribution}
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
