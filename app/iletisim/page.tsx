'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validasyonu
    if (formData.message.length > 500) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (formData.message.trim().length < 5) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🔥 İLETİŞİM FORMU - DEBUG MODU');
      console.log('📨 Gönderilen veri:', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        messageLength: formData.message.length
      });

      // API'ye mesaj gönder
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      console.log('🌐 Response status:', response.status, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        throw new Error('Mesaj gönderilemedi - ' + response.status);
      }

      const result = await response.json();
      console.log('📡 API Response:', result);

      if (result.success) {
        console.log('✅ Mesaj başarıyla gönderildi');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('❌ API başarısız:', result.error);
        throw new Error(result.error || 'Form gönderilirken bir hata oluştu');
      }
    } catch (error) {
      console.error('💥 Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Durum mesajını 3 saniye sonra gizle
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">İletişim</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Benimle iletişime geçip merak ettiğiniz her şey hakkında bilgi almak için aşağıdaki formu kullanabilir 
              veya sosyal medya hesaplarımdan bana ulaşabilirsiniz.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Bana Ulaşın</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Herhangi bir sorunuz, öneriniz veya işbirliği teklifiniz varsa, lütfen çekinmeden benimle iletişime geçin. 
                  Size en kısa sürede geri dönüş yapacağım.
                </p>

                <form 
                  id="contact-form" 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  data-readdy-form="true"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                      placeholder="Adınızı ve soyadınızı yazın"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    >
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                      placeholder="E-posta adresinizi yazın"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Konu *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-8 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Bir konu seçin</option>
                      <option value="Genel Sorular">Genel Sorular</option>
                      <option value="Hikaye Önerileri">Hikaye Önerileri</option>
                      <option value="İş Birliği">İş Birliği</option>
                      <option value="Teknik Destek">Teknik Destek</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Mesaj *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:border-orange-500 resize-none text-sm"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className={formData.message.trim().length < 5 ? 'text-red-500' : ''}>
                        {formData.message.trim().length < 5 ? `En az 5 karakter gerekli` : 'Minimum karakter ✓'}
                      </span>
                      <span>{formData.message.length}/500 karakter</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || formData.message.length > 500 || formData.message.trim().length < 5}
                    className="w-full bg-orange-600 text-white py-4 rounded-full font-semibold hover:bg-orange-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  </button>
                </form>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg text-center">
                    Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-lg text-center">
                    Mesaj gönderilirken bir hata oluştu. Lütfen kontrol edin:
                    <ul className="mt-2 text-sm list-disc list-inside">
                      <li>Tüm alanların doldurulduğunu</li>
                      <li>Mesajın en az 5 karakter olduğunu</li>
                      <li>E-posta adresinin geçerli olduğunu</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Sosyal Medya</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                  Günlük paylaşımlarım, yazarlık sürecim ve yeni hikaye güncellemelerim için sosyal medya hesaplarımı
                  takip edebilirsiniz. Bu platformlarda siz değerli okurlarımla daha yakın bir iletişim kuruyorum.
                </p>

                <div className="space-y-4">
                  <a
                    href="https://www.instagram.com/maral_atmaca?igshid=dWJmb3M1cnBrbjM1&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-200 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400 rounded-full">
                      <i className="ri-instagram-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white text-lg">Instagram</h4>
                      <p className="text-gray-600 dark:text-gray-400">@maral_atmaca</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Günlük paylaşımlar ve hikaye güncellemeleri</p>
                    </div>
                  </a>

                  <a
                    href="https://open.spotify.com/user/31cxmviybemcerfgxks6cy72xlva?si=9ROLFhJ2Rk2AY3AKwW7hgw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-200 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full">
                      <i className="ri-spotify-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white text-lg">Spotify</h4>
                      <p className="text-gray-600 dark:text-gray-400">Maral Atmaca</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Yazma sırasında dinlediğim müzikler</p>
                    </div>
                  </a>

                  <a
                    href="https://whatsapp.com/channel/0029VaMQf66GpLHORoiwht2b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-200 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full">
                      <i className="ri-whatsapp-line text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white text-lg">WhatsApp Kanalı</h4>
                      <p className="text-gray-600 dark:text-gray-400">Maral Atmaca</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Özel duyurular ve hızlı güncellemeler</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Elegant%20workspace%20of%20a%20female%20author%2C%20beautiful%20writing%20desk%20with%20vintage%20books%2C%20fresh%20flowers%20in%20soft%20pastel%20colors%2C%20inspiring%20and%20cozy%20atmosphere%2C%20warm%20natural%20lighting%2C%20sophisticated%20interior%20design%20with%20literary%20elements&width=600&height=400&seq=contact-image&orientation=landscape"
                  alt="Çalışma Alanım"
                  className="w-full h-48 object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}