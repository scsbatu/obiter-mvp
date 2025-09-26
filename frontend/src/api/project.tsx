import { useMutation, useQuery } from "@tanstack/react-query";
import { gateAxios, gateAxiosFileUpload } from "./api";

const postProject = async (data: any) => {
  let res = await gateAxios.post("/1/project", data);
  return res.data;
};

export const usePostProject = () => {
  return useMutation({
    mutationFn: postProject, // function to call when mutation runs
    onSuccess: (data) => data,
    onError: (error: any) => {
      console.error("Error creating project:", error);
    },
  });
};

export const useGetProjectById = (projectId: string | number) => {
  return useQuery({
    queryKey: ["useGetProjectById", projectId],
    queryFn: async () => {
      if (!projectId) throw new Error("Project ID is required");
      const res = await gateAxios.get("/1/project", {
        params: { projectId },
      });
      return res.data;
    },
    enabled: !!projectId,
  });
};

export const useGetAllProject = () => {
  return useQuery({
    queryKey: ["useGetAllProject"],
    queryFn: async () => {
      const res = await gateAxios.get("/1/projects");
      return res.data;
    },
  });
};

const putProject = async (data: any) => {
  let res = await gateAxios.put("/1/project", data);
  return res.data;
};

export const usePutProject = () => {
  return useMutation({
    mutationFn: putProject,
    onSuccess: (data) => data,
    onError: (error: any) => {
      console.error("Error updating project:", error);
    },
  });
};

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: async ({
      files,
      projectId,
    }: {
      files: File[];
      projectId: string;
    }) => {
      const results = [];
      for (const file of files) {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64File = (reader.result as string).split(",")[1];
          const payload = {
            projectId: projectId,
            file: base64File,
          };
          try {
            const res = await gateAxiosFileUpload.post(
              "1/project/upload",
              payload
            );
          } catch (err: any) {}
        };
      }
      return results;
    },
  });
};
