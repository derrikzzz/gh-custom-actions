import MainContent from "./components/MainContent";
import logo from "./assets/images/logo.png";

function App() {
  return (
    <>
      <header className="my-8 mx-auto p-8 max-w-[50rem] bg-[#292d2d] rounded-lg text-white">
        <div className="w-28 h-28 bg-[#3f3828] rounded-full flex justify-center items-center mx-auto border-4 border-[#292d2d]">
          <img
            src={logo}
            alt="GitHub Actions logo"
            className="w-16 h-16 my-16 object-contain"
          />
        </div>
        <h1 className="my-4">Learn & Master GitHub Actions</h1>
      </header>
      <MainContent />
    </>
  );
}

export default App;
