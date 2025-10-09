# Railway Deployment Hazır! 🚀

## Proje Bilgileri
- **Project ID**: 76dd52e7-2d3c-435f-a4c1-e2db51e80440
- **Custom Start Command**: `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`

## Yapılan İşlemler ✅

### 1. Güvenli Secret Keyler Oluşturuldu
- **JWT_SECRET**: `422a65f27544558d6fd29f77031c7bb78b779591f0656f6b3fa0c2b8b5d141bf`
- **CSRF_SECRET**: `c36b7a89c40bf99512b04ea0980200cf`

### 2. Cloudinary Kaldırıldı - Local Upload Sistemi
- ✅ Cloudinary bağımlılığı kaldırıldı
- ✅ Upload API'si local sisteme çevrildi
- ✅ Sharp ile resim optimizasyonu eklendi
- ✅ Upload dizinleri oluşturuldu (`public/uploads/`)

### 3. Railway Environment Variables Hazırlandı
- `env.railway` dosyası oluşturuldu
- Cloudinary ayarları kaldırıldı
- Tüm gerekli değişkenler yapılandırıldı
- MySQL bağlantı değişkenleri Railway formatında ayarlandı

### 4. Railway.json Güncellendi
- Build command optimize edildi (`npm ci` kullanıldı)
- Healthcheck path eklendi (`/api/health`)

### 5. Performance Monitoring
- Health check API'si eklendi (`/api/health`)
- Sistem durumu monitoring hazır

## Deployment Adımları

### 1. Railway Dashboard'a Git
1. [Railway Dashboard](https://railway.app/dashboard) aç
2. Projenizi seçin (Project ID: 76dd52e7-2d3c-435f-a4c1-e2db51e80440)

### 2. Environment Variables Ayarla
1. **Variables** sekmesine git
2. `env.railway` dosyasındaki tüm değişkenleri kopyala/yapıştır
3. `NEXT_PUBLIC_SITE_URL` ve `NEXT_PUBLIC_API_URL` değerlerini deploy sonrası güncelle

### 3. MySQL Service Ayarları
- MySQL servisi zaten mevcut
- Custom start command otomatik ayarlanmış
- Veritabanı bağlantı değişkenleri Railway tarafından otomatik sağlanacak

### 4. Deploy
1. **Deployments** sekmesine git
2. **Deploy** butonuna bas
3. Deploy tamamlandıktan sonra domain'i al

### 5. Son Ayarlar
1. Deploy sonrası aldığın domain'i kullanarak:
   - `NEXT_PUBLIC_SITE_URL` güncelle
   - `NEXT_PUBLIC_API_URL` güncelle
2. Admin şifresini değiştir (güvenlik için)

## Önemli Notlar ⚠️

- JWT ve CSRF secret'ları güvenli şekilde oluşturuldu
- Admin şifresi: `Maral2025Railway@-` (değiştirilmesi önerilir)
- Email ayarları mevcut SMTP ile yapılandırıldı
- **Cloudinary kaldırıldı** - Artık local upload sistemi kullanılıyor
- Resim optimizasyonu Sharp ile yapılıyor
- Dosyalar `public/uploads/` dizininde saklanacak

## Test Etmek İçin
1. Deploy tamamlandıktan sonra sitenizi ziyaret edin
2. Admin paneline giriş yapın: `/yonetim`
3. Veritabanı bağlantısını test edin

## Sonraki Adımlar
- Domain'i custom domain ile değiştir
- SSL sertifikası otomatik olarak sağlanacak
- Monitoring ve analytics ayarla
