import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Store, 
  Edit3, 
  Eye, 
  EyeOff, 
  Save, 
  LogOut, 
  ShoppingBag, 
  ChevronRight, 
  DollarSign, 
  Search,
  Plus
} from 'lucide-react';

// Mock Data for Initial Setup
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Bananas', unit: 'kg', basePrice: 1.50, category: 'Tropical' },
  { id: 2, name: 'Red Apples (Fuji)', unit: 'kg', basePrice: 2.20, category: 'Local' },
  { id: 3, name: 'Green Apples', unit: 'kg', basePrice: 2.00, category: 'Local' },
  { id: 4, name: 'Strawberries', unit: 'box', basePrice: 4.50, category: 'Berries' },
  { id: 5, name: 'Watermelon', unit: 'pc', basePrice: 6.00, category: 'Tropical' },
  { id: 6, name: 'Oranges (Navel)', unit: 'kg', basePrice: 1.80, category: 'Citrus' },
  { id: 7, name: 'Lemons', unit: 'kg', basePrice: 2.50, category: 'Citrus' },
  { id: 8, name: 'Avocados', unit: 'pc', basePrice: 1.20, category: 'Tropical' },
];

const INITIAL_CUSTOMERS = [
  { id: 101, name: 'City Juice Bar', type: 'Wholesale' },
  { id: 102, name: 'Green Leaf Restaurant', type: 'Wholesale' },
  { id: 103, name: 'Mrs. Johnson', type: 'Retail' },
  { id: 104, name: 'Downtown Bakery', type: 'Wholesale' },
];

