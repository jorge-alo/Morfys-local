import { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../styles/Dashboard.css';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { useAuthStore } from '../store/useAuthStore';

export const Dashboard = ({ restaurantId }) => {

    const localId = useAuthStore((state) => state.localId);
    const { getDataChart } = useContext(DataContext);
    const [dataChart, setDataChart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [periodo, setPeriodo] = useState('7d');

    const handleGetDataChart = async () => {
        // Si no hay localId, no hacemos la petición para evitar el "undefined"
        if (!localId) return;

        try {
            setLoading(true);
            const result = await getDataChart(localId, periodo);
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
    }, [localId, periodo]); // Se ejecuta cuando localId esté disponible

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

            <div className="filter-container">
                <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="period-select">
                    <option value="today">Hoy</option>
                    <option value="7d">Últimos 7 días</option>
                    <option value="30d">Últimos 30 días</option>
                    <option value="month">Este Mes</option>
                    <option value="year">Este Año</option>
                </select>
            </div>

            {/* 1. CARDS DE MÉTRICAS */}
            <section className="metrics-grid">
                <div className="metric-card">
                    <span className="icon">💰</span>
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
                            ${(Number(dataChart.resumen.ingresos_netos) / (dataChart.resumen.total_pedidos || 1))
                                .toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </section>

            <div className="dashboard-main-content">
                {/* 2. GRÁFICO DE VENTAS POR PLATO */}
                <div className="chart-section chart-desktop-only">
                    <h3>Recaudación por Producto (Base + Opciones)</h3>
                    <div className="chart-container" style={{ width: '100%', height: '400px', minHeight: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%"> {/* aspect={2} significa que el ancho será el doble que el alto */}
                            <BarChart
                                data={dataChart.platos}
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }} // Aumentamos bottom para los nombres
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="nombre_item"
                                    interval={0}
                                    angle={-45}
                                    textAnchor="end"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f5f5f5' }}
                                    formatter={(value) => [`$${Number(value).toLocaleString('es-AR')}`, 'Total']}
                                />
                                <Bar dataKey="total" fill="#ff6347" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. TABLA DE DETALLES */}
                <div className='container__table-section'>
                    <h3>Ranking de Ventas</h3>
                    <div className="table-section">


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
                                        <td>{plato.nombre_item}</td>
                                        <td>${Number(plato.total).toLocaleString('es-AR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};