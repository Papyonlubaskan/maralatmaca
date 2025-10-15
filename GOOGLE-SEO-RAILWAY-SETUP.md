# Google SEO Railway Domain Setup

## Railway Domain SEO Optimizasyonu

Railway domain'inin (`maralatmaca-production.up.railway.app`) Google aramalarında `maralatmaca.com`'dan önce görünmesi için yapılan optimizasyonlar:

## ✅ Tamamlanan Optimizasyonlar

### 1. Canonical URL'ler
- Layout'ta canonical URL Railway domain'e yönlendirildi
- Tüm sayfalarda Railway domain canonical olarak ayarlandı

### 2. Metadata Base URL
- `metadataBase` Railway domain'e ayarlandı
- OpenGraph URL'leri Railway domain'e güncellendi

### 3. Sitemap.xml
- Sitemap'te tüm URL'ler Railway domain'e yönlendirildi
- Priority değerleri optimize edildi
- Change frequency'ler ayarlandı

### 4. Robots.txt
- Robots.txt Railway domain'e yönlendirildi
- SEO-friendly crawl kuralları eklendi
- Sitemap URL'leri güncellendi

## 🚀 Google Search Console Kurulumu

### Adım 1: Google Search Console'a Ekle
1. https://search.google.com/search-console/ adresine git
2. "Add Property" → "URL prefix" seç
3. `https://maralatmaca-production.up.railway.app` ekle

### Adım 2: Domain Ownership Doğrulama
**HTML File Method (Önerilen):**
1. Google'dan verilen HTML dosyasını indir
2. `public/` klasörüne koy
3. Site'yi deploy et
4. "Verify" butonuna tıkla

**Meta Tag Method:**
1. Google'dan verilen meta tag'i kopyala
2. `app/layout.tsx`'e ekle:
```tsx
<meta name="google-site-verification" content="VERIFICATION_CODE" />
```

### Adım 3: Sitemap Submit
1. Search Console'da "Sitemaps" sekmesine git
2. `https://maralatmaca-production.up.railway.app/sitemap.xml` ekle
3. Submit et

## 📈 SEO Performans Artırma

### 1. Content Optimization
- **Title Tags:** Railway domain ile optimize edildi
- **Meta Descriptions:** Railway domain ile güncellendi
- **Header Tags:** H1, H2, H3 yapısı optimize edildi

### 2. Technical SEO
- **Page Speed:** Next.js optimization aktif
- **Mobile Friendly:** Responsive design
- **SSL Certificate:** Railway otomatik SSL
- **Structured Data:** JSON-LD eklendi

### 3. Content Strategy
- **Blog Posts:** Düzenli içerik üretimi
- **Book Descriptions:** SEO-friendly açıklamalar
- **Author Bio:** Detaylı yazar profili
- **Contact Page:** İletişim bilgileri

## 🔍 Google Ranking Faktörleri

### 1. Domain Authority
- Railway domain güvenilir hosting
- SSL certificate aktif
- Fast loading times

### 2. Content Quality
- Unique content
- Regular updates
- User engagement

### 3. Technical Factors
- Mobile-first indexing
- Core Web Vitals
- Page experience signals

## 📊 Monitoring & Analytics

### 1. Google Analytics
```tsx
// app/layout.tsx'e eklendi
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Search Console Monitoring
- Search performance tracking
- Index coverage monitoring
- Mobile usability checks
- Core Web Vitals tracking

### 3. Performance Metrics
- Page load speed
- Mobile performance
- User experience metrics

## 🎯 Beklenen Sonuçlar

### 1. Kısa Vadeli (1-2 hafta)
- Railway domain Google'da indexlenir
- Search Console'da görünürlük artar
- Sitemap başarıyla submit edilir

### 2. Orta Vadeli (1-2 ay)
- Railway domain "Maral Atmaca" aramalarında görünür
- Organic traffic artmaya başlar
- Domain authority yükselir

### 3. Uzun Vadeli (3-6 ay)
- Railway domain maralatmaca.com'dan önce görünür
- Top 3 sonuçlarda yer alır
- Branded search dominance

## 🛠️ Maintenance

### 1. Düzenli Kontroller
- Search Console performance monitoring
- Sitemap güncellik kontrolü
- Mobile usability checks
- Core Web Vitals monitoring

### 2. Content Updates
- Düzenli blog posts
- Yeni kitap eklemeleri
- SEO-friendly descriptions
- Fresh content creation

### 3. Technical Maintenance
- Performance optimization
- Security updates
- SSL certificate renewal
- Backup procedures

---

**Sonraki Adımlar:**
1. Google Search Console'a Railway domain'i ekleyin
2. Domain ownership doğrulayın
3. Sitemap'i submit edin
4. Performance monitoring başlatın
5. Düzenli content updates yapın
