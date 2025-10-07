-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 06 Eki 2025, 12:34:54
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `maralatmaca`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'admin',
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `two_factor_secret` varchar(255) DEFAULT NULL,
  `two_factor_enabled` tinyint(1) DEFAULT 0,
  `two_factor_backup_codes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `role`, `password_hash`, `is_active`, `last_login`, `created_at`, `updated_at`, `two_factor_secret`, `two_factor_enabled`, `two_factor_backup_codes`) VALUES
(1, 'admin', 'admin@maralatmaca.com', 'admin', '$2b$10$0SNj3rPjpowfGZDVZMI9Xe9b.8ejOVtnN9NVPA6alHml3..tO8mi.', 1, NULL, '2025-09-30 04:52:56', '2025-10-02 19:15:57', NULL, 0, NULL),
(2, 'Okan', 'okandemirorg@maralatmaca.com', 'Admin', '$2b$10$GJ49Gaj.4HLk68jgNzQY5eMR97NuQMq7DOgRDXaTJQq474eF4ALJm', 1, NULL, '2025-10-02 19:17:03', '2025-10-02 19:17:03', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `admin_sessions`
--

CREATE TABLE `admin_sessions` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  `last_activity` datetime DEFAULT current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `admin_sessions`
--

INSERT INTO `admin_sessions` (`id`, `admin_id`, `token`, `last_activity`, `is_active`, `ip_address`, `user_agent`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'session_1759212473725_zt3s3etj6', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:07:53', '2025-09-30 06:07:53', '2025-10-03 16:48:19'),
(2, 1, 'session_1759212777840_vnk51pev9', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:12:57', '2025-09-30 06:12:57', '2025-10-03 16:48:19'),
(3, 1, 'session_1759212814522_cco2srsvf', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:13:34', '2025-09-30 06:13:34', '2025-10-03 16:48:19'),
(4, 1, 'session_1759212947502_s5dzspnkk', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:15:47', '2025-09-30 06:15:47', '2025-10-03 16:48:19'),
(5, 1, 'session_1759214063778_pl2chf6ok', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:34:23', '2025-09-30 06:34:23', '2025-10-03 16:48:19'),
(6, 1, 'session_1759214967257_jpa212pkv', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:49:27', '2025-09-30 06:49:27', '2025-10-03 16:48:19'),
(7, 1, 'session_1759214978192_vg9tresqe', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:49:38', '2025-09-30 06:49:38', '2025-10-03 16:48:19'),
(8, 1, 'session_1759215177073_55hrhhkp2', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:52:57', '2025-09-30 06:52:57', '2025-10-03 16:48:19'),
(9, 1, 'session_1759215504045_3kd9b6veo', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:58:24', '2025-09-30 06:58:24', '2025-10-03 16:48:19'),
(10, 1, 'session_1759215524589_7e6g8qvan', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:58:44', '2025-09-30 06:58:44', '2025-10-03 16:48:19'),
(11, 1, 'session_1759215538929_lq2lzuv4o', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 06:58:58', '2025-09-30 06:58:58', '2025-10-03 16:48:19'),
(12, 1, 'session_1759215621703_nxvzu6bsx', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 07:00:21', '2025-09-30 07:00:21', '2025-10-03 16:48:19'),
(13, 1, 'session_1759216050192_h2fwkm9hp', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 07:07:30', '2025-09-30 07:07:30', '2025-10-03 16:48:19'),
(14, 1, 'session_1759216808899_g0vz21pbv', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 07:20:08', '2025-09-30 07:20:08', '2025-10-03 16:48:19'),
(15, 1, 'session_1759217947548_0k48hj924', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 07:39:07', '2025-09-30 07:39:07', '2025-10-03 16:48:19'),
(16, 1, 'session_1759218326212_tl2te38oc', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-07 07:45:26', '2025-09-30 07:45:26', '2025-10-03 16:48:19'),
(17, 2, 'session_1759433420551_9m4fpeazg', '2025-10-03 16:48:19', 1, NULL, NULL, '2025-10-09 19:30:20', '2025-10-02 19:30:20', '2025-10-03 16:48:19'),
(18, 2, 'session_1759499159962_wohvp3bab', '2025-10-03 17:17:47', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2025-10-03 14:17:47', '2025-10-03 13:45:59', '2025-10-03 17:17:47'),
(19, 2, 'session_1759541000718_kvut26sa4', '2025-10-04 06:02:46', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2025-10-04 03:02:46', '2025-10-04 01:23:20', '2025-10-04 06:02:46'),
(20, 2, 'session_1759549868178_1mnry6a1x', '2025-10-04 07:45:46', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2025-10-04 04:45:46', '2025-10-04 03:51:08', '2025-10-04 07:45:46'),
(21, 2, 'session_1759569164608_me8sn0iby', '2025-10-04 12:21:31', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2025-10-04 09:21:31', '2025-10-04 09:12:44', '2025-10-04 12:21:31'),
(22, 2, 'session_1759737135815_9mia5w8c0', '2025-10-06 12:06:42', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2025-10-06 09:06:42', '2025-10-06 07:52:15', '2025-10-06 12:06:42'),
(23, 2, 'session_1759743102724_ow0fntz5l', '2025-10-06 12:48:12', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2025-10-06 09:48:12', '2025-10-06 09:31:42', '2025-10-06 12:48:12'),
(24, 2, 'session_1759746680967_qlywv3g5q', '2025-10-06 13:34:51', 1, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', '2025-10-06 10:34:51', '2025-10-06 10:31:20', '2025-10-06 13:34:51');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `analytics_events`
--

CREATE TABLE `analytics_events` (
  `id` int(11) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `page_url` varchar(500) NOT NULL,
  `user_agent` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `analytics_performance`
--

CREATE TABLE `analytics_performance` (
  `id` int(11) NOT NULL,
  `page_url` varchar(500) NOT NULL,
  `page_load_time` decimal(10,2) DEFAULT NULL,
  `first_contentful_paint` decimal(10,2) DEFAULT NULL,
  `largest_contentful_paint` decimal(10,2) DEFAULT NULL,
  `first_input_delay` decimal(10,2) DEFAULT NULL,
  `cumulative_layout_shift` decimal(10,4) DEFAULT NULL,
  `viewport_width` int(11) DEFAULT NULL,
  `viewport_height` int(11) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `analytics_sessions`
--

CREATE TABLE `analytics_sessions` (
  `id` int(11) NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `first_page` varchar(500) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `device_type` varchar(50) DEFAULT NULL,
  `browser` varchar(100) DEFAULT NULL,
  `os` varchar(100) DEFAULT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ended_at` timestamp NULL DEFAULT NULL,
  `duration_seconds` int(11) DEFAULT NULL,
  `page_views` int(11) DEFAULT 1,
  `is_bounce` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `banned_ips`
