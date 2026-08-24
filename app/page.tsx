import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold mb-4">Spin Wheel</h1>
      <p className="text-muted-foreground">
        v2 starter scaffold. Wheel features incoming.
      </p>
    </main>
  );
}
