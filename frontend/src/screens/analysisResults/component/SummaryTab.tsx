export const SummaryTab = () => {
  return (
    <div className="bg-light-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Strategic Summary</h3>
      <div className="space-y-4">
        <div className="p-4 bg-light-gold rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Strengths</h4>
          <p className="text-sm text-muted-foreground">
            Strong witness credibility, consistent timeline, expert testimony...
          </p>
        </div>
        <div className="p-4 bg-light-gold rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Weaknesses</h4>
          <p className="text-sm text-muted-foreground">
            Limited physical evidence, potential bias issues...
          </p>
        </div>
      </div>
    </div>
  );
};
