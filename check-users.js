// check-users.js
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        address: true,
        cccd: true,
        createdAt: true,
      },
      orderBy: { id: 'asc' },
    });

    console.log('\n======================================================');
    console.log(`  TỔNG SỐ TÀI KHOẢN ĐÃ ĐĂNG KÝ: ${users.length}`);
    console.log('======================================================\n');
    if (users.length === 0) {
      console.log('Chưa có tài khoản nào trong database.');
    } else {
      console.table(users);
    }
  } catch (err) {
    console.error('Lỗi khi truy vấn database:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
