import { Navbar, Welcome, Services, Transactions, Footer } from "./components"
import Toast from "./components/Toaster";


const App = () => (
  <div className="min-h-screen">
    <Toast />
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

export default App
