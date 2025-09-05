import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featuresIcon } from "@/config/constants";

const FeaturesSection = () => {
  return (
    <section className="py-10 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-bold text-foreground mb-6">
            AI That Respects Legal Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Obliter AI enhances human intelligence rather than replacing it. We
            understand the irreplaceable value of legal expertise and strategic
            thinking that only experienced attorneys can provide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuresIcon.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 group text-center"
            >
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold text-foreground mb-4">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
