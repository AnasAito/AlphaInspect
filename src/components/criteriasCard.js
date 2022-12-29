import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/solid';

const timeline = [
  {
    id: 1,
    criteria: 'Right capabilities',
    explanation: '3 keywords , 2 tests matched',
    score: '80%',
    Background: 'bg-orange-600',
  },
  {
    id: 2,
    criteria: 'Right sector',
    explanation: '14 keywords matched',
    score: '60%',
    Background: 'bg-orange-400',
  },
  {
    id: 3,
    criteria: 'Right location',
    explanation: '213 km away from Paris',
    score: '90%',
    Background: 'bg-orange-700',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CriteriasCard({ targetMeta }) {
  return (
    <div className="rounded-md shadow-md p-4">
      {' '}
      {/* Technology */}
      <h1 className="font-bold text-2xl mb-2">Criterias</h1>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {timeline.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        event.Background,
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                      )}
                    >
                      {/* <event.icon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      /> */}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-md text-black font-semibold">
                        {event.criteria}
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.explanation}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <span>{event.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
