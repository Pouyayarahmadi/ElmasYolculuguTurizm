export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Test Sayfası</h1>
        <p className="text-lg text-gray-600">Site çalışıyor! 🎉</p>
        <a href="/" className="mt-4 inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800">
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
} 