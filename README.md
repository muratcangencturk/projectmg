# projectmg

projectmg, ekiplerin projelerini tek bir yerden planlamasını, izlemesini ve teslim etmesini kolaylaştırmak üzere geliştirilen hafif ama esnek bir proje yönetimi aracıdır. Bu depodaki kaynak kod, fikirden canlı sürüme kadar geçen sürecin her aşamasında ekiplerin ihtiyaç duyduğu temel özellikleri sağlamayı amaçlar.

Uygulama; ürün yöneticileri, yazılım geliştiricileri, tasarımcılar, müşteri temsilcileri ve paydaşlarla düzenli olarak iletişim kuran proje liderleri gibi disiplinler arası ekip üyelerini hedefler. Her rolün güncel bilgiye erişebilmesini sağlayarak karar alma süreçlerini hızlandırmayı ve iş birliğini güçlendirmeyi amaçlar.

projectmg, dağınık araç kullanımından kaynaklanan görünürlük eksikliğini ve manuel takip süreçlerinin yarattığı hataları ortadan kaldırmayı hedefler. Tek bir veri kaynağı üzerinden görevleri, kilometre taşlarını ve riskleri takip ederek ekiplerin proaktif davranmasına ve teslim tarihlerini güvenle yönetmesine yardımcı olur.

## Sistem Gereksinimleri

- Python 3.10 veya üzeri
- Node.js 18 veya üzeri (opsiyonel, web arayüzü geliştirmeleri için)
- Git 2.40 veya üzeri
- PostgreSQL 14 veya üzeri (üretim dağıtımları için önerilir)

## Kurulum ve Çalıştırma

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/your-org/projectmg.git
   cd projectmg
   ```
2. Gerekli bağımlılıkları yükleyin:
   ```bash
   pip install -r requirements.txt
   npm install # Web arayüzünü geliştirmek istiyorsanız
   ```
3. Geliştirme veritabanını yapılandırın ve migrasyonları çalıştırın:
   ```bash
   createdb projectmg_dev
   alembic upgrade head
   ```
4. Uygulamayı başlatın:
   ```bash
   make serve
   ```
5. Tarayıcınızda `http://localhost:8000` adresine giderek arayüzü görüntüleyin.

## Katkıda Bulunma

1. Katkıda bulunmadan önce bir konu açarak önerinizi veya bulduğunuz hatayı tartışmaya açın.
2. Her yeni özellik veya düzeltme için ayrı bir dal oluşturun ve açık, açıklayıcı commit mesajları yazın.
3. Kod stilini korumak için `pre-commit` kancalarını çalıştırın ve tüm testlerin geçtiğinden emin olun.
4. Değişikliklerinizi ayrıntılı bir açıklama ile pull request olarak gönderin; ilgili ekran görüntülerini ve test sonuçlarını eklemek değerlendirme sürecini hızlandırır.
