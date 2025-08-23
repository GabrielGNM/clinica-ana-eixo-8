const features = [
  {
    name: 'Agendamento de Pacientes',
    description: 'Interface intuitiva de calendário com funcionalidade de arrastar e soltar para fácil gerenciamento de consultas.',
    icon: '📅',
  },
  {
    name: 'Faturamento Automatizado',
    description: 'Gere faturas automaticamente, processe pagamentos e acompanhe saldos pendentes.',
    icon: '💳',
  },
  {
    name: 'Registros de Pacientes',
    description: 'Armazenamento seguro e centralizado para todas as informações e histórico médico dos pacientes.',
    icon: '📁',
  },
  {
    name: 'Relatórios',
    description: 'Relatórios abrangentes sobre o desempenho da clínica, receita e estatísticas de pacientes.',
    icon: '📊',
  },
  {
    name: 'Integração com Telessaúde',
    description: 'Videoconferência embutida para consultas remotas.',
    icon: '🎥',
  },
  {
    name: 'Acesso Móvel',
    description: 'Aplicativo móvel completo para gerenciar sua clínica de onde estiver.',
    icon: '📱',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Recursos</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Tudo o que você precisa para gerenciar sua clínica
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            O Agendae combina todas as ferramentas que você precisa em uma plataforma simples e fácil de usar.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg text-2xl">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
