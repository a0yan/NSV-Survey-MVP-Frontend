// import { useApi } from "@/hooks/useApi";
// import { useProject } from "@/hooks/useProject";

// const api = useApi();
// // const [setROs, setPIUs, setProjects, setLoading] = useProject();
// const {
//   setROs,
//   setPIUs,
//   setProjects,
//   setLoading
// } = useProject();



// export const fetchROs = async () => {
//     try{
//         const ros = await api.get("/nsv/master/ro-list");
//         console.log("Fetched ROs:", ros);
//         setROs(ros.data);
//     }catch (error) {
//         console.error("Error fetching ROs:", error);
//     }
//     finally {
//         setLoading(false);
//     }
//   };

// export const fetchPIUs = async(roId: string) =>{
//     try{
//         const pius = await api.get(`/nsv/master/piu-list?ro_id=${roId}`);
//         setPIUs(pius.data);
//     }catch (error) {
//         console.error("Error fetching PIUs:", error);
//     }finally {
//         setLoading(false);
//     }
//   }

// export const fetchProjects = async (piuId: string) => {
//     try {
//       const projects = await api.get(`/nsv/master/project-list?piu_id=${piuId}`);
//       setProjects(projects.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
