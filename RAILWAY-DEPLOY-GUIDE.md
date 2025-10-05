# 🚂 Railway Deployment Rehberi - Adım Adım

## ✅ Hazırlık Tamamlandı

Proje Railway için optimize edildi:
- ✅ Gereksiz Docker dosyaları silindi
- ✅ PM2 konfigürasyonu kaldırıldı
- ✅ Railway.json oluşturuldu
- ✅ package.json temizlendi

---

## 🚀 Deployment Adımları

### Adım 1: Railway Hesabı Oluştur

1. **https://railway.app** → "Start a New Project"
2. **GitHub ile giriş yap** (önerilen)
3. Hesap oluştur

---

### Adım 2: GitHub'a Yükle (Eğer yoksa)

```bash
# Git repository başlat (eğer yoksa)
git init
git add .
git commit -m "Railway deployment ready"

# GitHub'a push et
git remote add origin https://github.com/YOUR_USERNAME/maralatmaca.git
git branch -M main
git push -u origin main
```

---

### Adım 3: Railway'de Proje Oluştur

#### 3.1 New Project
1. Railway Dashboard → **"New Project"**
2. **"Deploy from GitHub repo"** seç
3. Repository'yi seç: **maralatmaca**

#### 3.2 MySQL Ekle
1. Proje oluşturulduktan sonra → **"+ New"**
2. **"Database"** → **"Add MySQL"**
3. Otomatik MySQL container oluşturulur

#### 3.3 Environment Variables Bağla
Railway otomatik olarak MySQL bağlantısını oluşturur:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `MYSQLDATABASE`

---

### Adım 4: Environment Variables Ayarla

Railway Dashboard → Your Service → **Variables** sekmesi:

#### Gerekli Değişkenler:

```bash
# Node Environment
NODE_ENV=production

# Site URL (Railway domain'i - deploy sonrası güncellenecek)
NEXT_PUBLIC_SITE_URL=https://your-app.up.railway.app
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app/api
NEXT_PUBLIC_SITE_NAME=Maral Atmaca

# Database (Railway'den otomatik gelir, ama kontrol et)
DATABASE_URL=${{MYSQLURL}}
DB_HOST=${{MYSQLHOST}}
DB_PORT=${{MYSQLPORT}}
DB_USER=${{MYSQLUSER}}
DB_PASSWORD=${{MYSQLPASSWORD}}
DB_NAME=${{MYSQLDATABASE}}

# JWT Secret (güvenli oluştur)
JWT_SECRET=RANDOM_64_CHARACTER_HEX_STRING_HERE
JWT_EXPIRES_IN=7d

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=CHANGE_THIS_SECURE_PASSWORD

# Email Configuration (Gmail örneği)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL=info@yourdomain.com
REPLY_TO_EMAIL=info@yourdomain.com

# File Upload
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,application/pdf

# Security
CSRF_SECRET=RANDOM_32_CHARACTER_STRING
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Backup
BACKUP_DIR=./backups
BACKUP_RETENTION_DAYS=30
```

#### JWT_SECRET Oluşturma:
```bash
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# Veya online: https://www.random.org/strings/
```

---

### Adım 5: Deploy Et

1. **Variables kaydedildikten sonra otomatik deploy başlar**
2. **Logs** sekmesinden build'i izle:
   - ✅ Dependencies install
   - ✅ Next.js build
   - ✅ Database connection
   - ✅ Deploy successful

3. **Deploy süresi:** ~3-5 dakika

---

### Adım 6: Domain Ayarla

#### Railway Subdomain (Ücretsiz)
1. Settings → **"Generate Domain"**
2. Otomatik domain: `your-app.up.railway.app`
3. SSL otomatik aktif

#### Custom Domain (Opsiyonel)
1. Settings → **"Custom Domains"**
2. Domain ekle: `maralatmaca.com`
3. DNS ayarları:
   ```
   CNAME: your-app.up.railway.app
   ```

---

### Adım 7: İlk Test

#### 7.1 Health Check
```
https://your-app.up.railway.app/api/health
```

