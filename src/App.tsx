import React, { useState, useEffect } from 'react';
import { Bus, BusPaginadoResponse, BusDetalleResponse, Tipo,Marca } from './types';
import './App.css';

function App() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagina, setPagina] = useState<number>(0);
  const [totalPaginas, setTotalPaginas] = useState<number>(0);
  

  const fetchBuses = async (pagina: number = 0) => {
    try {
      const response = await fetch(`/api/bus?pagina=${pagina}&tamano=10`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data: BusPaginadoResponse = await response.json();
      setBuses(data.buses);
      setTotalPaginas(data.totalPaginas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchBuses(pagina);
  }, [pagina]);

  if (loading) return <div className="loading">Cargando buses...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Lista de Buses</h1>

      <table className="bus-table table-stripped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Placa</th>
            <th>Caracteristicas</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.idBus} onClick={() => fetchBuses(bus.idBus)}>
              <td>{bus.idBus}</td>
              <td>{bus.numBus}</td>
              <td>{bus.placa}</td>
              <td>{bus.caracteristicas}</td>
              <td>{bus.marca?.nomMarca ?? 'Sin marca'}</td>
              <td>{bus.tipo}</td>
              <td>{bus.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        <button 
          onClick={() => setPagina(p => Math.max(p - 1, 0))} 
          disabled={pagina === 0}
        >
          Anterior
        </button>
        <span>Página {pagina + 1} de {totalPaginas}</span>
        <button 
          onClick={() => setPagina(p => p + 1)} 
          disabled={pagina >= totalPaginas - 1}
        >
          Siguiente
        </button>
      </div>

    </div>
  );
}

export default App;
