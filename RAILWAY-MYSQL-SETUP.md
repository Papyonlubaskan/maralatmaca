# Railway MySQL Setup Guide

## 1. Railway'de MySQL Plugin Ekleme

### Adım 1: Railway Dashboard'a Git
1. https://railway.app adresine git
2. Projenizi seçin
3. "New" butonuna tıklayın
4. "Database" → "Add MySQL" seçin

### Adım 2: MySQL Plugin Ayarları
- **Plugin Name:** `maralatmaca-mysql` (isteğe bağlı)
- **Region:** En yakın region seçin (Europe/Frankfurt önerilir)
- **Plan:** Hobby (ücretsiz) veya Pro (ücretli)

### Adım 3: Environment Variables Ekleme
1. Ana servisinize dönün
2. "Variables" sekmesine tıklayın
3. `RAILWAY-ENV-VARIABLES.txt` dosyasındaki tüm değişkenleri kopyala/yapıştır

## 2. Railway MySQL Environment Variables

MySQL plugin otomatik olarak şu değişkenleri ekler:
- `MYSQL_URL` - Tam connection string
- `MYSQLHOST` - Host adresi
- `MYSQLPORT` - Port numarası
- `MYSQLUSER` - Kullanıcı adı
- `MYSQLPASSWORD` - Şifre
- `MYSQLDATABASE` - Veritabanı adı

## 3. Database Migration

Railway MySQL kurulduktan sonra:

### Adım 1: SQL Dosyasını Import Et
1. Railway MySQL plugin'ine tıklayın
2. "Query" sekmesine git
3. `maralatmaca.sql` dosyasını açın
4. İçeriğini kopyala/yapıştır ve çalıştırın

### Adım 2: Test Bağlantısı
```sql
SHOW TABLES;
SELECT * FROM books LIMIT 5;
```

## 4. Deploy Süreci

### Adım 1: GitHub Bağlantısı
1. Railway'de "New Project" → "Deploy from GitHub repo"
2. `Papyonlubaskan/maralatmaca` repo'sunu seç
3. "Deploy Now" tıklayın

### Adım 2: Environment Variables
1. Deploy tamamlandıktan sonra "Variables" sekmesine git
2. `RAILWAY-ENV-VARIABLES.txt` içeriğini yapıştır
3. "Deploy" butonuna tıklayarak yeniden deploy et

### Adım 3: Domain Ayarları
1. "Settings" → "Domains" sekmesine git
2. Custom domain ekleyin (isteğe bağlı)
3. Railway domain'i: `https://maralatmaca-production.up.railway.app`

## 5. Troubleshooting

### MySQL Bağlantı Hatası
- MySQL plugin'in çalıştığından emin olun
- Environment variables'ın doğru eklendiğini kontrol edin
- Database migration'ın tamamlandığını kontrol edin

### Build Hatası
- Console disable sistemi production'da çalışır
- TypeScript hataları düzeltildi
- Terser plugin production build'i optimize eder

### Site Açılmıyor
- Maintenance mode kapalı olduğundan emin olun
- Environment variables'ın tümünün eklendiğini kontrol edin
- Railway logs'u kontrol edin

## 6. Güvenlik Notları

- Admin şifresini değiştirin: `Maral_2025@Railway`
- JWT secret'ı production'da farklı kullanın
- Email şifrelerini güvenli tutun
- Railway'de private repo kullanın

## 7. Monitoring

- Railway Dashboard'da uptime kontrol edin
- MySQL connection'ları izleyin
- Logs'u düzenli kontrol edin
- Backup'ları test edin

---

**Sonraki Adımlar:**
1. MySQL plugin ekleyin
2. Environment variables'ı ekleyin
3. Database'i migrate edin
4. Deploy'u test edin
5. Site'yi kontrol edin
