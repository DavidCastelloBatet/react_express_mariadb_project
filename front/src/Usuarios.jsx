import React, { useState, useEffect } from 'react';


function App() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await fetch('http://localhost:3001/usuarios');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <h1>Llista de persones</h1>
            {results.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Cognom</th>
                            <th>Acció</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, i) => (
                            <tr key={i}>
                                <td>{result.nombre}</td>
                                <td>{result.apellido}</td>
                                <td><button>Apreta</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </div>
    );
}

export default App;