export default function App() {
  // --- State Management ---
  const [view, setView] = useState('login'); // login, admin, customer
  const [currentUser, setCurrentUser] = useState(null); // The logged in customer or 'admin'
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  
  // The Core Logic: "Daily Settings"
  // Structure: { "customerId-productId": { price: 2.50, visible: true/false } }
  const [dailySettings, setDailySettings] = useState({});
  
  // Admin State
  const [selectedCustId, setSelectedCustId] = useState(null);
  const [toast, setToast] = useState(null);

  // --- Helpers ---

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const getProductSetting = (custId, prodId) => {
    const key = `${custId}-${prodId}`;
    return dailySettings[key] || { visible: true, price: null };
  };

  const updateSetting = (custId, prodId, field, value) => {
    const key = `${custId}-${prodId}`;
    const current = dailySettings[key] || { visible: true, price: null };
    
    setDailySettings(prev => ({
      ...prev,
      [key]: { ...current, [field]: value }
    }));
  };

  const handleLogin = (userType, userData = null) => {
    if (userType === 'admin') {
      setView('admin');
      setCurrentUser({ name: 'Store Owner', role: 'admin' });
    } else {
      setView('customer');
      setCurrentUser(userData);
    }
  };

  const handleLogout = () => {
    setView('login');
    setCurrentUser(null);
    setSelectedCustId(null);
  };

  // --- Components ---

  const LoginScreen = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">FreshDaily Portal</h1>
          <p className="text-slate-500">Select your role to continue</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('admin')}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between transition-all"
          >
            <span className="font-semibold">I am the Store Owner</span>
            <Users className="w-5 h-5" />
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or Select Customer</span>
            </div>
          </div>

          <div className="grid gap-2 max-h-60 overflow-y-auto">
            {customers.map(cust => (
              <button 
                key={cust.id}
                onClick={() => handleLogin('customer', cust)}
                className="w-full bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-left p-3 rounded-lg flex items-center justify-between group transition-all"
              >
                <span className="text-slate-700 font-medium group-hover:text-emerald-700">{cust.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => {
    const activeCustomer = customers.find(c => c.id === selectedCustId);

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Daily Price Manager</h1>
                <p className="text-slate-400 text-xs">Admin Dashboard</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-white flex items-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 gap-6 grid md:grid-cols-[300px_1fr]">
          
          {/* Sidebar: Customer List */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Select Customer
              </h2>
              <div className="space-y-2">
                {customers.map(cust => (
                  <button
                    key={cust.id}
                    onClick={() => setSelectedCustId(cust.id)}
                    className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedCustId === cust.id 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cust.name}
                    <div className="text-xs font-normal opacity-70">{cust.type}</div>
                  </button>
                ))}
              </div>
              <button className="w-full mt-4 border-t border-slate-100 pt-4 text-emerald-600 text-sm font-medium flex items-center justify-center gap-2 hover:underline">
                <Plus className="w-4 h-4" /> Add New Customer
              </button>
            </div>
          </div>

          {/* Main Content: Pricing Table */}
          <div className="flex flex-col gap-4">
            {selectedCustId ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Managing: <span className="text-emerald-600">{activeCustomer.name}</span>
                    </h2>
                    <p className="text-slate-500 text-sm">Set today's visibility and prices for this client.</p>
                  </div>
                  <button 
                    onClick={() => showToast('Settings saved for ' + activeCustomer.name)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-semibold">Product</th>
                        <th className="p-4 font-semibold text-center w-32">Visibility</th>
                        <th className="p-4 font-semibold text-right">Standard Price</th>
                        <th className="p-4 font-semibold w-40">Today's Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map(product => {
                        const setting = getProductSetting(selectedCustId, product.id);
                        const isVisible = setting.visible;
                        const customPrice = setting.price !== null ? setting.price : product.basePrice;

                        return (
                          <tr key={product.id} className={`hover:bg-slate-50 transition-colors ${!isVisible ? 'opacity-50 bg-slate-50' : ''}`}>
                            <td className="p-4">
                              <div className="font-medium text-slate-800">{product.name}</div>
                              <div className="text-xs text-slate-500">{product.category} • per {product.unit}</div>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => updateSetting(selectedCustId, product.id, 'visible', !isVisible)}
                                className={`p-2 rounded-full transition-colors ${
                                  isVisible 
                                  ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
                                  : 'bg-red-100 text-red-500 hover:bg-red-200'
                                }`}
                                title={isVisible ? "Visible to customer" : "Hidden from customer"}
                              >
                                {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                            </td>
                            <td className="p-4 text-right text-slate-500">
                              ${product.basePrice.toFixed(2)}
                            </td>
                            <td className="p-4">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input 
                                  type="number" 
                                  step="0.01"
                                  value={customPrice}
                                  onChange={(e) => updateSetting(selectedCustId, product.id, 'price', parseFloat(e.target.value))}
                                  className={`w-full pl-6 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all font-medium ${
                                    setting.price !== null && setting.price !== product.basePrice 
                                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700' 
                                    : 'border-slate-200 text-slate-700'
                                  }`}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-400 p-12">
                <Users className="w-12 h-12 mb-4 opacity-20" />
                <p>Select a customer from the left to manage their daily prices.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  const CustomerDashboard = () => {
    // Filter products based on settings for this user
    const visibleProducts = products.filter(p => {
      const setting = getProductSetting(currentUser.id, p.id);
      return setting.visible !== false; // Default is visible if no setting exists
    }).map(p => {
      const setting = getProductSetting(currentUser.id, p.id);
      return {
        ...p,
        finalPrice: setting.price !== null ? setting.price : p.basePrice
      };
    });

    const categories = [...new Set(visibleProducts.map(p => p.category))];
    const [activeCat, setActiveCat] = useState('All');
    const [cartCount, setCartCount] = useState(0);

    const filtered = activeCat === 'All' 
      ? visibleProducts 
      : visibleProducts.filter(p => p.category === activeCat);

    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-slate-800 text-xl hidden md:block">FreshDaily Store</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Hello, {currentUser.name}</p>
                <p className="text-xs text-emerald-600">Today's Exclusive Prices</p>
              </div>
              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
              <button className="relative p-2 text-slate-600 hover:text-emerald-600">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveCat('All')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCat === 'All' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCat === cat ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 md:p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400">No products available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                     {/* Placeholder Fruit Image Logic */}
                    <div className="text-6xl select-none group-hover:scale-110 transition-transform duration-300">
                      {product.category === 'Tropical' ? '🍌' : 
                       product.category === 'Berries' ? '🍓' : 
                       product.category === 'Citrus' ? '🍊' : '🍎'}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-slate-800">{product.name}</h3>
                        <p className="text-xs text-slate-500">{product.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Price per {product.unit}</p>
                        <p className="text-xl font-bold text-emerald-700">${product.finalPrice.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => setCartCount(c => c + 1)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  };

  return (
    <>
      {view === 'login' && <LoginScreen />}
      {view === 'admin' && <AdminDashboard />}
      {view === 'customer' && <CustomerDashboard />}
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl animate-bounce-short z-50 text-sm font-medium flex items-center gap-2">
          <Save className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </>
  );
}
