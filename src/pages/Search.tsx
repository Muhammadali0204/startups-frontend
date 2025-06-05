import { useLocation } from "react-router-dom";
import { SearchResultsContent } from "../components/SearchResultContent";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const SearchResults = () => {
  const query = useQuery();
  const q = query.get('q');
  
  return <SearchResultsContent key={q} q={q ?? ''} />;
};
