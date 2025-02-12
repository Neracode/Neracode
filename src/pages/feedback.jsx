import { useState, useEffect } from 'react';
import MyContainer from 'src/components/template/MyCountainer';
import process from 'process'

function Feedback() {
  // Form state variables
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Open status state variable
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState(null);

  // Define emoji options with corresponding descriptions
  const emojiOptions = [
    { emoji: '😤', description: 'Sangat Tidak Puas' },
    { emoji: '😒', description: 'Tidak Puas' },
    { emoji: '😐', description: 'Netral' },
    { emoji: '🙂', description: 'Puas' },
    { emoji: '😀', description: 'Sangat Puas' },
  ];

  const daysOfWeek = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];

  // Helper function to format time in WIB
  const formatTimeWIB = (hour) => {
    return `${hour.toString().padStart(2, '0')}:00 WIB`;
  };

  // Helper function to generate schedule message
  const getScheduleMessage = () => {
    if (!config) return '';

    const allowedDaysText = config.allowedDays
      .sort((a, b) => a - b)
      .map(day => daysOfWeek[day])
      .reduce((text, day, index, array) => {
        if (index === 0) return day;
        if (index === array.length - 1) return `${text} dan ${day}`;
        return `${text}, ${day}`;
      });

    return `Maaf, layanan ini hanya tersedia pada hari ${allowedDaysText} pukul ${formatTimeWIB(config.allowedHours.start)} hingga ${formatTimeWIB(config.allowedHours.end)}.`;
  };

  // Fetch configuration from backend
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${process.env.VITE_API_URL}/api/feedback/config`);
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Gagal mengambil konfigurasi:', error);
      }
    };
    fetchConfig();
  }, []);

  // useEffect to check open status
  useEffect(() => {
    const checkOpenStatus = () => {
      if (!config) return;

      const now = new Date();
      const jakartaTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
      );

      const day = jakartaTime.getDay();
      const hour = jakartaTime.getHours();

      setIsOpen(
        config.allowedDays.includes(day) &&
        hour >= config.allowedHours.start &&
        hour < config.allowedHours.end
      );
    };

    // Check immediately on mount...
    checkOpenStatus();
    // ...and then set an interval to check every minute.
    const intervalId = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(intervalId);
  }, [config]);

  // Handle emoji selection
  const handleEmojiClick = (description) => {
    setSelectedEmoji(description);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    // Validate that an emoji was selected
    if (!selectedEmoji) {
      setResponseMessage(
        'Silakan pilih emoji untuk berbagi perasaan Anda.'
      );
      setLoading(false);
      return;
    }

    // Build the payload to send
    const data = {
      emoji: selectedEmoji,
      message: message,
      date: new Date().toISOString(), // client-generated timestamp
    };

    const apiURL = 'http://localhost:5000/api/feedback/submit';

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      console.log('Response from back-end:', jsonResponse);
      setResponseMessage('Masukan berhasil dikirim!');
      // Reset form
      setSelectedEmoji('');
      setMessage('');
    } catch (error) {
      console.error('Submission error:', error);
      setResponseMessage('Gagal mengirim masukan. Silakan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContainer containerStyle="mt-[3rem]">
      {isOpen ? (
        // Render the form if the service is "open"
        <section className="bg-white">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-center text-gray-900">
              Bantu Kami Berkembang
            </h2>
            <p className="mb-8 lg:mb-16 font-medium text-center text-gray-500 sm:text-xl">
              Kami sangat menghargai masukan Anda! <br /> Silakan
              bagikan komentar atau saran Anda di bawah ini.
            </p>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Emoji Selection */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="emoji"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Bagaimana Kegiatan Hari Ini?
                </label>
                <div className="mt-3 flex justify-center sm:justify-start space-x-5">
                  {emojiOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleEmojiClick(option.description)
                      }
                      className={`flex h-12 w-16 cursor-pointer items-center justify-center rounded-md bg-amber-200 text-xl font-bold hover:bg-amber-400 ${
                        selectedEmoji === option.description
                          ? 'ring-2 ring-blue-500'
                          : ''
                      }`}>
                      {option.emoji}
                    </div>
                  ))}
                </div>
              </div>
              {/* Message Textarea */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Berikan Pesan atau Saran Anda
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave a comment..."></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {/* Response Message */}
              {responseMessage && (
                <div className="text-center text-sm text-green-600">
                  {responseMessage}
                </div>
              )}
            </form>
          </div>
        </section>
      ) : (
        // Render a closed message when outside allowed hours
        <div className="flex flex-col justify-center min-h-screen text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Layanan Sedang Tutup
          </h2>
          <p className="mt-4 text-gray-500">
            {getScheduleMessage()}
          </p>
        </div>
      )}
    </MyContainer>
  );
}

export default Feedback;
