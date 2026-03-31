'use client';

import { DEFAULT_MAX_FILE_SIZE, DEFAULT_MAX_IMAGE_SIZE, isKoreanPhone } from '@/constants';
import { OptionType } from '@/types';
import { RuleObject } from 'antd/es/form';
import { useTranslations } from 'next-intl';

export function useTranslationUtil(namespace: string = 'common') {
  const t = useTranslations(namespace);

  // Dịch trực tiếp theo key
  const translateMessage = (key: string) => t(key);

  // Tạo thông báo lỗi dựa trên errorCode
  const createErrorMessage = (errorCode: string) => {
    const messageMap: Record<string, string> = {
      NOT_FOUND: 'error.notFound',
      UNAUTHORIZED: 'error.unauthorized',
    };

    const messageKey = messageMap[errorCode] ?? 'error.default';
    return t(messageKey);
  };

  // Lấy label theo value từ options
  const getLabelByValue = (options: OptionType[], value?: string | number, fallback: string = '-') => {
    if (value === undefined || value === null) return fallback;
    const option = options.find((item) => item.value === value);
    return option ? t(option.label) : fallback;
  };

  // Lấy value theo label (đã dịch) từ options
  const getValueByLabel = (options: OptionType[], label?: string, fallback: string | number = '-') => {
    if (!label) return fallback;
    const option = options.find((item) => t(item.label) === label);
    return option ? option.value : fallback;
  };

  // Map options -> translated label (hay dùng cho Select, Radio.Group)
  const getTranslatedOptions = (options: OptionType[]) =>
    options.map((item) => ({
      ...item,
      label: t(item.label),
    }));

  // Validator Korea Phone
  const koreanPhoneValidator = (): ((rule: RuleObject, value: string) => Promise<void>) => {
    return (_rule: RuleObject, value: string): Promise<void> => {
      return isKoreanPhone(_rule, value).catch((err: Error) => {
        return Promise.reject(new Error(t(err.message)));
      });
    };
  };

  // Validate Upload file and Image
  const validateUploadFile = (file: File, type: 'image' | 'file' | 'all', maxFileSize?: number) => {
    const maxImageSize = maxFileSize ?? DEFAULT_MAX_IMAGE_SIZE;

    const config = {
      image: {
        maxSize: maxImageSize * 1024 * 1024,
        types: [
          'image/jpeg',
          'image/jpg',
          'image/png',
          // 'image/webp',
          // 'image/gif',
          // 'image/heif',
          // 'image/heic',
        ] as string[],
        extensions: [
          '.jpg',
          '.jpeg',
          '.png',
          //  '.gif',
          //   '.webp',
          //   '.heif',
          //    '.heic'
        ],
        invalidTypeMsg: 'Jpg, jpeg, png 파일만 첨부 가능합니다.',
        maxSizeMsg: `이미지파일 용량은 ${
          maxImageSize > 1 ? `${maxImageSize}MB` : `${maxImageSize * 1000}kb`
        }를 초과할 수 없습니다.`,
      },
      file: {
        maxSize: (maxFileSize ?? DEFAULT_MAX_FILE_SIZE) * 1024 * 1024,
        types: ['application/pdf'] as string[],
        extensions: ['.pdf'],
        invalidTypeMsg: 'pdf 파일만 첨부 가능합니다.',
        maxSizeMsg: `첨부파일 용량은 ${maxFileSize ?? DEFAULT_MAX_FILE_SIZE}MB를 초과할 수 없습니다.`,
      },

      all: {
        maxSize: (maxFileSize ?? DEFAULT_MAX_FILE_SIZE) * 1024 * 1024,
        types: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'] as string[],
        extensions: ['.pdf', '.jpg', '.jpeg', '.png'],
        invalidTypeMsg: '(PDF 파일과 이미지 파일(jpeg, jpg, png)만 첨부할 수 있습니다)',
        maxSizeMsg: `첨부파일 용량은 ${maxFileSize ?? DEFAULT_MAX_FILE_SIZE}MB를 초과할 수 없습니다.`,
      },
    } as const;

    const { maxSize, extensions, invalidTypeMsg, maxSizeMsg } = config[type];

    // check mime type
    // if (!types.includes(file.type)) {
    //   return { isValid: false, message: invalidTypeMsg };
    // }

    // check file extension - k check mime type
    const fileName = file.name.toLowerCase();
    if (!extensions.some((ext) => fileName.endsWith(ext))) {
      return { isValid: false, message: invalidTypeMsg };
    }

    if (file.size > maxSize) return { isValid: false, message: maxSizeMsg };

    return { isValid: true, message: 'File hợp lệ!' };
  };

  const generateOptions = (options: OptionType[], values?: (string | number)[]): OptionType[] => {
    if (!values || values.length === 0) {
      return options;
    }

    return options.filter((option) => values.includes(option.value));
  };

  return {
    t,
    translateMessage,
    createErrorMessage,
    getLabelByValue,
    getValueByLabel,
    getTranslatedOptions,
    koreanPhoneValidator,
    validateUploadFile,
    generateOptions,
  };
}
