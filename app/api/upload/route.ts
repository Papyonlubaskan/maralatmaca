import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/admin-auth';
import { successResponse, errorResponse } from '@/lib/api-response';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary konfigürasyonu
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dvgsmuhjt',
  api_key: process.env.CLOUDINARY_API_KEY || '911194959441699',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'vCFmQl3ffuacqiOnE38E3la6dg8'
});

export async function POST(request: NextRequest) {
  try {
    // Admin authentication check
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadType = formData.get('type') as string || 'image';

    if (!file) {
      return errorResponse('Dosya seçilmedi', 400);
    }

    // Dosya boyut kontrolü (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return errorResponse('Dosya boyutu 5MB\'dan küçük olmalıdır', 400);
    }

    // Dosya türü kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse('Sadece resim dosyaları yüklenebilir (JPG, PNG, WebP, GIF)', 400);
    }

    // Dosyayı buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary'ye yükle
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: uploadType === 'image' ? 'maralatmaca/books' : 'maralatmaca/documents',
          resource_type: 'image',
          transformation: uploadType === 'image' ? [
            { width: 800, height: 1200, crop: 'limit' },
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return successResponse({
      filename: uploadResult.public_id,
      originalName: file.name,
      url: uploadResult.secure_url,
      size: uploadResult.bytes,
      type: file.type,
      width: uploadResult.width,
      height: uploadResult.height
    }, 'Dosya başarıyla yüklendi');

  } catch (error) {
    console.error('Error uploading file:', error);
    return errorResponse('Dosya yüklenirken hata oluştu', 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Admin authentication
    const authError = await requireAdmin(request);
    if (authError) {
      return authError;
    }

    const { filename, publicId } = await request.json();

    if (!filename && !publicId) {
      return errorResponse('Dosya adı veya public ID gerekli', 400);
    }

    // Cloudinary'den sil
    const idToDelete = publicId || filename;
    const result = await cloudinary.uploader.destroy(idToDelete);

    if (result.result !== 'ok') {
      return errorResponse('Dosya bulunamadı veya silinemedi', 404);
    }

    return successResponse({ message: 'Dosya başarıyla silindi' }, 'Dosya silindi');

  } catch (error) {
    console.error('File deletion error:', error);
    return errorResponse('Dosya silinirken hata oluştu', 500);
  }
}