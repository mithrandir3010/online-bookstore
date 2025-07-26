# 📚 Online Bookstore

Modern web teknolojileriyle geliştirilmiş, tam işlevsel bir **çevrimiçi kitap satış platformu**. Kullanıcılar kitapları inceleyebilir, sepete ekleyebilir ve ödeme işlemlerini gerçekleştirebilir.

## 🚀 Canlı Demo

🧪 (Henüz deploy edilmediyse bu kısmı daha sonra ekleyebilirsin.)

## 🛠️ Kullanılan Teknolojiler

- ⚛️ React 18
- 📦 Context API (Sepet yönetimi)
- 🌐 Google Books API
- 🧭 React Router DOM
- 💅 CSS Flex/Grid + Animasyonlar
- 📡 Axios (Veri çekimi)
- 🎨 React Icons

## 📥 Kurulum ve Çalıştırma

```bash
git clone https://github.com/mithrandir3010/online-bookstore.git
cd online-bookstore
npm install
npm start


🎯 Özellikler
🏠 Ana Sayfa (HomePage)
Kitap arama (isim/yazar)

Gerçek zamanlı veri çekimi (Google Books API)

Yükleniyor/Error/Boş durum yönetimi

Responsive grid layout ile kitap listesi

📖 Kitap Detay Sayfası (BookDetailsPage)
Kitap bilgileri: kapak, başlık, yazar, açıklama, meta veriler

Sepete ekle butonu

Hata ve loading yönetimi

🛒 Sepet Sayfası (CartPage)
Sepete eklenen kitapların listesi

Miktar güncelleme (+/-)

Ürün silme ve sepeti temizleme

Toplam fiyat hesaplama

Sepet boşsa uyarı mesajı

💳 Ödeme Sayfası (CheckoutPage)
Kullanıcı formu (isim, mail, adres, telefon vb.)

Form doğrulama (real-time + regex)

Sipariş özeti

Simüle edilmiş ödeme (2 saniye loading + başarı mesajı)

📱 Responsive Tasarım
Mobil, tablet ve masaüstü cihazlarda kusursuz görünüm.
Sticky navbar, animasyonlar ve modern gradient arayüz ile kullanıcı dostu deneyim.

src/
├── components/          # Navbar, BookCard vs.
├── context/             # Sepet Context
├── pages/               # HomePage, BookDetailsPage, CartPage, CheckoutPage
├── services/            # API işlemleri
├── App.js               # Router tanımları
├── index.js             # Uygulama giriş noktası

🤝 Katkıda Bulunmak
İyileştirme önerilerin veya katkıların varsa PR açabilirsin.
Lütfen önce bir issue açarak önerini belirt.

📌 Geliştirici: @mithrandir3010
✨ Teşekkürler!
