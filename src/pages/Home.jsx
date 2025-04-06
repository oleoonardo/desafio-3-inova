import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {

  const [filesIdentidade, setFilesIdentidade] = useState([]);
  const [filesResidencia, setFilesResidencia] = useState([]);
  const [form, setForm] = useState({});
  const [formErros, setFormErros] = useState({});
  const navigate = useNavigate();

  // Carregar dados salvos ao montar o componente
  useEffect(() => {
    const dadosSalvos = carregarDadosTemporarios();
    if (dadosSalvos && Object.keys(dadosSalvos).length > 0) {
      setForm(dadosSalvos);
      // Atualizar os campos do formulário com os valores salvos
      Object.keys(dadosSalvos).forEach(campo => {
        const elemento = document.querySelector(`[name="${campo}"]`);
        if (elemento) {
          if (elemento.type === 'checkbox') {
            elemento.checked = dadosSalvos[campo];
          } else if (elemento.type === 'radio') {
            // Encontrar todos os radio buttons com o mesmo name
            const radioButtons = document.querySelectorAll(`[name="${campo}"]`);
            radioButtons.forEach(radio => {
              if (radio.value === dadosSalvos[campo]) {
                radio.checked = true;
              } else {
                radio.checked = false;
              }
            });
          } else if (elemento.type === 'file') {
            elemento.value = "";
            dadosSalvos[campo] = "";
          } else {
            elemento.value = dadosSalvos[campo];
          }
        }
      });
    }
  }, []);

  // Função para salvar dados no localStorage
  const salvarDadosTemporarios = (dados) => {
    localStorage.setItem('dadosFormulario', JSON.stringify(dados));
  };

  // Função para carregar dados do localStorage
  const carregarDadosTemporarios = () => {
    const dadosSalvos = localStorage.getItem('dadosFormulario');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return {};
  }

  const mudancaFilesIdentidade = (event) => {
    if(event){
      const selectedFiles = Array.from(event.target.files);
      setFilesIdentidade(selectedFiles);

      setForm(prev => ({...prev, rg: 'arquivo-adicionado'}));
      setFormErros(prev => ({...prev, rg: ""}));

    }
  }

  const mudancaFilesReseidencia = (event) => {
    if(event){
      const selectedFiles = Array.from(event.target.files);
      setFilesResidencia(selectedFiles);

      setFormErros(prev => ({...prev, residencia: ""}));
      setForm(prev => ({...prev, residencia: 'arquivo-adicionado'}));
    }
    
  }

  const removeFile = (index, tipoArquivo) => {
    if (tipoArquivo === 'identidade') {
      const updatedFiles = filesIdentidade.filter((_, i) => i !== index);
      setFilesIdentidade(updatedFiles);
      if (updatedFiles.length === 0) {
        setFormErros(prev => ({...prev, rg: "Documento de identidade é obrigatório."}));
        setForm(prev => ({...prev, rg: ''}));
      }
    } else {
      const updatedFiles = filesResidencia.filter((_, i) => i !== index);
      setFilesResidencia(updatedFiles);
      if (updatedFiles.length === 0) {
        setFormErros(prev => ({...prev, residencia: "Comprovante de residência é obrigatório."}));
        setForm(prev => ({...prev, residencia: ''}));
      }
    }
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let formValido = true;
    
    const camposObrigatorios = [
      'nome', 'user', 'password', 'data', 'cpf', 'sexo', 'email', 'tel', 'rg', 'residencia',
      'cep', 'rua', 'numero', 'cidade', 'uf', 'trilha', 'termos'
    ];
    
    camposObrigatorios.forEach(campo => {
      if (!form[campo] || (formErros[campo] && formErros[campo].trim().length > 0)) {
        formValido = false;
        validarCampo(campo, form[campo] || '');
      }
    });
  
    if (formValido) {
      alert("Formulário enviado com sucesso!");
      navigate("/final");
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const novoForm = {
      ...form,
      [name]: fieldValue
    };

    setForm(novoForm);
    salvarDadosTemporarios(novoForm);
    validarCampo(name, fieldValue);
  }

  const validarCampo = (name, value) => {
    let mensagemErro = "";
  
    switch(name) {
      case "nome":
        if(value.trim().length < 3) {
          mensagemErro = "Nome deve ter no mínimo 3 caracteres.";
        }
        break;
      case "user":
        if(value.trim().length < 3) {
          mensagemErro = "Nome de usuário deve ter no mínimo 3 caracteres.";
        }
        break;
      case "password":
        if(value.trim().length < 6) {
          mensagemErro = "A senha deve ter no mínimo 6 caracteres.";
        } else if(!/[A-Z]/.test(value)) {
          mensagemErro = "A senha deve conter pelo menos uma letra maiúscula.";
        } else if(!/[a-z]/.test(value)) {
          mensagemErro = "A senha deve conter pelo menos uma letra minúscula.";
        } else if(!/[0-9]/.test(value)) {
          mensagemErro = "A senha deve conter pelo menos um número.";
        } else if(!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          mensagemErro = "A senha deve conter pelo menos um caractere especial.";
        }
        break;
      case "data":
        // eslint-disable-next-line no-case-declarations
        const hoje = new Date();
        // eslint-disable-next-line no-case-declarations
        const dataNascimento = new Date(value);
        if(!value) {
          mensagemErro = "Data de nascimento é obrigatória.";
        } else if(dataNascimento > hoje) {
          mensagemErro = "Data de nascimento não pode ser no futuro.";
        } else if(hoje.getFullYear() - dataNascimento.getFullYear() < 15) {
          mensagemErro = "É necessário ser maior de 15 anos.";
        }
        break;
      case "sexo":
        if(!value){
          mensagemErro = "Sexo é obrigatório."
        }
        break;
      case "cpf":
        if(!value.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
          mensagemErro = "CPF deve estar no formato 000.000.000-00.";
        }
        break;
      case "email":
        if(!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          mensagemErro = "Email deve estar no formato: email@email.com";
        }
        break;
      case "tel":
        if(!value.match(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/)) {
          mensagemErro = "Telefone deve estar no formato (00) 00000-0000.";
        }
        break;
      case "cep":
        if(!value.match(/^\d{5}-\d{3}$/)) {
          mensagemErro = "CEP deve estar no formato 00000-000.";
        }
        break;
      case "rua":
        if(value.trim().length < 3) {
          mensagemErro = "Nome da rua é obrigatório.";
        }
        break;
      case "numero":
        if(!value.trim()) {
          mensagemErro = "Número é obrigatório.";
        }
        break;
      case "cidade":
        if(value.trim().length < 2) {
          mensagemErro = "Nome da cidade é obrigatório.";
        }
        break;
      case "uf":
        if(!value.trim() || value.length !== 2) {
          mensagemErro = "UF deve conter 2 caracteres.";
        }
        break;
      case "trilha":
        if(!value.trim()) {
          mensagemErro = "Selecione uma trilha.";
        }
        break;
      case "termos":
        if(!value) {
          mensagemErro = "Você precisa aceitar os termos e condições para continuar.";
        }
        break;
      case "rg":
        if(!value.trim()){
          mensagemErro = "Documento de identidade é obrigatório.";
        }
        break;
      case "residencia":
        if(!value.trim()){
          mensagemErro = "Comprovante de residência é obrigatório.";
        }
        break;
    }
  
    setFormErros((erros) => ({
      ...erros,
      [name]: mensagemErro,
    }));
  }


  return (

    <div className='bg-white mt-4 md:mt-15 mx-auto flex flex-col w-full md:w-150 rounded-lg p-4 md:p-6'>
      <header className='mb-5'>
        <div className='flex gap-2 mb-5'>
          <img className='cursor-pointer w-6 h-6 md:w-auto md:h-auto' onClick={() => navigate("/")} src="./assets/Seta pra Esquerda.png" alt="Botao voltar" />
          <p className='text-base md:text-1xl'>Voltar</p>
        </div>

        <div>
          <h1 className='text-[20px] md:text-[24px] mb-2'>Formulário de Inscrição</h1>
          <p className='text-[14px] md:text-[16px]'>Preencha os dados abaixo para fazer sua inscrição no Programa Trilhas</p>
        </div>
      </header>

      <form className='w-full max-w-[600px]' onSubmit={ handleSubmit }>
        <div class="formulario-dados">
          <h2 className='text-[14px] md:text-[16px] mb-4'>Informações do Participante</h2>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>Nome Completo</label>
            <input type='text' name="nome" className="campo" placeholder='Ex: João da Silva Pereira' onChange={handleChange} />
            {formErros.nome && <p className="campo__erro">{formErros.nome}</p>}
          </div>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>Nome de Usuário</label>
            <input type='text' name="user" className="campo" placeholder='Ex: joaosinho123' onChange={handleChange} />
            {formErros.user && <p className="campo__erro">{formErros.user}</p>}
          </div>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>Senha</label>
            <input type='password' name="password" className="campo" placeholder='Defina sua senha' onChange={handleChange} />
            {formErros.password && <p className="campo__erro">{formErros.password}</p>}
          </div>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>Data de Nascimento</label>
            <input type='date' name='data' className="campo" onChange={handleChange} />
            {formErros.data && <p className="campo__erro">{formErros.data}</p>}
          </div>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>CPF</label>
            <input className="campo" type="text" name="cpf" placeholder="000.000.000-00" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" onChange={handleChange}  />
            {formErros.cpf && <p className="campo__erro">{formErros.cpf}</p>}
          </div>
          <div>
            <label className='text-[12px] md:text-[14px] block mb-1'>Sexo</label>
            <select name="sexo" id="sexo" className="campo" defaultValue="" onChange={handleChange} >
              <option value="" disabled>Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
            {formErros.sexo && <p className="campo__erro">{formErros.sexo}</p>}
          </div>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>Email</label>
            <input type='email' name='email' className="campo" placeholder="Seu@email.com" onChange={handleChange}  />
            {formErros.email && <p className="campo__erro">{formErros.email}</p>}
          </div>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>Telefone</label>
            <input type='tel' name='tel' className="campo" placeholder="(00) 00000-0000" pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}" onChange={handleChange}  />
            {formErros.tel && <p className="campo__erro">{formErros.tel}</p>}
          </div>
          <div className='mb-4'>
            <p className='mb-1 text-[12px] md:text-[14px]'>Documento de Identidade (PDF)</p>
            <input type="file" name='rg' id='arquivo-identidade' className='hidden' onChange={mudancaFilesIdentidade}  />
            {filesIdentidade.length > 0 ? (
              <div className="border border-gray-300 p-2 rounded w-full">
                {filesIdentidade.map((file, index) => (
                  <div key={index} className="flex justify-between items-center p-1 border-b">
                    <span className="text-[12px] md:text-[14px]">{file.name}</span>
                    <button onClick={() => removeFile(index, 'identidade')}>
                      <img className='w-[20px] cursor-pointer' src="./src/assets/trash.png" alt="Remover arquivo-" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <label htmlFor="arquivo-identidade" className="cursor-pointer">
                <img className='w-full' src="./assets/FileUploadField.png" alt="Ícone de upload" />
              </label>
            )}
            {formErros.rg && <p className="campo__erro">{formErros.rg}</p>}
          </div>
        </div>
        <div className="Formulario-endereco mt-10">
          <h2 className='text-[14px] md:text-[16px] mb-4'>Endereço Residencial</h2>
          <div className='mb-4'>
            <label className='text-[12px] md:text-[14px] block mb-1'>CEP</label>
            <input type='text' name='cep' className="campo" placeholder="00000-000" pattern="\d{5}-\d{3}" onChange={handleChange}  />
            {formErros.cep && <p className="campo__erro">{formErros.cep}</p>}
          </div>
          <div className='mt-5 mb-5 flex gap-4'>
            <div className='w-[100%]'>
              <label className='text-[12px] md:text-[14px] block mb-1'>Rua</label>
              <input type='text' name='rua' placeholder='Rua 1' className='campo bg-[var(--color-campoCinza)]' onChange={handleChange}  />
              {formErros.rua && <p className="campo__erro">{formErros.rua}</p>}
            </div>
            <div>
              <label className='text-[12px] md:text-[14px] block mb-1'>Número</label>
              <input type='text' name='numero' className="campo" onChange={handleChange}  />
              {formErros.numero && <p className="campo__erro">{formErros.numero}</p>}
            </div>

          </div>
          <div className='mt-5 mb-5 flex gap-4'>
            <div className='w-[100%]'>
              <label className='text-[12px] md:text-[14px] block mb-1'>Cidade</label>
              <input type='text' name='cidade' placeholder='São Luís' className='campo bg-[var(--color-campoCinza)]' onChange={handleChange}  />
              {formErros.cidade && <p className="campo__erro">{formErros.cidade}</p>}
            </div>
            <div>
              <label className='text-[12px] md:text-[14px] block mb-1'>Estado</label>
              <input type='text' name='uf' placeholder='MA' className='campo bg-[var(--color-campoCinza)]' onChange={handleChange}  />
              {formErros.uf && <p className="campo__erro">{formErros.uf}</p>}
            </div>
          </div>
          <div className='mb-4'>
            <p className='mb-1 text-[12px] md:text-[14px]'>Comprovante de Residência (PDF)</p>
            <input type="file" name='residencia' id='arquivo-residencia' className='hidden' onChange={mudancaFilesReseidencia}   />
            {filesResidencia.length > 0 ? (
              <div className="border border-gray-300 p-2 rounded w-full">
                {filesResidencia.map((file, index) => (
                  <div key={index} className="flex justify-between items-center p-1 border-b">
                    <span className="text-[12px] md:text-[14px]">{file.name}</span>
                    <button onClick={() => removeFile(index, 'residencia')}>
                      <img className='w-[20px] cursor-pointer' src="./src/assets/trash.png" alt="Remover arquivo-" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <label htmlFor="arquivo-residencia" className="cursor-pointer ">
                <img className='w-full' src="./assets/FileUploadField.png" alt="Ícone de upload" />
              </label>
            )}
            {formErros.residencia && <p className="campo__erro">{formErros.residencia}</p>}
          </div>
        </div>
        <div className="Formulario-trilhas mt-10">
          <h2 className="mb-4 text-[14px] md:text-[16px]">Trilhas de Aprendizagem</h2>
          <p className="text-[12px] md:text-[14px] mb-4">Selecione apenas uma trilha</p>
          {formErros.trilha && <p className="campo__erro">{formErros.trilha}</p>}
          <div className="grid grid-cols-2 gap-4">

            {/* Card - Front-end */}
            <label className="relative flex flex-col items-center border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[var(--border-bordaTrilha)]">
              <input 
                type="radio" 
                name="trilha" 
                value="frontend"
                className="hidden peer" 
                onChange={handleChange}
              />
              <div className="checkmark"></div>
              <img src="./assets/Logo Front-end.png" alt="Front-end" className="w-12 h-12 mb-2" />
              <p className="font-medium text-[12px] md:text-[14px]">Programação Front-end</p>
            </label>

            {/* Card - Back-end */}
            <label className="relative flex flex-col items-center border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[var(--border-bordaTrilha)]">
              <input 
                type="radio" 
                name="trilha" 
                value="backend"
                className="hidden peer" 
                onChange={handleChange}
              />
              <div className="checkmark"></div>
              <img src="./assets/Logo Back-end.png" alt="Back-end" className="w-12 h-12 mb-2" />
              <p className="font-medium text-[12px] md:text-[14px]">Programação Back-end</p>
            </label>

            {/* Card - Jogos */}
            <label className="relative flex flex-col items-center border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[var(--border-bordaTrilha)]">
              <input 
                type="radio" 
                name="trilha" 
                value="jogos"
                className="hidden peer" 
                onChange={handleChange}
              />
              <div className="checkmark"></div>
              <img src="./assets/Logo Jogos.png" alt="Jogos" className="w-12 h-12 mb-2" />
              <p className="font-medium text-[12px] md:text-[14px]">Programação de Jogos</p>
            </label>

            {/* Card - UX */}
            <label className="relative flex flex-col items-center border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[var(--border-bordaTrilha)]">
              <input 
                type="radio" 
                name="trilha" 
                value="ux"
                className="hidden peer" 
                onChange={handleChange}
              />
              <div className="checkmark"></div>
              <img src="./assets/Logo UX.png" alt="UX" className="w-12 h-12 mb-2" />
              <p className="font-medium text-[12px] md:text-[14px]">Design e Experiência</p>
            </label>

            {/* Card - Ciência de Dados */}
            <label className="relative flex flex-col items-center border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[var(--border-bordaTrilha)]">
              <input 
                type="radio" 
                name="trilha" 
                value="dados"
                className="hidden peer" 
                onChange={handleChange}
              />
              <div className="checkmark"></div>
              <img src="./assets/Logo Dados.png" alt="Ciência de Dados" className="w-12 h-12 mb-2" />
              <p className="font-medium text-[12px] md:text-[14px]">Ciência de Dados</p>
            </label>
          </div>
        </div>


        <div className=' confirmacao mt-10'>
          {formErros.termos && <p className="campo__erro">{formErros.termos}</p>}
          <div className='flex gap-2 mb-10'>
            <input className='mt-1 w-4 h-4 bg-[var(--color-campoCinza)] ' type="checkbox" name="termos" onChange={handleChange}/>
            <p>Declaro que li e concordo com o
              <a className='text-[var(--border-bordaTrilha)] hover:opacity-60' href=""> Termos e Condições </a>
              e com a
              <a className='text-[var(--border-bordaTrilha)] hover:opacity-60' href=""> Politica de Privacidade</a></p>
          </div>

          <div className='flex justify-end gap-4 mb-10 '>

           <button onClick={() => navigate("/")} className='border border-[var(--border-bordaTrilha)] text-[var(--border-bordaTrilha)] p-2 rounded-lg cursor-pointer hover:opacity-50' >Cancelar</button>

            <button type='submit' className='bg-[var(--border-bordaTrilha)] text-white p-2 w-40 rounded-lg hover:bg-[#F3541C] cursor-pointer hover:opacity-80'>Fazer Inscrição</button>
          </div>

        </div>

      </form>
    </div>


  )
}

export default Home
