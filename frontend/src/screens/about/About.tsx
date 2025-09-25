import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen container bg-background">
      <main className="mx-auto pt-32">
        <h1 className="text-3xl md:text-3xl font-bold text-white mb-8">
          About Obiter AI
        </h1>

        <div className="bg-sidebar-bg border border-border rounded-lg p-6 md:p-8 mb-8 bg-card/10">
          <h2 className="text-xl font-semibold text-primary text-center mb-4">
            Project-Based Legal Analysis
          </h2>
          <p className="text-center leading-relaxed text-light-gold">
            Obiter AI provides AI-powered legal analysis tools that work
            exclusively with your uploaded documents. No hallucinations, no fake
            citations - just sophisticated analysis of your actual case
            materials.
          </p>
        </div>

        <p className="text-light-gold leading-relaxed mb-8">
          This platform is designed specifically for Australian legal
          practitioners, incorporating established courtroom methodologies and
          professional standards. Our tools analyze only the documents you
          provide, ensuring complete accuracy and traceability.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Core Features
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span className="text-white">
                Project-based case organization
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span className="text-white">
                Analysis of your documents only
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span className="text-white">
                No external legal research or hallucinations
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span className="text-white">
                Australian legal system focus
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <span className="text-white">
                Professional, court-ready outputs
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