--

CREATE TABLE `banned_ips` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `subnet` varchar(50) DEFAULT NULL,
  `fingerprint` varchar(100) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `auto_banned` tinyint(1) DEFAULT 0,
  `suspicion_score` int(11) DEFAULT 0,
  `banned_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `cover_image` varchar(500) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'published',
  `publish_date` date DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `amazon_link` varchar(500) DEFAULT NULL,
  `dr_link` varchar(500) DEFAULT NULL,
  `idefix_link` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `books`
--

INSERT INTO `books` (`id`, `title`, `slug`, `description`, `content`, `cover_image`, `author`, `category`, `status`, `publish_date`, `views`, `amazon_link`, `dr_link`, `idefix_link`, `created_at`, `updated_at`) VALUES
(2, 'Saka ve Sanrı', 'saka-ve-sanr', 'Gerçeklik ile hayal arasındaki ince çizgiyi sorgulayan bir hikaye. Yazar Maral Atmaca tarafından kaleme alınan bu eser, okuyucuları farklı bir dünyaya taşıyor.', '', '/uploads/images/WhatsApp_Image_2025-10-06_at_00.26.00_16d7112e.jpeg', 'Maral Atmaca', NULL, 'published', '0000-00-00', 3, '', '', '', '2025-09-30 04:50:26', '2025-10-06 09:47:54');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `book_views`
--

CREATE TABLE `book_views` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `book_views`
--

INSERT INTO `book_views` (`id`, `book_id`, `ip_address`, `viewed_at`) VALUES
(1, 2, '::1', '2025-10-01 19:48:18'),
(2, 10, '::1', '2025-10-02 12:53:12'),
(4, 12, '::1', '2025-10-02 13:23:55'),
(5, 31, '::1', '2025-10-02 17:09:57'),
(6, 32, '::1', '2025-10-03 13:47:10'),
(8, 35, '::1', '2025-10-04 09:16:14');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `order_number` int(11) DEFAULT 1,
  `status` enum('draft','published') DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `chapters`
--

INSERT INTO `chapters` (`id`, `book_id`, `title`, `slug`, `content`, `order_number`, `status`, `created_at`, `updated_at`) VALUES
(4, 2, 'Giriş', 'giris', '     Bu sabah aldığı bir haber yüzünden Duha Tunus ofisinin içinde sinirden dönüp duruyordu. Rengin, sevdiği kadın evleniyordu, hem de ezelî düşmanıyla! Yıllardır âşık olduğu kadın onun yerine Karun’u seçmişti! Hayır, Duha bu evliliğe izin vermeyecekti. Bu evliliğin olmaması için gerekirse Karun’u bile mezara gönderebilirdi. Duha’ya ait bir kadınla evlenmeye kalkışmak bile kendi ölüm fermanını imzalamaktı. Rengin onundu, sadece onun.\n\n     Odanın içinde şuursuzca dönüp dururken elinin tersiyle masanın üstündeki her şeyi yere itti.\n\n     Rengin ondan başka kimseyle olamazdı!\n\n     Ellerini masaya bastırırken odada duyulan tek şey aldığı hızlı nefeslerin sesiydi.\n\n     Burnundan nefes aldıkça göğüs kafesi şişiyor ve yükselip alçalıyordu. Gerilen sırt kasları her an üzerindeki gömleği ikiye ayıracakmış gibi görünüyordu. Yaşadığı öfke ve adrenalinden olsa gerek terlemeye başlamıştı. Hiç iyi değildi. Siyah saçlarının dipleri nemlendiği için alnındaki ter damlacıkları gün ışığıyla parlıyordu. Rengin’in ihaneti kalbini ezdiği için kömür karası gözlerinde henüz dökmediği kanların intikamı vardı.\n\n     Bunu ona nasıl yapabildi?\n\n     Rengin’i düşündükçe çehresi öfkeyle kasılıyor, yanak kasları seğiriyordu. Daha birkaç gün önce onunla birlikte olan kadın onun yatağından çıkmış ve Karun’un yüzüğünü parmağına takmaya gitmişti. Duha kendini hiç bu kadar âciz ve sefil hissetmemişti. Rengin onu bitirmişti.\n\n     Omzuna giren şiddetli ağrıyla dişlerini sıkarak yerinde sendeledi. Birkaç adım arkaya atıp kendi sebep olduğu dağınıklığın içinde bocaladı. Sol kolunu tutarken güç bela iri bedenini bir koltuğa atmayı başarmıştı. Başını eğip sol eline bakınca parmaklarının hissizliğini gördü.\n\n     Sol elini oynatmaya çalıştı ama başaramadı, parmakları hiç kıpırdamıyordu.\n\n     Acıyla tutulan sol eline bakarken gözleri dolarak güldü. “Ah, ulan Rengin.” Gözlerinin siyahı biriken yaşlarla ışıldadı. “Bana verdiğin zararın bir sonu yok!” Duha ona ne istediyse hep vermiş, dünyayı onun ayaklarının altına sermişti. Onu mutlu etmek için ne gerekiyorsa yapmıştı ama Rengin için yeterli olmamıştı. Düşmanına gittiğine göre onun için yaptığı hiçbir şey Rengin için yeterli değildi.\n\n     Çalışma odasının kapısı açılınca içeri giren Kadem’i gördü. Sadık adamı ve yakın dostu kimse onu bu hâlde görmesin diye kapıyı hemen kapatmıştı. “Abi iyi misin?” dediğinde Duha gözleriyle köşedeki dolabı işaret etti. \n\n“İçecek bir şeyler ver bana.”\n\n     Hâlâ ara sıra sol elini kontrol ediyor, Kadem’e belli etmeden parmaklarını hareket ettirmeye çalışıyordu. Kadem dolaba doğru yürüyünce Duha felç geçirmiş gibi görünen elini dizinin üzerine koydu. Bu sık sık başına geldiği için birazdan geçeceğini iyi biliyordu. Belki de bu sefer geçmezdi. Son zamanlarda doktor kontrolünü çok ihmal ediyordu.\n\n     Kadem dolaptan viski şişesini aldı ama bardaklara uzanmıştı ki Duha, “Bardak kalsın,” deyince başını sallayıp ona doğru yürüdü. Açtığı şişeyi Duha’ya uzattıktan sonra onun karşısına oturdu. Duha’nın neden bu hâlde olduğunu ne yazık ki iyi biliyordu. Bugün Karun’a karşı kaybettiği bir gündü.\n\n     Duha şişeyi kafasına dikip nefessiz kalana kadar içti. Sabah aç karınla içtiği şey boğazını asit gibi yakıp geçmişti. İçkiyi dudaklarından uzaklaştırıp derin bir nefes aldığında hiç iyi görünmüyordu. “Neden?” Cevabını bulamadığı bir soruyu Kadem’e sordu. “Karun’u neden bana tercih etti?” Bu sabah öğrendiği tek şey Rengin’in evlilik haberi değildi. Son iki yıldır Rengin’in sadece onunla değil, Karun’la da görüştüğünü öğrenmişti!\n\n     Rengin meğerse iki yıldır iki adam arasında gidip geliyor ve en iyisini seçmeye çalışıyormuş! Duha sevdiği kadının sadakatinden şüphelenip onu hiç takip ettirmemişti.\n\n     Üstelik Rengin’i düşmanlarından korumak için onu hep sır gibi saklamıştı. Rengin’i hedef hâline getirmemek için onunla olan ilişkisini hep gizli tutmuştu. Böyle yaparak Rengin’in işini kolaylaştırdığını hiç anlamamıştı.\n\n     Duha ile olan ilişkisini kimse bilmediği için bu âlemdeki başka bir adamla da rahatça düşüp kalkmıştı! Onu aldatmıştı, hem de iki yıl boyunca. Görüştüğü adam Karun Kalender’di!\n\n     Ondan ölesiye nefret ettiğini bildiği hâlde ona gitmişti! “Kenan ile konuştum,” diyen Kadem’in sesiyle içmeyi bırakıp ona baktı. “Duyunca şoke oldu çünkü ne o ne de Karun gerçeği biliyormuş.” Kadem’in ona olan bakışları fazla sıkıntılıydı. “Abi Karun henüz Rengin’in seninle olan ilişkisini bilmiyor çünkü iki yıldır Rengin ile ciddi bir ilişkisi varmış.” Bunları söylemek Kadem için hiç kolay değildi ama gerçek buydu. Bir kadının sadakatsizliğini hayretler içinde izliyordu.\n\n     Kadem, Duha’nın çaresizliğini görünce yenilgi içinde başını eğdi. Silah tutmaktan nasırlar oluşan parmaklarını saçlarına daldırdı ve kahverengi tutamlarının her birini dağıttı.\n\n     Böyle bir rezilliğin içinde nasıl çıkacağını o da bilmiyordu. Rengin’in ne yapmaya çalıştığını çok düşünmüş ama mantıklı bir cevap bulamamıştı. Bu âlemdeki herkes Duha ve Karun’un arasındaki husumeti çok iyi biliyordu. Rengin her an birbirlerinin gırtlağına çökecek iki adamın arasındaki düşmanlığı iyice had safhaya taşımıştı.\n\n     İkisiyle de iki yıl boyunca gizli bir ilişki yürütmesi ve içlerinden biriyle evlenmeye kalkışması akıl kârı değildi. Bu alelade bir aldatma olamazdı. Karun’un can dostu Kenan ile görüşmüştü ve Kenan da onunla aynı fikirdeydi. Bu işin altında birileri vardı. \n\n', 1, 'published', '2025-09-30 15:39:57', '2025-10-06 09:47:43');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `book_id` int(11) DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `user_ip` varchar(50) DEFAULT NULL,
  `user_fingerprint` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `line_number` int(11) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'approved',
  `is_hidden` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `concurrent_locks`
--

CREATE TABLE `concurrent_locks` (
  `id` int(11) NOT NULL,
  `resource_type` varchar(50) NOT NULL COMMENT 'book, comment, setting, vb.',
  `resource_id` varchar(255) NOT NULL COMMENT 'Kaynağın ID si',
  `admin_id` int(11) NOT NULL,
  `admin_username` varchar(255) NOT NULL,
  `locked_until` datetime NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` text NOT NULL,
  `reply_message` text DEFAULT NULL,
  `replied_at` timestamp NULL DEFAULT NULL,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `priority` enum('low','normal','high') DEFAULT 'normal',
  `user_ip` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `book_id` int(11) DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `line_number` int(11) DEFAULT NULL,
  `user_ip` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `likes`
