import Link from 'next/link';

const highlights = [
  {
    title: 'Viagens mais inclusivas',
    description:
      'Reunimos dados de acessibilidade, avaliações reais e experiências compartilhadas para que todos viajem com segurança e confiança.',
  },
  {
    title: 'Comunidade colaborativa',
    description:
      'Viajantes de todo o Brasil contribuem com feedbacks, fotos e dicas que tornam o planejamento mais humano e transparente.',
  },
  {
    title: 'Tecnologia a favor do turismo',
    description:
      'Integramos recursos modernos de busca, reservas e chat em tempo real para facilitar cada etapa da jornada.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-primary to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-white/80 mb-4">
            Sobre o TripTrack
          </p>
          <h1 className="text-4xl font-bold mb-6">A plataforma que coloca as pessoas no centro da viagem</h1>
          <p className="text-lg text-white/90">
            Nascemos com o propósito de tornar o turismo mais acessível e conectado. Acreditamos que compartilhar experiências é a melhor maneira de construir roteiros inesquecíveis para todos os perfis de viajantes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{highlight.title}</h2>
            <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
          </article>
        ))}
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">Como o TripTrack funciona</h2>
            <ul className="space-y-4 text-gray-600">
              <li>
                <span className="font-semibold text-primary">1. Explore destinos:</span> descubra lugares com base em acessibilidade, avaliações e interesses.
              </li>
              <li>
                <span className="font-semibold text-primary">2. Planeje reservas:</span> acesse opções de hotéis e restaurantes indicados pela comunidade.
              </li>
              <li>
                <span className="font-semibold text-primary">3. Converse em tempo real:</span> troque dúvidas e dicas com viajantes que já viveram a experiência.
              </li>
              <li>
                <span className="font-semibold text-primary">4. Compartilhe feedbacks:</span> contribua com relatos para ajudar novas pessoas a viajarem com tranquilidade.
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Pronto para explorar?</h3>
            <p className="text-gray-600">
              Cadastre-se gratuitamente e monte seu roteiro com curadoria coletiva.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cadastro"
                className="inline-flex items-center justify-center px-5 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Criar conta
              </Link>
              <Link
                href="/destinos"
                className="inline-flex items-center justify-center px-5 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                Explorar destinos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
