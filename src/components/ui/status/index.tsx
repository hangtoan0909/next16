import { ADMIN_INSPECTION_STATUS, ADMIN_INSPECTION_STATUS_OPTIONS } from '@/constants';
import { useTranslationUtil } from '@/hooks/utils';

type Props = {
  status: ADMIN_INSPECTION_STATUS;
  options?: typeof ADMIN_INSPECTION_STATUS_OPTIONS;
};

export const RenderStatus = ({ status, options = ADMIN_INSPECTION_STATUS_OPTIONS }: Props) => {
  const { getLabelByValue } = useTranslationUtil();

  const statusClassMap: Record<ADMIN_INSPECTION_STATUS, string> = {
    [ADMIN_INSPECTION_STATUS.PENDING]: 'bg-amber-100 text-amber-600',
    [ADMIN_INSPECTION_STATUS.REJECTED]: 'bg-red-100 text-red-700',
    [ADMIN_INSPECTION_STATUS.ACTIVE]: 'bg-green-100 text-green-700',
    [ADMIN_INSPECTION_STATUS.SUSPENDED]: 'bg-amber-100 text-amber-600',
    [ADMIN_INSPECTION_STATUS.WITHDRAWN]: 'bg-red-100 text-red-700',
  };

  return (
    <div
      style={{
        fontSize: '14px',
        fontWeight: 500,
        width: 'max-content',
        borderRadius: '28px',
        padding: '2px 12px',
      }}
      className={statusClassMap[status]}
    >
      {getLabelByValue(options, status)}
    </div>
  );
};
