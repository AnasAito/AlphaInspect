/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Popover, Transition } from '@headlessui/react';
import { AcademicCapIcon, SearchIcon } from '@heroicons/react/outline';
import TargetCard from '../components/targetCard';
// import { MagnifyingGlassIcon } from '@heroicons/react/solid';
import Table from '../components/table';
const navigation = [
  { id: '/targets', name: 'Targets List', href: '#', current: true },
  { id: '/spotlight', name: 'Company Spotlight', href: '#', current: false },
  { id: '/analysis', name: 'Market Analysis', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [company_id, setCompany_id] = useState(null);
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="min-h-full font-mono">
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

                  {/* Search */}
                  <div className="min-w-0 flex-1 px-12 lg:hidden">
                    <div className="mx-auto w-full max-w-xs">
                      <label htmlFor="desktop-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <AcademicCapIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="desktop-search"
                          className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu button */}
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
                                'text-sm font-medium no-underline cursor-pointer rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                              )}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                    <div>
                      <div className="mx-auto w-full max-w-md">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-white focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="mobile-search"
                            className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            name="search"
                            value={value}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-1 lg:gap-8">
              {/* Left column */}
              <section aria-labelledby="section-1-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <Table value={value} />
                  </div>
                </div>
              </section>
              {/* <div className="grid grid-cols-1 gap-4 lg:col-span-2 bg-white">
               
              </div> */}
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
