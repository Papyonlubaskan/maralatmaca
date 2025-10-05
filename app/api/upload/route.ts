import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware/admin-auth';
import { successResponse, errorResponse } from '@/lib/api-response';
import { createFileUploadSecurity, imageUploadConfig, documentUploadConfig } from '@/lib/security/file-upload';

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

    // Choose upload configuration based on type
    const config = uploadType === 'document' ? documentUploadConfig : imageUploadConfig;
    const uploadSecurity = createFileUploadSecurity(config);

    // Process file with security checks
    const result = await uploadSecurity.processFile(
      file,
      file.name,
      file.type,
      file.size
    );

    if (!result.success) {
      return errorResponse(result.error || 'Dosya yüklenemedi', 400);
    }

    const uploadedFile = result.file!;

    return successResponse({
      filename: uploadedFile.filename,
      originalName: uploadedFile.originalName,
      url: `/uploads/${uploadType}s/${uploadedFile.filename}`,
      size: uploadedFile.size,
      type: uploadedFile.mimeType,
      extension: uploadedFile.extension
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

    const { filename, type = 'image' } = await request.json();

    if (!filename) {
      return errorResponse('Dosya adı gerekli', 400);
    }

    const config = type === 'document' ? documentUploadConfig : imageUploadConfig;
    const uploadSecurity = createFileUploadSecurity(config);
    
    const filePath = `${config.uploadPath}/${filename}`;
    const deleted = await uploadSecurity.deleteFile(filePath);

    if (!deleted) {
      return errorResponse('Dosya bulunamadı veya silinemedi', 404);
    }

    return successResponse({ message: 'Dosya başarıyla silindi' }, 'Dosya silindi');

  } catch (error) {
    console.error('File deletion error:', error);
    return errorResponse('Dosya silinirken hata oluştu', 500);
  }
}