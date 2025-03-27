// src/lib/db.ts
import bcrypt from 'bcryptjs';

// Mock database types (since we're not using Prisma due to issues)
export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  type: 'income' | 'expense' | 'investment';
  categoryId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock users
let users: User[] = [];
// Mock transactions
let transactions: Transaction[] = [];
// Mock categories
let categories: Category[] = [];

// Helper functions
export async function findUserByEmail(email: string): Promise<User | null> {
  return users.find(user => user.email === email) || null;
}

export async function findUserById(id: string): Promise<User | null> {
  return users.find(user => user.id === id) || null;
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: User = {
    id: `user_${Date.now()}`,
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);

  // Create default categories for the new user
  await seedUserCategories(newUser.id);

  return newUser;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}

// Transaction functions
export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  return transactions.filter(transaction => transaction.userId === userId);
}

export async function createTransaction(data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> {
  const newTransaction: Transaction = {
    id: `txn_${Date.now()}`,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  transactions.push(newTransaction);
  return newTransaction;
}

export async function updateTransaction(id: string, data: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Transaction | null> {
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) return null;

  transactions[index] = {
    ...transactions[index],
    ...data,
    updatedAt: new Date()
  };

  return transactions[index];
}

export async function deleteTransaction(id: string): Promise<boolean> {
  const initialLength = transactions.length;
  transactions = transactions.filter(t => t.id !== id);
  return initialLength > transactions.length;
}

// Category functions
export async function getUserCategories(userId: string): Promise<Category[]> {
  return categories.filter(cat => cat.userId === userId);
}

export async function createCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
  const newCategory: Category = {
    id: `cat_${Date.now()}`,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  categories.push(newCategory);
  return newCategory;
}

// Add default categories for a user
export async function seedUserCategories(userId: string): Promise<void> {
  const defaultCategories = [
    { name: 'Food & Dining', color: '#FF9800', icon: 'utensils' },
    { name: 'Transportation', color: '#2196F3', icon: 'car' },
    { name: 'Housing', color: '#4CAF50', icon: 'home' },
    { name: 'Entertainment', color: '#9C27B0', icon: 'tv' },
    { name: 'Shopping', color: '#E91E63', icon: 'shopping-bag' },
    { name: 'Health', color: '#00BCD4', icon: 'heart-pulse' },
    { name: 'Education', color: '#3F51B5', icon: 'book' },
    { name: 'Investments', color: '#009688', icon: 'trending-up' },
    { name: 'Salary', color: '#4CAF50', icon: 'briefcase' },
    { name: 'Dividends', color: '#FF5722', icon: 'landmark' },
  ];

  // Check if user already has categories
  const userCats = await getUserCategories(userId);
  if (userCats.length > 0) return;

  // Create categories for the user
  for (const cat of defaultCategories) {
    await createCategory({
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
      userId
    });
  }
}

// Initialize demo user
export async function initializeDatabase() {
  // Create a demo user if there are no users
  if (users.length === 0) {
    try {
      const demoUser = await createUser({
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'password123',
        image: null,
      });

      // Create some demo transactions
      const userCategories = await getUserCategories(demoUser.id);
      const categoryMap: Record<string, Category> = {};

      userCategories.forEach(cat => {
        categoryMap[cat.name] = cat;
      });

      // Create a few sample transactions
      await createTransaction({
        amount: 3500,
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        description: 'Monthly Salary',
        type: 'income',
        categoryId: userCategories.find(c => c.name === 'Salary')?.id || null,
        userId: demoUser.id,
      });

      await createTransaction({
        amount: 1200,
        date: new Date(new Date().setDate(new Date().getDate() - 5)),
        description: 'Rent Payment',
        type: 'expense',
        categoryId: userCategories.find(c => c.name === 'Housing')?.id || null,
        userId: demoUser.id,
      });

      await createTransaction({
        amount: 85.75,
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        description: 'Grocery Shopping',
        type: 'expense',
        categoryId: userCategories.find(c => c.name === 'Food & Dining')?.id || null,
        userId: demoUser.id,
      });

      await createTransaction({
        amount: 500,
        date: new Date(new Date().setDate(new Date().getDate() - 3)),
        description: 'Stock Purchase',
        type: 'investment',
        categoryId: userCategories.find(c => c.name === 'Investments')?.id || null,
        userId: demoUser.id,
      });

      console.log('Database initialized with demo user');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
}

// Call initialize when this module is loaded
initializeDatabase();
