export const localStorageUtils = {
  /**
   * Lấy dữ liệu từ Local Storage.
   * @param key Khóa của dữ liệu.
   * @returns Dữ liệu đã parse (object, string, number, boolean) hoặc null nếu không có.
   */
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null; // Chỉ thực hiện trên client-side
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Lưu dữ liệu vào Local Storage.
   * @param key Khóa của dữ liệu.
   * @param value Dữ liệu muốn lưu (có thể là object, string, number, boolean).
   */
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item to localStorage for key "${key}":`, error);
    }
  },

  /**
   * Xóa dữ liệu từ Local Storage.
   * @param key Khóa của dữ liệu muốn xóa.
   */
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage for key "${key}":`, error);
    }
  },

  /**
   * Xóa tất cả dữ liệu từ Local Storage.
   */
  clear: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
