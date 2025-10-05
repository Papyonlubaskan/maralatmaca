# 📚 Maral Atmaca - Edebiyat Platformu

Modern, güvenli ve performanslı bir edebiyat paylaşım platformu. Next.js 15, TypeScript ve MySQL ile geliştirilmiştir.

## ✨ Özellikler

- 📖 **Kitap Yönetimi**: Kitap ve bölüm ekleme, düzenleme, silme
- 👤 **Admin Paneli**: Gelişmiş yönetim paneli ve 2FA güvenlik
- 💬 **Yorum Sistemi**: Kitaplara ve bölümlere yorum yapabilme
- 📧 **İletişim Formu**: E-posta bildirimleri ile iletişim
- 🔒 **Güvenlik**: CSRF koruması, rate limiting, IP banlama
- 📊 **Analytics**: Ziyaretçi ve içerik istatistikleri
- 🎨 **Modern UI**: Responsive tasarım, dark mode desteği
- ⚡ **Performans**: Image optimization, caching, lazy loading
- 🔍 **SEO**: Sitemap, robots.txt, structured data

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18.0.0 veya üzeri
- MySQL 8.0 veya üzeri
- npm 8.0.0 veya üzeri

### Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/yourusername/maralatmaca.git
cd maralatmaca
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment dosyasını oluşturun**
```bash
# .env.example dosyasını kopyalayın
cp env.example .env.local

# .env.local dosyasını düzenleyin ve kendi ayarlarınızı girin
```

4. **Veritabanını oluşturun**
```sql
CREATE DATABASE maralatmaca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Veritabanı tabloları ilk çalıştırmada otomatik oluşturulacaktır.

5. **Development sunucusunu başlatın**
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📦 Komutlar

```bash
# Development sunucusu
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🔧 Environment Değişkenleri

Tüm environment değişkenleri için `env.example` dosyasına bakın.

### Kritik Değişkenler

```env
# Database
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=maralatmaca

# JWT Secret (güvenli bir string oluşturun)
JWT_SECRET=your-super-secret-jwt-key

# Admin
ADMIN_EMAIL=admin@maralatmaca.com
ADMIN_PASSWORD=secure-password

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🏗️ Proje Yapısı

```
maralatmaca/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── kitaplar/          # Kitap sayfaları
│   ├── yonetim/           # Admin paneli
│   └── ...
├── components/            # React bileşenleri
├── lib/                   # Utility fonksiyonları
│   ├── auth/             # Authentication
│   ├── database/         # Database işlemleri
│   ├── email/            # Email servisi
│   └── ...
├── public/               # Statik dosyalar
│   ├── data/            # JSON data
│   └── uploads/         # Yüklenen dosyalar
└── ...
```

## 🔐 Admin Paneli

Admin paneline erişim: [http://localhost:3000/yonetim](http://localhost:3000/yonetim)

İlk giriş için `.env.local` dosyasındaki `ADMIN_EMAIL` ve `ADMIN_PASSWORD` değerlerini kullanın.

### Admin Özellikleri

- 📚 Kitap ve bölüm yönetimi
- 💬 Yorum moderasyonu
- 📊 İstatistikler ve analytics
- 👥 Aktif kullanıcı takibi
- 🔒 2FA (Two-Factor Authentication)
- 🛡️ Güvenlik ayarları
- 📧 Mesaj yönetimi
- 🔧 Site ayarları

## 📤 Production Deployment

### Gereksinimler

- Node.js 18+ yüklü sunucu
- MySQL 8.0+ veritabanı
- Domain ve SSL sertifikası
- En az 1GB RAM

### VPS/Dedicated Server Deployment

#### 1. Sunucu Hazırlığı

```bash
# Node.js kurulumu (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 kurulumu (Process Manager)
sudo npm install -g pm2

# Nginx kurulumu
sudo apt-get install -y nginx
```

#### 2. Proje Kurulumu

```bash
# Projeyi sunucuya yükleyin
cd /var/www
git clone your-repository-url maralatmaca
cd maralatmaca

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp env.example .env.production
nano .env.production  # Ayarları düzenleyin
```

#### 3. MySQL Veritabanı

```bash
# MySQL'e giriş yapın
mysql -u root -p

# Veritabanı ve kullanıcı oluşturun
CREATE DATABASE maralatmaca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'maralatmaca_user'@'localhost' IDENTIFIED BY 'güçlü_şifre';
GRANT ALL PRIVILEGES ON maralatmaca.* TO 'maralatmaca_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

`.env.production` dosyasını güncelleyin:
```env
DB_HOST=localhost
DB_USER=maralatmaca_user
DB_PASSWORD=güçlü_şifre
DB_NAME=maralatmaca
```

#### 4. Build ve Başlatma

```bash
# Production build
npm run build

# PM2 ile başlatma
pm2 start npm --name "maralatmaca" -- start
pm2 save
pm2 startup  # Otomatik başlatma için
```

#### 5. Nginx Reverse Proxy

`/etc/nginx/sites-available/maralatmaca` dosyası oluşturun:

```nginx
server {
    listen 80;
    server_name maralatmaca.com www.maralatmaca.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Nginx'i etkinleştirin
sudo ln -s /etc/nginx/sites-available/maralatmaca /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 6. SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kurulumu
sudo apt-get install -y certbot python3-certbot-nginx

# SSL sertifikası alın
sudo certbot --nginx -d maralatmaca.com -d www.maralatmaca.com

# Otomatik yenileme
sudo certbot renew --dry-run
```

### cPanel/Shared Hosting Deployment

1. **Node.js App Manager** kullanarak uygulama oluşturun
2. **Application Root**: `maralatmaca`
3. **Application Startup File**: `node_modules/next/dist/bin/next`
4. **Arguments**: `start`
5. Environment değişkenlerini ekleyin
6. `npm install` ve `npm run build` çalıştırın

### Docker Deployment (Opsiyonel)

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build ve çalıştırma
docker build -t maralatmaca .
docker run -p 3000:3000 --env-file .env.production maralatmaca
```

### PM2 Yönetimi

```bash
# Durumu kontrol et
pm2 status

# Logları görüntüle
pm2 logs maralatmaca

# Yeniden başlat
pm2 restart maralatmaca

# Durdur
pm2 stop maralatmaca

# Sil
pm2 delete maralatmaca

# Monitoring
pm2 monit
```

## 🔒 Güvenlik

- ✅ CSRF koruması
- ✅ Rate limiting
- ✅ SQL injection koruması
- ✅ XSS koruması
- ✅ JWT authentication
- ✅ 2FA desteği
- ✅ IP banlama
- ✅ File upload güvenliği
- ✅ Security headers

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build testi
npm run build
```

## 📝 Veritabanı Şeması

### Ana Tablolar

- `books` - Kitaplar
- `chapters` - Bölümler
- `comments` - Yorumlar
- `likes` - Beğeniler
- `newsletter` - Newsletter aboneleri
- `contact_messages` - İletişim mesajları
- `admin_users` - Admin kullanıcıları
- `settings` - Site ayarları

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

Sorularınız için:
- Email: info@maralatmaca.com
- GitHub Issues: [github.com/yourusername/maralatmaca/issues](https://github.com/yourusername/maralatmaca/issues)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MySQL](https://www.mysql.com/)

---

Made with ❤️ by Maral Atmaca
