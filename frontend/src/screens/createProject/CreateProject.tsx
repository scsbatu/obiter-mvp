import { usePostProject, usePutProject, useUploadFiles } from "@/api/project";
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
import DocumentUploader from "./component/DocumentUpload";
import isEmpty from "lodash/isEmpty";

const CreateProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  const [date, setDate] = useState<any | null>(new Date());
  const [witnesses, setWitnesses] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const handleChange = (d: Date | null) => setDate(d.toISOString());

  const { mutate, data: newProject, isPending, reset } = usePostProject();
  const { mutate: uploadDocumentFile, isPending: uploadPending } =
    useUploadFiles();
  const { mutate: updateProject } = usePutProject();

  const isNotAvailableProduct = isEmpty(newProject?.id);

  const handleAdd = (name: string) => {
    setWitnesses((prev) => [...prev, name]);
  };
  const handleRemove = (index: number) => {
    setWitnesses((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = (projectId: any) => {
    uploadDocumentFile(
      { files: uploadedFiles, projectId: projectId },
      {
        onSuccess: () => {
          navigate("/projects");
        },
        onError: () => {
          toast({
            description: "The project file has not been uploaded",
            variant: "destructive",
          });
        },
      }
    );
  };

  const onSubmit = async (data: any) => {
    const projectDetails = {
      ...data,
      incidentDate: date,
      witnesses,
    };

    const handleSuccess = (responseData: any, message: string) => {
      toast({ description: message, className: "bg-green-600 text-white" });
      uploadFiles(responseData?.id);
    };

    const handleError = (error: any) => {
      toast({
        description: error,
        variant: "destructive",
      });
    };

    if (isNotAvailableProduct) {
      mutate(projectDetails, {
        onSuccess: (responseData) =>
          handleSuccess(responseData, "Project created successfully"),
        onError(error) {
          handleError(error);
        },
      });
    } else {
      projectDetails.id = newProject.id;
      updateProject(projectDetails, {
        onSuccess: (responseData) =>
          handleSuccess(responseData, "Project updated successfully"),
        onError(error) {
          handleError(error);
        },
      });
    }
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-20 mt-5">
        <div className="mx-auto">
          <div className="mb-7">
            <h1 className="text-3xl md:text-3xl font-bold text-primary">
              {isNotAvailableProduct ? "Edit Project" : "Update Project"}
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
          <DocumentUploader
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
          <div className="w-full px-2 mt-4 mb-4 flex justify-end">
            <Button
              type="button"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
            >
              {isNotAvailableProduct ? "Save Project" : "Update Product"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
