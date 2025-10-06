# 🔴 500 Hatası - Database Bağlantı Sorunu

## Sorun: MySQL Bağlı Değil

Railway'de DATABASE_URL boş string olarak görünüyordu.

---

## ✅ ÇÖZÜM - MySQL Service'i Bağla

### Yöntem 1: Connect Services (EN KOLAY)

**Railway Dashboard:**

1. **Sol menüde MySQL** service kartını bul
2. MySQL kartına **tıkla**
3. **"Connect"** butonunu bul (sağ üstte veya Settings'te)
4. **"maralatmaca"** service'ini seç
5. **Connect/Link** tıkla

**Railway otomatik yapacak:**
```
✅ DATABASE_URL ekler
✅ MYSQL_HOST, MYSQL_PORT, vs. ekler
✅ Service'leri bağlar
```

---

### Yöntem 2: Variable Reference (MANUEL)

**Railway → maralatmaca → Variables:**

1. **DATABASE_URL** variable'ını bul ve SİL
2. Aynı şekilde **DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME** SİL
3. **"+ Add Variable Reference"** tıkla (üstte mor link)
4. Service: **MySQL** seç
5. Her variable için:

```
DATABASE_URL → Reference: MySQL.DATABASE_URL
DB_HOST → Reference: MySQL.MYSQLHOST
DB_PORT → Reference: MySQL.MYSQLPORT
DB_USER → Reference: MySQL.MYSQLUSER
DB_PASSWORD → Reference: MySQL.MYSQLPASSWORD
DB_NAME → Reference: MySQL.MYSQLDATABASE
```

---

## 🧪 Test Et

Variables düzeltildikten sonra (2-3 dk deploy):

```
https://maralatmaca.com/api/health
```

**Başarılı yanıt:**
```json
{
  "status": "healthy",
  "database": {
    "status": "connected"
  }
}
```

**Hata varsa:**
```json
{
  "database": {
    "status": "disconnected"
  }
}
```

---

## 🎯 Şimdi Yap:

1. Railway Dashboard aç
2. MySQL kartına tıkla
3. "Connect" → maralatmaca seç
4. Deploy bekle (2-3 dk)
5. /api/health test et

---

**MySQL kartında "Connect" butonu var mı?**
