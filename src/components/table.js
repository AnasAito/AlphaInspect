import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Queries from '../api/index';

function dynamicSort(property, sense) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    if (sense == 'desc') {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    } else {
      var result =
        a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    }

    return result * sortOrder;
  };
}
export default function Table({ value }) {
  const [sortingMeta, setSortingMeta] = useState('');
  const [targets, setTargets] = useState([]);
  const [targetsInit, setTargetsInit] = useState([]);
  const history = useHistory();

  // DATA QUERY
  useEffect(() => {
    Queries['get.many.targets']()
      .then((data) => {
        let data_formated = data.map((target) => {
          return {
            id: target.id,
            name: target.name,
            country_code: target.country_code,
            status: target.status,
            founded_at: target.founded_at,
            funded_stage: '',
            fund_raised_amount_usd: target.fund_raised_amount_usd,
            industry: target.cat_grp_list[0],
          };
        });
        setTargets(data_formated);
        setTargetsInit(data_formated);
        // console.log('data from api : ', data);
      })
      .catch(function (e) {
        console.log('error', e);
      });
  }, []);

  // DATA SORT
  useEffect(() => {
    let col = sortingMeta.split('_')[0];
    let sense = sortingMeta.split('_')[1];
    let sorted_targets = targets;
    sorted_targets.sort(dynamicSort(col, sense));
    setTargets(sorted_targets);
  }, [sortingMeta]);

  // DATA SEARCH
  useEffect(() => {
    if (value != '') {
      console.log(value);
      let filtredTargets = targetsInit;
      filtredTargets = filtredTargets.filter((target) =>
        target.name.toLowerCase().includes(value.toLowerCase())
      );
      setTargets(filtredTargets);
    } else {
      setTargets(targetsInit);
    }
  }, [value]);
  return (
    <div className="px-4 sm:px-6 lg:px-8  ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Targets</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the short-listed targets.
          </p>
        </div>
      </div>
      <div className="mt-8 ">
        <div className="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
          <div className=" overflow-auto   shadow ring-1 ring-black ring-opacity-5  md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300    ">
              <thead className="bg-orange-50">
                <tr>
                  {[
                    { col_name: 'Name', col_id: 'name' },
                    { col_name: 'Region', col_id: 'country_code' },
                    { col_name: 'Industry', col_id: 'industry' },
                    { col_name: 'Status', col_id: 'status' },
                    { col_name: 'Founded at', col_id: 'founded_at' },
                    { col_name: 'Funding stage', col_id: 'funded_stage' },
                    {
                      col_name: 'Total funding',
                      col_id: 'fund_raised_amount_usd',
                    },
                  ].map((column) => {
                    let sortingMeta_ = sortingMeta.split('_');
                    let col = sortingMeta_[0];
                    let sense = sortingMeta_[1];
                    return (
                      <th
                        key={column.col_id}
                        scope="col"
                        className="  py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        <div className="group inline-flex">
                          {column.col_name}
                          {column.col_id === col ? (
                            <>
                              {sense == 'asc' ? (
                                <span
                                  onClick={() =>
                                    setSortingMeta(`${column.col_id}_${'desc'}`)
                                  }
                                  className="ml-2 flex-none rounded hover:bg-orange-300 cursor-pointer text-gray-400 group-hover:visible group-focus:visible"
                                >
                                  <ChevronDownIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : (
                                <span
                                  onClick={() =>
                                    setSortingMeta(`${column.col_id}_${'asc'}`)
                                  }
                                  className="ml-2 flex-none rounded  text-gray-400  hover:bg-orange-300 cursor-pointer group-hover:visible group-focus:visible"
                                >
                                  <ChevronUpIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />{' '}
                                </span>
                              )}
                            </>
                          ) : (
                            <span
                              onClick={() =>
                                setSortingMeta(`${column.col_id}_${'desc'}`)
                              }
                              className="ml-2 flex-none rounded hover:bg-orange-300 cursor-pointer text-gray-400 group-hover:visible group-focus:visible"
                            >
                              <span className="h-5 w-5 p-1 " aria-hidden="true">
                                -
                              </span>
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}

                  {/* <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th> */}
                </tr>
              </thead>
              <tbody className="divide-y  divide-gray-200 bg-white overflow-auto  ">
                {targets.map((target) => (
                  <tr
                    key={target.id}
                    className="hover:bg-orange-100 cursor-pointer"
                    onClick={() => history.push(`/spotlight/${target.id}`)}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {target.name}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {target.country_code}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {target.industry}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {target.status}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {target.founded_at}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {target.funded_stage}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {target.fund_raised_amount_usd}
                    </td>
                    {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
