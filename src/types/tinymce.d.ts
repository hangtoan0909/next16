declare namespace TinyMCE {
  interface Editor {
    getContent: (options?: { format?: string }) => string;
    setContent: (content: string) => void;
    execCommand: (command: string, ui?: boolean, value?: string) => boolean;
    insertContent: (content: string) => void;
    on: (event: string, callback: (...args: unknown[]) => void) => void;
    remove: () => void;

    ui: {
      registry: {
        addButton: (
          name: string,
          settings: {
            icon?: string;
            tooltip?: string;
            text?: string;
            onAction: (api: ButtonApi) => void;
          }
        ) => void;
      };
    };
  }

  interface ButtonApi {
    /** Ví dụ API TinyMCE cung cấp cho button */
    setEnabled: (state: boolean) => void;
    setActive: (state: boolean) => void;
    isEnabled: () => boolean;
    isActive: () => boolean;
  }

  interface BlobInfo {
    blob: () => Blob;
    base64: () => string;
    filename: () => string;
    id: () => string;
    name: () => string;
    uri: () => string | undefined;
  }

  interface InitOptions {
    selector: string;
    license_key?: string;
    height?: number;
    menubar?: boolean;
    plugins?: string[];
    toolbar?: string;
    font_size_formats?: string;
    setup?: (editor: Editor) => void;

    images_upload_handler?: (blobInfo: BlobInfo, progress: (percent: number) => void) => Promise<string>;

    inline_boundaries?: boolean;
    language?: string;
    content_style?: string;
    media_poster?: boolean;
    media_alt_source?: boolean;
    [key: string]: unknown;
  }
}

declare const tinymce: {
  init: (options: TinyMCE.InitOptions) => Promise<void> | void;
  remove: (editor?: TinyMCE.Editor) => void;
};
