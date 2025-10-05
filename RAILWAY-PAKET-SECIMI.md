# 🚂 Railway Paket Seçimi - Maral Atmaca Projesi

## 📊 Proje İhtiyaçları

### Uygulamanın Gereksinimleri:
```
Next.js App:          ~300-500 MB RAM
MySQL Database:       ~200-400 MB RAM
Upload Storage:       ~1-5 GB disk
───────────────────────────────────
TOPLAM:              ~500-900 MB RAM + 1-5 GB disk
```

---

## 🎯 Paket Önerileri

### ✅ ÖNERİLEN: Hobby Plan ($5/ay)

**Özellikleri:**
- ✅ $5/ay minimum usage
- ✅ $5 monthly usage credit dahil
- ✅ 8 GB RAM / 8 vCPU per service
- ✅ Single developer workspace
- ✅ Community support
- ✅ Global regions

**Neden Hobby?**
1. **Yeterli RAM:** 8 GB - Senin projen max 1 GB kullanır
2. **MySQL Dahil:** MySQL servisi aynı pakette
3. **Storage:** Yeterli disk alanı
4. **Maliyet:** Kullandığın kadar öde ($5 minimum)
5. **Production Ready:** Küçük-orta trafik için ideal

**Maliyet Hesabı:**
```
Next.js service:      ~$2-3/ay
MySQL service:        ~$2-3/ay
───────────────────────────────
TOPLAM:              ~$4-6/ay
(Aylık $5 minimum charge)
```

---

### 🆓 İlk Başlangıç: Free Trial

**30 Gün Ücretsiz Test:**
- ✅ $5 credit ile başla
- ✅ 0.5 GB RAM (küçük test için OK)
- ✅ Kredi kartı gerekmez
- ✅ Test et, beğenirsen Hobby'ye geç

**Önerilen Strateji:**
```
1. Free ile başla (30 gün)
2. Projeyi deploy et ve test et
3. Trafik artarsa Hobby'ye upgrade
4. $5/ay ile devam et
```

---

### ❌ Gerekli DEĞIL: Pro Plan ($20/ay)

**Pro pahalı çünkü:**
- 32 GB RAM - Senin projen max 1 GB kullanır
- $20/ay - 4x daha pahalı
- Unlimited workspace seats - Tek kişisin
- Priority support - Gerek yok

**Pro ne zaman gerekir?**
- Günde 10,000+ ziyaretçi
- Ağır veritabanı işlemleri
- Çok sayıda concurrent user
- **Senin projen için: GEREKSIZ**

---

## 💰 Maliyet Karşılaştırması

| Plan | Aylık | RAM | Senin İhtiyacın | Öneri |
|------|-------|-----|-----------------|-------|
| **Free** | $0 (30 gün) | 0.5 GB | Test için | ⭐⭐⭐⭐⭐ İlk ay |
| **Hobby** | $5 | 8 GB | ✅ Yeterli | ⭐⭐⭐⭐⭐ Production |
| **Pro** | $20 | 32 GB | ❌ Çok fazla | ⭐ Gereksiz |

---

## 🎯 Önerilen Plan: Hobby ($5/ay)

### Neden Hobby Yeterli?

#### 1. Trafik Kapasitesi
```
Günlük:  ~1,000-5,000 ziyaretçi
Aylık:   ~30,000-150,000 ziyaretçi
```
Edebiyat sitesi için gayet yeterli.

#### 2. RAM Kullanımı
```
Normal kullanım:     500-700 MB
Peak zamanlar:       800-1,000 MB
Hobby plan limiti:   8,000 MB

Kullanım oranı:      ~10-15% ✅
```

#### 3. Database Boyutu
```
Kitaplar:           ~10-50 MB
Yorumlar:           ~10-100 MB
Kullanıcılar:       ~5-10 MB
Media metadata:     ~10-50 MB
───────────────────────────────
Toplam:            ~50-200 MB

Hobby yeterli:     ✅
```

