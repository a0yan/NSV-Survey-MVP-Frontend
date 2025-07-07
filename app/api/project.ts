import { useApi } from "@/hooks/useApi";

const api = useApi();

export const fetchROs = () => api.get('/nsv/master/ro-list');
export const fetchPIUs = (roId: string) => api.get(`/nsv/master/piu-list?ro_id=${roId}`);
export const fetchProjects = (piuId: string) => api.get(`/nsv/master/project-list?piu_id=${piuId}`);
