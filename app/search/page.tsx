"use client";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch, connectSearchBox } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch-dom";

import Header from "@/components/Header";
import BlogList from "@/components/BlogList";

export default function Page() {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
  );

  const searchClient = {
    search(requests: any) {
      if (requests[0].params.query === "") {
        return [];
      }
      return client.search(requests);
    },
  };

  const CustomHits = connectStateResults(Hits);
  const CustomSearchBox = connectSearchBox(SearchBox);

  return (
    <>
      <Header title={"Search"} />
      <div className="mt-4">
        <InstantSearch searchClient={searchClient} indexName="blogs">
          <CustomSearchBox />
          <div className="mt-10">
            <CustomHits />
          </div>
        </InstantSearch>
      </div>
    </>
  );
}

function SearchBox({ refine }: { refine: any }) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    refine(e.currentTarget.elements.algolia_search.value);
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

function Hits({
  searchState,
  searchResults,
}: {
  searchState: any;
  searchResults: any;
}) {
  return (
    <>
      {searchResults?.hits.length === 0 && (
        <p>Aw snap! No search results were found.</p>
      )}
      {searchState && searchState.query && searchResults?.hits.length > 0 && (
        <BlogList blogs={searchResults.hits} sorted={false} />
      )}
    </>
  );
}
