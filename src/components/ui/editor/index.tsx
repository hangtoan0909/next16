'use client';

import { useUploadImage } from '@/hooks/api/use-upload';
import { useToastContext } from '@/hooks/toast/use-toast-context';
import { useTranslationUtil } from '@/hooks/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef } from 'react';

type EditorRef = TinyMCE.Editor | null;

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
}

const languageMap: Record<string, string> = {
  en: 'en',
  ko: 'ko_KR',
};

export const AppEditor = ({ value, onChange }: Props) => {
  const editorRef = useRef<EditorRef>(null);
  const isUpdatingFromProp = useRef(false);
  const locale = useLocale();
  const t = useTranslations('common');
  const { toast } = useToastContext();
  const { validateUploadFile } = useTranslationUtil();
  const { mutateAsync: uploadMutate } = useUploadImage();

  // const handleInsertFile = useCallback(() => {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = '.pdf';
  //   input.multiple = false; // chỉ cho chọn 1 file duy nhất

  //   const handleChange = async (event: Event) => {
  //     const target = event.target as HTMLInputElement;
  //     const file = target.files?.[0];
  //     if (!file) return;

  //     const { isValid, message } = validateUploadFile(file, 'file');
  //     if (!isValid) {
  //       toast('error', { description: message });
  //       cleanup();
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append('file', file);

  //     uploadMutate(formData, {
  //       onSuccess: (data) => {
  //         const { url: fileUrl, fileName } = data.data;
  //         if (fileUrl && editorRef.current) {
  //           const editor = editorRef.current;
  //           if (editor) {
  //             const newLink =
  //               `<a href="https://docs.google.com/gview?url=${fileUrl}&embedded=true" target="_blank">` +
  //               fileName +
  //               '</a>';
  //             editor.execCommand('mceInsertContent', false, newLink);
  //           }
  //         }
  //         cleanup();
  //       },
  //       onError: () => {
  //         cleanup();
  //       },
  //     });
  //   };

  //   const cleanup = () => {
  //     input.removeEventListener('change', handleChange);
  //     input.remove();
  //   };

  //   input.addEventListener('change', handleChange);
  //   input.click();
  // }, [uploadMutate, toast, validateUploadFile]);

  const handleImageUpload = useCallback(
    async (blobInfo: TinyMCE.BlobInfo): Promise<string> => {
      const { isValid, message } = validateUploadFile(blobInfo.blob() as File, 'image');
      if (!isValid) {
        toast('error', { description: message });
        return '';
      }
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      const response = await uploadMutate(formData);

      return response.data.url;
    },
    [uploadMutate, toast, validateUploadFile]
  );

  const memoizedOnChange = useCallback(
    (content: string) => {
      if (!isUpdatingFromProp.current) {
        onChange?.(content);
      }
    },
    [onChange]
  );

  useEffect(() => {
    const initEditor = async () => {
      if (editorRef.current) {
        return;
      }

      await tinymce.init({
        selector: '#app-rich-editor',
        license_key: 'gpl',
        height: 400,
        menubar: false,
        plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'anchor', 'code', 'media', 'table'],
        toolbar:
          'undo redo | blocks | fontsize |' +
          'styleselect | bold italic underline strikethrough | forecolor backcolor |' +
          'align | bullist numlist outdent indent |' +
          'blockquote | table link image media insertfile | removeformat',
        font_size_formats: '8px 10px 12px 14px 16px 18px 20px 24px 36px 48px',
        setup: (editor: TinyMCE.Editor) => {
          editorRef.current = editor;

          // editor.ui.registry.addButton('insertfile', {
          //   icon: 'upload',
          //   tooltip: t('app.insert_file'),
          //   onAction: handleInsertFile,
          // });

          editor.on('change input', () => {
            memoizedOnChange(editor.getContent());
          });
        },
        sandbox_iframes: false,
        extended_valid_elements: 'iframe[src|width|height|name|align|style|frameborder]',

        images_upload_handler: handleImageUpload,
        inline_boundaries: false,
        language: languageMap[locale] || 'ko_KR',
        content_style:
          ` @import url('/tinymce/fonts/styles.css');` +
          `body { font-family: 'fontMain', sans-serif; font-weight: 400; }` +
          'body::before { color: #a0a0a0 !important; font-size: 16px !important }',
        media_poster: false,
        media_alt_source: false,
      });
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        tinymce.remove(editorRef.current);
        editorRef.current = null;
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentContent = editorRef.current.getContent();
      if (currentContent !== value) {
        isUpdatingFromProp.current = true;
        editorRef.current.setContent(value);
        isUpdatingFromProp.current = false;
      }
    }
  }, [value]);

  return <textarea id='app-rich-editor' value={value || ''} readOnly placeholder={t('placeholder.editor')} />;
};
