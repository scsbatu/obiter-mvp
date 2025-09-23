import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { InputText } from "@/components/InputText/InputText";
import { useForm } from "react-hook-form";

interface WitnessSectionProps {
  witnesses: string[];
  onAdd: (name: string) => void;
  onRemove: (index: number) => void;
}

export function WitnessSection({
  witnesses,
  onAdd,
  onRemove,
}: WitnessSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    onAdd(data.description);
    reset();
  };

  return (
    <Card className="mb-8 bg-card_grey">
      <CardHeader>
        <CardTitle className="text-primary">Witnesses</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <InputText
              name="description"
              register={register}
              required
              errorMessage="Project name is required"
              customLabelText="text-white"
            />
            <Button disabled={!isValid} type="submit">
              <Plus className="w-4 h-4 mr-2" />
              Add Witness
            </Button>
          </div>
        </form>
        {witnesses.length > 0 ? (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Added Witnesses ({witnesses.length})
            </h4>
            <div className="space-y-2">
              {witnesses.map((witness, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-sm transition-colors"
                >
                  <span className="text-white">{witness}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No witnesses added yet</p>
            <p className="text-sm mt-1">
              Add witnesses to your case using the input field above
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
