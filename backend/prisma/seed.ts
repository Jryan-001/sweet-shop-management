import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sweetshop.com' },
    update: {},
    create: {
      email: 'admin@sweetshop.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@sweetshop.com' },
    update: {},
    create: {
      email: 'user@sweetshop.com',
      password: userPassword,
      role: 'USER',
    },
  });
  console.log('✅ Regular user created:', user.email);

  // Create sample sweets
  const sweets = [
    { name: 'Gulab Jamun', category: 'Syrup Based', price: 2.99, quantity: 50, image: 'gulab-jamun.jpg' },
    { name: 'Rasgulla', category: 'Syrup Based', price: 2.49, quantity: 100, image: 'rasgulla.jpg' },
    { name: 'Jalebi', category: 'Fried', price: 1.99, quantity: 80, image: 'jalebi.jpg' },
    { name: 'Kaju Katli', category: 'Dry Fruit', price: 4.99, quantity: 45, image: 'kaju-katli.jpg' },
    { name: 'Barfi', category: 'Milk Based', price: 3.49, quantity: 60, image: 'barfi.jpg' },
    { name: 'Ladoo', category: 'Dry Fruit', price: 2.79, quantity: 70, image: 'ladoo.jpg' },
    { name: 'Rasmalai', category: 'Milk Based', price: 3.99, quantity: 40, image: 'rasmalai.jpg' },
    { name: 'Peda', category: 'Milk Based', price: 2.29, quantity: 90, image: 'peda.jpg' },
    { name: 'Mysore Pak', category: 'Ghee Based', price: 3.79, quantity: 55, image: 'mysore-pak.jpg' },
    { name: 'Sandesh', category: 'Milk Based', price: 2.99, quantity: 65, image: 'sandesh.jpg' },
    { name: 'Kalakand', category: 'Milk Based', price: 3.29, quantity: 50, image: 'kalakand.jpg' },
    { name: 'Soan Papdi', category: 'Flaky', price: 2.49, quantity: 85, image: 'soan-papdi.jpg' },
    { name: 'Balushahi', category: 'Fried', price: 1.79, quantity: 75, image: 'balushahi.jpg' },
    { name: 'Kheer', category: 'Milk Based', price: 2.99, quantity: 60, image: 'kheer.jpg' },
    { name: 'Halwa', category: 'Ghee Based', price: 3.49, quantity: 55, image: 'halwa.jpg' },
    { name: 'Chikki', category: 'Dry Fruit', price: 1.99, quantity: 100, image: 'chikki.jpg' },
    { name: 'Modak', category: 'Steamed', price: 2.79, quantity: 70, image: 'modak.jpg' },
    { name: 'Ghevar', category: 'Fried', price: 3.99, quantity: 45, image: 'ghevar.jpg' },
  ];

  for (const sweet of sweets) {
    const existing = await prisma.sweet.findFirst({
      where: { name: sweet.name },
    });
    if (!existing) {
      await prisma.sweet.create({ data: sweet });
    }
  }
  console.log('✅ Sample sweets created');

  console.log('🎉 Seeding completed!');
  console.log('\n📝 Test Credentials:');
  console.log('Admin: admin@sweetshop.com / admin123');
  console.log('User:  user@sweetshop.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
