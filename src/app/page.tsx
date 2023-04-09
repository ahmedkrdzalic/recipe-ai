import { Inter } from "next/font/google";
import Link from "next/link";
import RecipeGenerator from "@/components/pageParts/RecipeGenerator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Recipe Generator",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-primary text-secondary">
      <div className="p-14 w-full lg:max-w-3xl bg-tertiary border-2 border-solid border-secondary rounded-3xl">
        <div className="text-center">
          <h1 className="text-5xl font-semibold mb-2">Recipe AI Generator</h1>
          <h3 className="text-md">Taste the magic!</h3>
          <hr className="mt-2 h-2" />
        </div>
        <RecipeGenerator />
      </div>
      <footer className="text-center mt-6">
        <h3 className="text-xs">
          Created by{" "}
          <Link
            className="text-tertiary"
            href="https://www.linkedin.com/in/ahmedkrdzalic/"
            target="_blank"
          >
            Ahmed Krdzalic
          </Link>
        </h3>
        <h3>© 2023 Copyright</h3>
      </footer>
    </main>
  );
}
