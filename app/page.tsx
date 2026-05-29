import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col items-center justify-center gap-8 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Elastic Habits
          </h1>
          <p className="text-sm text-slate-400 sm:text-base">
            Nawyki bez wstydu, w tempie dopasowanym do Twojej energii.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Link href="/dashboard#dodaj-nawyk" className="block">
            <Button className="w-full py-5 text-base font-bold sm:text-lg">
              Dodaj nowy nawyk
            </Button>
          </Link>

          <Link href="/dashboard#twoje-nawyki" className="block">
            <Button
              variant="outline"
              className="w-full py-5 text-base font-bold sm:text-lg"
            >
              Twoje nawyki
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
