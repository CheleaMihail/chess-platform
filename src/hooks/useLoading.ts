import { useState } from 'react';

type UseLoadingReturn = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const useLoading = (): UseLoadingReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return { loading, setLoading, error, setError };
};

export default useLoading;
