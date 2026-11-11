
import { useEffect, useState, useCallback } from 'react';

function RatingStatistics({refreshKey }) {

    // Estados del componente
    const [ratings, setRatings] = useState([]);
    const [totalRatings, setTotalRatings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Consultar estadísticas al servidor
    const getRatings =  useCallback(async () => {

        try {

            setLoading(true);
            setError('');

            const response = await fetch(
                'http://localhost:3000/api/ratings/summary'
            );

            if (!response.ok) {
                throw new Error('Error al consultar las estadísticas');
            }

            const data = await response.json();

            setRatings(data.ratings);
            setTotalRatings(data.totalRatings);

        } catch (error) {

            console.error(error);
            setError('No se pudieron cargar las estadísticas');

        } finally {

            setLoading(false);

        }

    }, []);

    // Ejecutar la consulta cuando se monta el componente
    useEffect(() => {
    getRatings();
}, [getRatings, refreshKey]);

    // Calcular el promedio general
    const averageRating = totalRatings > 0
        ? ratings.reduce(
            (sum, rating) => sum + rating.score * rating.total,
            0
        ) / totalRatings
        : 0;

    // Calcular el porcentaje de cada calificación
    const getPercentage = (total) => {

        if (totalRatings === 0) return 0;

        return (total / totalRatings) * 100;

    };

    // Mostrar mensaje de carga
    if (loading) {
        return (
            <p className="text-center text-gray-500">
                Cargando estadísticas...
            </p>
        );
    }

    // Mostrar mensaje de error
    if (error) {
        return (
            <div className="text-center">
                <p className="text-red-500 mb-3">{error}</p>

                <button
                    onClick={getRatings}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Intentar nuevamente
                </button>
            </div>
        );
    }

    return (
        <section className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">

            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-bold text-gray-800">
                    Estadísticas de reseñas
                </h2>

                <button
                    onClick={getRatings}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Actualizar
                </button>

            </div>

            {/* Resumen general */}
            <div className="grid grid-cols-2 gap-4 mb-8">

                <div className="bg-gray-50 p-4 rounded-xl text-center">

                    <p className="text-sm text-gray-500">
                        Total de reseñas
                    </p>

                    <p className="text-3xl font-bold text-gray-800">
                        {totalRatings}
                    </p>

                </div>

                <div className="bg-gray-50 p-4 rounded-xl text-center">

                    <p className="text-sm text-gray-500">
                        Promedio general
                    </p>

                    <p className="text-3xl font-bold text-gray-800">
                        {averageRating.toFixed(1)}
                        <span className="text-yellow-500 ml-1">★</span>
                    </p>

                </div>

            </div>

            {/* Distribución de calificaciones */}
            <div className="space-y-4">

                {ratings.map((rating) => {

                    const percentage = getPercentage(rating.total);

                    return (

                        <div
                            key={rating.score}
                            className="flex items-center gap-3"
                        >

                            {/* Número de estrellas */}
                            <span className="w-12 text-sm font-medium text-gray-700">
                                {rating.score} ★
                            </span>

                            {/* Barra de progreso */}
                            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${percentage}%`
                                    }}
                                />

                            </div>

                            {/* Cantidad de votos */}
                            <span className="w-12 text-right text-sm text-gray-500">
                                {rating.total}
                            </span>

                        </div>

                    );

                })}

            </div>

            {/* Total de reseñas */}
            <p className="text-sm text-gray-400 text-center mt-6">
                Basado en {totalRatings} reseñas
            </p>

        </section>
    );

}

export default RatingStatistics;
