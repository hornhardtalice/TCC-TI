import bcrypt from 'bcrypt';

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' };
  }
  // Remove espaços em branco extras
  email = email.trim();
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Email inválido. Use um formato válido como exemplo@dominio.com' };
  }
  return { isValid: true, message: '' };
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password) {
    return { isValid: false, message: 'Senha é obrigatória' };
  }

  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('mínimo 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('uma letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('uma letra minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('um número');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]/.test(password)) {
    errors.push('um caractere especial');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      message: `A senha deve conter: ${errors.join(', ')}`
    };
  }

  return { isValid: true, message: '' };
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const validateName = (name: string): { isValid: boolean; message: string } => {
  if (!name) {
    return { isValid: false, message: 'Nome é obrigatório' };
  }

  // Remove espaços em branco extras no início e fim
  name = name.trim();

  if (name.length < 3) {
    return { isValid: false, message: 'O nome deve ter no mínimo 3 caracteres' };
  }

  // Regex melhorada para nomes com acentos, hífens e espaços
  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[-\s][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;
  
  if (!nameRegex.test(name)) {
    return { 
      isValid: false, 
      message: 'O nome deve conter apenas letras, espaços e hífens entre nomes' 
    };
  }

  // Verifica se não há espaços ou hífens duplicados
  if (/\s{2,}|--+/.test(name)) {
    return { 
      isValid: false, 
      message: 'O nome não pode conter espaços ou hífens duplicados' 
    };
  }

  return { isValid: true, message: '' };
};
