"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { witnessResults } from "@/config/constants";
import { Header } from "./component/Header";
import { CredibilityCard } from "./component/CredibilityCard";
import { IssuesTab } from "./component/IssuesTab";
import { ContradictionsTab } from "./component/ContradictionsTab";
import { TimelineTab } from "./component/TimelineTab";
import { QuestionsTab } from "./component/QuestionsTab";
import { SummaryTab } from "./component/SummaryTab";
import { useParams } from "react-router-dom";
import { useGetProjectById } from "@/api/project";

export const AnalysisResults = () => {
  const { id } = useParams();
  const { data, isFetching, isLoading } = useGetProjectById(id);

  const [activeTab, setActiveTab] = useState("credibility");

  return (
    <div className="container min-h-screen bg-background text-foreground pt-20">
      <Header data={data}/>
      <div className="p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-light-white border border-border">
            {[
              "credibility",
              "issues",
              "contradictions",
              "timeline",
              "questions",
              "summary",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-gold data-[state=active]:text-primary text-xs sm:text-sm"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="credibility" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {witnessResults.map((witness) => (
                <CredibilityCard key={witness.id} witness={witness} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="issues" className="mt-6">
            <IssuesTab />
          </TabsContent>
          <TabsContent value="contradictions" className="mt-6">
            <ContradictionsTab />
          </TabsContent>
          <TabsContent value="timeline" className="mt-6">
            <TimelineTab />
          </TabsContent>
          <TabsContent value="questions" className="mt-6">
            <QuestionsTab />
          </TabsContent>
          <TabsContent value="summary" className="mt-6">
            <SummaryTab />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
          <div className="grid grid-cols-2 lg:flex lg:space-x-4 gap-2 lg:gap-0">
            <Button
              variant="outline"
              className="border-border hover:bg-accent text-xs sm:text-sm"
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-accent text-xs sm:text-sm"
            >
              Export Word
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-accent text-xs sm:text-sm"
            >
              Copy
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-accent text-xs sm:text-sm"
            >
              Trial Bundle
            </Button>
          </div>
          <Button className="bg-legal-gold text-black hover:bg-legal-gold/90 w-full lg:w-auto">
            Continue to Cross-Examination Prep
          </Button>
        </div>
      </div>
    </div>
  );
};
