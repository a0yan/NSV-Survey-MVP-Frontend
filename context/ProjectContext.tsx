import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

type ProjectContextType = {
  project: Project | null;
  setProject: (project: Project | null) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  isProjectActive: boolean;
  // setIsProjectActive: (isActive: boolean) => void;
  activeProject: (active: boolean) => void;
  ro: RO | null;
  setRo: (ro: RO | null) => void;
  setROs: (ros: RO[]) => void;
  ros: any[];
  piu: PIU | null;
  pius: any[];
  setPiu: (piu: PIU | null) => void;
  setPIUs: (pius: PIU[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  surveyStartTime: number | null;
  setSurveyStartTimePersistant: (time: number | null) => void;
  flushProjectContext: () => void;
  // selectProject: (project: Project) => void;
};

export type Project = {
  id: string;
  project_name: string;
  upc: string;
  nh_number: string;
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

// const api = axios.create({});
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
  const [isProjectActive, setIsProjectActive] = useState(false);
  const [ros, setROs] = useState<RO[]>([]);
  const [ro, setRo] = useState<RO | null>(null);
  const [pius, setPIUs] = useState<PIU[]>([]);
  const [piu, setPiu] = useState<PIU | null>(null);
  const [loading, setLoading] = useState(true);
  const [surveyStartTime, setSurveyStartTime] = useState<number | null>(null);


  const activeProject = (active: boolean) => {
    if (active) {
      setIsProjectActive(true);
      AsyncStorage.setItem("project", JSON.stringify(project))
        .then(() => {
          console.log("Project saved to storage", JSON.stringify(project));
        })
        .catch((error) => {
          console.error("Error saving project to storage", error);
        });
  
      AsyncStorage.setItem("ro", JSON.stringify(ro))
      .then(() => {
          console.log("RO saved to storage", JSON.stringify(ro));
        })
        .catch((error) => {
          console.error("Error saving project to storage", error);
        });
  
        AsyncStorage.setItem("piu", JSON.stringify(piu))
        .then(() => {
          console.log("PIU saved to storage", JSON.stringify(piu));
        })
        .catch((error) => {
          console.error("Error saving project to storage", error);
        });

      console.log("isProjectActivate", true);
        
      AsyncStorage.setItem("isProjectActivate", JSON.stringify(true))
      .then(() => {
          console.log("isProjectActivate saved to storage", JSON.stringify(true));
        })
        .catch((error) => {
          console.error("Error saving project to storage", error);
        });
      } else { 
        setIsProjectActive(false);
        AsyncStorage.removeItem("project")
          .then(() => {
            console.log("Project removed from storage");
          })
          .catch((error) => {
            console.error("Error removing project from storage", error);
          });
  
        AsyncStorage.removeItem("ro")
          .then(() => {
            console.log("RO removed from storage");
          })
          .catch((error) => {
            console.error("Error removing RO from storage", error);
          });
  
        AsyncStorage.removeItem("piu")
          .then(() => {
            console.log("PIU removed from storage");
          })
          .catch((error) => {
            console.error("Error removing PIU from storage", error);
          });
  
        AsyncStorage.removeItem("isProjectActivate")
          .then(() => {
            console.log("isProjectActivate removed from storage");
          })
          .catch((error) => {
            console.error("Error removing isProjectActivate from storage", error);
          });
          AsyncStorage.setItem("surveyStartTime", JSON.stringify(surveyStartTime))

          // setPiu(null);
          // setProject(null)
          // setProjects([]);
      }
  };

  // const fetchStoredProject = async () => {
  //   const isProjectActivate = await AsyncStorage.getItem("isProjectActivate");
  //   const project = await AsyncStorage.getItem("project");
  //   const ro = await AsyncStorage.getItem("ro");
  //   const piu = await AsyncStorage.getItem("piu");
  //   if (project) {
  //     try {
  //       setProject(JSON.parse(project));
  //     } catch (error) {
  //       console.error("Error parsing project from storage", error);
  //     }
  //   }
  //   if (ro) {
  //     try {
  //       setRo(JSON.parse(ro));
  //     } catch (error) {
  //       console.error("Error parsing ro from storage", error);
  //     }
  //   }
  //   if (piu) {
  //     try {
  //       setPiu(JSON.parse(piu));
  //     } catch (error) {
  //       console.error("Error parsing piu from storage", error);
  //     }
  //   }
  //   if (isProjectActivate) {
  //     // setIsProjectActive(isProjectActivate === "true");
  //     setIsProjectActive(true);
  //   } else {
  //     setIsProjectActive(false);
  //   }
  //   console.log("Fetched stored project:", {project, ro, piu, isProjectActivate});
    
  // };


  const fetchStoredProject = async () => {
    try {
      const [isActive, proj, storedRo, storedPiu,surveyStartTime] = await Promise.all([
        AsyncStorage.getItem("isProjectActivate"),
        AsyncStorage.getItem("project"),
        AsyncStorage.getItem("ro"),
        AsyncStorage.getItem("piu"),
        AsyncStorage.getItem("surveyStartTime")
      ]);

      if (proj) setProject(JSON.parse(proj));
      if (storedRo) setRo(JSON.parse(storedRo));
      if (storedPiu) setPiu(JSON.parse(storedPiu));
      if (isActive) setIsProjectActive(JSON.parse(isActive));
      if (surveyStartTime) setSurveyStartTime(JSON.parse(surveyStartTime));
      // setIsProjectActive(isActive === "true");

      console.log("Fetched stored project state", {
        project: proj,
        ro: storedRo,
        piu: storedPiu,
        isProjectActive: isActive,
        surveyStartTime: surveyStartTime
      });
    } catch (error) {
      console.error("Error fetching from AsyncStorage:", error);
    }
  };
  const setSurveyStartTimePersistant = (time: number | null) => {
    setSurveyStartTime(time);
    AsyncStorage.setItem("surveyStartTime", JSON.stringify(time))
      .then(() => {
        console.log("Survey start time saved to storage", time);
      })    
    }

  //TODO: Add Flush Project Functionality

  const flushProjectContext = () => {
        AsyncStorage.removeItem("isProjectActivate"),
        AsyncStorage.removeItem("project"),
        AsyncStorage.removeItem("ro"),
        AsyncStorage.removeItem("piu"),
        AsyncStorage.removeItem("surveyStartTime"),
        AsyncStorage.removeItem("project"),
        setProject(null);
        setRo(null);
        setPiu(null);
        setPIUs([]);
        setProjects([]);
        setSurveyStartTime(null);
        setIsProjectActive(false);
  }

  useEffect(() => {
    fetchStoredProject();
  }, []);

  // useEffect(() => {
  //   setPiu(null);
  //   setProject(null)
  //   setProjects([]);
  // }, [ro]);

  // useEffect(() => {
  //   activeProject(isProjectActive);
  // },[isProjectActive])

  return (
    <ProjectContext.Provider
      value={{
        ros,
        ro,
        setRo,
        setROs,
        pius,
        piu,
        setPiu,
        setPIUs,
        projects,
        project,
        setProject,
        setProjects,
        setLoading,
        loading,
        isProjectActive,
        activeProject,
        surveyStartTime,
        setSurveyStartTimePersistant,
        flushProjectContext
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
