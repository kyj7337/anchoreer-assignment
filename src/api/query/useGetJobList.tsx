import { useQuery } from '@tanstack/react-query';
import defaultAxios from '../config';

const uri = '/api/v1/recruits.json';

interface JobInfo {
  id: number;
  company_name: string;
  title: string;
  start_time: string;
  end_time: string;
  image_url: string;
  duty_ids: number[] | null;
}

const fetcher = () => defaultAxios.get<JobInfo[]>(uri).then(({ data }) => data);

export default function useGetJobList() {
  return useQuery({
    queryKey: ['get-job-list'],
    queryFn: fetcher,
  });
}
