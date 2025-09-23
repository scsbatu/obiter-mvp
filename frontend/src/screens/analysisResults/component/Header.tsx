export const Header = () => {
  return (
    <header className="bg-sidebar-bg border-b border-border px-4 md:px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground">
            Dashboard &gt; Thompson v Metropolitan &gt;{" "}
            <span className="text-legal-gold">Witness Evidence Analyser</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-primary">
            Witness Evidence Analyser
          </div>
        </div>
      </div>
    </header>
  );
};
