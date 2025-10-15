# Google Search Console - Adım Adım Kurulum

## 🎯 Railway Domain: maralatmaca-production.up.railway.app

### ADIM 1: Google Search Console'a Erişim

1. **Web Tarayıcısını Aç**
   - Chrome, Firefox veya Safari kullanabilirsiniz

2. **Google Search Console'a Git**
   - Adres çubuğuna yazın: `https://search.google.com/search-console/`
   - Enter tuşuna basın

3. **Google Hesabı ile Giriş**
   - Eğer giriş yapmadıysanız, Google hesabınızla giriş yapın
   - Eğer Google hesabınız yoksa, oluşturun

### ADIM 2: Property Ekleme

1. **"Add Property" Butonunu Bul**
   - Sol üst köşede "Add Property" yazısını göreceksiniz
   - Bu butona tıklayın

2. **Property Türü Seç**
   - İki seçenek göreceksiniz:
     - "Domain" (önerilmez)
     - "URL prefix" (✅ Bu seçeneği seçin)

3. **Domain URL'sini Gir**
   - URL prefix alanına yazın: `https://maralatmaca-production.up.railway.app`
   - Tam olarak bu şekilde yazın (https:// ile başlayarak)

4. **Continue Butonuna Tıkla**
   - "Continue" butonuna tıklayın

### ADIM 3: Domain Ownership Doğrulama

Google size 5 farklı doğrulama yöntemi sunacak:

#### Yöntem 1: HTML Dosyası (ÖNERİLEN) ✅

1. **"HTML file" Seçeneğini Seç**
   - "Download this HTML verification file" linkine tıklayın
   - Dosya bilgisayarınıza inecek

2. **Dosyayı Public Klasörüne Kopyala**
   ```bash
   # Terminal/Command Prompt açın ve şu komutları çalıştırın:
   cd C:\Users\Teknogenetik\Downloads\maralatmaca
   copy "indirilen-dosya-adı.html" public\
   ```

3. **Dosyayı Git'e Ekle**
   ```bash
   git add public/
   git commit -m "Add Google Search Console verification file"
   git push origin main
   ```

4. **Railway Deploy Bekle**
   - Railway'de deploy tamamlanmasını bekleyin (2-3 dakika)

5. **Google'da Verify Et**
   - Google Search Console'a dönün
   - "Verify" butonuna tıklayın

#### Yöntem 2: HTML Tag (Alternatif)

1. **"HTML tag" Seçeneğini Seç**
   - Meta tag'i kopyalayın (tam olarak)

2. **Layout Dosyasına Ekle**
   - `app/layout.tsx` dosyasını açın
   - `<head>` bölümüne meta tag'i ekleyin

3. **Deploy ve Verify**
   - Git'e commit edin ve push edin
   - Railway deploy bekleyin
   - Google'da verify edin

### ADIM 4: Sitemap Submit Etme

1. **Sol Menüden "Sitemaps" Seç**
   - Sol taraftaki menüden "Sitemaps" linkine tıklayın

2. **"Add a new sitemap" Butonuna Tıkla**
   - "Add a new sitemap" butonunu bulun ve tıklayın

3. **Sitemap URL'sini Gir**
   - URL alanına yazın: `sitemap.xml`
   - Tam URL değil, sadece `sitemap.xml`

4. **Submit Et**
   - "Submit" butonuna tıklayın

### ADIM 5: URL Inspection Test

1. **"URL Inspection" Seç**
   - Sol menüden "URL Inspection" seçin

2. **Ana Sayfayı Test Et**
   - URL alanına yazın: `https://maralatmaca-production.up.railway.app`
   - Enter tuşuna basın

3. **"Request Indexing" Tıkla**
   - "Request Indexing" butonuna tıklayın

4. **Diğer Sayfaları Test Et**
   - `/kitaplar`
   - `/hakkimda`
   - `/iletisim`

### ADIM 6: Performance Monitoring

1. **"Performance" Seç**
   - Sol menüden "Performance" seçin

2. **Anahtar Kelimeleri İzle**
   - "Maral Atmaca" aramalarını takip edin
   - Click-through rates'i kontrol edin

3. **Coverage Kontrol**
   - Sol menüden "Coverage" seçin
   - Indexlenen sayfa sayısını kontrol edin

## 📊 Beklenen Sonuçlar

### İlk 24 Saat
- ✅ Domain doğrulandı
- ✅ Sitemap submit edildi
- ✅ İlk sayfalar Google'da görünmeye başladı

### 1. Hafta
- 📈 "Maral Atmaca" aramalarında görünürlük
- 📊 Search performance verileri gelmeye başladı
- 🔍 URL inspection sonuçları

### 2-4. Hafta
- 🚀 "Maral Atmaca" aramalarında top 10
- 📈 Organic traffic artışı
- 🎯 Branded search dominance

## 🔧 Sorun Giderme

### Domain Verification Hatası
**Sorun:** "Verification failed" hatası
**Çözüm:**
1. HTML dosyasının `public/` klasöründe olduğunu kontrol edin
2. Railway deploy'un tamamlandığını bekleyin
3. URL'nin erişilebilir olduğunu test edin: `https://maralatmaca-production.up.railway.app/google[VERIFICATION_CODE].html`

### Sitemap Hatası
**Sorun:** "Sitemap could not be read" hatası
**Çözüm:**
1. Sitemap URL'sini test edin: `https://maralatmaca-production.up.railway.app/sitemap.xml`
2. XML formatının doğru olduğunu kontrol edin
3. Birkaç saat bekleyip tekrar deneyin

### Indexing Sorunları
**Sorun:** Sayfalar indexlenmiyor
**Çözüm:**
1. URL inspection ile test edin
2. Core Web Vitals'ı kontrol edin
3. Mobile usability'yi test edin

## 📱 Ek Testler

### Mobile-Friendly Test
1. https://search.google.com/test/mobile-friendly adresine git
2. `https://maralatmaca-production.up.railway.app` yaz
3. "Test URL" butonuna tıkla

### PageSpeed Test
1. https://pagespeed.web.dev/ adresine git
2. Railway domain'i test et
3. Performance skorunu kontrol et

---

## 🚀 ÖZET - Yapılacaklar Listesi

- [ ] Google Search Console'a git: https://search.google.com/search-console/
- [ ] "Add Property" → "URL prefix" seç
- [ ] `https://maralatmaca-production.up.railway.app` ekle
- [ ] HTML file verification yöntemini seç
- [ ] Verification dosyasını indir
- [ ] Dosyayı `public/` klasörüne kopyala
- [ ] Git'e commit et ve push et
- [ ] Railway deploy bekle
- [ ] Google'da "Verify" et
- [ ] Sitemap submit et: `sitemap.xml`
- [ ] URL inspection test et
- [ ] Performance monitoring başlat

**Sonuç:** Railway domain Google'da "Maral Atmaca" aramalarında #1 sıraya çıkmaya hazır! 🎯
