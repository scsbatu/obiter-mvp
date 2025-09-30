import { useMemo, useState } from "react";
import {
  useGetProjectById,
  usePutProject,
  useUploadFiles,
} from "@/api/project";
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
import DocumentUploader from "./component/DocumentUpload";

const EditProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { id } = useParams();
  const { data, isFetching, isLoading } = useGetProjectById(id);
  const [witnesses, setWitnesses] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [date, setDate] = useState<any | null>(new Date());  

  const { mutate: uploadDocumentFile, isPending: uploadPending } =
    useUploadFiles();
  const { mutate, isPending } = usePutProject();

  const handleAdd = (name: string) => {
    setWitnesses((prev) => [...prev, name]);
  };

  const handleRemove = (index: number) => {
    setWitnesses((prev) => prev.filter((_, i) => i !== index));
  };

  const values = useMemo(() => {
    setUploadedFiles(data?.files || [])
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

  const handleChange = (d: Date | null) => setDate(d.toISOString());

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
      witnesses: witnesses,
    };
    mutate(projectDetails, {
      onSuccess(data, variables, context) {
        toast({
          title: "Update project data successfully",
          className: "bg-green-600 text-white",
        });
        uploadFiles(data?.id);
      },
    });
  };

  if (isPending || isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 pt-20 mt-5">
        <div className="mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-3xl font-bold text-primary">
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
              Update Project
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProject;
