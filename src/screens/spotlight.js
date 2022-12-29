import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, Popover, Transition } from '@headlessui/react';
import TrendChart from '../components/trendChart';
import ArChart from '../components/areaChart';
import NesPieChart from '../components/nestedPieChart';
import { ArrowDownIcon, ArrowUpIcon, TableIcon } from '@heroicons/react/solid';
import { get } from 'lodash';
import LinkedinSvg from '../icons/linkedin';
import ExtLink from '../icons/extLink';
import Queries from '../api/index';
import Modal from '../components/modal';
import CriteriasCard from '../components/criteriasCard';
const navigation = [
  { id: '/targets', name: 'Targets List', href: '#', current: false },
  { id: '/spotlight', name: 'Company Spotlight', href: '#', current: true },
  { id: '/analysis', name: 'Market Analysis', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Stat = ({ item }) => (
  <dd className="flex items-baseline">
    <p className=" ">{item.stat}</p>
    <p
      className={classNames(
        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
        'ml-2 flex items-baseline  '
      )}
    >
      {item.changeType === 'increase' ? (
        <ArrowUpIcon
          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
          aria-hidden="true"
        />
      ) : (
        <ArrowDownIcon
          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
          aria-hidden="true"
        />
      )}

      <span className="sr-only">
        {' '}
        {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by{' '}
      </span>
      {item.change}
    </p>
  </dd>
);
const KpisCard = ({ targetMeta }) => (
  <div className="rounded-md shadow-md p-4 ">
    <h1 className="font-bold text-2xl mb-2">Kpis</h1>
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <dd className="mt-1 text-md text-orange-600 font-bold">
          {' '}
          {targetMeta.founded_at}
        </dd>
        <dt className="text-md font-medium text-gray-500">Founded At</dt>
      </div>

      <div className="sm:col-span-1">
        <dd className="mt-1 text-md text-orange-600 font-bold">
          <Stat
            item={{
              stat: '$711,897',
              change: '19%',
              changeType: 'increase',
            }}
          />
        </dd>
        <dt className="text-md font-medium text-gray-500">Ebdita (2021)</dt>
      </div>
      <div className="sm:col-span-1">
        <dd className="mt-1 text-md text-orange-600 font-bold">
          <Stat
            item={{
              stat: '$1,200,000',
              change: '10%',
              changeType: 'increase',
            }}
          />
        </dd>
        <dt className="text-md font-medium text-gray-500">Revenue (2021)</dt>
      </div>
      <div className="sm:col-span-1">
        <dd className="mt-1 text-md text-orange-600 font-bold">
          {targetMeta.funding_round_count ? (
            <span>{targetMeta.funding_round_count}</span>
          ) : (
            <span>-</span>
          )}
        </dd>
        <dt className="text-md font-medium text-gray-500">
          Number of founding rounds
        </dt>
      </div>
      <div className="sm:col-span-1">
        <dd className="mt-1 text-md text-orange-600 font-bold">
          {' '}
          {targetMeta.last_FR_type ? (
            <span>
              {formatToCurrency(targetMeta.last_FR_amount)}(
              {targetMeta.last_FR_type.toUpperCase()})
            </span>
          ) : (
            <span>-</span>
          )}
        </dd>
        <dt className="text-md font-medium text-gray-500">
          Last founding round
        </dt>
      </div>
      {/* <div className="sm:col-span-2">
    <dt className="text-sm font-medium text-gray-500">
      About
    </dt>
    <dd className="mt-1 text-sm text-gray-900">
      Integrated Analytical Laboratories Integrated
      Analytical Laboratories offers an array of
      analytical services and solutions to the
      pharmaceutical and environmental industries.
    </dd>
  </div> */}
    </dl>
  </div>
);
const PeopleCard = ({ targetMeta }) => (
  <>
    <div className="rounded-md shadow-md p-4">
      {/* People */}

      <div className="flex flex-row  justify-between ">
        <h1 className="font-bold text-2xl">People</h1>
        <nav className="flex space-x-4" aria-label="Tabs">
          {[
            { name: 'General', href: '#', current: true },

            { name: 'Skills', href: '#', current: false },
          ].map((tab) => (
            <div
              key={tab.name}
              href={tab.href}
              className={classNames(
                tab.current
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                'px-3 py-2 font-medium text-sm rounded-md cursor-pointer'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </div>
          ))}
        </nav>
      </div>
      {/* employee count */}
      {targetMeta.num_of_employees && (
        <div className="m-2 mt-4 flex flex-row justify-between">
          <div>
            <p className="font-bold text-orange-500 my-1 ">
              Number of employees{' '}
            </p>
            <p className="text-gray-300">
              <span className="text-black font-semibold">
                {targetMeta.num_of_employees}
              </span>{' '}
              since 2022
            </p>
          </div>
          <TrendChart data={get(targetMeta, 'team_growth', [])} />
        </div>
      )}
      {/* founders  */}
      <div className="m-2 ">
        <p className="font-bold text-orange-500 my-1 ">Founders </p>

        <div className="grid grid-cols-2 gap-4 ">
          {' '}
          {targetMeta.all_founders ? (
            <>
              {targetMeta.all_founders.map((founder) => (
                <div key={founder.founder_id} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}

                  <p className="text-sm font-medium text-gray-900">
                    {founder.founder_name}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {founder.founders_title}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <>No founders found ! </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {/* experience  */}
        {targetMeta.team_experience ? (
          <div className="m-2 ">
            <p className="font-bold text-orange-500 my-1 ">Team experience </p>

            <div class="space-y-4 mt-4">
              {targetMeta.team_experience.map((exp) => (
                <div class="flex items-start justify-between font-mono text-xs animate__animated animate__fadeIn leading-none">
                  <div class="flex-1">
                    <div
                      class="h-1 mb-1 rounded bg-gradient-to-r from-orange-400 to-orange-200"
                      style={{
                        width: `${parseInt(
                          (exp.num_of_employees / 10) * 100
                        )}%`,
                      }}
                    ></div>{' '}
                    <p>
                      {exp.experience_range ? exp.experience_range : 'others'}
                    </p>
                  </div>{' '}
                  <p class="pl-2">{exp.num_of_employees}</p>{' '}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Education  */}
        <div className="m-2 ">
          <p className="font-bold text-orange-500 my-1 ">Education </p>
          <div class="space-y-4 mt-4">
            {[
              {
                concept_name: 'Harvard',
                count: 11,
                ratio: 1,
              },
              {
                concept_name: 'Mit ',
                count: 6,
                ratio: 0.55,
              },
              {
                concept_name: 'California university',
                count: 2,
                ratio: 0.1,
              },
              {
                concept_name: 'Stanford',
                count: 2,
                ratio: 0.1,
              },
            ].map((concept) => (
              <div class="flex items-start justify-between font-mono text-xs animate__animated animate__fadeIn leading-none">
                <div class="flex-1">
                  <div
                    class="h-1 mb-1 rounded bg-gradient-to-r from-orange-400 to-orange-200"
                    style={{
                      width: `${parseInt(concept.ratio * 100)}%`,
                    }}
                  ></div>{' '}
                  <p>{concept.concept_name}</p>
                </div>{' '}
                <p class="pl-2">{concept.ratio.toFixed(2)}</p>{' '}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const TechCard = ({ targetMeta }) => (
  <div className="rounded-md shadow-md p-4 ">
    {' '}
    {/* Technology */}
    <h1 className="font-bold text-2xl">Concepts</h1>
    <div class="space-y-4 m-2 mt-4 ">
      {[
        {
          concept_name: 'Genome editing',
          count: 1121,
          ratio: 1,
        },
        {
          concept_name: 'RNA sequencing ',
          count: 573,
          ratio: 0.4,
        },
        {
          concept_name: 'Machine learning',
          count: 409,
          ratio: 0.3,
        },
        {
          concept_name: 'Graph databases',
          count: 56,
          ratio: 0.05,
        },
      ].map((concept) => (
        <div class="flex items-start justify-between font-mono text-xs animate__animated animate__fadeIn leading-none">
          <div class="flex-1">
            <div
              class="h-1 mb-1 rounded bg-gradient-to-r from-orange-400 to-orange-200"
              style={{
                width: `${parseInt(concept.ratio * 100)}%`,
              }}
            ></div>{' '}
            <p>{concept.concept_name}</p>
          </div>{' '}
          <p class="pl-2">{concept.ratio.toFixed(2)}</p>{' '}
        </div>
      ))}
    </div>
  </div>
);

const OvCard = ({ targetMeta }) => (
  <div className="rounded-md shadow-md p-4">
    {' '}
    <h1 className="font-bold text-2xl mt-2">Overview</h1>
    <figure class="md:flex    rounded-xl  ">
      <div className="flex flex-col items-center md:w-1/4  justify-center ">
        {' '}
        <img
          class=" w-36 h-36 rounded-full object-fill bg-orange-600 mx-auto "
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ztitrdw7nizegb6th5me"
          alt=""
        />{' '}
        <div className="flex flex-row justify-between  gap-1 ">
          {get(targetMeta, 'linkedin_url', null) && (
            <a
              href={targetMeta.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              <LinkedinSvg />
            </a>
          )}
          {get(targetMeta, 'url', null) && (
            <a href={targetMeta.url} target="_blank" rel="noopener noreferrer">
              {' '}
              <ExtLink />
            </a>
          )}
        </div>
      </div>

      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <p className="font-semibold text-3xl text-orange-500 ">
          {targetMeta.name}
        </p>
        <blockquote>
          <p class="text-lg font-medium">{targetMeta.short_description}</p>
        </blockquote>
        <figcaption class="font-medium">
          <div class="text-slate-700 mt-1 ">
            __city__ , {targetMeta.country_code}
          </div>
          <div className=" flex flex-row gap-2">
            {targetMeta.cat_grp_list.map((cat) => (
              <p className="inline-flex mt-1 rounded-lg text-xs bg-orange-100 px-2 py-1  font-semibold leading-5 text-black">
                {cat}
              </p>
            ))}
          </div>
        </figcaption>
      </div>
    </figure>
  </div>
);

const OverviewCard = ({ targetMeta }) => (
  <div className="rounded-md shadow-md p-4">
    {' '}
    <h1 className="font-bold text-2xl">Overview</h1>
    <div className="m-6 flex flex-row  ">
      <div className="pr-4  flex flex-col gap-y-2 items-center">
        <img
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/ztitrdw7nizegb6th5me"
          className="rounded-full object-fill bg-orange-600 mx-auto ring-4  "
          width="125px"
          height="125px"
        ></img>
        <div className="flex flex-row justify-between  gap-1 ">
          {get(targetMeta, 'linkedin_url', null) && (
            <a
              href={targetMeta.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              <LinkedinSvg />
            </a>
          )}
          {get(targetMeta, 'url', null) && (
            <a href={targetMeta.url} target="_blank" rel="noopener noreferrer">
              {' '}
              <ExtLink />
            </a>
          )}
        </div>
      </div>
      <div className="">
        {' '}
        <p className="font-semibold text-3xl">{targetMeta.name}</p>
        <p className="mt-2  text-gray-900  ">{targetMeta.short_description}</p>
        <p className="mt-1">
          Location :{' '}
          <span className=" font-semibold">{targetMeta.country_code}</span>
        </p>
        <div className=" flex flex-row gap-2">
          {targetMeta.cat_grp_list.map((cat) => (
            <p className="inline-flex mt-1 rounded-lg text-xs bg-orange-100 px-2 py-1  font-semibold leading-5 text-black">
              {cat}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);
const PaperCard = ({ targetMeta }) => (
  <>
    {targetMeta.paper_ts ? (
      <div className="rounded-md shadow-md p-4  h-auto flex flex-col justify-between ">
        {' '}
        {/* Technology */}
        <div>
          <h1 className="font-bold text-2xl">Scientific works</h1>{' '}
          <p className="font-bold text-orange-500 my-1 ">
            Sc Papers evolution{' '}
          </p>
          <ArChart data={targetMeta.paper_ts} />
        </div>
        <div className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          View works details
        </div>
      </div>
    ) : (
      <div className="rounded-md shadow-md p-4    ">
        {' '}
        <h1 className="font-bold text-2xl">Scientific works</h1>
        <div className=" my-10 flex justify-center items-center">
          No scientific work found !
        </div>
      </div>
    )}
  </>
);
const PatentCard = ({ targetMeta }) => (
  <>
    {targetMeta.patent_ts ? (
      <div className="rounded-md shadow-md p-4">
        {' '}
        {/* Technology */}
        <h1 className="font-bold text-2xl">Patents</h1>
        <p className="font-bold text-orange-500 my-1 ">Patent evolution </p>
        <ArChart data={targetMeta.patent_ts} />
        <p className="font-bold text-orange-500 my-1 ">Patent portfolio </p>
        <div className="flex justify-center items-center">
          <NesPieChart />
        </div>
        <div className="mt-6">
          <div className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            View patents details
          </div>
        </div>
      </div>
    ) : (
      <div className="rounded-md shadow-md p-4    ">
        {' '}
        <h1 className="font-bold text-2xl">Patents</h1>
        <div className=" my-10 flex justify-center items-center">
          No patents found !
        </div>
      </div>
    )}
  </>
);
const defaultTargetMeta = {
  name: '',
  founded_at: '',
  country_code: '',
  short_description: '',
  cat_grp_list: [],
  team_growth: [],
  num_of_employees: null,
  all_founders: null,
  team_experience: null,
  funding_round_count: null,
  patent_ts: [],
  paper_ts: [],
  linkedin_url: null,
  url: null,
};
const formatToCurrency = (amount) => {
  // return amount.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `$${(amount / 1000000).toFixed(2)}M `;
};
export default function Spotlight() {
  let { id: company_id } = useParams();
  // console.log('company id - ', company_id != 'null' ? 'not null' : 'null');
  const [targetMeta, setTargetMeta] = useState(defaultTargetMeta);
  // const [open, setOpen] = useState(true);
  // DATA QUERY
  useEffect(() => {
    Queries['get.one.targets'](company_id)
      .then((data) => {
        console.log('data from api - spotlight : ', data);
        setTargetMeta(get(data, '0', defaultTargetMeta));
      })
      .catch(function (e) {
        console.log('error', e);
      });
  }, []);

  return (
    <>
      <div className="min-h-full font-mono">
        {/* <Modal /> */}
        <Popover as="header" className="bg-orange-600 pb-24">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static flex flex-row items-center gap-2">
                    <img
                      className="rounded-full"
                      src="https://yt3.ggpht.com/ITlb3Lyi-stJUJ8nWILUPyE2r3WqP-88wA73zA6V8M7hVKdU_0nBNx94R4kWMDvGTHrVHMYN-oA=s88-c-k-c0x00ffffff-no-rj"
                    />

                    <span className=" text-white text-2xl font-bold">
                      IAC Parners / Nemera | Ring II Project
                    </span>
                  </div>
                </div>
                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                  <div className="grid grid-cols-3 items-center gap-8">
                    <div className="col-span-2">
                      <nav className="flex space-x-4">
                        {navigation.map((item) => {
                          let pathname = `${item.id}`;
                          if (item.id == '/spotlight') {
                            pathname = `${item.id}/${company_id}`;
                          }

                          return (
                            <Link
                              key={item.name}
                              to={{
                                pathname: pathname,
                              }}
                              className={classNames(
                                item.current
                                  ? 'text-white font-bold'
                                  : 'text-orange-100 ',
                                'text-sm font-medium no-underline  cursor-pointer rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                              )}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-1 lg:gap-8">
              <section aria-labelledby="section-2-title">
                {company_id != 'null' ? (
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <OvCard targetMeta={targetMeta} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-6">
                      <KpisCard targetMeta={targetMeta} />
                      <CriteriasCard targetMeta={targetMeta} />
                      <PeopleCard targetMeta={targetMeta} />
                      <TechCard targetMeta={targetMeta} />
                      {/* <PaperCard targetMeta={targetMeta} />
                    <PatentCard targetMeta={targetMeta} /> */}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-lg h-96  flex flex-col items-center justify-center bg-white shadow">
                    <TableIcon
                      className="  h-52 w-52 flex-shrink-0 self-center text-orange-300"
                      aria-hidden="true"
                    />
                    <p className="w-5/12 text-3xl text-center">
                      Choose a company from the{' '}
                      <Link
                        to={{
                          pathname: '/targets',
                        }}
                        className="hover:text-orange-400"
                      >
                        targets List!
                      </Link>
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2022 ALPHA10X, Inc.
              </span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
