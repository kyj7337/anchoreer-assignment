import { useQuery } from '@tanstack/react-query';
import defaultAxios from '../config';

const uri = '/api/v1/duties.json';

export interface DutyInfo {
  id: number;
  name: string;
  parent_id: null | number;
}

const fetcher = () =>
  defaultAxios.get<DutyInfo[]>(uri).then(({ data }) => {
    return {
      rawData: data,
      etc: {
        // TODO: 데이터 가공처리하기
      },
    };
  });

/**
   * 
   - 설명
    - 직무의 정보를 담고 있습니다. 직무 정보는 최대 3계층의 계층 구조 입니다.
    - parent_id가 null인 경우 최상위 노드, parent_id를 가지고 있다면 parent node의 하위 노드입니다.
   *
   */

export default function useGetDutyList() {
  return useQuery({
    queryKey: ['get-duty-list'],
    queryFn: fetcher,
  });
}
