import React from "react";
import ThoughtList from "../components/ThoughtList";
// import useQUERY and your query for this page.

import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils//queries";

const Home = () => {
  // load data inside component
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // get thoughts from data, else make array
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thoughts(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
