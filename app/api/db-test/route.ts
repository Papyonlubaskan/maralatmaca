import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    // Database bağlantısını test et
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Basit bir test sorgusu
    const [rows] = await connection.query('SELECT 1 as test');
    
    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Database bağlantısı başarılı',
      test: rows,
      env: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        hasPassword: !!process.env.DB_PASSWORD
      }
    });

  } catch (error: any) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      env: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        hasPassword: !!process.env.DB_PASSWORD
      }
    }, { status: 500 });
  }
}
