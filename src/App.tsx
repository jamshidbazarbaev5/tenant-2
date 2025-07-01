import "./App.css";
import "./index.css";
import "./i18n";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginPage } from "./core/pages/login";
import { LanguageProvider } from "./core/context/LanguageContext";
import { AuthProvider } from "./core/context/AuthContext";
import { PrivateRoute } from "./core/components/PrivateRoute";
import CreateUser from "./core/pages/create-user";
import CreateStore from "./core/pages/create-store";
import { ProfilePage } from "./core/pages/ProfilePage";
import CreateCategory from "./core/pages/create-category";
import UsersPage from "./core/pages/UsersPage";
import StoresPage from "./core/pages/StoresPage";
import CategoriesPage from "./core/pages/CategoriesPage";
import ProductsPage from "./core/pages/ProductsPage";
import CreateProduct from "./core/pages/create-product";
import StocksPage from "./core/pages/StocksPage";
import CreateStock from "./core/pages/create-stock";
import Layout from "./core/layout/Layout";
import MeasurementsPage from "./core/pages/MeasurementsPage";
import CreateMeasurement from "./core/pages/create-measurement";
import SuppliersPage from "./core/pages/SuppliersPage";
import CreateSupplier from "./core/pages/create-supplier";
import TransfersPage from "./core/pages/TransfersPage";
import CreateTransfer from "./core/pages/create-transfer";
import RecyclingsPage from "./core/pages/RecyclingsPage";
import CreateRecycling from "./core/pages/create-recycling";
import ClientsPage from "./core/pages/ClientsPage";
import CreateClient from "./core/pages/create-client";
import EditClient from "./core/pages/edit-client";
import ClientHistoryPage from "./core/pages/ClientHistoryPage";
import SalesPage from "./core/pages/SalesPage";
import { Toaster } from "sonner";
import DebtsPage from "./core/pages/DebtsPage";
import StaffPage from "./core/pages/StaffPage";
import CreateStaff from "./core/pages/create-staff";
// import DebtPaymentHistoryPage from "./core/pages/DebtPaymentHistoryPage";
import IncomeDetailsPage from "./core/pages/IncomeDetailsPage";
// import EditSale from "÷./core/pages/edit-sale";
import DebtDetailsPage from "./core/pages/DebtDetailsPage";
import CreateSale from "./core/pages/create-sale";
import ExpenseNamesPage from "./core/pages/ExpenseNamesPage";
import CreateExpenseName from "./core/pages/create-expense-name";
import ExpensesPage from "./core/pages/ExpensesPage";
import CreateExpense from "./core/pages/create-expense";
import AddMoney from "./core/pages/add-money";
import CashInflowNamesPage from "./core/pages/CashInflowNamesPage";
import EditExpensePage from "./core/pages/edit-expense";
import CashInflowHistoryPage from "./core/pages/CashInflowHistoryPage";
import EditMoney from "./core/pages/edit-money";
import EditProduct from "./core/pages/edit-product";
import StockPriceHistoryPage from "./core/pages/StockPriceHistoryPage";
import EditStock from "./core/pages/edit-stock-2";
import IncomePage from "./core/pages/IncomePage";
import EditSale from "./core/pages/edit-sale";
import DashboardPage from "./core/pages/DashboardPage";
import EditTransfer from "./core/pages/edit-transfer";
import ProductStockBalancePage from "./core/pages/ProductStockBalancePage";
import DebtPaymentsPage from "./core/pages/DebtPaymentsPage";
import SponsorsPage from "./core/pages/SponsorsPage";
import CreateSponsorPage from "./core/pages/create-sponsor";
import EditSponsorPage from "./core/pages/edit-sponsor";
import LoanSponsorsPage from "./core/pages/LoanSponsorsPage";
import CreateLoanSponsor from "./core/pages/CreateLoanSponsor";
import LoanPaymentsPage from "./core/pages/LoanPaymentsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes wrapped in Layout */}
          <Route element={<Layout><Outlet /></Layout>}>
            {/* Routes accessible only by Администратор */}
            <Route path="/create-user" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateUser /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute allowedRoles={["Администратор"]}><UsersPage /></PrivateRoute>} />
            <Route path="/create-store" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateStore /></PrivateRoute>} />
            <Route path="/stores" element={<PrivateRoute allowedRoles={["Администратор"]}><StoresPage /></PrivateRoute>} />
            <Route path="/create-category" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateCategory /></PrivateRoute>} />
            <Route path="/categories" element={<PrivateRoute allowedRoles={["Администратор"]}><CategoriesPage /></PrivateRoute>} />
            <Route path="/measurements/create" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateMeasurement /></PrivateRoute>} />
            <Route path="/measurements" element={<PrivateRoute allowedRoles={["Администратор"]}><MeasurementsPage /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute allowedRoles={["Администратор"]}><ProductsPage /></PrivateRoute>} />
            <Route path="/create-product" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateProduct /></PrivateRoute>} />
            <Route path="/stock" element={<PrivateRoute allowedRoles={["Администратор"]}><StocksPage /></PrivateRoute>} />
            <Route path="/create-stock" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateStock /></PrivateRoute>} />
            <Route path="/edit-stock/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><EditStock /></PrivateRoute>} />
            <Route path="/suppliers" element={<PrivateRoute allowedRoles={["Администратор"]}><SuppliersPage /></PrivateRoute>} />
            <Route path="/create-supplier" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateSupplier /></PrivateRoute>} />
            <Route path="/clients" element={<PrivateRoute allowedRoles={["Администратор"]}><ClientsPage /></PrivateRoute>} />
            <Route path="/create-client" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateClient /></PrivateRoute>} />
            <Route path="/edit-client/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><EditClient /></PrivateRoute>} />
            <Route path="/clients/:id/history" element={<PrivateRoute allowedRoles={["Администратор"]}><ClientHistoryPage /></PrivateRoute>} />
            <Route path="/transfers" element={<PrivateRoute allowedRoles={["Администратор"]}><TransfersPage /></PrivateRoute>} />
            <Route path="/create-transfer" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateTransfer /></PrivateRoute>} />
            <Route path="/recyclings" element={<PrivateRoute allowedRoles={["Администратор"]}><RecyclingsPage /></PrivateRoute>} />
            <Route path="/create-recycling" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateRecycling /></PrivateRoute>} />
            <Route path="/debts" element={<PrivateRoute allowedRoles={["Администратор"]}><DebtsPage /></PrivateRoute>} />
            {/* <Route path="/debts/:id/history" element={<PrivateRoute allowedRoles={["Администратор"]}><DebtPaymentHistoryPage /></PrivateRoute>} /> */}
            <Route path="/debts/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><DebtDetailsPage /></PrivateRoute>} />
            <Route path="/expense-name" element={<PrivateRoute allowedRoles={["Администратор"]}><ExpenseNamesPage /></PrivateRoute>} />
            <Route path="/create-expense-name" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateExpenseName /></PrivateRoute>} />
            <Route path="/expense" element={<PrivateRoute allowedRoles={["Администратор"]}><ExpensesPage /></PrivateRoute>} />
            <Route path="/create-expense" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateExpense /></PrivateRoute>} />
            <Route path="/staff" element={<PrivateRoute allowedRoles={["Администратор"]}><StaffPage /></PrivateRoute>} />
            <Route path="/edit-debt/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><DebtDetailsPage /></PrivateRoute>} />
            <Route path="/create-staff" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateStaff /></PrivateRoute>} />
            <Route path="/add-money" element={<PrivateRoute allowedRoles={["Администратор"]}><AddMoney /></PrivateRoute>} />
            <Route path="/edit-expense/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><EditExpensePage /></PrivateRoute>} />
            <Route path="/cash-inflow-names" element={<PrivateRoute allowedRoles={["Администратор"]}><CashInflowNamesPage /></PrivateRoute>} />
            <Route path="/finance" element={<PrivateRoute allowedRoles={["Администратор"]}><CashInflowHistoryPage /></PrivateRoute>} />
            <Route path="/edit-money/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><EditMoney /></PrivateRoute>} />
            <Route path="/edit-product/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><EditProduct /></PrivateRoute>} />
            <Route path="/stocks/:id/history" element={<PrivateRoute allowedRoles={["Администратор"]}><StockPriceHistoryPage /></PrivateRoute>} />
            <Route path="/income" element={<PrivateRoute allowedRoles={["Администратор"]}><IncomePage /></PrivateRoute>} />
            <Route path="/edit-transfers/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><EditTransfer /></PrivateRoute>} />
            <Route path="/income/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><IncomeDetailsPage /></PrivateRoute>} />

            {/* Routes accessible by both Администратор and Продавец */}
            <Route path="/sales" element={<PrivateRoute allowedRoles={["Администратор", "Продавец"]}><SalesPage /></PrivateRoute>} />
            <Route path="/create-sale" element={<PrivateRoute allowedRoles={["Администратор", "Продавец"]}><CreateSale /></PrivateRoute>} />
            <Route path="/edit-sale/:id" element={<PrivateRoute allowedRoles={["Администратор", "Продавец"]}><EditSale /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute allowedRoles={["Администратор", "Продавец"]}><ProfilePage /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute allowedRoles={["Администратор", "Продавец"]}><DashboardPage /></PrivateRoute>} />
            <Route path="/product-stock-balance" element={<PrivateRoute allowedRoles={["Администратор", "Продавец"]}><ProductStockBalancePage /></PrivateRoute>} />
             <Route path="/debts/:id/payments" element={<PrivateRoute allowedRoles={["Администратор", "Продавец"]}><DebtPaymentsPage/></PrivateRoute>} />
            
            <Route path="/sponsors" element={<PrivateRoute allowedRoles={["Администратор"]}><SponsorsPage /></PrivateRoute>} />
            <Route path="/create-sponsor" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateSponsorPage /></PrivateRoute>} />
            <Route path="/sponsors/edit/:id" element={<PrivateRoute allowedRoles={["Администратор"]}><EditSponsorPage /></PrivateRoute>} />
            <Route path="/loans" element={<PrivateRoute allowedRoles={["Администратор"]}><LoanSponsorsPage /></PrivateRoute>} />
            <Route path="/loans/create" element={<PrivateRoute allowedRoles={["Администратор"]}><CreateLoanSponsor /></PrivateRoute>} />
            <Route path="/loan-payments" element={<PrivateRoute allowedRoles={["Администратор"]}><LoanPaymentsPage /></PrivateRoute>} />
            <Route path="/loans/:loanId/payments" element={<PrivateRoute allowedRoles={["Администратор"]}><LoanPaymentsPage /></PrivateRoute>} />
            {/* Routes accessible by all authenticated users */}
            {/* Default route */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
