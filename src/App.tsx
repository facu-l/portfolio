import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function App() {
    return (
        <div className="bg-zinc-950 min-h-screen">
            <Hero />
            <Projects />
        </div>
    );
}