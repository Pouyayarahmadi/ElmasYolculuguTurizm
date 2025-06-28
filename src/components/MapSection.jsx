import React from 'react';

export default function MapSection() {
  return (
    <div className="w-full flex justify-center mb-4">
      <div className="bg-white rounded-xl shadow p-2" style={{ maxWidth: '920px', width: '100%' }}>
        <iframe
          title="Elmas Yolculuğu Konum"
          src="https://www.google.com/maps?q=Cumhuriyet,+Lozan+Cd.+No:18,+55200+Atakum%2FSamsun&output=embed"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '12px', width: '100%' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
} 