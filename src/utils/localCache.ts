class localCache {
  get(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key: string) {
    let flag = false;
    if (this.get(key) !== undefined) {
      localStorage.removeItem(key);
      flag = true;
    }
    return flag;
  }

  clear() {
    localStorage.clear();
  }
}

export default new localCache();