Başarılı yanıt:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": {
      "status": "connected"
    }
  }
}
```

#### 7.2 Ana Sayfa
```
https://your-app.up.railway.app
```

#### 7.3 Admin Panel
```
https://your-app.up.railway.app/yonetim
```
Login:
- Email: `ADMIN_EMAIL` değişkenindeki
- Password: `ADMIN_PASSWORD` değişkenindeki

---

## 🔧 Railway Özellikleri

### Otomatik Deploy
- GitHub'a her push'ta otomatik deploy
- Branch bazlı deployment
- Rollback desteği

### Monitoring
- **Metrics:** CPU, RAM, Network
- **Logs:** Real-time log streaming
- **Alerts:** E-posta bildirimleri

### Database Management
- **Backups:** Otomatik günlük yedek
- **Scaling:** Tek tıkla upgrade
- **MySQL Console:** Web üzerinden erişim

---

## 💰 Maliyet Takibi

### Dashboard'da İzle:
1. **Usage** sekmesi
2. Güncel kullanım:
   - CPU time
   - RAM usage
   - Network transfer
   - Estimated cost

### Free Trial:
- İlk $5 credit ücretsiz
- ~30 gün test
- Kredi kartı gerekmez

### Hobby Plan:
- 30 gün sonra → Billing ekle
- $5/ay minimum
- Kullandığın kadar öde

---

## 🐛 Sorun Giderme

### Build Failed
```bash
# Logs kontrol et
- npm install hatası → package.json kontrol
- TypeScript hatası → npm run type-check
- Build hatası → npm run build local'de test
```

### Database Connection Error
```bash
# Variables kontrol et
- DATABASE_URL doğru mu?
- MySQL service running mu?
- Railway Variables → MySQL service'e bağlı mı?
```

### 502 Bad Gateway
```bash
# Service restart
- Railway Dashboard → Service → Restart
- Logs'da hata var mı kontrol et
```

### Deployment Timeout
```bash
# Build süresini kontrol et
- 10 dakikadan uzun sürmemeli
- node_modules cache temizle
- Restart deploy
```

---

## 🔄 Güncelleme

### Kod Güncellemesi:
```bash
# Local'de değişiklik yap
git add .
git commit -m "Update feature"
git push origin main

# Railway otomatik deploy eder
```

### Environment Variables Güncelleme:
1. Railway Dashboard → Variables
2. Değişkeni güncelle
3. Otomatik restart

### Database Migration:
1. Railway Dashboard → MySQL
2. Connect → MySQL console
3. SQL komutlarını çalıştır

---

## 📊 Performans İpuçları

### 1. Image Optimization
- Next.js Image component kullan (zaten var)
- WebP/AVIF formatı (zaten aktif)

### 2. Database Query Optimization
- Index'leri kontrol et
- Slow query log'ları izle

### 3. Caching
- Railway CDN otomatik
- Static files cache'leniyor

### 4. Memory Usage
- Node.js memory limit: 512 MB (hobby için yeterli)
- Monitoring'den izle

---

## ✅ Kontrol Listesi

Deploy öncesi:
- [ ] GitHub'a kod yüklendi
- [ ] .env.local local'de test edildi
- [ ] npm run build başarılı

Railway'de:
- [ ] Proje oluşturuldu
- [ ] MySQL eklendi
- [ ] Environment variables ayarlandı
- [ ] JWT_SECRET güvenli oluşturuldu
- [ ] Admin şifresi güçlü
- [ ] Deploy başarılı

Deploy sonrası:
- [ ] Health check çalışıyor
- [ ] Ana sayfa açılıyor
- [ ] Admin panel login OK
- [ ] Database bağlantısı OK
- [ ] Domain ayarlandı (opsiyonel)

---

## 🎯 Sonraki Adımlar

1. **Deploy et** → Railway'de proje oluştur
2. **Test et** → Tüm özellikleri kontrol et
3. **Domain bağla** → Kendi domain'ini ekle
4. **Monitoring kur** → Usage'ı izle
5. **30 gün sonra** → Hobby plan'a geç ($5/ay)

---

## 📞 Yardım

### Railway Support:
- Discord: https://discord.gg/railway
- Docs: https://docs.railway.app
- Status: https://status.railway.app

### Proje Desteği:
- Deployment sorunları için hata loglarını paylaş
- Environment variable sorunları için Variables sekmesini kontrol et

---

**Hazır! Railway'e deploy edebilirsin. 🚀**
