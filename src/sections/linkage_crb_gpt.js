import React from 'react';
import Ban from '../sections/banner';
import Dedubtable from '../sections/dedubtable_crb';
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
        val={134546}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record) detected by{' '}
            <span class="font-bold text-green-500">RL v2</span>
          </p>
        }
      />
      <Metric
        val={30513}
        ratio={30513 / 134546}
        desc={
          <p>
            Proportion of clusters that could not be detected by{' '}
            <span class="font-bold text-red-500">RL v1</span>
          </p>
        }
      />
      <p class="my-2 font-bold text-xl">Precision performance:</p>
      <p class=" font-bold text-lg">Linkage conflicts </p>
      {
        <Notif
          desc={
            <>
              {' '}
              Google Patents have only name and country as features, thus
              Linking Google Patents to Crunchbase will result in conflicts that
              can be identified in domain mismatch (orgs with the same name and
              country but different url domain ) will link to the same google
              Patent org. We try to quantify the number of conflicts in both the
              linkage output of RL v1 and RL v2.
            </>
          }
        />
      }
      <p class=" font-bold text-green-500 ">RL v2 </p>
      <Metric
        val={134546}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record) detected by
            <span class="font-bold text-green-500"> RL v2</span>
          </p>
        }
      />
      <Metric
        val={5411}
        ratio={5411 / 134546}
        desc={
          <p>
            Proportion of clusters with <span class="font-bold "> Domain</span>{' '}
            mismatch
          </p>
        }
      />
      <p class=" font-bold text-red-500 ">RL v1 </p>
      <Metric
        val={114441}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record) detected by
            <span class="font-bold text-red-500"> RL v1</span>
          </p>
        }
      />
      <Metric
        val={6151}
        ratio={6151 / 114441}
        desc={
          <p>
            Proportion of clusters with <span class="font-bold "> Domain</span>{' '}
            mismatch
          </p>
        }
      />
    </div>
  );
}
