const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || defaultValue!;
};

export default getEnvVar;
