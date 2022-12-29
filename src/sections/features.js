import React from 'react';
import Feats from '../icons/feats.png';
import {
  LightningBoltIcon,
  LinkIcon,
  ChartPieIcon,
  DocumentSearchIcon,
} from '@heroicons/react/outline';

const transferFeatures = [
  {
    id: 1,
    name: 'Maximum extraction',
    description:
      'SkillNer create many forms of the input text  to extract the most of it, from   trivial skills like IT tool names  to implicit ones hidden by gramatical ambiguties. ',
    icon: DocumentSearchIcon,
  },
  {
    id: 2,
    name: ' Skill linkage ',
    description: (
      <span>
        SkillNer link extracted entities in the processed text to a normalised
        skill database (
        <a
          href="https://skills.emsidata.com/"
          className="font-bold  hover:text-purple-700"
        >
          EMSI skill database
        </a>
        ) updated consistently ,giving the user access to skill metatdata and
        avoiding duplication .
      </span>
    ),
    icon: LinkIcon,
  },
  {
    id: 3,
    name: 'Blazing fast',
    description:
      'Our codebase is build with scale in mind , making it able to process thousand of sentences in minutes .',
    icon: LightningBoltIcon,
  },
  {
    id: 4,
    name: 'Modular by default',
    description: (
      <span>
        Skillner codebase is modular giving you the freedom to{' '}
        <span className="font-bold  ">plug or unplug extracting modules</span> .
        Not only code <span className="font-bold  ">but also data layer </span>,
        we've standardised the data model fed to skillner so you can plug any
        database easily
      </span>
    ),
    icon: ChartPieIcon,
  },
];

export default function Features() {
  return (
    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <svg
          className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
          />
        </svg>

        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why choose skillNer ?
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            SkillNer is the{' '}
            <span class="font-bold text-indigo-500">first Open Source </span>{' '}
            skill extractor . Its key features make it ready to use or integrate
            in your diverse applications.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <dl className="mt-10 space-y-10">
              {transferFeatures.map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={784}
                height={404}
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
            <img
              className="relative mx-auto rounded-lg shadow-md"
              width={490}
              src={Feats}
              alt=""
            />
          </div>
        </div>

        <svg
          className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>
      </div>
    </div>
  );
}
