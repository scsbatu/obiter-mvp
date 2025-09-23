import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { steps } from "@/config/constants";

const HowItWorksSection = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">
            How Obliter AI Works
          </h2>
          <p className="text-xl text-light-gold max-w-3xl mx-auto">
            A simple, yet powerful workflow that transforms the way legal professionals approach complex challenges
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary"/>
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-light-gold text-center leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;