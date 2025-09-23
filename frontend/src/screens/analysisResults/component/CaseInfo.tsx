export const CaseInfo = () => {
  return (
    <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 pl-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:space-x-8 gap-4 lg:gap-0 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">Case:</span>
          <span className="text-foreground">
            Thompson v Metropolitan Shopping Centers Pty Ltd
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">Court:</span>
          <span className="text-foreground">County Court of Victoria</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">Case No:</span>
          <span className="text-foreground">CC 2024-12847</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">Type:</span>
          <span className="text-foreground">Premises Liability</span>
        </div>
      </div>
    </div>
  );
};