--

INSERT INTO `likes` (`id`, `book_id`, `chapter_id`, `line_number`, `user_ip`, `created_at`) VALUES
(12, 2, NULL, NULL, '::ffff:127.0.0.1', '2025-09-30 07:46:59'),
(224, 2, 4, NULL, '127.0.0.1', '2025-10-01 20:04:47'),
(267, 2, NULL, NULL, 'test_ip_1759542909232', '2025-10-04 01:55:09'),
(288, NULL, 4, 3, '::1', '2025-10-06 07:34:50'),
(290, NULL, 4, 4, '::1', '2025-10-06 07:34:54');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `newsletter_notifications`
--

CREATE TABLE `newsletter_notifications` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL COMMENT 'new-book, new-chapter',
  `title` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `sent_at` timestamp NULL DEFAULT NULL,
  `recipient_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `newsletter_notifications`
--

INSERT INTO `newsletter_notifications` (`id`, `type`, `title`, `message`, `book_id`, `chapter_id`, `created_at`, `sent_at`, `recipient_count`) VALUES
(1, 'new-book', 'Test', 'Yeni kitap: \"Test\" yayınlandı! Hemen okumaya başlayın.', 35, NULL, '2025-10-04 09:15:32', NULL, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','unsubscribed','bounced') DEFAULT 'active',
  `unsubscribe_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `name`, `subscribed_at`, `status`, `unsubscribe_token`, `created_at`, `updated_at`) VALUES
