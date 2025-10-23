'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Profile {
  bio: string | null;
  location: string | null;
  website: string | null;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();

        if (data.success) {
          setProfile(data.profile);
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <img
                src={session.user.image || '/default-avatar.png'}
                alt="Foto de perfil"
                className="h-16 w-16 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {session.user.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {session.user.email}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => router.push('/perfil/setup')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Editar perfil
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Biografia</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profile?.bio || 'Nenhuma biografia definida'}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Localização</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profile?.location || 'Nenhuma localização definida'}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profile?.website ? (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      {profile.website}
                    </a>
                  ) : (
                    'Nenhum website definido'
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
