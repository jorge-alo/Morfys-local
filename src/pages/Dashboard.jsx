import { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../styles/Dashboard.css';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';

export const Dashboard = ({ restaurantId }) => {
    const { localId } = useContext(AuthContext);
    const { getDataChart } = useContext(DataContext);
    const [dataChart, setDataChart] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGetDataChart = async () => {
        // Si no hay localId, no hacemos la petición para evitar el "undefined"
        if (!localId) return;

        try {
            setLoading(true);
            const result = await getDataChart(localId);
            // Validamos que result y result.data existan
            if (result && result.data) {
                setDataChart(result.data);
            }
        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetDataChart();
    }, [localId]); // Se ejecuta cuando localId esté disponible

    if (loading) return <div className="loader">Cargando estadísticas...</div>;

    // SI NO HAY DATOS, MOSTRAR UN MENSAJE EN LUGAR DE ROMPERSE
    if (!dataChart || !dataChart.resumen) {
        return <div className="error-msg">No se pudieron cargar los datos del dashboard.</div>;
    }
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