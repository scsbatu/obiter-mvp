export const IssuesTab = () => {
  return (
    <div className="bg-light-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Key Issues & Evidence</h3>
      <div className="space-y-4">
        <div className="p-4 bg-light-gold rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Liability Issues</h4>
          <p className="text-sm text-muted-foreground">
            Analysis of premises liability factors and duty of care...
          </p>
        </div>
        <div className="p-4 bg-light-gold rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Causation Evidence</h4>
          <p className="text-sm text-muted-foreground">
            Medical evidence linking incident to claimed injuries...
          </p>
        </div>
      </div>
    </div>
  );
};
