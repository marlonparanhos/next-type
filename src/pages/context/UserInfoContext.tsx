import { createContext, useState, ReactNode } from 'react';

interface IInfo {
  id?: number;
  login?: string;
  name?: string;
  email?: string;
  type?: string;
  description?: string;
}

type IGitOptions = {
  gitInfo: IInfo | null;
  handleGitCall: (orgName: string) => void;
  handleChange: (name: string) => void;
};

export const GitInfoContext = createContext<IGitOptions | null>(null);

export default function GitInfoProvider({ children }: { children: ReactNode }) {
  const [gitInfo, setGitInfo] = useState<IInfo>({});

  const handleGitCall = async (orgName: string) => {
    const res = await fetch(`https://api.github.com/orgs/${orgName}`);
    const data: IInfo = await res.json();

    setGitInfo(data);
  };

  const handleChange = (name: string) => {
    setGitInfo((current) => ({
      ...current,
      name,
    }));
  };

  return (
    <GitInfoContext.Provider
      value={{
        gitInfo,
        handleGitCall,
        handleChange,
      }}
    >
      {children}
    </GitInfoContext.Provider>
  );
}
