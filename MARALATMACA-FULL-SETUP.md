# 🚀 Maral Atmaca - Tam Kurulum Rehberi

## 📋 Kurulum Özeti

1. Railway Variables Ayarları
2. Custom Domain (maralatmaca.com) Bağlama
3. Cloudflare DNS + SSL Ayarları
4. Email Testi

---

## 1️⃣ Railway Variables - TAM LİSTE

Railway Dashboard → maralatmaca → **Variables** sekmesi → Her birini tek tek ekle:

### Production Environment
```
NODE_ENV=production
```

### Site URLs (Custom Domain)
```
NEXT_PUBLIC_SITE_URL=https://maralatmaca.com
NEXT_PUBLIC_API_URL=https://maralatmaca.com/api
NEXT_PUBLIC_SITE_NAME=Maral Atmaca
```

### Database (Railway MySQL Otomatik)
```
DATABASE_URL=${{MySQL.DATABASE_URL}}
DB_HOST=${{MySQL.MYSQL_HOST}}
DB_PORT=${{MySQL.MYSQL_PORT}}
DB_USER=${{MySQL.MYSQL_USER}}
DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
DB_NAME=${{MySQL.MYSQL_DATABASE}}
```

### JWT Security
```
JWT_SECRET=b3a112e033bbd45e7b440bcf4a4d6887b61c37474f7f3d0da1b9e59bfe4e5ec98d6a600f76baad6ce3443a0ee2f65a8bf1f5bfa27301a2060f86f03660c8acad
JWT_EXPIRES_IN=7d
```

### Admin Panel
```
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@maralatmaca.com
ADMIN_PASSWORD=Maral2025@-
```

### Email Configuration (OkanDemir.org SMTP)
```
EMAIL_HOST=okandemir.org
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=maralatmaca@okandemir.org
EMAIL_PASS=Okan-1234-5678
EMAIL_FROM=maralatmaca@okandemir.org
CONTACT_EMAIL=maralatmaca@okandemir.org
REPLY_TO_EMAIL=maralatmaca@okandemir.org
```

### File Upload
```
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,application/pdf
```

### Security
```
CSRF_SECRET=Lj3RQcwIM5ATpQ7mK2nL9xE4r
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Logging & Backup
```
LOG_LEVEL=info
LOG_FILE=./logs/app.log
BACKUP_DIR=./backups
BACKUP_RETENTION_DAYS=30
```

---

## 2️⃣ Custom Domain Bağlama

### Railway'de:

1. **maralatmaca service** → **Settings** sekmesi
2. **Networking** bölümüne in
3. **"Custom Domain"** tıkla
4. Domain gir: `maralatmaca.com`
5. Railway sana bir **CNAME target** verecek (örn: `xxx.railway.app`)

---

## 3️⃣ Cloudflare DNS Ayarları

### Cloudflare Dashboard'da:

#### A. Ana Domain (maralatmaca.com)

**Seçenek 1: CNAME (Önerilen)**
```
Type: CNAME
Name: @ (veya maralatmaca.com)
Target: maralatmaca-production.up.railway.app
Proxy: ✅ Proxied (Turuncu Bulut)
TTL: Auto
```

**Seçenek 2: A Record (Alternatif)**
```
Railway'den IP al:
nslookup maralatmaca-production.up.railway.app

Type: A
Name: @
IPv4: Railway IP adresi
Proxy: ✅ Proxied
```

#### B. WWW Subdomain
```
Type: CNAME
Name: www
Target: maralatmaca.com
Proxy: ✅ Proxied
TTL: Auto
```

---

## 4️⃣ Cloudflare SSL/TLS Ayarları

### SSL/TLS Sekmesi:

#### A. SSL/TLS Encryption Mode
```
⚠️ ÖNEMLİ: "Full (strict)" SEÇ

Overview → SSL/TLS encryption mode
→ Full (strict)
```

**Neden Full (strict)?**
- Railway otomatik SSL sağlar
- Cloudflare + Railway arası şifreli bağlantı
- En güvenli seçenek

#### B. Edge Certificates
```
✅ Always Use HTTPS: ON
✅ Automatic HTTPS Rewrites: ON
✅ Minimum TLS Version: 1.2
```

#### C. Origin Server (İsteğe Bağlı)
Railway kendi SSL'i var, ek ayar gerekmez.

---

## 5️⃣ Cloudflare Page Rules (Opsiyonel)

### WWW'yi @ redirect et:

```
Cloudflare → Page Rules → Create Page Rule

