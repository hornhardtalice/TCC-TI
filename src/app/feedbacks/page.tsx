'use client';

import { FormEvent, useMemo, useState } from 'react';
import { mockDestinations } from '@/data/mockDestinations';

interface FeedbackCard {
  id: string;
  destinationId: string;
  destinationName: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

export default function FeedbackPage() {
  const destinationOptions = mockDestinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
  }));

  const [feedbacks, setFeedbacks] = useState<FeedbackCard[]>(() =>
    mockDestinations.map((destination) => ({
      id: `summary-${destination.id}`,
      destinationId: destination.id,
      destinationName: destination.name,
      rating: destination.rating.score,
      comment: `Média ${destination.rating.score.toFixed(1)} baseada em ${destination.rating.count} avaliações da comunidade.`,
      userName: 'Comunidade TripTrack',
      createdAt: new Date().toISOString(),
    }))
  );

  const [formData, setFormData] = useState({
    destinationId: destinationOptions[0]?.id ?? '',
    rating: 5,
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(
    () => formData.destinationId !== '' && formData.comment.trim().length >= 10,
    [formData.destinationId, formData.comment]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setFeedbacks((previous) => [
        {
          id: `local-${Date.now()}`,
          destinationId: formData.destinationId,
          destinationName: destinationOptions.find((option) => option.id === formData.destinationId)?.name ?? 'Destino desconhecido',
          rating: formData.rating,
          comment: formData.comment.trim(),
          userName: 'Você',
          createdAt: new Date().toISOString(),
        },
        ...previous,
      ]);
      setFormData((current) => ({ ...current, comment: '', rating: 5 }));
      setIsSubmitting(false);
    }, 350);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Feedbacks e avaliações</h1>
          <p className="text-lg text-white/80">
            Veja relatos de outros viajantes e compartilhe suas experiências para ajudar a comunidade TripTrack.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Últimas avaliações</h2>
          <ul className="space-y-6">
            {feedbacks.map((feedback) => (
              <li key={feedback.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Destino</p>
                    <p className="text-lg font-semibold text-gray-900">{feedback.destinationName}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <span aria-label={`Nota ${feedback.rating}`}>⭐ {feedback.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {feedback.comment}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{feedback.userName}</span>
                  <time dateTime={feedback.createdAt}>
                    {new Date(feedback.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </li>
            ))}
            {feedbacks.length === 0 && (
              <li className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-600">
                Nenhum feedback por aqui ainda. Seja o primeiro a compartilhar sua experiência!
              </li>
            )}
          </ul>
        </div>

        <aside className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Enviar feedback</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destino visitado
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destinationId}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, destinationId: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
              >
                {destinationOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Nota (1 a 5)
              </label>
              <input
                id="rating"
                type="range"
                min={1}
                max={5}
                step={0.5}
                value={formData.rating}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, rating: Number(event.target.value) }))
                }
                className="w-full"
              />
              <p className="mt-1 text-sm text-gray-500">Nota selecionada: {formData.rating.toFixed(1)}</p>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Como foi a sua experiência?
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, comment: event.target.value }))
                }
                rows={4}
                placeholder="Conte detalhes que possam ajudar outros viajantes, como acessibilidade, atendimento e sugestões."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-primary"
                required
              />
              <p className="mt-1 text-xs text-gray-400">Escreva pelo menos 10 caracteres.</p>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full inline-flex justify-center items-center px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isSubmitting ? 'Enviando...' : 'Compartilhar feedback'}
            </button>
          </form>
        </aside>
      </section>
    </div>
  );
}
