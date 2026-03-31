/**
 * Tạo một ID ngẫu nhiên đơn giản.
 * Thường dùng cho key trong React khi không có ID từ backend.
 * CẢNH BÁO: KHÔNG dùng cho mục đích bảo mật hoặc yêu cầu ID duy nhất trên toàn hệ thống.
 * @param prefix Tiền tố cho ID (tùy chọn).
 * @returns Chuỗi ID ngẫu nhiên.
 */
export const generateRandomId = (prefix: string = 'id_'): string => {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Sao chép văn bản vào clipboard.
 * @param text Văn bản cần sao chép.
 * @returns Promise<boolean> - True nếu sao chép thành công, ngược lại là false.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    console.warn('Clipboard API not supported in this environment.');
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
};
