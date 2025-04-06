import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        form
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.userId,
        username: data.username
      }));

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className='flex gap-2 '>
          <img className='cursor-pointer w-6 h-6 md:w-auto md:h-auto' onClick={() => navigate("/")} src="./assets/Seta pra Esquerda.png" alt="Botao voltar" />
          <p className='text-base md:text-1xl'>Voltar</p>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuário</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center">
          Não tem conta?{' '}
          <button
            onClick={() => navigate('/cadastrar')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}