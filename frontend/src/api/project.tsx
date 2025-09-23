import { useMutation, useQuery } from "@tanstack/react-query";
import { gateAxios } from "./api";

const postProject = async(data:any) =>{
    let res = await gateAxios.post("/1/project",data);
    return res.data
}


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

const putProject = async(data:any) =>{
    let res = await gateAxios.put("/1/project",data);
    return res.data
}

export const usePutProject = () => {
  return useMutation({
    mutationFn: putProject, 
    onSuccess: (data) => data,
    onError: (error: any) => {
      console.error("Error updating project:", error);
    },
  });
};