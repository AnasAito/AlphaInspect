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
        val={8323}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record) detected by{' '}
            <span class="font-bold text-green-500">RL v2</span>
          </p>
        }
      />
      <Metric
        val={5165}
        ratio={5165 / 8323}
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
        val={24758}
        ratio={1}
        desc={
          <p>
            Clusters (with more than 1 record) detected by
            <span class="font-bold text-red-500"> RL v1</span>
          </p>
        }
      />
      <Metric
        val={20083}
        ratio={20083 / 24758}
        desc={
          <p>
            Proportion of clusters with <span class="font-bold "> Domain</span>{' '}
            mismatch
          </p>
        }
      />
      <Metric
        val={1617}
        ratio={1617 / 24758}
        desc={
          <p>
            Proportion of clusters with <span class="font-bold "> Type</span>{' '}
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
        val={16024}
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
        val={6931}
        ratio={6931 / 16024}
        desc={
          <p>
            Proportion of links with no{' '}
            <span class="font-bold ">url Domain </span> information
          </p>
        }
      />
      <p class="mt-1">
        6931 (40%) of 16024 links don't have a domain information. and might be
        wrong edges . This is a big ratio! but looking at this specific data we
        found that a big proportion of it are true duplicates .How? looking at
        the data we found that those edges link two records of this type :
        (dreamit ventures iv , dreamit ventures i) . we can see that the records
        are the same just where added with different roman number identifier.
      </p>
      <Metric
        val={4811}
        ratio={4811 / 16024}
        desc={
          <p>
            Proportion of true links (same record different roman number
            identifier)
          </p>
        }
      />
      <Metric
        val={6931 - 4811}
        ratio={(6931 - 4811) / 16024}
        desc={<p>Proportion of links that need to be verified.</p>}
      />
      <p class="my-2 font-bold text-xl">Smoke checks</p>
      <Notif
        desc={
          <>
            {' '}
            How we gathered smoke checks ? We tried as much as possible to add
            quality rules in order to maximize the algo precision and avoid
            false positives.But some links ({6931 - 4811} link to be specific)
            are hard to filter thus some of them may be wrong.we give some
            examples
          </>
        }
      />
      <Dedubtable />
      <p class="my-2 font-bold text-xl">Can we improve the RL v2 ? </p>
      <p class="my-2 font-bold text-lg ">Coverage </p>
      <p class=" font-bold  ">Similarity threshold </p>
      As we have said before the algo use two components (deterministic and non
      deterministic) . for the non deterministic we are using a threshold of 0.7
      to filter the links .
      <br />
      What happened if we decreased the threshold ? Can we capture more
      potential links ?
      <br /> In fact when reducing the threshold the weighted similarity is
      affected mainly by the tfidf dot product.
      <br />
      we have done an experiment where we decreased the threshold from 0.7 to
      0.6 and were abele to capture +10k links.(+60% additional links) where 20%
      of them have a full match in the url domain but the tradeoff is that we
      enter a domain where there eis lot of noise especially if there is no
      domain information to decide.
      <br />
      we suggest decreasing the threshold in future iteration but after adding
      more feature to our records mainly the description embedding
      <p class=" font-bold  ">Record url redirect </p>
      Another way to improve the coverage is to fix records urls an important
      information that we use to decide about links in the two algo components.
      sometime when visiting the urls they redirect you the new ones . I have
      done some research and found that is possible to detect the redirect link
      using python.
      <p class="my-2 font-bold text-lg ">Precision </p>
      The precision problems come usually from records with less context (no url
      domain for example or empty topics list) we can improve our precision by
      including new features that might be costly to compute.but important to
      preserve the quality of our graph
      <br />
      We suggest computing those feature only for the links sample that we
      suspect to have a problem.
    </div>
  );
}
