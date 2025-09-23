export const TimelineTab = () => {
  return (
    <div className="bg-light-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Timeline Analysis</h3>
      <div className="space-y-4">
        <div className="p-4 bg-light-gold rounded-lg">
          <div className="font-medium text-foreground">14:30 - Initial incident occurs</div>
          <p className="text-sm text-muted-foreground mt-1">
            According to security footage and witness statements
          </p>
        </div>
        <div className="p-4 bg-light-gold rounded-lg">
          <div className="font-medium text-foreground">14:32 - Security response</div>
          <p className="text-sm text-muted-foreground mt-1">
            Michelle Chen arrives at scene
          </p>
        </div>
      </div>
    </div>
  );
};
