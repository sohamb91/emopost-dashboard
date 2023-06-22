import 'react-datepicker/dist/react-datepicker.css';

import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

import DateRangePicker from './DatePicker';

const CreateCalendarForm = ({ onFieldChange, formName }) => {
  return (
    <form>
      <div className="mt-2">
        <p className="border-t pt-2 text-sm text-gray-500" />
      </div>
      <div>
        <div className="mt-4">
          <label
            htmlFor="workspace_name"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Workspace Name
          </label>
          <input
            type="text"
            id="workspace_name"
            className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Workspace name"
            required
            name="workspace"
            onChange={(e) =>
              onFieldChange({
                formName,
                name: e?.target?.name,
                value: e?.target?.value,
              })
            }
          />
        </div>
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="mt-4 w-full bg-primary-bg-light p-2 text-left text-sm font-semibold text-primary-bg-dark shadow-sm">
                <div className="flex justify-between">
                  <span>Event Options {` (Optional) `}</span>
                  <ChevronRightIcon
                    className={
                      open ? 'h-5 w-5 rotate-90 font-bold' : 'h-5 w-5 font-bold'
                    }
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500">
                <div className="mt-4 grid grid-cols-2 gap-4 ">
                  <div>
                    <label
                      for="last_name"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Website URL
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="www.example.com"
                      name="website"
                      onChange={(e) =>
                        onFieldChange({
                          formName,
                          name: e?.target?.name,
                          value: e?.target?.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="last_name"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Select Date Range
                    </label>
                    <DateRangePicker
                      onDateChange={(date) => {
                        onFieldChange({
                          formName,
                          name: 'dateRange',
                          value: date,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label
                      for="last_name"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Platform
                    </label>
                    <select
                      id="countries"
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      defaultValue=""
                      name="platform"
                      onChange={(e) =>
                        onFieldChange({
                          formName,
                          name: e?.target?.name,
                          value: e?.target?.value,
                        })
                      }
                    >
                      <option value="" className="text-gray-300">
                        Choose a platform
                      </option>
                      <option value="Google">Google</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Twitter">Twitter</option>
                    </select>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="mt-4 w-full bg-primary-bg-light p-2 text-left text-sm font-semibold text-primary-bg-dark shadow-sm">
                <div className="flex justify-between">
                  <span>Target Audience {` (Optional) `}</span>
                  <ChevronRightIcon
                    className={
                      open ? 'h-5 w-5 rotate-90 font-bold' : 'h-5 w-5 font-bold'
                    }
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500">
                <div className="mt-4 grid grid-cols-2 gap-4 ">
                  <div>
                    <label
                      for="last_name"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Male/Female/Others"
                      required
                      name="gender"
                      onChange={(e) =>
                        onFieldChange({
                          formName,
                          name: e?.target?.name,
                          value: e?.target?.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="last_name"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="E.g. India"
                      required
                      name="location"
                      onChange={(e) =>
                        onFieldChange({
                          formName,
                          name: e?.target?.name,
                          value: e?.target?.value,
                        })
                      }
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </form>
  );
};

export default CreateCalendarForm;
