import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export function useDocumentTitle(pageTitle: string) {
  const { companyName } = useAppContext();

  useEffect(() => {
    document.title = `${pageTitle} | ${companyName}`;
  }, [pageTitle, companyName]);
}