URL: www.maralatmaca.com/*
Setting: Forwarding URL
Status Code: 301 - Permanent Redirect
Destination: https://maralatmaca.com/$1
```

---

## 6️⃣ Railway Custom Domain Onaylama

### Railway'de Domain Doğrulama:

1. Cloudflare DNS kayıtları ekledikten sonra
2. Railway → Settings → Custom Domains
3. Domain yanında **"Verify"** veya otomatik doğrulama
4. ✅ yeşil tik görünmeli

**Propagasyon:** 5-30 dakika sürebilir

---

## 7️⃣ Email Test

Variables kaydedildikten sonra:

### Test 1: İletişim Formu
```
https://maralatmaca.com/iletisim
→ Form doldur
→ Gönder
→ maralatmaca@okandemir.org'a mail gelmeli
```

### Test 2: Admin Panel
```
https://maralatmaca.com/yonetim
Login: admin@maralatmaca.com / Maral2025@-
→ Mesajlar bölümünde görünmeli
→ Cevap yaz → maralatmaca@okandemir.org'dan gönderilir
```

---

## 8️⃣ Son Kontroller

### A. HTTPS Kontrolü
```
https://maralatmaca.com → SSL kilit ikonu ✅
https://www.maralatmaca.com → Redirect ✅
http://maralatmaca.com → HTTPS'e redirect ✅
```

### B. DNS Propagasyon Kontrolü
```
https://dnschecker.org
→ maralatmaca.com yaz
→ Tüm lokasyonlarda doğru IP/CNAME'i görmeli
```

### C. SSL Test
```
https://www.ssllabs.com/ssltest/
→ maralatmaca.com test et
→ A veya A+ rating olmalı
```

---

## 🔧 Sorun Giderme

### Email Gönderilmiyor?

**1. SMTP Bağlantısı Test Et:**
```
Railway Logs'u kontrol et:
Dashboard → maralatmaca → Logs

Hata: "SMTP connection failed"
→ EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS kontrol et
```

**2. okandemir.org SMTP Ayarları:**
```
cPanel → Email Accounts → maralatmaca@okandemir.org
→ SMTP Settings kontrol et
→ Port 465 SSL açık mı?
```

### Domain Çalışmıyor?

**1. DNS Propagasyon:**
```powershell
nslookup maralatmaca.com
# Railway IP/CNAME döndürmeli
```

**2. Cloudflare Proxy:**
```
Cloudflare → DNS
→ Turuncu bulut (Proxied) aktif mi?
```

**3. Railway Domain Status:**
```
Railway → Settings → Custom Domains
→ Verified ✅ olmalı
```

### SSL Hatası?

**Cloudflare SSL Mode:**
```
Cloudflare → SSL/TLS → Overview
→ "Full (strict)" seçili mi?
```

---

## 📋 Adım Adım Uygulama

### ✅ Checklist:

1. **Railway Variables**
   - [ ] Tüm variables yukarıdaki gibi eklendi
   - [ ] Email ayarları doğru (maralatmaca@okandemir.org)
   - [ ] JWT_SECRET eklendi
   - [ ] DATABASE_URL MySQL'e bağlı
   - [ ] Deploy tamamlandı (2-3 dk bekle)

2. **Cloudflare DNS**
   - [ ] CNAME: @ → railway.app
   - [ ] CNAME: www → maralatmaca.com
   - [ ] Proxy (turuncu bulut) aktif
   - [ ] SSL/TLS: Full (strict)

3. **Railway Custom Domain**
   - [ ] maralatmaca.com eklendi
   - [ ] Verified ✅

4. **Test**
   - [ ] https://maralatmaca.com çalışıyor
   - [ ] İletişim formu mail gönderiyor
   - [ ] Admin panel login
   - [ ] SSL aktif (kilit ikonu)

---

## 🎯 Özet Komutlar

### Railway Variables Ekleme (Web UI):
```
1. maralatmaca service → Variables
2. "New Variable" tıkla
3. Yukarıdaki her satırı tek tek ekle
4. Deploy bekle
```

### Cloudflare DNS:
```
1. DNS → Add Record
2. CNAME @ → railway.app domain
3. CNAME www → maralatmaca.com
4. SSL/TLS → Full (strict)
```

### Test:
```
1. https://maralatmaca.com
2. /iletisim → Form gönder
3. maralatmaca@okandemir.org → Mail kontrol
4. /yonetim → Admin login
```

---

**Hazır! Başlayalım mı?**

İlk adım: Railway Variables ekle → Bana "eklendi" yaz → Sonraki adıma geçeriz.