#### 4. Concurrent Users
```
Hobby plan:         ~100-500 eşzamanlı
Senin ihtiyacın:    ~10-50 eşzamanlı
```
Fazlasıyla yeterli.

---

## 🚀 Deployment Planı

### Aşama 1: Free Trial (Gün 1-30)
```bash
1. Railway.app → Sign up
2. GitHub connect
3. Deploy maralatmaca
4. MySQL ekle (free credit ile)
5. Test et: maralatmaca.up.railway.app
6. Performansı izle
```
**Maliyet:** $0 (30 gün)

### Aşama 2: Hobby Plan (Gün 31+)
```bash
1. Billing → Upgrade to Hobby
2. $5/ay ödeme başlar
3. Otomatik scale
4. Production kullanımı
```
**Maliyet:** $5/ay

### Aşama 3: İleride (6-12 ay sonra)
```
Eğer:
- Günlük 5,000+ ziyaretçi
- Database 1 GB+
- Sürekli yüksek trafik

O zaman Pro'ya upgrade.
Ama şimdilik GEREKSIZ.
```

---

## 📈 Trafik Artarsa Ne Olur?

### Hobby Limitlerini Aşarsan:
```
Railway otomatik:
1. Uyarı gönderir
2. Yavaşlama başlar
3. Upgrade önerir
```

### Pro'ya Ne Zaman Geçilmeli?
```
✅ Günlük 10,000+ ziyaretçi
✅ Database 2 GB+
✅ RAM kullanımı %80+
✅ Response time >500ms

Şu an için: HOBBY YETER
```

---

## 💡 Sonuç ve Karar

### 🎯 Önerilen Strateji:

```
┌─────────────────────────────────────┐
│  1. Free Trial ile Başla (30 gün)  │
│     • Test et                       │
│     • Performans ölç                │
│     • $0 maliyet                    │
├─────────────────────────────────────┤
│  2. Hobby'ye Geç (Gün 31+)         │
│     • Production kullanımı          │
│     • $5/ay                         │
│     • Yeterli kapasite              │
├─────────────────────────────────────┤
│  3. İleride (eğer gerekirse)       │
│     • Trafik artarsa Pro            │
│     • Şimdilik gerek yok            │
└─────────────────────────────────────┘
```

### ✅ Cevap: HOBBY PLAN ($5/ay)

**Sebepler:**
- ✅ Senin projen için FAZLASIYLA yeterli
- ✅ MySQL dahil
- ✅ 8 GB RAM (sen max 1 GB kullanırsın)
- ✅ Production ready
- ✅ İlk 30 gün ücretsiz test
- ✅ Uygun fiyat ($5/ay)

**Pro ($20) gereksiz çünkü:**
- ❌ 32 GB RAM - kullanmayacaksın
- ❌ 4x pahalı
- ❌ Team features - tek kişisin
- ❌ Senin trafik için overkill

---

## 🚀 Hemen Başla

### Deploy Adımları:
```bash
1. railway.app/new
2. "Deploy from GitHub"
3. Repo seç: maralatmaca
4. "Add MySQL" (1-click)
5. Environment variables:
   - JWT_SECRET
   - ADMIN_EMAIL
   - ADMIN_PASSWORD
   - EMAIL_* değişkenleri
6. Deploy!
```

**30 gün ücretsiz, sonra $5/ay.**
**Kredi kartı bilgisi 30 gün sonra gerekir.**

---

## ❓ SSS

**S: İlk 30 gün gerçekten ücretsiz mi?**
C: Evet, $5 credit ile başlıyorsun. Kredi kartı gerekmez.

**S: 30 gün sonra otomatik ücret kesilir mi?**
C: Hayır, kredi kartı eklemezsen durdurulur. Eklersan $5/ay başlar.

**S: Hobby yetmezse ne olur?**
C: Railway uyarır, Pro'ya upgrade yaparsın. Ama senin proje için yeter.

**S: Pro'ya ihtiyacım var mı?**
C: HAYIR. Hobby fazlasıyla yeterli.

**Karar: HOBBY ($5/ay) 🎯**
