export interface DistressData {
  distress_segment_id: string;
  lane_code: string;
  start_chainage_m: number;
  end_chainage_m: number;
  roughness_bi: string;         // Consider `number` if always numeric
  rut_depth_mm: string;
  crack_area_pct: string;
  ravelling_area_pct: string;
  distance_meters: number;
  side:string
}
