import Navbar from "./components/navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <main className="outer-container">
      <Dashboard />
      </main>
    </>
  );
}

export default App;