(1, 'test@example.com', 'Test User', '2025-09-30 05:10:29', 'active', NULL, '2025-09-30 05:10:29', '2025-09-30 05:10:29'),
(2, 'test@test.com', NULL, '2025-09-30 17:23:38', 'active', NULL, '2025-09-30 17:23:38', '2025-09-30 17:23:38'),
(3, 'okandemir1912@gmail.com', NULL, '2025-10-02 13:30:00', 'active', NULL, '2025-10-02 13:30:00', '2025-10-02 13:30:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `security_logs`
--

CREATE TABLE `security_logs` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `severity` varchar(20) DEFAULT 'low',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `security_logs`
--

INSERT INTO `security_logs` (`id`, `type`, `message`, `ip`, `user_agent`, `user_id`, `severity`, `created_at`) VALUES
(1, 'system_access', 'Admin kullanıcısı güncellendi: admin', NULL, NULL, NULL, 'low', '2025-10-02 19:09:19'),
(2, 'system_access', 'Admin kullanıcısı güncellendi: admin', NULL, NULL, NULL, 'low', '2025-10-02 19:09:20'),
(3, 'system_access', 'Admin kullanıcı şifresi değiştirildi (ID: 1)', NULL, NULL, NULL, 'medium', '2025-10-02 19:15:57'),
(4, 'system_access', 'Yeni admin kullanıcısı oluşturuldu: Okan', NULL, NULL, NULL, 'low', '2025-10-02 19:17:03');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `key` varchar(100) NOT NULL,
  `value` text DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `end_time`, `description`, `created_at`) VALUES
