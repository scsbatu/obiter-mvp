import { Card } from "@/components/ui/card";

export const CaseSummary = () => {
  return (
    <Card className="p-4 bg-light-gold">
      <h3 className="text-sm font-medium text-foreground mb-3">Case Summary</h3>
      <div className="space-y-3 text-xs">
        <div>
          <span className="text-legal-gold font-medium">Plaintiff:</span>
          <div className="text-muted-foreground mt-1">
            Sarah Michelle Thompson, 49 year-old financial planner
          </div>
        </div>
        <div>
          <span className="text-legal-gold font-medium">Defendant:</span>
          <div className="text-muted-foreground mt-1">
            Metropolitan Shopping Centres Pty Ltd (ACN: Cth 456 789)
          </div>
        </div>
        <div>
          <span className="text-legal-gold font-medium">Incident:</span>
          <div className="text-muted-foreground mt-1">
            Slip and fall incident on premises resulting in serious injuries
          </div>
        </div>
        <div>
          <span className="text-legal-gold font-medium">Legal Issues:</span>
          <div className="text-muted-foreground mt-1 space-y-1">
            <div>• Premises liability</div>
            <div>• Negligence</div>
            <div>• Contributory negligence</div>
            <div>• Quantum of damages</div>
          </div>
        </div>
        <div>
          <span className="text-legal-gold font-medium">Economic Loss:</span>
          <div className="text-muted-foreground mt-1">
            $841,375 (per Susan Mitchell CPA)
            <br />
            Settlement demand: $270,000
          </div>
        </div>
      </div>
    </Card>
  );
};
