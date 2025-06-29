'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Check if admin is logged in (both sessionStorage and cookie)
    const isLoggedInSession = sessionStorage.getItem('adminLoggedIn');
    const isLoggedInCookie = document.cookie.includes('isAdmin=true');
    
    if (!isLoggedInSession && !isLoggedInCookie) {
      router.push('/admin/login');
      return;
    }
    
    setLoading(false);
    fetchMessages();
  }, [router]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.data || []);
      } else {
        console.error('Failed to fetch messages:', response.status);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageAge = (dateString) => {
    const messageDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - messageDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Bugün';
    if (diffDays === 1) return '1 gün önce';
    return `${diffDays} gün önce`;
  };

  const isMessageDeletable = (dateString) => {
    // Tüm mesajlar silinebilir
    return true;
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === messages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(messages.map((m) => m.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    
    if (!window.confirm('Seçili mesajları silmek istediğinize emin misiniz? (Bu işlem geri alınamaz)')) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchMessages();
        alert('Mesajlar başarıyla silindi.');
      } else {
        alert('Silme işlemi başarısız oldu.');
      }
    } catch (e) {
      alert('Bir hata oluştu.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-200 text-blue-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Ana Sayfa
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {/* Messages Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">İletişim Mesajları</h2>
            <div className="flex gap-2">
              <button
                onClick={fetchMessages}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Yenile
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0 || deleting}
                className={`bg-red-500 text-white px-4 py-2 rounded transition-colors ${selectedIds.length === 0 || deleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
              >
                {deleting ? 'Siliniyor...' : 'Seçilileri Sil'}
              </button>
            </div>
          </div>

          {messagesLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Mesajlar yükleniyor...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Henüz mesaj bulunmuyor.</p>
              <p className="text-sm text-gray-500 mt-2">
                İletişim formundan mesaj gönderildiğinde burada görünecek.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      <input type="checkbox" checked={selectedIds.length === messages.length && messages.length > 0} onChange={handleSelectAll} />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Yaş
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Ad Soyad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      E-posta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Telefon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Mesaj
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-2 py-4 text-center border-b">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(message.id)}
                          onChange={() => handleSelect(message.id)}
                          title="Bu mesajı silmek için seçin"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        {formatDate(message.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm border-b">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getMessageAge(message.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                        {message.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        <a href={`mailto:${message.email}`} className="text-blue-600 hover:text-blue-800">
                          {message.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                        <a href={`tel:${message.phone}`} className="text-blue-600 hover:text-blue-800">
                          {message.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 border-b">
                        <div className="max-w-xs">
                          <p className="truncate" title={message.message}>
                            {message.message}
                          </p>
                          {message.message.length > 50 && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-blue-600 hover:text-blue-800 text-xs">
                                Tam mesajı gör
                              </summary>
                              <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                                {message.message}
                              </p>
                            </details>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {messages.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Toplam {messages.length} mesaj bulundu.
            </div>
          )}
        </div>

        <div className="bg-yellow-300 border border-yellow-500 rounded-xl p-5 mb-6 shadow flex flex-col items-start">
          <div className="font-extrabold text-lg text-black mb-1">WESTERN UNION RESMİ TEMSİLCİSİ</div>
          <div className="font-bold text-black mb-2">GÜVENLİ. HIZLI. ULUSLARARASI PARA TRANSFERİ.</div>
          <div className="text-black mb-2">Elmas Yolculuğu, Samsun'da yetkili Unionu yetkili temsilcisidir. Dünyanın dört bir yanına para göndermek veya almak artık çok kolay.</div>
          <ul className="text-black space-y-1 text-base">
            <li>✔ Dakikalar içinde para transferi</li>
            <li>✔ 100'den fazla ülkeye gönderim ve alım</li>
            <li>✔ Resmi anlaşmalı şube</li>
            <li>✔ Güvenli işlem garantisi</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 