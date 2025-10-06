/**
 * Lokaldeki Tüm Görselleri Cloudinary'ye Yükle ve Database'i Güncelle
 */

const cloudinary = require('cloudinary').v2;
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Cloudinary Config
cloudinary.config({
  cloud_name: 'dvgsmuhjt',
  api_key: '911194959441699',
  api_secret: 'vCFmQl3ffuacqiOnE38E3la6dg8'
});

// MySQL Config (Railway)
const dbConfig = {
  host: 'shortline.proxy.rlwy.net',
  port: 38967,
  user: 'root',
  password: 'PGHlxLRYFLJJyXaQrVebTHqJxSSIMttb',
  database: 'railway'
};

async function uploadImagesToCloudinary() {
  console.log('🚀 Cloudinary Yükleme Başlıyor...\n');
  
  const imagesDir = path.join(__dirname, '../public/uploads/images');
  
  // Klasör var mı kontrol et
  if (!fs.existsSync(imagesDir)) {
    console.log('❌ public/uploads/images klasörü bulunamadı!');
    return;
  }
  
  // Tüm resimleri oku
  const files = fs.readdirSync(imagesDir).filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );
  
  console.log(`📁 ${files.length} görsel bulundu:\n`);
  files.forEach(f => console.log(`   - ${f}`));
  console.log('');
  
  // MySQL bağlantısı
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ MySQL bağlantısı kuruldu\n');
    
    // Her görseli Cloudinary'ye yükle
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      
      console.log(`📤 Yükleniyor: ${file}...`);
      
      try {
        // Cloudinary'ye yükle
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'maralatmaca/books',
          resource_type: 'image',
          transformation: [
            { width: 800, height: 1200, crop: 'limit' },
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        });
        
        console.log(`   ✅ Cloudinary URL: ${result.secure_url}`);
        
        // Database'de bu görseli kullanan kitapları bul ve güncelle
        const oldPath = `/uploads/images/${file}`;
        const [books] = await connection.query(
          'SELECT id, title FROM books WHERE cover_image = ?',
          [oldPath]
        );
        
        if (books.length > 0) {
          // Database'i güncelle
          await connection.query(
            'UPDATE books SET cover_image = ? WHERE cover_image = ?',
            [result.secure_url, oldPath]
          );
          
          console.log(`   ✅ Database güncellendi (${books.length} kitap)`);
          books.forEach(book => console.log(`      - ${book.title}`));
        } else {
          console.log(`   ℹ️  Bu görseli kullanan kitap bulunamadı`);
        }
        
        console.log('');
        
      } catch (uploadError) {
        console.error(`   ❌ Yükleme hatası: ${uploadError.message}\n`);
      }
    }
    
    console.log('🎉 TÜM GÖRSELLER YÜKLENDİ!\n');
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ MySQL bağlantısı kapatıldı');
    }
  }
}

// Script'i çalıştır
uploadImagesToCloudinary().catch(console.error);

