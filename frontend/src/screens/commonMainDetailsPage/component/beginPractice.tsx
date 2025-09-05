import { Card, CardContent} from "@/components/ui/card";

const BeginPractice = () => {
  return (
    <section className="py-10 bg-background">
        <div className="text-center">
          <Card className="bg-gradient-card border-primary/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Begin Your Practice Transformation
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join forward-thinking legal professionals already leveraging AI
                to deliver better outcomes for their clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-gold transition-all duration-300">
                  Start Free Trial
                </button>
                <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300">
                  Request Demo
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
    </section>
  );
};

export default BeginPractice;
