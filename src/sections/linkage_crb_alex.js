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
        val={26975}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record) detected by{' '}
            <span class="font-bold text-green-500">RL v2</span>
          </p>
        }
      />
      <Metric
        val={1962}
        ratio={1962 / 26975}
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
              a big proportion don't have the same domain and refer to different
              entities.
            </>
          }
        />
      }
      <Metric
        val={27701}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record) detected by
            <span class="font-bold text-red-500"> RL v1</span>
          </p>
        }
      />
      <Metric
        val={3604}
        ratio={3604 / 27701}
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
