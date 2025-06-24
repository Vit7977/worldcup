import axios from 'axios';
import { useRef, useState, useEffect } from 'react';

function FormPais() {

    // --- Buscando os grupos para o select --- \\

    const [grupo, setGrupo] = useState([]);

    const getGrupos = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/grupos');
            const data = response.data;
            setGrupo(data);
        } catch (error) {
            console.error('Erro ao buscar grupos:', error);
        }
    }

    useEffect(() => {
        getGrupos();
    }, []);

    // --- Form de cadastro --- \\

    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = [{
            nome: form.current.nome.value,
            bandeira_url: form.current.bandeira_url.value,
            grupo_id: form.current.grupo_id.value
        }];

        try {
            const response = await axios.post('http://localhost:9090/api/pais', data[0]);
            if (response.status === 201) {
                alert('País cadastrado com sucesso!');
                form.current.reset();
            } else {
                alert('Erro ao cadastrar país.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }


    return (
        <form onSubmit={handleSubmit} ref={form}>
            <input name="nome" type="text" placeholder="Nome do país..." required />
            <input name="bandeira_url" type="text" placeholder="URL da bandeira..." required />
            <select name="grupo_id" required>
                <option value="">Selecione um grupo</option>
                {grupo.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                        {grupo.nome}
                    </option>
                ))}
            </select>
            <button type='submit'>Cadastrar</button>
        </form>

    );
}

export default FormPais;