import type { components } from "@/lib/api-types";

type Account = components["schemas"]["AccountResponseDto"];
type Category = components["schemas"]["CategoryResponseDto"];

export interface Period {
  year: number;
  month: number;
}

export interface FinancialSummary {
  totalNetWorth: number;
  totalAssets: number;
  totalDebts: number;
  monthlyIncome: number;
  monthlyExpense: number;
  remainingThisMonth: number;
}

export interface ExpenseByCategoryItem {
  category: string;
  amount: number;
  color: string;
}

export interface DailyCashFlowItem {
  day: string;
  income: number;
  expense: number;
}

export interface FinancialCharts {
  expenseByCategory: ExpenseByCategoryItem[];
  dailyCashFlow: DailyCashFlowItem[];
}

export interface FinancialData {
  period: Period;
  summary: FinancialSummary;
  charts: FinancialCharts;
}

export interface HealthAdvice {
  code: string;
  message: string;
}

export interface HealthReport {
  totalScore: number;
  healthStatus: string;
  advices: HealthAdvice[];
}

export const mockFinancialData: FinancialData = {
  period: { year: 2026, month: 4 },
  summary: {
    totalNetWorth: -1500,
    totalAssets: 0,
    totalDebts: 1500,
    monthlyIncome: 0,
    monthlyExpense: 1500,
    remainingThisMonth: -1500,
  },
  charts: {
    expenseByCategory: [{ category: "Market", amount: 1500, color: "#FF0000" }],
    dailyCashFlow: [{ day: "2026-04-13", income: 0, expense: 1500 }],
  },
};

export const mockHealthReport: HealthReport = {
  totalScore: 25,
  healthStatus: "Kritik",
  advices: [
    {
      code: "WARNING_HIGH_EXPENSE",
      message: "🚨 Harcamaların gelirine çok yakın!",
    },
  ],
};

export const mockAccounts: Account[] = [
  {
    id: "acc-bank-001",
    name: "Maaş Hesabı",
    type: "BANK",
    balance: 42850.75,
    currency: "TRY",
    createdAt: "2026-01-08T09:12:00.000Z",
    updatedAt: "2026-04-23T11:20:00.000Z",
  },
  {
    id: "acc-cc-001",
    name: "Platinum Kredi Kartı",
    type: "CREDIT_CARD",
    balance: -12640.2,
    currency: "TRY",
    statementDay: 23,
    dueDay: 3,
    createdAt: "2026-02-14T08:10:00.000Z",
    updatedAt: "2026-04-24T07:45:00.000Z",
  },
  {
    id: "acc-cash-001",
    name: "Nakit Kasa",
    type: "CASH",
    balance: 920.5,
    currency: "USD",
    createdAt: "2026-03-05T14:30:00.000Z",
    updatedAt: "2026-04-20T17:05:00.000Z",
  },
];

export const mockCategories: Category[] = [
  {
    id: "cat-exp-001",
    name: "Market Alışverişi",
    type: "EXPENSE",
    icon: "🛒",
    color: "#ef4444",
    monthlyLimit: 5000,
    createdAt: "2026-01-11T09:00:00.000Z",
  },
  {
    id: "cat-inc-001",
    name: "Maaş",
    type: "INCOME",
    icon: "💼",
    color: "#22c55e",
    monthlyLimit: 45000,
    createdAt: "2026-01-09T09:00:00.000Z",
  },
  {
    id: "cat-exp-002",
    name: "Abonelikler",
    type: "EXPENSE",
    icon: "📺",
    color: "#a855f7",
    monthlyLimit: 1200,
    createdAt: "2026-02-03T09:00:00.000Z",
  },
];

export const mockTransactions: components["schemas"]["TransactionResponseDto"][] =
  [
    {
      id: "tx-001",
      type: "INCOME",
      amount: 45000,
      currency: "TRY",
      date: "2026-04-15T10:00:00Z",
      description: "Maaş Yatırıldı",
      account: mockAccounts[0],
      category: mockCategories[1],
      createdAt: "2026-04-15T10:00:00Z",
      updatedAt: "2026-04-15T10:00:00Z",
    },
    {
      id: "tx-002",
      type: "EXPENSE",
      amount: 1525.5,
      currency: "TRY",
      date: "2026-04-18T12:30:00Z",
      description: "Market Alışverişi",
      account: mockAccounts[0],
      category: mockCategories[0],
      createdAt: "2026-04-18T12:30:00Z",
      updatedAt: "2026-04-18T12:30:00Z",
    },
    {
      id: "tx-003",
      type: "EXPENSE",
      amount: 12500,
      currency: "TRY",
      date: "2026-04-01T09:00:00Z",
      description: "Kira Ödemesi",
      account: mockAccounts[0],
      category: {
        id: "cat-exp-003",
        name: "Kira",
        type: "EXPENSE",
        icon: "🏠",
        color: "#ef4444",
        monthlyLimit: 12500,
        createdAt: "2026-01-01T09:00:00.000Z",
      },
      createdAt: "2026-04-01T09:00:00Z",
      updatedAt: "2026-04-01T09:00:00Z",
    },
  ];
