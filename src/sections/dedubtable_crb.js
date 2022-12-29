/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
// leach / leach holding / Leach Company is a manufacturer of rear load refuse collection bodies/ Leach Holding Corp is designs and manufactures electronic and electromechanical medical devices.
// wanxin touzi , wanxing touzi / Wanxin Touzi provides venture capital consulting and entrepreneurial management services. / Wanxing Touzi operates as an investment firm.
//retina group media , retina group , Digital marketing and general media services spanning the globe , consumer goods spanning the globe
// Hangzhou Jidao Touzi Guanli Hehuo Qiye is an investment management firm., Hangzhou Qifu Touzi Guanli Co., Ltd. is an investment firm.
// Honeycomb/ Honeycomb Energy / Aircraft structural components /Honeycomb Energy specializes in research and development, mass production, and raw material production of automotive power batteries.
//Xingtan Touzi / Xingshang Touzi / Xingtan Touzi is a private equity investment management firm. / Xingshang Touzi is an investment management firm.
const locations = [
  {
    name: 'Link 1',
    people: [
      {
        name: 'leach',
        description:
          'Leach Company is a manufacturer of rear load refuse collection bodies',
      },
      {
        name: 'leach holding',
        description:
          'Leach Holding Corp is designs and manufactures electronic and electromechanical medical devices.',
      },
    ],
  },
  {
    name: 'Link 2',
    people: [
      {
        name: 'wanxin touzi',
        description:
          'Wanxin Touzi provides venture capital consulting and entrepreneurial management services. ',
      },
      {
        name: 'wanxing touzi ',
        description: 'Wanxing Touzi operates as an investment firm.',
      },
    ],
  },
  {
    name: 'Link 3',
    people: [
      {
        name: 'retina group media',
        description:
          'Digital marketing and general media services spanning the globe ',
      },
      {
        name: 'retina group',
        description: 'consumer goods spanning the globe',
      },
    ],
  },
  {
    name: 'Link 4',
    people: [
      {
        name: 'Hangzhou Jidao Touzi Guanli Hehuo Qiye',
        description:
          ' Hangzhou Jidao Touzi Guanli Hehuo Qiye is an investment management firm.',
      },
      {
        name: 'Hangzhou Qifu Touzi Guanli ',
        description:
          'Hangzhou Qifu Touzi Guanli Co., Ltd. is an investment firm.',
      },
    ],
  },
  {
    name: 'Link 5',
    people: [
      {
        name: 'Xingtan Touzi',
        description:
          ' Xingtan Touzi is a private equity investment management firm.',
      },
      {
        name: 'Xingshang Touzi',
        description: ' Xingshang Touzi is an investment management firm.',
      },
    ],
  },

  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <div className="px-4 sm:px-6 lg:px-8    ">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {locations.map((location) => (
                    <Fragment key={location.name}>
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={5}
                          scope="colgroup"
                          className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                        >
                          {location.name}
                        </th>
                      </tr>
                      {location.people.map((person, personIdx) => (
                        <tr
                          key={person.email}
                          className={classNames(
                            personIdx === 0
                              ? 'border-gray-300'
                              : 'border-gray-200',
                            'border-t'
                          )}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {person.name}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  ">
                            {person.description}
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
