import dynamic from 'next/dynamic';

const PortfolioClient = dynamic(() => import('../components/PortfolioClient'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#05070B] flex flex-col items-center justify-center text-slate-100 gap-4 z-50">
      <div className="w-12 h-12 rounded-2xl bg-[#0E1726] border border-blue-500/30 flex items-center justify-center font-display font-black text-xl text-blue-400 animate-pulse">
        SL
      </div>
     
    </div>
  )
});

export default function Page() {
  return <PortfolioClient />;
}
