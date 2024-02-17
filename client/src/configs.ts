

// Define a type for your config object to ensure type safety
type Config = {
    api: {
        BASE_URL: string | undefined;
    };
};

// Define the configs object with the environment variable
export const configs: Config = {
    api: {
        // Access environment variables via process.env
        BASE_URL: import.meta.env.VITE_API_BASE_URL
    }
};
