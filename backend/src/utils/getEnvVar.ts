const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || defaultValue!;
};

export default getEnvVar;
