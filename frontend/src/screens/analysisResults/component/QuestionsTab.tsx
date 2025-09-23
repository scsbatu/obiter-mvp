export const QuestionsTab = () => {
  return (
    <div className="bg-light-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Examination Questions</h3>
      <div className="space-y-4">
        <div className="p-4 bg-light-gold rounded-lg">
          <h4 className="font-medium text-foreground mb-2">For Sarah Michelle Thompson</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Can you describe exactly what you were doing immediately before the incident?</li>
            <li>What was your first reaction when you realized what had happened?</li>
            <li>Did you notice any warning signs or hazards before the incident?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
