import { useApi } from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

type ProjectContextType = {
  project: Project | null;
  ros: any[];
  ro: RO | null;
  pius: any[];
  piu: PIU | null;
    setPiu: (piu: PIU | null) => void;
  projects: Project[];
  setProject: (project: Project | null) => void;
  loading: boolean;
  setRo: (ro: RO | null) => void;
  fetchROs: () => void;
  fetchPIUs: (roId: string) => void;
  fetchProjects: (piuId: string) => void;
  selectProject: (project: Project) => void;
};

export type Project = {
  id: string;
  project_name: string;
  upc: string;
  piu_id_fk: string;
  survey_date: string;
  year: number;
  cycle: number;
  concessionaire: string;
  completion_year: string;
  mode: string;
  length: string;
  ae_ie: string;
};

export type RO = {
  id: string;
  ro_name: string;
  ro_resp: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  pincode: string;
  created_at: string; // or number if you plan to treat it as timestamp
  updated_at: string; // or number if you plan to treat it as timestamp
};

export type PIU = {
  id: string;
  piu_name: string;
  address: string;
  email: string;
  phone: string;
  pd_name: string;
  pincode: string;
  created_at: string; // use `number` if treating as timestamp
  updated_at: string; // use `number` if treating as timestamp
  ro_id_fk: string;
};

const api = useApi();

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);
export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [project, setProject] = useState<any>(null);
    const [ros, setROs] = useState<RO[]>([]);
    const [ro, setRo] = useState<RO | null>(null);
    const [pius, setPIUs] = useState<PIU[]>([]);
    const [piu, setPiu] = useState<PIU | null>(null);
    const [loading, setLoading] = useState(true);

  const fetchROs = async () => {
    try{
        const ros = await api.get("/nsv/master/ro-list");
        setROs(ros.data);
    }catch (error) {
        console.error("Error fetching ROs:", error);
    }
    finally {
        setLoading(false);
    }
  };

  const fetchPIUs = async(roId: string) =>{
    try{
        const pius = await api.get(`/nsv/master/piu-list?ro_id=${roId}`);
        setPIUs(pius.data);
    }catch (error) {
        console.error("Error fetching PIUs:", error);
    }finally {
        setLoading(false);
    }
  }

  const fetchProjects = async (piuId: string) => {
    try {
      const projects = await api.get(`/nsv/master/project-list?piu_id=${piuId}`);
      setProjects(projects.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectProject = (project: Project) => {
    setProject(project);
    AsyncStorage.setItem("project", JSON.stringify(project))
      .then(() => {
        console.log("Project saved to storage");
      })
      .catch((error) => {
        console.error("Error saving project to storage", error);
      });
  };

  const fetchStoredProject = async () => {
    const project = await AsyncStorage.getItem("project");
    if (project) {
      try {
        setProject(JSON.parse(project));
      } catch (error) {
        console.error("Error parsing project from storage", error);
      }
    }
  };

  useEffect(() => {
    fetchStoredProject();
  }, []);

  return (
    <ProjectContext.Provider value={{
        ros,
        ro,
        setRo,
        fetchROs,
        pius,
        piu,
        setPiu,
        fetchPIUs,
        projects,
        project,
        setProject,
        fetchProjects,
        loading,
        selectProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
