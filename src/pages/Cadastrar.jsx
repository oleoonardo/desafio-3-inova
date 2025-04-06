import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cadastrar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    username: '', 
    password: '',
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    
    if (form.username.length < 3) {
      newErrors.username = 'Mínimo 3 caracteres';
    }
    
    if (form.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = 'Requer 1 letra maiúscula';
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = 'Requer 1 número';
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validate()) return;
    
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: form.username,
        password: form.password
      });
      
      alert('Cadastro realizado! Faça login.');
      navigate('/login');
    } catch (err) {
      setApiError(err.response?.data?.error || 'Erro no cadastro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className='flex gap-2 '>
          <img className='cursor-pointer w-6 h-6 md:w-auto md:h-auto' onClick={() => navigate("/")} src="./assets/Seta pra Esquerda.png" alt="Botao voltar" />
          <p className='text-base md:text-1xl'>Voltar</p>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>
        
        {apiError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuário</label>
            <input
              type="text"
              className={`w-full p-2 border rounded ${errors.username ? 'border-red-500' : ''}`}
              value={form.username}
              onChange={(e) => setForm({...form, username: e.target.value})}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''}`}
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirmar Senha</label>
            <input
              type="password"
              className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-4 text-center">
          Já tem conta?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}