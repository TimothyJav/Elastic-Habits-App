import Link from 'next/link';
import { CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    icon: CalendarCheck,
    title: 'Dzisiejszy plan',
    text: 'Zobacz zapisane nawyki i wybierz poziom wykonania bez przełączania ekranów.',
  },
  {
    icon: ShieldCheck,
    title: 'Emergency bez wstydu',
    text: 'Minimalny krok nadal zapisuje postęp i pomaga utrzymać rytm.',
  },
  {
    icon: Sparkles,
    title: 'Gotowe szablony',
    text: 'Dodawaj nawyki szybciej dzięki poziomom Full, Adjusted i Emergency.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-300">
              ADHD-friendly habit tracker
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-6xl">
              Elastic Habits
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Buduj nawyki w tempie dopasowanym do energii dnia. Full, Adjusted
              i Emergency liczą się jako realny postęp.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className="block">
              <Button size="lg" className="w-full sm:w-auto">
                Otwórz dzisiejszy panel
              </Button>
            </Link>
            <Link href="/dashboard#dodaj-nawyk" className="block">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Dodaj nawyk
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {highlights.map(item => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-green-500/15 p-2 text-green-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-white">{item.title}</h2>
              </div>
              <p className="text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
