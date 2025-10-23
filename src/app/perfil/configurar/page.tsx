'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ConfigurarPerfil() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao configurar perfil');
      }

      router.push('/perfil');
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Configure seu Perfil
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Biografia
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Conte um pouco sobre você..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Localização
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Cidade, País"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://seu-site.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/perfil')}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
              >
                Pular
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Perfil'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
