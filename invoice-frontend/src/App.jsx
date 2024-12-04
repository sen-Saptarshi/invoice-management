import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateInvoice from "./pages/CreateInvoice";
import EditInvoice from "./pages/EditInvoice";
import { InvoiceProvider } from "./context/InvoiceContext";

const App = () => (
  <InvoiceProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateInvoice />} />
        <Route path="/edit/:id" element={<EditInvoice />} />
      </Routes>
    </Router>
  </InvoiceProvider>
);

export default App;
