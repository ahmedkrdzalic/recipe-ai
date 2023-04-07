import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import TagsInput from "@/components/tags/TagsInput";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-primary text-secondary">
      <div className="p-14 w-full lg:max-w-3xl bg-tertiary border-2 border-solid border-secondary rounded-3xl">
        <div className="text-center">
          <h1 className="text-5xl font-semibold mb-2">Recipe AI Generator</h1>
          <h3 className="text-md">Taste the magic!</h3>
          <hr className="mt-2 h-2" />
        </div>
        <div className="py-4">
          <div className="mb-4">
            <h2 className="text-2xl">1. Select ingredients!</h2>
            <div className="text-sm px-4 flex flex-col font-thin">
              <div>
                <span>
                  {
                    "Add all ingredients you want. (Ex. select ones that you have at home.)"
                  }
                </span>
              </div>
              <TagsInput />
            </div>
          </div>
          <div>
            <h2 className="text-2xl">2. Select option</h2>
          </div>
          <div>
            <h2 className="text-2xl">3. Generate</h2>
          </div>
        </div>
      </div>
      <div className="text-center">
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
      </div>
    </main>
  );
}
