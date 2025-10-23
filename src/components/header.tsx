import { House } from "lucide-react";

export default function Header() {
    
  return (
    <header className="w-full py-4 px-6 bg-white shadow-md flex flex-row items-center justify-start gap-8">
      <h1 className="text-2xl font-bold text-slate-800">Flutter Stream Viewer</h1>
      <nav className="flex items-center justify-center space-x-4">
        <a href="/" className="flex flex-row text-black hover:bg-black hover:text-white p-2 rounded-md transition gap-2 items-center">
          <p className="font-bold">Home</p>
          <House className="w-8 h-8" />
        </a>
      </nav>
    </header>
  );
}