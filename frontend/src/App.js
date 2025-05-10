import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { api } from './api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [allTrips, setAllTrips] = useState([]);
  const [trips, setTrips] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Click "Verify Backend" to begin.');
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [minFare, setMinFare] = useState(0);
  const [maxFare, setMaxFare] = useState(10000);
  const [fareCap, setFareCap] = useState(10000);
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const tripsPerPage = 10;

  const steps = [
    '🔄 Initializing connection...',
    '🔌 Connecting to backend...',
    '📡 Sending API request to /trips...',
    '🧠 Processing data...',
    '✅ Rendering trips and chart...'
  ];

  const simulateBackend = async () => {
    try {
      setLoading(true);
      for (let i = 0; i < steps.length; i++) {
        setStepIndex(i);
        setStatusMessage(steps[i]);
        await new Promise(r => setTimeout(r, 700));
      }
      const res = await api.get('/trips');
      const fares = res.data.map(t => parseFloat(t.fare_inr));
      const maxFareVal = Math.ceil(Math.max(...fares));
      setAllTrips(res.data);
      setTrips(res.data);
      setFareCap(maxFareVal);
      setMaxFare(maxFareVal);
      setStatusMessage('🎉 Successfully connected and loaded!');
      setLoading(false);
      setDataLoaded(true);
    } catch (error) {
      setStatusMessage('❌ Failed to connect to backend.');
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    const filtered = allTrips.filter(t => {
      const fare = parseFloat(t.fare_inr);
      const matchVehicle = vehicleFilter ? t.vehicle_type === vehicleFilter : true;
      const matchFare = fare >= minFare && fare <= maxFare;
      const matchRating = ratingFilter ? t.user_rating === parseInt(ratingFilter) : true;
      const matchPayment = paymentMethod ? t.payment_method === paymentMethod : true;
      const matchSearch = search === '' ||
        t.pickup_point.toLowerCase().includes(search.toLowerCase()) ||
        t.dropoff_point.toLowerCase().includes(search.toLowerCase());
      return matchVehicle && matchFare && matchRating && matchPayment && matchSearch;
    });
    setTrips(filtered);
    setCurrentPage(1);
  }, [allTrips, vehicleFilter, minFare, maxFare, ratingFilter, paymentMethod, search]);

  const resetFilters = () => {
    setVehicleFilter('');
    setPaymentMethod('');
    setRatingFilter('');
    setSearch('');
    setMinFare(0);
    setMaxFare(fareCap);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters]); // ✅ Netlify-friendly dependency

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(trips.length / tripsPerPage);

  const fareChartData = {
    labels: currentTrips.map(t => t.date),
    datasets: [{
      label: 'Fare (INR)',
      data: currentTrips.map(t => t.fare_inr),
      backgroundColor: '#4ade80'
    }]
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans">
      <motion.h1 className="text-3xl font-bold text-purple-700 mb-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        🚕 Uber Trip Analysis Dashboard
      </motion.h1>

      {!dataLoaded && (
        <motion.button
          onClick={simulateBackend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow-md mb-4 block mx-auto"
          disabled={loading}
        >
          {loading ? steps[stepIndex] : 'Verify Backend'}
        </motion.button>
      )}

      <motion.p className="text-center mb-4 italic text-sm text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={statusMessage}>
        {statusMessage}
      </motion.p>

      {dataLoaded && (
        <>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700">Filter Options</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-purple-600 hover:underline"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <input
                type="text"
                placeholder="Search pickup/drop"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="p-2 border rounded"
              />
              <select value={vehicleFilter} onChange={e => setVehicleFilter(e.target.value)} className="p-2 border rounded">
                <option value="">All Vehicles</option>
                <option value="Auto">Auto</option>
                <option value="Mini">Mini</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
              </select>
              <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="p-2 border rounded">
                <option value="">All Payments</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
              </select>
              <select value={ratingFilter} onChange={e => setRatingFilter(e.target.value)} className="p-2 border rounded">
                <option value="">All Ratings</option>
                {[5, 4, 3, 2, 1].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                max={fareCap}
                step={1}
                value={minFare}
                onChange={e => setMinFare(Number(e.target.value))}
                className="p-2 border rounded"
              />
              <input
                type="number"
                min={0}
                max={fareCap}
                step={1}
                value={maxFare}
                onChange={e => setMaxFare(Number(e.target.value))}
                className="p-2 border rounded"
              />
            </div>
          )}

          <table className="w-full border-collapse bg-white shadow-md mb-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {["Trip ID", "User ID", "Date", "Pickup", "Dropoff", "Distance (km)", "Duration (min)", "Fare (₹)", "Vehicle", "Payment", "Rating"].map(h => (
                  <th key={h} className="border p-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTrips.map((trip, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border p-2">{trip.trip_id}</td>
                  <td className="border p-2">{trip.user_id}</td>
                  <td className="border p-2">{trip.date}</td>
                  <td className="border p-2">{trip.pickup_point}</td>
                  <td className="border p-2">{trip.dropoff_point}</td>
                  <td className="border p-2">{trip.distance_km}</td>
                  <td className="border p-2">{trip.duration_min}</td>
                  <td className="border p-2">{trip.fare_inr}</td>
                  <td className="border p-2">{trip.vehicle_type}</td>
                  <td className="border p-2">{trip.payment_method}</td>
                  <td className="border p-2">{trip.user_rating}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center mb-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">📊 Fare Trend (Current Page)</h2>
            <Bar data={fareChartData} />
          </div>

          <button
            onClick={resetFilters}
            className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg"
          >
            🔄 Reset Filters
          </button>
        </>
      )}
    </div>
  );
}

export default App;
