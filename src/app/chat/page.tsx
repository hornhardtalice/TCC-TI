'use client';

import { FormEvent, useMemo, useState } from 'react';
import Image from 'next/image';
import { mockDestinations } from '@/data/mockDestinations';

interface ChatMessage {
  id: string;
  destinationId: string;
  destinationName: string;
  userName: string;
  message: string;
  timestamp: string;
  isAuthor?: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: 'ex-1',
    destinationId: mockDestinations[0]?.id ?? '1',
    destinationName: mockDestinations[0]?.name ?? 'Destino',
    userName: 'Mariana',
    message: 'Recomendo muito visitar o Cristo ao amanhecer! Menos filas e acessibilidade tranquila.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'ex-2',
    destinationId: mockDestinations[0]?.id ?? '1',
    destinationName: mockDestinations[0]?.name ?? 'Destino',
    userName: 'Carlos',
    message: 'Alguém sabe se há restaurantes com cardápio em braile próximos à praia de Copacabana?',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
];

export default function ChatPage() {
  const destinations = mockDestinations.map((destination) => ({
    id: destination.id,
    name: destination.name,
    cover: destination.photos?.[0] ?? '/images/placeholder.jpg',
  }));

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [formData, setFormData] = useState({
    destinationId: destinations[0]?.id ?? '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const conversation = useMemo(
    () =>
      messages.filter((message) =>
        formData.destinationId ? message.destinationId === formData.destinationId : true
      ),
    [messages, formData.destinationId]
  );

  const selectedDestination = destinations.find((destination) => destination.id === formData.destinationId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = formData.message.trim();

    if (!trimmedMessage) {
      return;
    }

    setIsSending(true);

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      destinationId: formData.destinationId,
      destinationName: selectedDestination?.name ?? 'Destino',
      userName: 'Você',
      message: trimmedMessage,
      timestamp: new Date().toISOString(),
      isAuthor: true,
    };

    setMessages((previous) => [...previous, newMessage]);
    setFormData((current) => ({ ...current, message: '' }));

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          id: `auto-${Date.now()}`,
          destinationId: newMessage.destinationId,
          destinationName: newMessage.destinationName,
          userName: 'Comunidade TripTrack',
          message: 'Obrigado por compartilhar! Outros viajantes responderão em breve. 👋',
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsSending(false);
    }, 900);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <section className="bg-gradient-to-r from-blue-900 to-primary text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-3">Chat interativo para viajantes</h1>
          <p className="text-lg text-white/85">
            Troque dicas em tempo real com pessoas que já visitaram o destino dos seus sonhos.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
        <aside className="bg-white rounded-xl shadow-lg border border-gray-100 h-fit">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Destinos com chat ativo</h2>
            <p className="text-sm text-gray-500 mt-2">Selecione um destino para acompanhar a conversa.</p>
          </div>
          <ul className="divide-y divide-gray-100">
            {destinations.map((destination) => (
              <li key={destination.id}>
                <button
                  onClick={() => setFormData((current) => ({ ...current, destinationId: destination.id }))}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                    destination.id === formData.destinationId
                      ? 'bg-blue-50 text-primary'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src={destination.cover}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{destination.name}</p>
                    <p className="text-xs text-gray-500">Converse com viajantes agora mesmo</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
          <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedDestination?.name ?? 'Selecione um destino'}
              </h2>
              <p className="text-sm text-gray-500">Compartilhe dicas sobre acessibilidade, atrações e reservas.</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {conversation.map((message) => (
              <div
                key={message.id}
                className={`max-w-xl rounded-2xl px-4 py-3 shadow-sm ${
                  message.isAuthor ? 'ml-auto bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2 text-xs uppercase tracking-wide">
                  <span className="font-semibold">{message.userName}</span>
                  <time dateTime={message.timestamp} className="text-[11px] text-white/70 lg:text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>
                <p className="text-sm leading-relaxed">{message.message}</p>
              </div>
            ))}
            {conversation.length === 0 && (
              <p className="text-sm text-gray-500">
                Ainda não há mensagens para este destino. Envie a primeira pergunta e ajude outros viajantes!
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
            <label htmlFor="chat-message" className="sr-only">
              Digite sua mensagem
            </label>
            <textarea
              id="chat-message"
              value={formData.message}
              onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
              placeholder="Compartilhe uma dica ou faça uma pergunta..."
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-primary"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSending || !formData.message.trim()}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSending ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
