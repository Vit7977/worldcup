import { useState, useEffect } from "react";
import axios from "axios";
import groupBy from "lodash/groupBy";

function CardsPaises() {
    const [paises, setPaises] = useState([]);

    const getPaises = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/pais');
            const data = response.data;
            setPaises(data);
        } catch (error) {
            console.error('Erro ao buscar países:', error);
        }
    };

    useEffect(() => {
        getPaises();
    }, []);

    // --- Agrupando os países por grupo_nome --- \\
    const grupos = groupBy(paises, (pais) => pais.grupo_nome || "Sem Grupo");

    return (
        <div style={{ padding: "2rem" }}>
            {/* Object.entries => para transformar o objeto em um array e fazer o map */}
            {Object.entries(grupos).map(([grupoNome, paisesDoGrupo]) => (
                <div key={grupoNome} style={{ marginBottom: "2rem" }}>
                    <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "0.5rem" }}>
                        Grupo {grupoNome}
                    </h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                        {paisesDoGrupo.map((pais) => (
                            <div
                                key={pais.id}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "1rem",
                                    width: "200px",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <img
                                    src={pais.bandeira_url}
                                    alt={pais.nome}
                                    style={{
                                        width: "100%",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "4px"
                                    }}
                                />
                                <h3 style={{ margin: "0.5rem 0" }}>{pais.nome}</h3>
                                <p style={{ color: "#666" }}>Grupo {pais.grupo_nome}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardsPaises;
