import { usePostProject } from "@/api/project";
import FileUpload from "@/components/FileUpload";
import { InputDatePicker } from "@/components/InputDatePicker/InputDatePicker";
import { InputText } from "@/components/InputText/InputText";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WitnessSection } from "@/components/Witnesses";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  const [date, setDate] = useState<any | null>(new Date());
  const handleChange = (d: Date | null) => setDate(d.toISOString());
  const { mutate, isError, error, data, isPending } = usePostProject();
  const [witnesses, setWitnesses] = useState<string[]>([]);

  const handleAdd = (name: string) => {
    setWitnesses((prev) => [...prev, name]);
  };

  const handleRemove = (index: number) => {
    setWitnesses((prev) => prev.filter((_, i) => i !== index));
  };

  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    const projectDetails = {
      ...data,
      incidentDate: date,
      witnesses: witnesses,
    };
    mutate(projectDetails, {
      onSuccess(data, variables, context) {
        toast({
          description: "Project create successfully",
        });
        navigate("/projects");
      },
    });
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-20 mt-10">
        <div className="mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-4xl font-bold text-primary">
              Create Project
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mb-8 bg-card_grey">
              <CardHeader>
                <CardTitle className="text-primary">
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <InputText
                      labelName="Project Name"
                      name="name"
                      register={register}
                      required
                      errorMessage="Project name is required"
                      customLabelText="text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <InputDatePicker
                      labelName="Incident Date"
                      changeDate={handleChange}
                      currentSelectedData={date}
                      customLabelText="text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <InputText
                      labelName="Premises Liability"
                      name="premisesLiability"
                      register={register}
                      required
                      errorMessage="Premises liability is required"
                      customLabelText="text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <InputText
                      labelName="Case No"
                      name="caseNo"
                      register={register}
                      required
                      customLabelText="text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
          <WitnessSection
            witnesses={witnesses}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
          <div className="w-full px-2 mt-4 mb-4 flex justify-end">
            <Button type="button" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
              Save Project
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
