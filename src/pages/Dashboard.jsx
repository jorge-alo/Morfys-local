import { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../styles/DashBoard.css';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';

export const DashBoard = ({ restaurantId }) => {
    const { localId } = useContext(AuthContext);
    const { getDataChart } = useContext(DataContext)
    const [dataChart, setDataChart] = useState(null);
    const [loading, setLoading] = useState(true);

    /* useEffect(() => {
         // Aquí llamarías a tu función de API
         fetch(`http://localhost:5175/api/dashboard/${localId}`)
             .then(res => res.json())
             .then(data => {
                 setStats(data);
                 setLoading(false);
             })
             .catch(err => console.error("Error:", err));
     }, [restaurantId]);*/



    const handleGetDataChart = () => {
        try {
            const result = getDataChart(localId);
            setDataChart(result);
            setLoading(false);

        } catch (error) {
            console.log("Error:", error);
        }

    }

    useEffect(() => {
      handleGetDataChart();
    }, [])
    

    if (loading) return <div className="loader">Cargando estadísticas...</div>;
    return (

        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1>Panel de Control del Local</h1>
                <p>Resumen general de actividad</p>
            </header>

            {/* 1. CARDS DE MÉTRICAS */}
            <section className="metrics-grid">
                <div className="metric-card">
                    span<span className="icon">💰</span>
                    <div>
                        <p className="label">Ingresos Totales</p>
                        <p className="value">${Number(dataChart.resumen.ingresos_netos).toLocaleString('es-AR')}</p>
                    </div>
                </div>
                <div className="metric-card">
                    <span className="icon">📋</span>
                    <div>
                        <p className="label">Pedidos Totales</p>
                        <p className="value">{dataChart.resumen.total_pedidos}</p>
                    </div>
                </div>
                <div className="metric-card">
                    <span className="icon">📈</span>
                    <div>
                        <p className="label">Ticket Promedio</p>
                        <p className="value">
                            ${(Number(dataChart.resumen.ingresos_netos) / dataChart.resumen.total_pedidos || 0).toFixed(2)}
                        </p>
                    </div>
                </div>
            </section>

            <div className="dashboard-main-content">
                {/* 2. GRÁFICO DE VENTAS POR PLATO */}
                <div className="chart-section">
                    <h3>Recaudación por Producto (Base + Opciones)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={dataChart.platos}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="comida_name" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [`$${value}`, 'Total Recaudado']}
                                />
                                <Bar dataKey="total" fill="#ff6347" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. TABLA DE DETALLES */}
                <div className="table-section">
                    <h3>Ranking de Ventas</h3>
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Total Generado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataChart.platos.map((plato, idx) => (
                                <tr key={idx}>
                                    <td>{plato.comida_name}</td>
                                    <td>${Number(plato.total).toLocaleString('es-AR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};