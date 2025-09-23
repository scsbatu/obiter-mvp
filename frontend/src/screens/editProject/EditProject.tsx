import { useMemo, useState } from "react";
import { useGetProjectById, usePutProject } from "@/api/project";
import { InputDatePicker } from "@/components/InputDatePicker/InputDatePicker";
import { InputText } from "@/components/InputText/InputText";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WitnessSection } from "@/components/Witnesses";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, isLoading } = useGetProjectById(id);
  const [witnesses, setWitnesses] = useState<string[]>([]);

  const handleAdd = (name: string) => {
    setWitnesses((prev) => [...prev, name]);
  };

  const handleRemove = (index: number) => {
    setWitnesses((prev) => prev.filter((_, i) => i !== index));
  };

  const values = useMemo(() => {
    setWitnesses(data?.witnesses || []);
    return data;
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    values: values,
    defaultValues: values,
  });

  const [date, setDate] = useState<any | null>(new Date());
  const handleChange = (d: Date | null) => setDate(d.toISOString());
  const { mutate, isPending } = usePutProject();
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
          title: "Update project data successfully",
        });
        navigate("/projects");
      },
    });
  };

  if (isPending || isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-20 mt-10">
        <div className="mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-4xl font-bold text-primary">
              Edit Project
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
            <Button
              type="button"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Save Project
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProject;
