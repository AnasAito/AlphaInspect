import { Fragment, useState } from 'react';
import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import Graph from '../sections/graph';
import Tabs from '../sections/tabs';

import DedubCRB from '../sections/dedub_crb';
import DedubAlex from '../sections/dedub_alex';
import LinkageCrbAlex from '../sections/linkage_crb_alex';
import LinkageCrbGpt from '../sections/linkage_crb_gpt';
import LinkageAlexGpt from '../sections/linkage_gpt_alex';
import LinkageCrbFda from '../sections/linkage_crb_fda';
import LinkageAlexFda from '../sections/linkage_alex_fda';
import LinkageGptFda from '../sections/linkage_gpt_fda';
import {
  BellIcon,
  XIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';

// import info icon
//import { InformationIcon } from '@heroicons/react/solid';
const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  role: 'Human Resources Manager',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Resources', href: '#', current: false },
  { name: 'Company Directory', href: '#', current: false },
  { name: 'Openings', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export default function Example() {
  const [edge_id, setEdge_id] = useState('');
  const [node_id, setNodeid] = useState('');

  const [tab, setTab] = useState('Details');
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
  const Overview = () => (
    <div>
      <p>
        Clusters count (RL v1) = <span class="font-semibold">5,857,705</span>
      </p>
      <p>
        Clusters count (RL v2) ={' '}
        <span class="font-semibold">5,343,880 (- 9.0 %)</span>{' '}
      </p>
      <br></br>
      <br></br>
      <p>
        Ratio of Org with at least 2 data sources coverage (RL v1) ={' '}
        <span class="font-semibold">31.57 %</span>
      </p>
      <p>
        Ratio of Org with at least 2 data sources coverage (RL v2) ={' '}
        <span class="font-semibold">31.45 %</span>
      </p>
      <br></br>
      <p>
        Ratio of Org with at least 3 data sources coverage (RL v1) ={' '}
        <span class="font-semibold">18.13 %</span>
      </p>
      <p>
        Ratio of Org with at least 3 data sources coverage (RL v2) ={' '}
        <span class="font-semibold">19.88 %</span>
      </p>
      <br></br>
      <p>
        Ratio of Org with at least 4 data sources coverage (RL v1) ={' '}
        <span class="font-semibold">13.3 %</span>
      </p>
      <p>
        Ratio of Org with at least 4 data sources coverage (RL v2) ={' '}
        <span class="font-semibold">15.13 %</span>
      </p>
      <br></br>
      <br></br>

      <Notif
        desc={
          <p>
            Although the coverage/recall stats diff between{' '}
            <span class="font-bold text-red-500"> RL v1 </span> and{' '}
            <span class="font-bold text-green-500"> RL v2 </span> look minimal
            and don't justify the switch to the new Algorithm. A deep dive into
            the precision performance shows that the new algo outperform the old
            one on therms of the quality of clusters . since the old algo use
            only name and country code as features. in addition to that we
            observe an important bump in coverage since we loose the full match
            constraints.
          </p>
        }
      />
    </div>
  );
  const content_maper = {
    '': 'Please choose from the graph',
    crb: <DedubCRB />,
    gpt: <div>gpt</div>,
    fda: <div>fda</div>,
    alex: <DedubAlex />,
    gpt_crb: <LinkageCrbGpt />,
    crb_fda: <LinkageCrbFda />,
    crb_alex: <LinkageCrbAlex />,
    alex_fda: <LinkageAlexFda />,
    gpt_alex: <LinkageAlexGpt />,
    gpt_fda: <LinkageGptFda />,
  };
  const content = edge_id == node_id ? '' : edge_id == '' ? node_id : edge_id;
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Popover
          as="header"
          className="pb-24 bg-gradient-to-r from-orange-800 to-orange-600"
        >
          {({ open }) => (
            <>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                    <a href="#">
                      <img
                        className="h-5"
                        src="https://platform.alpha10x.com/static/media/alpha-logo.57df3b6c.png"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                                alt="Workflow"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="text-base font-medium text-gray-800 truncate">
                                {user.name}
                              </div>
                              <div className="text-sm font-medium text-gray-500 truncate">
                                {user.email}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Profile</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="bg-white p-6">
                      <Tabs tab={tab} setTab={setTab} />
                      <div className="mt-6">
                        {tab == 'Overview' ? (
                          <Overview />
                        ) : (
                          <div>{content_maper[content]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                {/* Announcements */}
                <section aria-labelledby="announcements-title">
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    <div className="bg-white p-6  ">
                      <h2
                        className="text-base font-medium text-gray-900"
                        id="announcements-title"
                      >
                        RL schema
                      </h2>
                      <div className="flex mt-2 flex-col items-center justify-center">
                        <Graph
                          edge_id={edge_id}
                          setEdge_id={setEdge_id}
                          node_id={node_id}
                          setNodeid={setNodeid}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">&copy; 2022 Alpha10x Inc.</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
