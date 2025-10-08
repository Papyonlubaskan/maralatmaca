-- Mevcut kitapların slug'larını düzelt

-- 1. Mevcut kitapları listele
SELECT id, title, slug FROM books ORDER BY id;

-- 2. SARKAÇ kitabını bul ve slug'ını düzelt
UPDATE books SET slug = 'sarkac' WHERE title = 'SARKAÇ' OR title LIKE '%SARKAÇ%';

-- 3. Saka ve Sanrı kitabının slug'ını kontrol et
UPDATE books SET slug = 'saka-ve-sanri' WHERE title = 'Saka ve Sanrı' OR title LIKE '%Saka%';

-- 4. Diğer kitapların slug'larını da düzelt
UPDATE books SET slug = LOWER(
  REPLACE(
    REPLACE(
      REPLACE(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(title, ' ', '-'),
              'ğ', 'g'
            ),
            'ü', 'u'
          ),
          'ş', 's'
        ),
        'ı', 'i'
      ),
      'ö', 'o'
    ),
    'ç', 'c'
  )
) WHERE slug IS NULL OR slug = '';

-- 5. Son kontrol
SELECT id, title, slug FROM books ORDER BY id;
