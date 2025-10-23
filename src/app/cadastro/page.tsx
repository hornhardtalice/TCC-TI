'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { validateEmail, validatePassword, validateName } from '@/lib/utils/validation';
import { useAuth } from '@/hooks/useAuth';

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // Validação em tempo real
  useEffect(() => {
    if (nome) {
      const validation = validateName(nome);
      setErrors(prev => ({ ...prev, nome: validation.isValid ? '' : validation.message }));
    }
  }, [nome]);

  useEffect(() => {
    if (email) {
      const validation = validateEmail(email);
      setErrors(prev => ({ ...prev, email: validation.isValid ? '' : validation.message }));
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      const validation = validatePassword(password);
      setErrors(prev => ({ ...prev, password: validation.isValid ? '' : validation.message }));
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não conferem' }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  }, [password, confirmPassword]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    const nameValidation = validateName(nome);
    if (!nameValidation.isValid) {
      newErrors.nome = nameValidation.message;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(nome, email, password);
      
      if (result.success) {
        // Após cadastro bem-sucedido, redireciona para a página principal
        router.push('/');
      } else {
        setErrors({ 
          submit: result.message || 'Erro ao realizar cadastro. Por favor, tente novamente.' 
        });
      }
    } catch (err) {
      setErrors({ 
        submit: 'Erro ao realizar cadastro. Por favor, tente novamente.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar nova conta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nome" className="sr-only">
                Nome
              </label>
              <Input
                id="nome"
                name="nome"
                type="text"
                required
                className="rounded-t-md"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                error={errors.nome}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Senha
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="rounded-b-md"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                disabled={isLoading}
              />
            </div>
          </div>

          {Object.values(errors).map((error, index) => (
            <div key={index} className="text-red-500 text-sm text-center">
              {error}
            </div>
          ))}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Cadastrando...
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
