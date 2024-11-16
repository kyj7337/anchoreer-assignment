import { ForwardedRef, forwardRef } from 'react';
import styles from './ProjectDetailContent.module.scss';
import { ProjectInfo } from '@/api/query/useGetJobList';
import IcClose from '@/assets/x_btn.png';
import logo from '@/assets/react.svg';
import { format } from 'date-fns';
import useGetDutyList from '@/api/query/useGetDutyList';
import { getDutyNamesById } from '@/utils';

interface ProjectDetailContentProps {
  project: ProjectInfo;
  onClose: () => void;
}

const dateFormat = 'yyyy년 MM월 dd일 hh:mm';

const ProjectDetailContent = forwardRef(
  (props: ProjectDetailContentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { data: dutyDataList } = useGetDutyList();

    const { project, onClose } = props;

    const startDate = format(new Date(project.start_time), dateFormat);
    const endDate = format(new Date(project.end_time), dateFormat);
    const dutyNames = getDutyNamesById(project.duty_ids, dutyDataList?.rawData);
    return (
      <div ref={ref} className={styles.modalContentContainer}>
        <img onClick={onClose} src={IcClose} className={styles.closeIcon} />
        <div className={styles.infoContainer}>
          <div className={styles.companyName}>
            <img className={styles.logo} src={logo} />
            <span>{project.company_name}</span>
          </div>
          <div className={styles.projectTitle}>{project.title}</div>
          <div className={styles.projectTime}>
            <span>
              {startDate} ~ {endDate}
            </span>
          </div>
          <div className={styles.projectDutyNames}>{dutyNames}</div>
        </div>
        <img className={styles.projectDetailImg} src={project.image_url} />
      </div>
    );
  }
);

export default ProjectDetailContent;
