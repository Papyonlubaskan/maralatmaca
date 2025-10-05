# 🔧 Bakım Modu Kullanımı

## ✅ Yapılan Değişiklikler

1. ✅ **Hakkımda sayfası** düzeltildi (istatistikler kaldırıldı)
2. ✅ **D&R → BKM Kitap** değiştirildi
3. ✅ **Bakım modu** admin panelden kontrol edilebilir

---

## 🚧 Bakım Modunu Aktifleştirme

### Railway'de Environment Variable Ekle:

```
Railway → maralatmaca → Variables
+ New Variable

Name: MAINTENANCE_MODE
Value: true

SAVE
```

**Sonuç:**
- ✅ Site bakım modunda
- ✅ Admin panel çalışır (/yonetim)
- ❌ Diğer sayfalar bakım sayfası gösterir

---

## ✅ Bakım Modunu Kapatma

### Railway Variables:

```
MAINTENANCE_MODE variable'ını bul
→ Edit
→ Value: false

SAVE
```

**Sonuç:**
- ✅ Site normal çalışır
- ✅ Tüm sayfalar erişilebilir

---

## 🎯 Şu Anda Yapılacaklar

### 1. Bakım Modunu Aç (ŞİMDİ)

Railway'de variable ekle:
```
MAINTENANCE_MODE=true
```

Deploy tamamlanınca (2-3 dk):
- ✅ Okurlar bakım sayfası görecek
- ✅ Admin panel çalışacak

### 2. Database Düzelt

Railway Variables kontrol et:
```
DATABASE_URL=${{MySQL.DATABASE_URL}}
```

Doğru formatta olmalı!

### 3. Admin Panel Test

```
https://maralatmaca.com/yonetim

Login:
Email: admin@maralatmaca.com
Password: Maral2025@-
```

### 4. Database Hazır Olduktan Sonra

Admin panelden:
```
Ayarlar → Bakım Modu → KAPAT
```

Site açılır!

---

## 🔍 Kontrol

### Bakım Modu Aktif mi?
```
https://maralatmaca.com → Bakım sayfası ✅
https://maralatmaca.com/yonetim → Admin panel ✅
```

### Bakım Modu Kapalı mı?
```
https://maralatmaca.com → Ana sayfa ✅
https://maralatmaca.com/yonetim → Admin panel ✅
```

---

## 📋 Yapılacaklar Sırası:

1. [ ] Railway → MAINTENANCE_MODE=true ekle
2. [ ] Deploy bekle (2-3 dk)
3. [ ] Site test et (bakım modu görünmeli)
4. [ ] DATABASE_URL kontrol et
5. [ ] Admin panel test et
6. [ ] Database hazır olduktan sonra MAINTENANCE_MODE=false

---

**ŞİMDİ YAPILACAK:**

Railway Variables → New Variable:
```
MAINTENANCE_MODE = true
```

SAVE → Deploy bekle → Site bakım moduna girer!
