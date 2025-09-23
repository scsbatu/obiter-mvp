export const ContradictionsTab = () => {
  return (
    <div className="bg-light-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Witness Contradictions</h3>
      <div className="space-y-4">
        <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Timeline Inconsistency</h4>
          <p className="text-sm text-muted-foreground">
            Witness statements show conflicting times for key events...
          </p>
        </div>
      </div>
    </div>
  );
};
