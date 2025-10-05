import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database/mysql';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    const health: any = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    };

    // Database health check
    try {
      const dbStart = Date.now();
      await executeQuery('SELECT 1 as health');
      const dbTime = Date.now() - dbStart;
      
      health.database = {
        status: 'connected',
        type: 'MySQL',
        responseTime: dbTime + 'ms'
      };
    } catch (error) {
      health.database = {
        status: 'disconnected',
        error: 'Bağlantı başarısız'
      };
      health.status = 'unhealthy';
    }

    // Redis health check (optional)
    health.redis = {
      status: 'kontrol-edilmedi',
      note: 'Opsiyonel servis'
    };

    // Memory usage
    const mem = process.memoryUsage();
    health.memory = {
      rss: Math.round(mem.rss / 1024 / 1024) + 'MB',
      heapUsed: Math.round(mem.heapUsed / 1024 / 1024) + 'MB',
      heapTotal: Math.round(mem.heapTotal / 1024 / 1024) + 'MB'
    };

    // Overall response time
    health.responseTime = (Date.now() - startTime) + 'ms';

    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json({
      success: true,
      data: health,
      message: 'Sağlık kontrolü tamamlandı'
    }, { status: statusCode });

  } catch (error) {
    console.error('Health check error:', error);
    return errorResponse('Sağlık kontrolü başarısız', 500);
  }
}