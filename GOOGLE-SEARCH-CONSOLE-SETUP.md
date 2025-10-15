# Google Search Console Kurulum Rehberi

## 🎯 Railway Domain için Google Search Console Kurulumu

### Adım 1: Google Search Console'a Erişim
1. **Google Search Console'a Git:**
   - https://search.google.com/search-console/ adresine git
   - Google hesabınızla giriş yapın

2. **Property Ekle:**
   - Sol üstteki dropdown'dan "Add Property" seçin
   - "URL prefix" seçeneğini işaretleyin
   - `https://maralatmaca-production.up.railway.app` yazın
   - "Continue" butonuna tıklayın

### Adım 2: Domain Ownership Doğrulama

#### Yöntem 1: HTML Dosyası (Önerilen)
1. **HTML Dosyasını İndir:**
   - Google'dan verilen HTML dosyasını indirin
   - Dosya adı: `google[VERIFICATION_CODE].html` şeklinde olacak

2. **Dosyayı Public Klasörüne Ekle:**
   ```bash
   # Dosyayı public/ klasörüne kopyalayın
   cp google[VERIFICATION_CODE].html public/
   ```

3. **Dosyayı Git'e Ekle:**
   ```bash
   git add public/google[VERIFICATION_CODE].html
   git commit -m "Add Google Search Console verification file"
   git push origin main
   ```

4. **Verification:**
   - Railway'de deploy tamamlandıktan sonra
   - Google'da "Verify" butonuna tıklayın

#### Yöntem 2: Meta Tag (Alternatif)
1. **Meta Tag'i Kopyala:**
   - Google'dan verilen meta tag'i kopyalayın
   - Örnek: `<meta name="google-site-verification" content="VERIFICATION_CODE" />`

2. **Layout'a Ekle:**
   ```tsx
   // app/layout.tsx dosyasına ekleyin
   <meta name="google-site-verification" content="VERIFICATION_CODE" />
   ```

### Adım 3: Sitemap Submit Etme

1. **Sitemap URL'si:**
   - `https://maralatmaca-production.up.railway.app/sitemap.xml`

2. **Submit İşlemi:**
   - Sol menüden "Sitemaps" seçin
   - "Add a new sitemap" tıklayın
   - Sitemap URL'sini yapıştırın
   - "Submit" butonuna tıklayın

### Adım 4: URL Inspection Test

1. **URL Test Et:**
   - Sol menüden "URL Inspection" seçin
   - `https://maralatmaca-production.up.railway.app` yazın
   - "Request Indexing" butonuna tıklayın

2. **Ana Sayfaları Test Et:**
   - `/kitaplar`
   - `/hakkimda`
   - `/iletisim`
   - `/blog`

### Adım 5: Performance Monitoring

1. **Search Performance:**
   - Sol menüden "Performance" seçin
   - Anahtar kelime performansını takip edin
   - "Maral Atmaca" aramalarını izleyin

2. **Coverage:**
   - Sol menüden "Coverage" seçin
   - Indexlenen sayfa sayısını kontrol edin
   - Hataları takip edin

3. **Core Web Vitals:**
   - Sol menüden "Experience" > "Core Web Vitals" seçin
   - Site performansını izleyin

## 📊 Beklenen Sonuçlar

### 1. Hafta
- ✅ Domain doğrulandı
- ✅ Sitemap submit edildi
- ✅ İlk sayfalar indexlenmeye başladı

### 2. Hafta
- 📈 "Maral Atmaca" aramalarında görünürlük
- 📊 Search performance verileri gelmeye başladı
- 🔍 URL inspection sonuçları

### 3-4. Hafta
- 🚀 "Maral Atmaca" aramalarında top 10
- 📈 Organic traffic artışı
- 🎯 Branded search dominance

## 🔧 Troubleshooting

### Domain Verification Hatası
- HTML dosyasının doğru yerde olduğunu kontrol edin
- Railway deploy'un tamamlandığını bekleyin
- URL'nin doğru erişilebilir olduğunu test edin

### Sitemap Hatası
- Sitemap URL'sinin çalıştığını kontrol edin
- XML formatının doğru olduğunu kontrol edin
- Sayfa sayısının makul olduğunu kontrol edin

### Indexing Sorunları
- URL inspection ile test edin
- Core Web Vitals'ı kontrol edin
- Mobile usability'yi kontrol edin

## 📱 Mobil Optimizasyon

1. **Mobile-Friendly Test:**
   - https://search.google.com/test/mobile-friendly
   - Railway domain'i test edin

2. **PageSpeed Insights:**
   - https://pagespeed.web.dev/
   - Performance skorunu kontrol edin

## 🎯 SEO Monitoring

### Günlük Kontroller
- Search Console performance raporu
- New indexing notifications
- Error alerts

### Haftalık Kontroller
- Anahtar kelime performansı
- Click-through rates
- Impressions growth

### Aylık Kontroller
- Domain authority artışı
- Backlink profile
- Competitor analysis

---

## 🚀 Hemen Yapılacaklar

1. ✅ Google Search Console'a Railway domain ekleyin
2. ✅ HTML verification dosyasını public/ klasörüne ekleyin
3. ✅ Sitemap'i submit edin
4. ✅ URL inspection test edin
5. ✅ Performance monitoring başlatın

**Sonuç:** Railway domain Google'da "Maral Atmaca" aramalarında #1 sıraya çıkmaya hazır! 🎯
