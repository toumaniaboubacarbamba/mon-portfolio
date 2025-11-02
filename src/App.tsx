import Home from "./components/Home";

export default function App() {
  return (
    <div>

      <div className="p-5 md:px-[15%]">
        <Navbar />
        <Home />
      </div>

      <About />

      <div className="p-5 md:px-[15%]">
        <Experiences />
        <Projects/>
      </div>

      <Footer/>

    </div>
  )
}