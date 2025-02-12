import { useState, useEffect } from 'react';
import MyContainer from 'src/components/template/MyCountainer';

function FeedBackConfig() {
  const [config, setConfig] = useState({
    allowedDays: [],
    allowedHours: { start: 0, end: 0 }
  });
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');

  const daysOfWeek = [
    { value: 0, label: 'Minggu' },
    { value: 1, label: 'Senin' },
    { value: 2, label: 'Selasa' },
    { value: 3, label: 'Rabu' },
    { value: 4, label: 'Kamis' },
    { value: 5, label: 'Jumat' },
    { value: 6, label: 'Sabtu' }
  ];

  // Helper function to convert hour number to time string
  const hourToTimeString = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  // Helper function to format time for display
  const formatTimeWIB = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00 WIB`;
  };

  // Helper function to convert time string to hour number
  const timeStringToHour = (timeString) => {
    return parseInt(timeString.split(':')[0]);
  };

  // Fetch current config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/feedback/config`);
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Gagal mengambil konfigurasi:', error);
        setMessage('Gagal mengambil konfigurasi. Silakan coba lagi.');
      }
    };
    fetchConfig();
  }, []);

  const handleDayChange = (day) => {
    const newDays = config.allowedDays.includes(day)
      ? config.allowedDays.filter(d => d !== day)
      : [...config.allowedDays, day];
    setConfig({ ...config, allowedDays: newDays });
  };

  const handleHourChange = (type, timeString) => {
    setConfig({
      ...config,
      allowedHours: {
        ...config.allowedHours,
        [type]: timeStringToHour(timeString)
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/feedback/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token
        },
        body: JSON.stringify(config)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Konfigurasi berhasil diperbarui!');
        setConfig(data);
      } else {
        setMessage(data.error || 'Gagal memperbarui konfigurasi.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContainer containerStyle="mt-[3rem]">
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
            Konfigurasi Feedback
          </h2>
          <p className="mb-8 lg:mb-16 font-medium text-center text-gray-500 sm:text-xl">
            Atur jadwal buka form feedback
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Admin Token
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Hari yang Diizinkan
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <label key={day.value} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={config.allowedDays.includes(day.value)}
                      onChange={() => handleDayChange(day.value)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{day.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Jam Mulai
                </label>
                <div className="space-y-2">
                  <input
                    type="time"
                    value={hourToTimeString(config.allowedHours.start)}
                    onChange={(e) => handleHourChange('start', e.target.value)}
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    required
                    step="3600"
                  />
                  <span className="text-sm text-gray-600">
                    {formatTimeWIB(config.allowedHours.start)}
                  </span>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Jam Selesai
                </label>
                <div className="space-y-2">
                  <input
                    type="time"
                    value={hourToTimeString(config.allowedHours.end)}
                    onChange={(e) => handleHourChange('end', e.target.value)}
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    required
                    step="3600"
                  />
                  <span className="text-sm text-gray-600">
                    {formatTimeWIB(config.allowedHours.end)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Menyimpan...' : 'Simpan Konfigurasi'}
            </button>

            {message && (
              <div className={`text-center p-3 rounded ${
                message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

          </form>
        </div>
      </section>
    </MyContainer>
  );
}

export default FeedBackConfig;
