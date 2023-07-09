import { PropsWithChildren, createContext, useState } from "react";

export const CandidatesListContext = createContext({
  listHeight: 0,
  setListHeight: (height: number) => {},
});

const CandidatesListContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [listHeight, setListHeight] = useState(0);

  return (
    <CandidatesListContext.Provider value={{ listHeight, setListHeight }}>
      {children}
    </CandidatesListContext.Provider>
  );
};

export default CandidatesListContextProvider;
