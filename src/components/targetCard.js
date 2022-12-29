// import React from 'react';

// export default function TargetCard({ company_id }) {
//   return <div>TargetCard for {company_id}</div>;
// }

export default function TargetCard({ company_id }) {
  return (
    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Target name</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {' '}
            Integrated Analytical Laboratories
          </dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Location</dt>
          <dd className="mt-1 text-sm text-gray-900">Paris,France</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Industry</dt>
          <dd className="mt-1 text-sm text-gray-900">Genome editing</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Revenue (2021)</dt>
          <dd className="mt-1 text-sm text-gray-900">$1,200,000</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">About</dt>
          <dd className="mt-1 text-sm text-gray-900">
            Integrated Analytical Laboratories Integrated Analytical
            Laboratories offers an array of analytical services and solutions to
            the pharmaceutical and environmental industries.
          </dd>
        </div>
      </dl>
    </div>
  );
}