(1, 'maintenanceMode', 'false', NULL, 'Site bakım modu', '2025-09-30 04:50:26'),
(2, 'siteTitle', 'Maral Atmaca', NULL, 'Site başlığı', '2025-09-30 04:50:26'),
(3, 'maintenance_mode', 'false', NULL, NULL, '2025-10-01 17:04:14'),
(28, 'site_name', 'Yazar & Hikaye Anlatıcısı - Maral Atmaca', NULL, NULL, '2025-10-02 13:21:03'),
(29, 'site_description', 'Merhaba, Ben Maral\nMaral Atmaca 1991 yılında Aksaray\'nın küçük bir ilçesinde doğmuştur. Çocuk yaşlardan beri yazmaya ilgi duyan yazarın ilk yazım denemeleri şiir ve öykü üzerine olmuş, ilk romanını ise 2017 yılında yazmaya başlamıştır.\n\nHayatının büyük bir bölümünü yazmaya adayan Maral Atmaca, gördüğü, duyduğu ve yaşildiği her şeyden esinlenmeyi sevmekte. Yazarın basılı eserleri Yaralasar, Ötanazi Okulu, Medusa\'nın Ölü Kumları, Öyle Bir Uğradım, Saka ve Sanrı romanlarıdır.\n\nHer hikaye yazdığım da, sadece kendi hayal gücümle değil, aynı zamanda binlerce okurumun kalbiyle de yazıyorum. Onların yorumları, duygusal tepkileri ve beklentileri, hikayelerimi şekillendiriyor.', NULL, NULL, '2025-10-02 13:21:03'),
(30, 'site_logo', '', NULL, NULL, '2025-10-02 13:21:03'),
(31, 'contact_email', 'atmacamaral183@mail.com', NULL, NULL, '2025-10-02 13:21:03'),
(32, 'contact_phone', '', NULL, NULL, '2025-10-02 13:21:03'),
(33, 'contact_address', '', NULL, NULL, '2025-10-02 13:21:03'),
(34, 'social_instagram', 'https://www.instagram.com/maral_atmaca/?igshid=dWJmb3M1cnBrbjM1&utm_source=qr', NULL, NULL, '2025-10-02 13:21:03'),
(35, 'social_twitter', '', NULL, NULL, '2025-10-02 13:21:03'),
(36, 'social_facebook', '', NULL, NULL, '2025-10-02 13:21:03'),
(37, 'social_youtube', '', NULL, NULL, '2025-10-02 13:21:03'),
(38, 'social_whatsapp', 'https://www.whatsapp.com/channel/0029VaMQf66GpLHORoiwht2b', NULL, NULL, '2025-10-02 13:21:03'),
(39, 'social_spotify', 'https://open.spotify.com/user/31cxmviybemcerfgxks6cy72xlva?', NULL, NULL, '2025-10-02 13:21:03'),
(40, 'seo_meta_title', 'Türk Edebiyatı Yazarı | Kitaplar, Romanlar, Hikayeler - Maral Atmaca', NULL, NULL, '2025-10-02 13:21:03'),
(41, 'seo_meta_description', 'Yazar Maral Atmaca\'nın resmi web sitesi.Yarala Sar, Saka ve Sanrı gibi çağdaş Türk edebiyatının önemli eserlerinin sahibi olan Maral Atmaca\'nın eserlerini ücretsiz okuyun', NULL, NULL, '2025-10-02 13:21:03'),
(42, 'seo_meta_keywords', 'Maral Atmaca kitapları, Maral Atmaca biyografi, Maral Atmaca eserleri, Maral Atmaca romanları, Maral Atmaca şiirleri, Maral Atmaca edebiyatı, Maral Atmaca hayranları, Maral Atmaca incelemeleri, Maral Atmaca okumak, Maral Atmaca etkinlikleri, Maral Atmaca röportaj, Maral Atmaca ödülleri, Maral Atmaca sosyal medya, Maral Atmaca okuma listesi, Maral Atmaca kitap önerileri, Maral Atmaca yazım tarzı, Maral Atmaca edebi kariyeri, Maral Atmaca eser analizi, Maral Atmaca takip et, Maral Atmaca kitap fuarı, Maral Atmaca edebi etkinlikler, Maral Atmaca kitap tanıtımı, Maral Atmaca edebi dergiler, Maral Atmaca yazıları, Maral Atmaca okurları, Maral Atmaca edebiyat festivali, Maral Atmaca eleştirileri, Maral Atmaca yazma süreci, Maral Atmaca roman incelemesi, Maral Atmaca şiir analizi, Maral Atmaca eserleri listesi, Maral Atmaca kitap alıntıları, Maral Atmaca edebi mirası, Maral Atmaca yazar profili, Maral Atmaca güncel haberler, Maral Atmaca kitap önerisi, Maral Atmaca romanları okuma listesi, Maral Atmaca eserleri hakkında, Maral Atmaca sosyal medya hesapları, Maral Atmaca yazar etkinlikleri, Maral Atmaca okuma grubu, Maral Atmaca edebi çalışmaları, Maral Atmaca kitap incelemesi, Maral Atmaca edebi tanıtımlar, Maral Atmaca yazım teknikleri, Maral Atmaca yazar röportajları, Maral Atmaca kitap kulübü, Maral Atmaca edebi eserleri, Maral Atmaca yeni kitap, Maral Atmaca edebiyat dünyası, Maral Atmaca yazarları, Maral Atmaca kitap eleştirisi, Maral Atmaca yazım stili, Maral Atmaca eser yorumları, Maral Atmaca edebi iletişim, Maral Atmaca kitap serileri, Maral Atmaca edebi dergi yazıları, Maral Atmaca yazar görüşleri, Maral Atmaca eser değerlendirmeleri, Maral Atmaca edebi eser analizi, Maral Atmaca kitap ödülleri, Maral Atmaca roman önerileri, Maral Atmaca şiir kitapları, Maral Atmaca kitapları hakkında yorumlar, Maral Atmaca edebiyat eserleri, Maral Atmaca yazar etkinlikleri, Maral Atmaca eser incelemeleri, Maral Atmaca yazma teknikleri, Maral Atmaca okuma deneyimleri, Maral Atmaca kitap tanıtım yazıları, Maral Atmaca edebi çalışmalar, Maral Atmaca roman incelemesi, Maral Atmaca edebiyat analizleri, Maral Atmaca kitap önerileri listesi', NULL, NULL, '2025-10-02 13:21:03'),
(43, 'seo_google_analytics', '', NULL, NULL, '2025-10-02 13:21:03'),
(44, 'seo_google_tag_manager', '', NULL, NULL, '2025-10-02 13:21:03'),
(45, 'seo_google_verification', '', NULL, NULL, '2025-10-02 13:21:03'),
(46, 'seo_canonical_url', '', NULL, NULL, '2025-10-02 13:21:03'),
(48, 'allow_comments', '1', NULL, NULL, '2025-10-02 13:21:03'),
(49, 'newsletter_enabled', '1', NULL, NULL, '2025-10-02 13:21:03'),
(50, 'cookie_consent', '1', NULL, NULL, '2025-10-02 13:21:03'),
(51, 'two_factor_enabled', '0', NULL, NULL, '2025-10-02 13:21:03'),
(102, 'header_settings', '{\"logo_url\":\"\",\"site_name\":\"Maral Atmaca\",\"show_search\":true,\"menu_items\":[{\"label\":\"Ana Sayfa\",\"url\":\"/\",\"order\":1},{\"label\":\"Kitaplarım\",\"url\":\"/kitaplar\",\"order\":2},{\"label\":\"Hakkımda\",\"url\":\"/hakkimda\",\"order\":3},{\"label\":\"İletişim\",\"url\":\"/iletisim\",\"order\":4}]}', NULL, NULL, '2025-10-02 17:16:15'),
(103, 'footer_settings', '{\"site_name\":\"Maral Atmaca\",\"about_text\":\"Hikayelerin büyülü dünyasında okurlarımla buluşuyorum.\",\"copyright_text\":\"2025 Maral Atmaca. Tüm hakları saklıdır.\",\"social_links\":{\"instagram\":\"https://www.instagram.com/maral_atmaca?igshid=dWJmb3M1cnBrbjM1&utm_source=qr\",\"twitter\":\"\",\"facebook\":\"\",\"youtube\":\"\",\"spotify\":\"https://open.spotify.com/user/31cxmviybemcerfgxks6cy72xlva?si=9ROLFhJ2Rk2AY3AKwW7hgw\",\"whatsapp\":\"https://whatsapp.com/channel/0029VaMQf66GpLHORoiwht2b\"},\"navigation_links\":[{\"label\":\"Ana Sayfa\",\"url\":\"/\"},{\"label\":\"Kitaplarım\",\"url\":\"/kitaplar\"},{\"label\":\"Hakkımda\",\"url\":\"/hakkimda\"},{\"label\":\"İletişim\",\"url\":\"/iletisim\"}],\"popular_books_title\":\"Popüler Kitaplar\",\"newsletter_title\":\"Haber Bülteni\",\"newsletter_description\":\"Yeni kitaplar, bölüm güncellemeleri ve özel içeriklerden ilk siz haberdar olun!\",\"newsletter_button_text\":\"Abone Ol\",\"legal_links\":[{\"label\":\"Gizlilik Politikası\",\"url\":\"/gizlilik-politikasi\"},{\"label\":\"Kullanım Koşulları\",\"url\":\"/kullanim-kosullari\"},{\"label\":\"KVKK Aydınlatma Metni\",\"url\":\"/kvkk\"}]}', NULL, NULL, '2025-10-02 17:16:15'),
(104, 'page_page_page_home', '{\"hero_background\":\"https://readdy.ai/api/search-image?query=A%20serene%20and%20elegant%20writing%20space%20with%20warm%20natural%20lighting%2C%20featuring%20a%20beautiful%20wooden%20desk%20with%20vintage%20books%2C%20delicate%20flowers%20in%20soft%20pastel%20colors%2C%20and%20a%20cozy%20reading%20corner%20with%20cream%20and%20beige%20tones%2C%20creating%20an%20inspiring%20atmosphere%20for%20a%20female%20author%2C%20minimalist%20and%20sophisticated%20interior%20design&width=1200&height=800&seq=hero-bg&orientation=landscape\",\"hero_image\":\"https://static.readdy.ai/image/95e17ff92b66fd1dcbe3cf3a194e2fbb/6bdca6a002e82985b965d0a89f5f6c87.jfif\",\"hero_title\":\"Maral Atmaca\",\"hero_subtitle\":\"Yazar & Hikaye Anlatıcı\",\"sections\":[{\"id\":\"section_1\",\"type\":\"paragraph\",\"content\":\"Bir kitabın sayfalarında buluşan kelimeler, en güzel yolculukların anahtarıdır. Her kitap bir yazarın zihninde yeşerir ama okurların düşlerinde hayat bulur. Bazen tek ihtiyacımız olan şey sıcak bir kahve, sessiz bir ortam ve bir kitaptır.\",\"order\":1},{\"id\":\"section_2\",\"type\":\"paragraph\",\"content\":\"Kitaplarım aracılığıyla binlerce okurla paylaştığım bu yolculukta, her hikaye yeni bir kapı açıyor...\",\"order\":2}]}', NULL, NULL, '2025-10-02 17:16:15');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Tablo için indeksler `admin_sessions`
--
ALTER TABLE `admin_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `idx_token` (`token`),
  ADD KEY `idx_expires` (`expires_at`),
  ADD KEY `idx_last_activity` (`last_activity`),
  ADD KEY `idx_active` (`is_active`,`expires_at`);

--
-- Tablo için indeksler `analytics_events`
--
ALTER TABLE `analytics_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_event_type` (`event_type`),
  ADD KEY `idx_page_url` (`page_url`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_book_id` (`book_id`);

