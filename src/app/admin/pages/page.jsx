"use client";
import { useEffect, useState } from "react";

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ slug: "", title: "", content: "" });
  const [message, setMessage] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [createdPageCode, setCreatedPageCode] = useState("");

  // Sayfaları getir
  const fetchPages = async () => {
    setLoading(true);
    const res = await fetch("/api/pages");
    const data = await res.json();
    setPages(data.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Formu doldur
  const handleEdit = (page) => {
    setEditingId(page.id);
    setForm({ slug: page.slug, title: page.title, content: page.content });
    setIsNew(false);
    setMessage("");
  };

  // Yeni sayfa
  const handleNew = () => {
    setEditingId(null);
    setForm({ slug: "", title: "", content: "" });
    setIsNew(true);
    setMessage("");
  };

  // Kaydet
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.slug || !form.title || !form.content) {
      setMessage("Tüm alanlar zorunlu.");
      return;
    }
    const method = isNew ? "POST" : "PUT";
    const body = isNew ? form : { ...form, id: editingId };
    const res = await fetch("/api/pages", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Başarıyla kaydedildi.");
      fetchPages();
      setEditingId(null);
      setIsNew(false);
      setForm({ slug: "", title: "", content: "" });
      if (isNew) {
        setCreatedPageCode(`"use client";\nimport Header from '@/components/Header';\nimport Footer from '@/components/Footer';\n\nexport default function Page() {\n  return (\n    <>\n      <Header />\n      <main className=\"max-w-3xl mx-auto p-6\">\n        <h1 className=\"text-2xl font-bold mb-4\">${form.title}</h1>\n        <div className=\"prose\">${form.content.replace(/`/g, '\`')}</div>\n      </main>\n      <Footer />\n    </>\n  );\n}`);
      }
    } else {
      setMessage(data.message || "Bir hata oluştu.");
    }
  };

  // Sil
  const handleDelete = async (id) => {
    if (!window.confirm("Bu sayfa silinsin mi?")) return;
    const res = await fetch("/api/pages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Silindi.");
      fetchPages();
    } else {
      setMessage(data.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sayfa İçeriklerini Düzenle</h1>
      <button
        onClick={handleNew}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Yeni Sayfa
      </button>
      {message && <div className="mb-4 text-blue-700 font-semibold">{message}</div>}
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="space-y-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className="border rounded p-4 bg-white shadow flex flex-col gap-2"
            >
              {editingId === page.id ? (
                <form onSubmit={handleSave} className="space-y-2">
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="slug (ör: hakkimizda)"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Başlık"
                    className="border px-2 py-1 rounded w-full"
                  />
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="İçerik"
                    className="border px-2 py-1 rounded w-full min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Kaydet</button>
                    <button type="button" onClick={() => setEditingId(null)} className="bg-gray-300 px-4 py-1 rounded">Vazgeç</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold">{page.title}</span> <span className="text-xs text-gray-500">({page.slug})</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(page)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700 whitespace-pre-line mt-2">{page.content}</div>
                </>
              )}
            </div>
          ))}
          {isNew && (
            <form onSubmit={handleSave} className="border rounded p-4 bg-white shadow flex flex-col gap-2">
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="slug (ör: hakkimizda)"
                className="border px-2 py-1 rounded w-full"
              />
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Başlık"
                className="border px-2 py-1 rounded w-full"
              />
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="İçerik"
                className="border px-2 py-1 rounded w-full min-h-[100px]"
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Kaydet</button>
                <button type="button" onClick={() => setIsNew(false)} className="bg-gray-300 px-4 py-1 rounded">Vazgeç</button>
              </div>
            </form>
          )}
          {createdPageCode && (
            <div className="mt-8 p-4 bg-gray-100 border rounded">
              <div className="mb-2 font-semibold text-blue-700">Bu sayfayı oluşturmak için aşağıdaki kodu <br /> <span className='text-red-600'>src/app/{form.slug}/page.jsx</span> olarak kaydedin:</div>
              <pre className="bg-white p-2 rounded text-xs overflow-x-auto"><code>{createdPageCode}</code></pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 