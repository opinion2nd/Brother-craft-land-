/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Background } from "./components/Background";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { RankDetail } from "./pages/RankDetail";
import { CrateDetail } from "./pages/CrateDetail";
import { Checkout } from "./pages/Checkout";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Admin } from "./pages/Admin";
import { Contact } from "./pages/Contact";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Background />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/rank/:id" element={<RankDetail />} />
          <Route path="/store/crate/:id" element={<CrateDetail />} />
          <Route path="/checkout/:type/:id" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