--
-- Tablo için indeksler `analytics_performance`
--
ALTER TABLE `analytics_performance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_page_url` (`page_url`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_page_load_time` (`page_load_time`);

--
-- Tablo için indeksler `analytics_sessions`
--
ALTER TABLE `analytics_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_id` (`session_id`),
  ADD KEY `idx_session_id` (`session_id`),
  ADD KEY `idx_started_at` (`started_at`),
  ADD KEY `idx_ip_address` (`ip_address`);

--
-- Tablo için indeksler `banned_ips`
--
ALTER TABLE `banned_ips`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ip_address` (`ip_address`),
  ADD KEY `idx_ip` (`ip_address`);

--
-- Tablo için indeksler `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_status` (`status`);

--
-- Tablo için indeksler `book_views`
--
ALTER TABLE `book_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_view` (`book_id`,`ip_address`),
  ADD KEY `idx_book` (`book_id`),
  ADD KEY `idx_ip` (`ip_address`);

--
-- Tablo için indeksler `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_book_id` (`book_id`),
  ADD KEY `idx_order` (`order_number`),
  ADD KEY `idx_slug` (`slug`);

--
-- Tablo için indeksler `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_book_id` (`book_id`),
  ADD KEY `idx_chapter_id` (`chapter_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_comments_chapter_line` (`chapter_id`,`line_number`);

--
-- Tablo için indeksler `concurrent_locks`
--
ALTER TABLE `concurrent_locks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_lock` (`resource_type`,`resource_id`),
  ADD KEY `idx_resource` (`resource_type`,`resource_id`),
  ADD KEY `idx_admin` (`admin_id`),
  ADD KEY `idx_locked_until` (`locked_until`);

--
-- Tablo için indeksler `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_email` (`email`);

--
-- Tablo için indeksler `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_book_id` (`book_id`),
  ADD KEY `idx_chapter_id` (`chapter_id`),
  ADD KEY `idx_likes_chapter_line` (`chapter_id`,`line_number`);

--
-- Tablo için indeksler `newsletter_notifications`
--
ALTER TABLE `newsletter_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_created` (`created_at`),
  ADD KEY `idx_book` (`book_id`),
  ADD KEY `idx_chapter` (`chapter_id`);

--
-- Tablo için indeksler `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `unsubscribe_token` (`unsubscribe_token`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_subscribed_at` (`subscribed_at`);

--
-- Tablo için indeksler `security_logs`
--
ALTER TABLE `security_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_type` (`type`),
  ADD KEY `idx_severity` (`severity`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Tablo için indeksler `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`key`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `admin_sessions`
--
ALTER TABLE `admin_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Tablo için AUTO_INCREMENT değeri `analytics_events`
--
ALTER TABLE `analytics_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `analytics_performance`
--
ALTER TABLE `analytics_performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `analytics_sessions`
--
ALTER TABLE `analytics_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `banned_ips`
--
ALTER TABLE `banned_ips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Tablo için AUTO_INCREMENT değeri `book_views`
--
ALTER TABLE `book_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Tablo için AUTO_INCREMENT değeri `concurrent_locks`
--
ALTER TABLE `concurrent_locks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Tablo için AUTO_INCREMENT değeri `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=293;

--
-- Tablo için AUTO_INCREMENT değeri `newsletter_notifications`
--
ALTER TABLE `newsletter_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tablo için AUTO_INCREMENT değeri `security_logs`
--
ALTER TABLE `security_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `analytics_events`
--
ALTER TABLE `analytics_events`
  ADD CONSTRAINT `analytics_events_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE SET NULL;

--
-- Tablo kısıtlamaları `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `concurrent_locks`
--
ALTER TABLE `concurrent_locks`
  ADD CONSTRAINT `concurrent_locks_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
