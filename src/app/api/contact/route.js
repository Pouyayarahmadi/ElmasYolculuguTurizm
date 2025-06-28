import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    // Validation
    if (!name || !email || !phone || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Tüm alanlar zorunludur." 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Geçerli bir email adresi giriniz." 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: { 
        name, 
        email, 
        phone, 
        message 
      },
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Mesajınız başarıyla kaydedildi.",
      data: contactMessage
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: "Bir hata oluştu. Lütfen tekrar deneyiniz." 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// GET method for testing
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new Response(JSON.stringify({ 
      success: true, 
      data: messages 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Contact GET Error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: "Bir hata oluştu." 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(req) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        message: "Silinecek mesaj bulunamadı."
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    await prisma.contactMessage.deleteMany({
      where: { id: { in: ids } }
    });
    return new Response(JSON.stringify({
      success: true,
      message: "Seçili mesajlar silindi."
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact DELETE Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: "Bir hata oluştu."
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 