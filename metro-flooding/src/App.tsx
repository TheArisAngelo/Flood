import Nav from "./components/Nav";
import ScrollProgress from "./components/ScrollProgress";
import Background from "./components/Background";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Causes from "./components/Causes";
import Impact from "./components/Impact";
import Solutions from "./components/Solutions";
import CallToAction from "./components/CallToAction";
import useSmoothScroll from "./hooks/useSmoothScroll";

function App() {
  useSmoothScroll();

  return (
    <>
      <Background />
      <Nav />
      <ScrollProgress />
      <main>
        <Hero />
        <Stats />
        <Causes />
        <Impact />
        <Solutions />
        <CallToAction />
      </main>
    </>
  );
}

export default App;
