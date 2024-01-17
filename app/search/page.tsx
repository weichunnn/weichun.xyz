"use client";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  useSearchBox,
  useHits,
  UseHitsProps,
  UseSearchBoxProps,
} from "react-instantsearch";

import Header from "@/components/Header";
import BlogList from "@/components/BlogList";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);

const searchClient = {
  ...algoliaClient,
  search(requests: any) {
    if (requests.every(({ params }: { params: any }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

export default function Page() {
  return (
    <>
      <Header title={"Search"} />
      <div className="mt-4">
        <InstantSearch searchClient={searchClient as any} indexName="blogs">
          <SearchBox />
          <div className="mt-10">
            <SearchResults />
          </div>
        </InstantSearch>
      </div>
    </>
  );
}

function SearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    refine(e.target.elements.algolia_search.value);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex justify-center items-center space-x-4"
    >
      <input
        id="algolia_search"
        type="search"
        placeholder="Regrets"
        defaultValue={query}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-medium text-xs uppercase rounded-lg"
      >
        Search
      </button>
    </form>
  );
}

function SearchResults(props: UseHitsProps) {
  const { hits, results } = useHits(props);
  return (
    <>
      {results?._state.query != "" && results?.index && hits.length === 0 && (
        <p>Aw snap! No search results were found.</p>
      )}
      {hits.length > 0 && <BlogList blogs={hits as any} sorted={false} />}
    </>
  );
}
