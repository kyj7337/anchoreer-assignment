import useGetJobList, { ProjectInfo } from '@/api/query/useGetJobList';
import styles from './ProjectDetailModal.module.scss';
import { Dispatch, ForwardedRef, forwardRef, MouseEvent, SetStateAction, useRef } from 'react';
import { findPrevNextProject } from '@/utils';
import classNames from 'classnames';
interface ProjectDetailModalProps {
  selectProject?: ProjectInfo;
  setSelectProject: Dispatch<SetStateAction<ProjectInfo | undefined>>;
  selectDaysProjects: ProjectInfo[];
  setSelectDaysProjects: Dispatch<SetStateAction<ProjectInfo[]>>;
}

type ArrowDirection = 'prev' | 'next';

interface ArrowProps {
  direction: ArrowDirection;
  project: ProjectInfo | null;
  onClick: () => void;
}

const Arrow = forwardRef((props: ArrowProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { project, direction, onClick } = props;
  const icon = direction === 'prev' ? '<' : '>';
  return (
    <div
      ref={ref}
      className={classNames(styles.arrowContainer, {
        [styles.hide]: !project,
      })}
    >
      <div onClick={onClick} className={styles.arrowBtn}>
        {icon}
      </div>
      <div className={styles.btnText}>{project?.company_name}</div>
    </div>
  );
});

export default function ProjectDetailModal(props: ProjectDetailModalProps) {
  const { setSelectDaysProjects, setSelectProject, selectDaysProjects, selectProject } = props;
  const modalContentRef = useRef<HTMLDivElement>(null);
  const leftIconRef = useRef<HTMLDivElement>(null);
  const rightIconRef = useRef<HTMLDivElement>(null);

  const { prevProject, nextProject } = findPrevNextProject(selectDaysProjects, selectProject);
  const onClickArrow = (direction: ArrowDirection) => {
    const prevClickable = direction === 'prev' && !!prevProject;
    const nextClickable = direction === 'next' && !!nextProject;
    if (prevClickable) {
      setSelectProject(prevProject);
    }
    if (nextClickable) {
      setSelectProject(nextProject);
    }
  };

  const onClickOutSide = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Node;

    const isBtnClicked =
      leftIconRef.current?.contains(target) || rightIconRef.current?.contains(target);

    if (isBtnClicked) {
      return;
    }

    if (!modalContentRef.current?.contains(target)) {
      setSelectProject(undefined);
      setSelectDaysProjects([]);
    }
  };

  if (selectProject) {
    return (
      <div className={styles.modalContainer} onClick={onClickOutSide}>
        <Arrow
          direction='prev'
          project={prevProject}
          ref={leftIconRef}
          onClick={() => onClickArrow('prev')}
        />
        <div ref={modalContentRef} className={styles.modalContents}>
          {selectProject.company_name}
        </div>
        <Arrow
          direction='next'
          project={nextProject}
          ref={rightIconRef}
          onClick={() => onClickArrow('next')}
        />
      </div>
    );
  }
  return <></>;
}
