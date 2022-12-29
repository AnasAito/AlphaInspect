import React from 'react';

import { InformationCircleIcon } from '@heroicons/react/outline';
export default function dedub_crb() {
  const Metric = ({ val, ratio, desc }) => (
    <div className=" flex items-start justify-between font-mono text-xs animate__animated animate__fadeIn leading-none">
      <div className="flex-1">
        <div
          className="h-1 mb-1 rounded bg-gradient-to-r from-purple-400 to-purple-200"
          style={{ width: `${parseInt(ratio * 100)}%` }}
        ></div>{' '}
        <p>{desc}</p>
      </div>{' '}
      <p className="pl-2">{val}</p>{' '}
    </div>
  );
  const Notif = ({ desc }) => (
    <div className="p-2 rounded-lg bg-blue-500 shadow-lg sm:p-3">
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-0 flex-1 flex items-center">
          <span className="flex p-2 rounded-lg bg-blue-800">
            <InformationCircleIcon className="h-6 w-6 text-white" />
          </span>
          <p className="ml-3 font-medium text-white ">
            <span className="hidden md:inline">{desc}</span>
          </p>
        </div>
      </div>
    </div>
  );
  return (
    <div className="space-y-4">
      <p class="my-2 font-bold text-xl">Coverage performance:</p>
      <Metric
        val={737}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record ) detected by{' '}
            <span class="font-bold text-green-500">RL v2</span>
          </p>
        }
      />
      <Metric
        val={492}
        ratio={492 / 737}
        desc={
          <p>
            Proportion of clusters that could not be detected by{' '}
            <span class="font-bold text-red-500">RL v1</span>
          </p>
        }
      />
      <p class="my-2 font-bold text-xl">Precision performance:</p>
      <p class=" font-bold text-lg">Quality problems in RL v1</p>
      {
        <Notif
          desc={
            <>
              {' '}
              In the <span class="font-bold text-green-500">RL v2 </span> we are
              using post rules to filters links where domains don't match.In the
              other hand the <span class="font-bold text-red-500"> RL v1 </span>{' '}
              don't , that why we have an important proportion of clusters where
              a big proportion don't have the same domain abd refer to different
              entities.
            </>
          }
        />
      }
      <Metric
        val={202}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record ) detected by
            <span class="font-bold text-red-500"> RL v1</span>
          </p>
        }
      />
      <Metric
        val={182}
        ratio={182 / 202}
        desc={
          <p>
            Proportion of clusters with <span class="font-bold "> Domain</span>{' '}
            mismatch
          </p>
        }
      />
      <p class=" font-bold text-lg">RL v2 quality and error bounding :</p>
      In the Rl v2 we priorities quality over Recall/coverage . In fact the
      algorithm use two components to cluster records : a detrmisnitc component
      using a full match on the tuple (domain, type, processed name ,country
      code) and a non deterministic component using a weighted similarity on
      name tfidf vectors and topics list .
      <br />
      If there is errors in our linkage it will comes from the second component
      . to minimize this we use post processing rules like country domain match
      . but sometimes we don't have access to the domain feat of the record.and
      we don't have labeled data to quantity the error.so we tried to quantify
      the number of links that might be wrong.
      <Metric
        val={642}
        ratio={1}
        desc={
          <p>
            Number of links detected by
            <span class="font-bold text-green-500"> RL v2 </span> non
            deterministic component
          </p>
        }
      />
      <Metric
        val={10}
        ratio={10 / 642}
        desc={
          <p>
            Proportion of links with no{' '}
            <span class="font-bold ">url Domain </span> information
          </p>
        }
      />
      <p class="mt-1">
        only 10 links without the domain information thus we can check them
        manually to see if they are correct.
      </p>
    </div>
  );
}
