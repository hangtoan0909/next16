import CloseIcon from '@/assets/icons/close.svg';
import FolderIcon from '@/assets/icons/folder-down.svg';
import SuccessIcon from '@/assets/icons/icon-success.svg';
import UploadIcon from '@/assets/icons/upload.svg';
import { AppButton } from '@/components/ui';
import { useToastContext } from '@/hooks/toast/use-toast-context';
import { useTranslationUtil } from '@/hooks/utils';
import { useUploadImage } from '@/hooks/api/use-upload';
import { Flex, Upload, UploadProps } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

/* ================= TYPES ================= */

export type AppUploadsProps = {
  /**
   * URL của file đã upload (dùng khi component ở dạng controlled – AntD Form)
   */
  value?: string | null;

  /**
   * Callback trả URL lên form cha
   */
  onChange?: (url: string | null) => void;

  /**
   * Tên field (optional – chỉ để mapping backend nếu cần)
   */
  name?: string;
};

/* ================= CONSTANTS ================= */

const MAX_SIZE_MB = 5;

/* ================= COMPONENT ================= */

export default function AppUploads({ value = null, onChange, name }: AppUploadsProps) {
  const t = useTranslations('common');
  const { toast } = useToastContext();
  const { validateUploadFile } = useTranslationUtil();
  const { mutate: uploadMutate, isPending } = useUploadImage();

  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(value);

  /* ================= SYNC CONTROLLED VALUE ================= */

  useEffect(() => {
    if (value === null) {
      setFile(null);
      setUploadedUrl(null);
    }
  }, [value]);

  /* ================= HANDLERS ================= */

  const handleUpload: UploadProps['beforeUpload'] = (incomingFile) => {
    const { isValid, message } = validateUploadFile(incomingFile, 'all', MAX_SIZE_MB);

    if (!isValid) {
      toast('error', { description: message });
      return Upload.LIST_IGNORE;
    }

    const formData = new FormData();
    formData.append('file', incomingFile);

    uploadMutate(formData, {
      onSuccess: (res) => {
        const fileUrl: string | undefined = res.data?.url;

        if (!fileUrl) {
          toast('error', { description: t('uploads.failed') });
          return;
        }

        setFile(incomingFile);
        setUploadedUrl(fileUrl);
        onChange?.(fileUrl);
      },
      onError: () => {
        toast('error', {
          description: t('uploads.failed'),
        });
      },
    });

    // chặn upload mặc định của AntD
    return false;
  };

  const removeFile = () => {
    setFile(null);
    setUploadedUrl(null);
    onChange?.(null);
  };

  /* ================= RENDER ================= */

  return (
    <div>
      <Dragger
        accept='application/pdf,image/*'
        multiple={false}
        showUploadList={false}
        beforeUpload={handleUpload}
        name={name}
        disabled={isPending}
      >
        <p className='ant-upload-drag-icon'>
          <UploadIcon />
        </p>
        <p className='ant-upload-text'>{t('uploads.placeholder')}</p>
        <p className='ant-upload-hint'>{t('uploads.max')}</p>
      </Dragger>

      {file && uploadedUrl && (
        <div style={{ marginTop: 16 }}>
          <h4>{t('uploads.title')}</h4>

          <Flex
            gap={12}
            align='center'
            justify='space-between'
            style={{
              backgroundColor: '#ECF5F9',
              padding: '5px 16px',
              borderRadius: 6,
              marginTop: 6,
            }}
          >
            <FolderIcon />

            <p className='app-text-line-camp' style={{ flex: 1 }}>
              {file.name}
            </p>

            <Flex align='center' gap={10}>
              <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <SuccessIcon />
              <AppButton
                type='link'
                width='auto'
                style={{ padding: 0 }}
                icon={<CloseIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              />
            </Flex>
          </Flex>
        </div>
      )}
    </div>
  );
}
