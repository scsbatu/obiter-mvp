import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { features, userTypes } from "@/config/constants";

const ObiterDetails = () => {
  const [selectedUserType, setSelectedUserType] = useState("Lawyer");
  return (
    <div className="bg-gradient-hero pt-20 pb-5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
              Obiter AI
            </h1>
            <p className="text-xl md:text-2xl text-primary/90 font-medium mb-12">
              Legal Tradition, Enhanced Intelligence
            </p>
          </div>
          <div className="space-y-6 mb-12 text-left max-w-3xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-white leading-relaxed">
                Where centuries of legal precedent meet cutting-edge artificial
                intelligence to enhance, not replace, the irreplaceable
                judgement of trained legal professionals.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-white leading-relaxed">
                Organise your cases in secure projects, upload your documents,
                and leverage AI tools that apply established courtroom
                methodologies to your materials—eliminating the hallucination
                risks that plague other platforms.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-white leading-relaxed">
                Transform your legal practice with AI that analyses only the
                documents you provide, ensuring every insight is traceable to
                your source materials while respecting that nuanced judgement
                only human lawyers can provide.
              </p>
            </div>
          </div>
          <div className="mb-12">
            <div className="flex justify-center space-x-4 mb-8">
              {userTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedUserType(type)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedUserType === type
                      ? "bg-gradient-gold text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <Card className="bg-gradient-card border-border/50 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <p className="text-white leading-relaxed mb-6">
                  Create case projects, upload your evidence, and let AI assist
                  your analysis while you maintain complete control. Our tools
                  analyse only the documents you provide, applying
                  courtroom-tested methodologies to support your strategic
                  thinking. Perfect for trial attorneys, barristers, solicitors
                  and advocates who understand that technology enhances but
                  never replaces professional legal judgement.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="border-border/50 max-w-3xl mx-auto mb-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-light-gold">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-gold hover:shadow-gold transition-all duration-300 text-lg px-8 py-4"
              >
                Create Your First Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-4"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObiterDetails;
